"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/user-current-user";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

import { Switch } from "@/components/ui/switch";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const { update } = useSession();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),

    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    });
  }, [user, form]);

  const onSubmit = (data: z.infer<typeof SettingsSchema>) => {
    setLoading(true);
    settings(data)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          toast.error("Problem occurred in updating settings.");
        }
        if (data?.success) {
          update();
          setSuccess(data.success);
        }
        setLoading(false);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setTimeout(() => {
          setError("");
        }, 5000);
      })
      .catch(() => setError("Something went wrong!"));
  };

  if (!user) {
    return (
      <div>
        <BeatLoader color="gray" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0d0c11]">
      <div className="w-3/4 h-3/4 fixed -bottom-1/4 -left-1/4 bg-gradient-to-br from-emerald-600 via-indigo-500 to-slate-700 rounded-full opacity-35 blur-[200px]" />
      <Card className="relative max-w-md p-2 min-w-[300px] md:min-w-[400px] mx-auto bg-slate-950">
        <CardHeader className="bg-slate-900 rounded-md">
          <p className="text-indigo-600 font-semibold text-3xl text-center">
            Settings
          </p>
        </CardHeader>
        <Separator className="my-3" />
        <CardContent className="mt-3 bg-slate-900 rounded-md pt-4">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-500">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          value={field.value}
                          placeholder={"John Doe"}
                          disabled={loading}
                          className="shadow-sm shadow-indigo-600"
                        />
                      </FormControl>
                      <FormMessage className="text-rose-400" />
                    </FormItem>
                  )}
                />
                {user?.isOauth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-500">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              value={field.value}
                              placeholder={"johndoe@gmail.com"}
                              disabled={loading}
                              className="shadow-sm shadow-indigo-600"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />

                    <hr />
                    <p className="text-sm text-indigo-300 tracking-wider">
                      Want to change password?
                    </p>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-500">
                            Current Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              value={field.value}
                              placeholder={"jaeur#@!"}
                              disabled={loading}
                              className="shadow-sm shadow-indigo-600"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-500">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              value={field.value}
                              placeholder={"eroihv345$^."}
                              disabled={loading}
                              className="shadow-sm shadow-indigo-600"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                    <div className="w-full h-[1px] bg-slate-700" />
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-x-4 items-center justify-between rounded-lg border p-3 shadow-sm shadow-indigo-600">
                          <div className="-space-y-0.5">
                            <FormLabel className="text-blue-500">
                              Two Factor Authentication
                            </FormLabel>
                            <FormDescription className="text-xs">
                              Enable two factor authentication for your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={loading}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              {success && <FormSuccess successMessage={success} />}
              {error && <FormError errorMessage={error} />}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white tracking-wider hover:bg-indigo-900 hover:shadow-sm hover:shadow-indigo-600"
              >
                {loading ? "SAVING" : "SAVE"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
