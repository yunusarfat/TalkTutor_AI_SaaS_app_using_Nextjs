import CompanionForm from "@/components/CompanionForm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { newCompanionPermissions } from "@/lib/action/companion.actions";
import  Link  from "next/link";
const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full flex flex-col gap-4">
          <h1 className="flex flex-col w-full gap-4 items-center">
            Create Companion
          </h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="companion limit reached"
            width={360}
            height={220}
          />
          <div className="cta-badge">Upgrade Your plan</div>
          <h1>You've reached your limitation</h1>
          <p>Upgrade to create more companion and exclusive features</p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Purchase Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
