"use client";
import {  useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { formUrlQuery } from "@jsmastery/utils";
import { removeKeysFromUrlQuery } from "@jsmastery/utils";
import { subjects } from "@/constants";
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  // SelectScrollDownButton,
  // SelectScrollUpButton,
  // SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";
  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });

      router.push(newUrl, { scroll: false });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject, searchParams, router]);

  return (
  <div>
    
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  );
};

export default SubjectFilter;
