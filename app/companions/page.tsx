import React from "react";
import { getAllCompanions } from "@/lib/action/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';
  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companions Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="flex flex-wrap gap-4 w-full max-md:justify-center">
        
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
