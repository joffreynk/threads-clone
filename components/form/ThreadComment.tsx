"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CommentValidation } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";

export default function ThreadComment({
  threadId,
  currentUserImage,
  currentUserId,
}: {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    console.log('====================================');
    console.log(values);
    console.log('====================================');
    // router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-start gap-2 md:gap-5  mt-8 md:mt-16"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 w-full">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  width={60}
                  height={60}
                  alt="User Image"
                  className="rounded-full object-contain hidden md:block"
                />
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input className="account-form_input no-focus" {...field} />
              </FormControl>
              <FormMessage className="just" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500 text-base-semibold text-light-2"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}
