'use client'
import "@uploadthing/react/styles.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { UploadButton } from "@/lib/uploadthing";
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
  const [files, setFiles] = useState<File[]>([])
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  // const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) =>void)=>{
  //   e.preventDefault();
  //   const fileReader = new FileReader();
  //   if(e.target.files && e.target.files.length>0){
  //     const file = e.target.files[0];
  //     setFiles(Array.from(e.target.files));
  //     if(!file.type.includes("image")) return;
  //     fileReader.onload = async (event) => {
  //       const imageDataUrl = event.target?.result?.toString() || '';
  //       fieldChange(imageDataUrl);
  //     }
  //     fileReader.readAsDataURL(file);
  //   }
  // }

  async function onSubmit(values: z.infer<typeof UserValidation>) {
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
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    className="rounded-full object-contain"
                    width={96}
                    height={96}
                    alt="profile picture"
                    priority
                  />
                ) : (
                  <Image
                    src="./assets/profile.svg"
                    className="rounded-full object-contain"
                    width={96}
                    height={96}
                    alt="profile picture"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    //   alert("Upload Completed");
                    res?.length && field.onChange(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />

                {/* <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload Photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                /> */}
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Full Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  rows={6}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 text-base-semibold">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
