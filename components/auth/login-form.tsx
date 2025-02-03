"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      code: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res) => {
      if (res?.error) {
        setLoading(false);
        form.reset();
        setError(res.error);
        setSuccess("");
      }
      if (res.success) {
        setLoading(false);
        form.reset();
        setError("");
        setSuccess(res.success);
      }
      if (res.twoFactor) {
        setShowTwoFactor(true);
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
      headerLabel={
        showTwoFactor ? "Enter your 2FA code below" : "Log In to your account"
      }
      title={showTwoFactor ? "Two-Factor Authentication" : "Sign In"}
      backButtonLabel={
        showTwoFactor ? "Back to Login" : "Don't have an account"
      }
      backButtonHref={showTwoFactor ? "/auth/login" : "/auth/register"}
      fgtPasswordHref="/auth/reset"
      fgtPasswordText={showTwoFactor ? "" : "Forget Password"}
      showSocials={showTwoFactor ? false : true}
    >
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-500 text-start">
                        Two Factor Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loading}
                          type="text"
                          placeholder="Enter your code here"
                          className="shadow-sm text-center shadow-blue-700 text-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-rose-400" />
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-500 text-start">
                        Email
                      </FormLabel>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-500">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loading}
                          type="password"
                          placeholder="Enter your password"
                          className="shadow-sm shadow-blue-700 text-blue-400"
                        />
                      </FormControl>
                      <FormMessage className="text-rose-400" />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          {error && <FormError errorMessage={error} />}
          {success && <FormSuccess successMessage={success} />}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-slate-700 active:bg-blue-500"
            disabled={loading}
            variant={"secondary"}
          >
            {loading ? "SUBMITTING" : showTwoFactor ? "CONFIRM" : "SIGN IN"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
