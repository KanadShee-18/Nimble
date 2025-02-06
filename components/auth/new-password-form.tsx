"use client";

import React, { useState, Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas";
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
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/resetPassword";
import { BeatLoader } from "react-spinners";
import { FaArrowRightLong } from "react-icons/fa6";
import Spinner from "../common/spinner-loader";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token || "",
      password: "",
      confirmNewPassword: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setLoading(true);
    resetPassword(data).then((res) => {
      if (res.error) {
        setError(res.error);
        setSuccess("");
      }
      if (res.success) {
        setError("");
        setSuccess(res.success);
        setTimeout(() => {
          setSuccess("Login with your new password!");
        }, 5000);
      }
      setLoading(false);
    });
  };

  return (
    <CardWrapper
      headerLabel="Change your password"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="password"
                      placeholder="Enter new password"
                      className="shadow-sm shadow-blue-700 text-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="password"
                      placeholder="Confirm new password"
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
            {loading ? "SUBMITTING" : "RESET PASSWORD"}
            <span className="group-hover:translate-x-2 duration-300 transition-all">
              {loading ? <Spinner /> : <FaArrowRightLong />}
            </span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default function NewPasswordFormWithSuspense() {
  return (
    <Suspense
      fallback={
        <div>
          <BeatLoader color="pink" />
        </div>
      }
    >
      <NewPasswordForm />
    </Suspense>
  );
}
