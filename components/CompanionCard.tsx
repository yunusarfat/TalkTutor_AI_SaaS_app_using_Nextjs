'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";


interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}
const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  
}: CompanionCardProps) => {
  // const pathname = usePathname();
  // const handleBookmark = async () => {
  //   if (bookmarked) {
  //     await removeBookmark(id, pathname);
  //   } else {
  //     await addbookmark(id, pathname);
  //   }
  // };

  return (
    <article
      className="flex flex-col rounded-4xl border border-black px-4 py-4 gap-5 w-full min-lg:max-w-[410px] justify-between"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <div className="subject-badge"> {subject}</div>
        {/* <button className="companion-bookmark" >
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark icon"
            width={12}
            height={15}
          />
        </button> */}
      </div>
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-lg">{topic}</p>
      <div>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/clock.svg"
            alt="clock icon"
            width={16}
            height={16}
          />
          <span className="text-sm">{duration} min</span>
        </div>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="w-full bg-teal-700 text-white rounded-2xl justify-center cursor-pointer flex items-center gap-2 px-4 py-2">
          Tutorial
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
