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
} from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { addCommentThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";

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
   const {organization} = useOrganization()

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    await addCommentThread({
      path: pathname,
      text: values.thread,
      threadId: threadId,
      communityId: organization? organization.id : null,
      currentUserId,
    });
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
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
                <Textarea
                  rows={3}
                  className="account-form_input no-focus"
                  placeholder="Comment........ "
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500 text-base-semibold self-end text-light-2"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}
