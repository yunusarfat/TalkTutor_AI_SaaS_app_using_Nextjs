"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/action/companion.actions";
enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  userName,
  userImage,
  name,
  subject,
  topic,

  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    }
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...(prev ?? [])]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error:", error);
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);

      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);
  // const toggleMicroPhone = () => {
  //   const isMuted = vapi.isMuted();
  //   vapi.setMuted(!isMuted);
  //   setIsMuted(!isMuted);
  // };
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    // Define a default style or get it from props if needed
    const style = "default"; // Replace "default" with the desired style value

    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };
  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div className="companion-avatar">
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-1001"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={110}
                height={110}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          {/* <button className="btn-mic" onClick={toggleMicroPhone} disabled={callStatus !== CallStatus.ACTIVE}>
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt={isMuted ? "Mic Off" : "Mic On"}
              width={30}
              height={30}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on the mic" : "Turn off the mic"}
            </p>
          </button> */}
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-500" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End call"
              : callStatus === CallStatus.CONNECTING
              ? "connecting..."
              : "Start call"}
          </button>
        </div>
        <section className="transcript">
          <div className="transcript-message no-scrollbar">
            {messages &&
              messages.map((message,index) => {
                if (message.role === "assistant") {
                  return (
                    <p key={index} className="max-sm:text-sm">
                      {name.split("")[0].replace("/[.,]/g,", "")}:
                      {message.content}
                    </p>
                  );
                } else {
                  return (
                    <p
                      key={index}
                      className="text-primary max-sm:text-sm"
                    >
                      {userName}:{message.content}
                    </p>
                  );
                }
              })}
          </div>
          <div className="transcript-fade" />
        </section>
      </section>
    </section>
  );
};

export default CompanionComponent;
