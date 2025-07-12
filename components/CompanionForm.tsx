"use client";
import React from "react";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/action/companion.actions";


const formSchema = z.object({
  name: z.string().min(2, { message: "companion is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  topic: z.string().min(2, { message: "Topic is required" }),
  voice: z.string().min(2, { message: "Voice is required" }),
  style: z.string().min(2, { message: "Style is required" }),
  duration: z.coerce.number().min(1, { message: " Duration is required" }),
});

const CompanionForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: " ",
      subject: " ",
      topic: " ",
      voice: " ",
      style: " ",
      duration: 15,
    },
  });

  // 2. Define a submit handler.
  const onSubmit =async (values: z.infer<typeof formSchema>) => {
    const companion=  await createCompanion(values);
    if(companion)
    {
      redirect(`/companions/${companion.id}`);
    }
    else{
      console.log("message", "Failed to create companion");
      redirect("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type the companion name"
                  {...field}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition duration-200"
                />
              </FormControl>
              <FormDescription>
                This is your public display name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full sm:w-[200px] rounded-xl border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-black transition">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem value={subject} key={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>what should the companion help with?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="what is AI?"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormDescription>
                This is your public display name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select the Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Formal</SelectItem>
                    <SelectItem value="Female">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
              type="number"
              placeholder="25"
              {...field}
              className="input"

              
              />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition duration-200 shadow-md" type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
