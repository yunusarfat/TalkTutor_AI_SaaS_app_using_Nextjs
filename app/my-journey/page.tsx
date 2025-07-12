import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/action/companion.actions";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main>
      <section className=" flex justify-between items-center gap-4 max-sm:flex-col">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {" "}
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="border border-black rounded-lg flex flex-col p-3 gap-2 h-fit ">
          <div className="flex gap-2 items-center">
            <Image
              src={"/icons/check.svg"}
              alt="checkmark"
              width={22}
              height={22}
            />
            <p className="font-bold">{sessionHistory.length}</p>
          </div>
          <div>Completed Lesson</div>
        </div>
        <div className="border border-black rounded-lg flex flex-col p-3 gap-2 h-fit ">
          <div className="flex gap-2 items-center">
            <Image src={"/icons/cap.svg"} alt="cap" width={22} height={22} />
            <p className="font-bold">{companions.length}</p>
          </div>
          <div>Total Companion</div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="font-bold text-2xl">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
           <CompanionsList title='Recent Sessions'
           companions={sessionHistory.flat().filter(Boolean)}/>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="companions">
          <AccordionTrigger className="font-bold text-2xl">
            My Companions
            {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" 
            companions={companions}/>
          </AccordionContent>
          
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
