"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import * as z from "zod";
import { reset } from "@/actions/reset";
import Spinner from "../common/spinner-loader";
import { FaArrowRightLong } from "react-icons/fa6";

const ResetForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof ResetSchema>) => {
    setLoading(true);
    reset(data).then((res) => {
      if (res.error) {
        setLoading(false);
        setError(res.error);
        setSuccess("");
      }
      if (res.success) {
        setLoading(false);
        setError("");
        setSuccess(res.success);
      }
      setLoading(false);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      setTimeout(() => {
        setError("");
      }, 5000);
    });
  };

  return (
    <CardWrapper
      headerLabel="Forget your password"
      title="Reset Password"
      backButtonLabel="Want to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="email"
                      placeholder="Enter registered email address"
                      className="shadow-sm shadow-blue-700 text-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError errorMessage={error} />}
          {success && <FormSuccess successMessage={success} />}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-700 hover:bg-gradient-to-l hover:from-blue-500 hover:via-indigo-500 hover:to-slate-700 active:bg-blue-500 text-white font-medium tracking-wider hover:scale-95 duration-300 transition-all group"
            disabled={loading}
          >
            {loading ? "SUBMITTING" : "RESET PASSWORD LINK"}
            <span className="group-hover:translate-x-2 duration-300 transition-all">
              {loading ? <Spinner /> : <FaArrowRightLong />}
            </span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
