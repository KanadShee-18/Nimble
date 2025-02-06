"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
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
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";
import * as z from "zod";
import { register } from "@/actions/register";
import Spinner from "../common/spinner-loader";
import { FaArrowRightLong } from "react-icons/fa6";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    register(data).then((res) => {
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
      headerLabel="Create an account"
      title="Register Yourself"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      fgtPasswordHref="/auth/reset"
      fgtPasswordText="Forget Password"
      showSocials
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
                      placeholder="Enter email address"
                      className="shadow-sm shadow-slate-600 text-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="text"
                      placeholder="Enter your name"
                      className="shadow-sm shadow-slate-600 text-blue-400"
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
                      placeholder="Enter a strong password"
                      className="shadow-sm shadow-slate-600 text-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="password"
                      placeholder="Confirm your password"
                      className="shadow-sm shadow-slate-600 text-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
          </div>
          {success && <FormSuccess successMessage={success} />}
          {error && <FormError errorMessage={error} />}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-700 hover:bg-gradient-to-l hover:from-blue-500 hover:via-indigo-500 hover:to-slate-700 active:bg-blue-500 text-white font-medium tracking-wider hover:scale-95 duration-300 transition-all group"
            disabled={loading}
          >
            {loading ? "SUBMITTING" : "SIGN UP"}
            <span className="group-hover:translate-x-2 duration-300 transition-all">
              {loading ? <Spinner /> : <FaArrowRightLong />}
            </span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
