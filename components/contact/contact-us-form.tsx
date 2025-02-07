"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactSchema } from "@/schemas";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../common/spinner-loader";
import { FaArrowRightLong } from "react-icons/fa6";
import { ContactUs } from "@/actions/contact";
import { toast } from "sonner";
import { MessagesSquare } from "lucide-react";

const ContactUsForm = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof ContactSchema>) => {
    setLoading(true);
    ContactUs(values)
      .then((res) => {
        if (res?.error) {
          setError(res.error);
          toast.message(res?.error);
        }
        if (res?.success) {
          setSuccess(res?.success);
          toast.message(res?.success);
        }
        setLoading(false);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setTimeout(() => {
          setError("");
        }, 5000);
      })
      .catch(() => {
        toast.error(
          "Some error occurred while getting your message. Try again."
        );
      });
    setLoading(false);
  };

  return (
    <div>
      <Card className="relative max-w-md p-4 pb-16 min-w-[300px] md:min-w-[400px] mx-auto bg-slate-950">
        <CardHeader className="bg-slate-900 bg-opacity-30 rounded-md">
          <p className="text-indigo-500 flex gap-4 items-center justify-center font-semibold text-3xl text-center">
            <MessagesSquare />
            Contact Us
          </p>
        </CardHeader>
        <Separator className="my-3" />
        <CardContent className="p-0">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onFormSubmit)}
            >
              <div className="space-y-4 bg-slate-900 bg-opacity-30 w-full p-4 rounded-md">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-400 font-semibold tracking-wide">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="name"
                            placeholder="Enter your name "
                            className="shadow-sm shadow-indigo-600 text-indigo-400 tracking-wide"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-400 font-semibold tracking-wide">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            name="email"
                            placeholder="Enter your email "
                            className="shadow-sm shadow-indigo-600 text-indigo-400 tracking-wide"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-400 font-semibold tracking-wide">
                          Message
                        </FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            name="email"
                            placeholder="Enter your email "
                            className="w-full rounded-md bg-transparent border max-h-[100px] min-h-[100px] text-sm p-2 shadow-sm shadow-indigo-600 outline-none scrollbar-hide text-indigo-400 tracking-wide"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {success && <FormSuccess successMessage={success} />}
              {error && <FormError errorMessage={error} />}

              <div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-700 hover:bg-gradient-to-l hover:from-blue-500 hover:via-indigo-500 hover:to-slate-700 active:bg-blue-500 text-white font-medium tracking-wider hover:scale-95 duration-300 transition-all group"
                  disabled={loading}
                >
                  {loading ? "SUBMITTING" : "SUBMIT MESSAGE"}
                  <span className="group-hover:translate-x-2 duration-300 transition-all">
                    {loading ? <Spinner /> : <FaArrowRightLong />}
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsForm;
