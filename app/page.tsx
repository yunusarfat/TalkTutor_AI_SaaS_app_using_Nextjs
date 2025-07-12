import React from "react";
// import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";

import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/action/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSessions(10);
  return (
    <main className="">
      <p className="font-extrabold text-4xl md:text-5xl leading-snug tracking-tight">
        Welcome to{" "}
        <span className="text-teal-400 inline-block animate-pulse">
          TalkTutor
        </span>
        ,<br />
        <span className="text-gray-700">your smart learning sidekick.</span>
        <br />
        <span className="text-2xl text-gray-500 max-md:hidden">
          Discover AI-driven companions, sharpen your skills, and make every
          study session exciting.
        </span>
      </p>

      <h1 className="font-bold">Trending Companions</h1>
      <section className="home-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
        ))}
      </section>
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <CompanionsList
          title="Previous History Companions"
          companions={recentSessionCompanions}
          classNames="w-2/3 max-lg:w-full max-lg:mt-4"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
