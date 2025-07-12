import { getCompanion } from "@/lib/action/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";

import React from "react";
import CompanionComponent from "@/components/CompanionComponent";
// import { subjects } from "@/constants";
interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}
const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  const { name, subject, topic, duration } = companion;
  if (!user) redirect("/sign-in");
  if (!name) redirect("/companions");
  // console.log(companion);

  return (
    <main>
      <article
        className="flex rounded-border justify-between
      max-md:flex-col p-6"
      >
        <div className="flex items-center gap-4">
          <div
            className="size-[72px] flex items-center justify-center
          rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-teal-500 text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-sm ">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
