import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import Link from "next/link";
interface CompanionsListProps {
  title: string;
  companions: {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    num: string;
  }[];
  classNames?: string;
  inputs?: string;
}
const CompanionsList = ({
  title,
  companions,
  classNames,
}: CompanionsListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h1 className="font-bold">{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">lesson</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions.map((companion) => (
            <TableRow key={companion.id}>
              <TableCell>
                <Link href={`/companions/${companion.id}`}>
                  {companion.subject}
                  <div className="flex items-center gap-2">
                    <div className="size-[70px] flex items-center justify-center rounded-lg max-md:hidden">
                      <Image
                        src={`/icons/${companion.subject}.svg`}
                        alt={companion.subject}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold">
                        {companion.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {companion.topic}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge  w-fit max-md:hidden">{companion.subject}</div>
                <div className="flex items-center justify-center rounded-lg md:hidden w-fit">
                  <Image
                    src={`/icons/${companion.subject}.svg`}
                    alt={companion.subject}
                    width={18}
                    height={18}
                  />

                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center w-full">
                  <p className="text-sm ">{companion.duration} {' '} <span className="max-md:hidden">mins</span></p>
                  <Image
                    src={`/icons/clock.svg`}
                    alt="Clock"
                    width={12}
                    height={12}
                    className="md:hidden"
                  />
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
