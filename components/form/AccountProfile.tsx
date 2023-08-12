'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";


import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
type AccountProfileProps = {
  user: {
    id: string;
    name: string;
    objectId: string;
    image:string;
    bio:string;
    username:string
  },
  btnTitle: string;
}

const AccountProfile = ({user, btnTitle}: AccountProfileProps) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: '',
      name:'',
      username: '',
      bio: '',
    },
  });

    function onSubmit(values: z.infer<typeof UserValidation>) {
      console.log('SUBMITTING');
      
      console.log(values);
    }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        {" "}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    className="account-form_image"
                    width={90}
                    height={90}
                    alt="profile picture"
                    priority
                  />
                ) : (
                  <Image
                    src='./assets/profile.svg'
                    className="account-form_image"
                    width={90}
                    height={90}
                    alt="profile picture"
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
