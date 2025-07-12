import React from "react";
import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="cta-section">
      
      <h1>Build your personal AI Teacher</h1>
      <p>Pick a name,subject and a topic to start your journey</p>
      <Image
        src="/images/cta.svg"
        alt="Call to Action Image"
        width={500}
        height={300}
      />
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="Plus Icon" width={24} height={24} />
        <Link href="/companions/new">Create Companion</Link>
      </button>
    </section>
  );
};

export default CTA;
