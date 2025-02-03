# Next-auth v5:

---

## Table Of Contents:

- [Prisma Setup](#set-up-prisma-with-db)
- [Auth.Js Configuration](#authjs-configuration)

---

- [OAuth Providers](#oauth-providers)
  1. [Google Provider](#google-provider)
  2. [Github Provider](#github-provider)

---

- [ShadCn Initialization](#shadcn-initialization)
- [Custom Register Page](#custom-register-page)
- [Custom Login Page](#custom-login-page)
  1. [Credentials function in auth.ts](#credentials-function-for-signin)
  2. [Custom Google Login Button](#google-login-action)
  3. [Custom Github Login Button](#github-login-action)

---

- [Callbacks](#callbacks)
  1. [jwt and session callback](#jwt-and-session-callback)
  2. [signIn callback](#signin-callback)

---

- [Middleware](#middlewares)

---

- [Email Verification](#email-verification)
  1. [MailSender-Nodemailer](#mailsender-nodemailer)

---

- [Reset Password](#reset-password)

---

- [Two Factor Authentication(2FA)](#two-factor-authentication)

---

- [Point to be Noted](#things-to-remember)
  1. [next-auth.d.ts file configuration](#next-authdts)

---

## Initialize an empty next-js project

```
npx create-next-app@latest
```

---

## Set-up Prisma with DB

- First install **prisma** by running

```
npm install prisma --save-dev
```

- Then initialize prisma in project:

```
npx prisma init
```

- Now it will create a prisma folder and will add an .env file in our project directory.

- Add DB url in .env

```
DATABASE_URL="postgresql://..........................."
```

- Add two models User and Account in **schema.prisma** file.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  accounts      Account[]
  password      String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([provider, providerAccountId])
}

```

- > Note: Here make sure to make the password optional as for Google or Github there will be no password.

- Now, run the command to push schemas to db:

```
npx prisma db push
```

- After succesfully doing all the steps, run

```
npx prisma studio
```

- We can see out created models in our localhost:5555

- Now, install prisma client so that we can access all models throughout our project

```
npm install @prisma/client
```

- Now, we can use PrismaClient in our project like

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

- > Note: This is not the right way to do this as it will create a bunch of connection or a connection pool for each time request. So, rather than doing this, we'll do something else.

- Create a new file named **prisma.ts** inside the prisma folder and add the following code.

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- So, now this will allow us to use the prisma variable throughout our application with one pool connection automatically.

### So, the ORM setup is done successfully.

---

## Auth.Js Configuration:

- First we have to install the latest version of next-auth

```
npm install next-auth@beta
```

- Now, we have to install one more additional thing **Prisma Adaptor** from Auth.Js so that it can work with prisma.

```
npm install @auth/prisma-adapter
```

- Next, we have to make two files:

  1. auth.ts
  2. auth.config.ts

- The auth.config.ts is created as in auth we can't use prisma as it it is not edge compatible.

```typescript
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google({}), Credentials({})],
} satisfies NextAuthConfig;
```

and we will accquire this to **auth.ts** file

```typescript
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "@/auth.config";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
```

- Now, we have to make a route which will handle all requests inside app > api > auth > [...nextauth] > route.ts and add a simple line of code here.

```typescript
export { GET, POST } from "@/auth";
```

- And also add one more secret in **.env** as AUTH_SECRET:

```
AUTH_SECRET=asyourwishvalue
```

---

## OAuth Providers:

## Google Provider:

### Lets complete the Google Provider

- > Go to console.cloud.google.com and get the OAuth client id and client secret and add them in **.env** file

```ts
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({}),
    Credentials({}),
  ],
} satisfies NextAuthConfig;
```

- In similar way we can add GitHub also:

## GitHub Provider:

```ts
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({}),
  ],
} satisfies NextAuthConfig;
```

- > NOTE: Make sure to add **Homepage URL** and **Callback URL** in getting the secrets for both the providers.

```
Homepage URL: http://localhost:3000
Callback URL: http://localhost:3000/api/auth/callback/<provider-name>
```

- > NOTE: Make sure to change the domain name after deployment

---

## Shadcn initialization:

- First we will create a custom sign up page.

- Let's initialize shadcn for our project.

```
npx shadcn@latest init
```

- Now, we will add some components from shadcn: button, form, card, label etc.

---

## Custom Register Page:

- First, in the app folder create a route for register: app > auth > register > page.tsx

```ts
import RegisterForm from "@/components/auth/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
```

- We'll make a client component RegisterForm as we're going to use hooks states etc.

- Inside components dir, create another folder **auth** and make a component called register-form.tsx

```ts
"use client";

import React from "react";

const RegisterForm = () => {
  return <div>register-form</div>;
};

export default RegisterForm;
```

- Now, make a schemas folders where we'll write zod validation and make a file named index.ts where we'll add our register schema.

```ts
import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  password: z.string().min(6, {
    message: "Passwords must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Passwords must be at least 6 characters long.",
  }),
});
```

- Now, we will create some reusable components which we can use in both signin and register form.
  For ex:
  Inside @/components/auth,

  1. auth-header.tsx
  2. back-button.tsx
  3. form-error.tsx
  4. form-success.tsx
  5. card-wrapper.tsx
  6. forget-password.tsx

- These custom compoenent now will be used in register-form or any other component as it needed.

- Create a server action.
- For that create a new dir as actions in root dir and create a file named register.ts

```ts
"use server";

import * as z from "zod";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        error: "Invalid input data.",
      };
    }
    const { email, name, password, confirmPassword } = validatedData.data;

    if (password !== confirmPassword) {
      return {
        error: "Both of the passwords have to be matched.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExistance = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExistance) {
      return {
        error: "User already exists or user email currently in use!",
      };
    }

    const lowercaseEmail = email.toLowerCase();

    await prisma.user.create({
      data: {
        email: lowercaseEmail,
        name,
        password: hashedPassword,
      },
    });

    return {
      success: "User registration successfull.",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Some error occurred while registering!",
    };
  }
};
```

- Now, we can use this server action in our register component.

- Our final register component will be:

```ts
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      title="Register Yourself"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      fgtPasswordHref="/"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="password"
                      placeholder="Enter a strong password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="password"
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {success && <FormSuccess successMessage={success} />}
          {error && <FormError errorMessage={error} />}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting" : "SIGN UP"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
```

- > Here in place of loading we also can use useTransition hook of react also.

---

## Custom Login Page:

- First, we've to make login schema.

```ts
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid password.",
  }),
});
```

- Now we have to make server action called login.ts

```ts
"use server";

import * as z from "zod";
import { prisma } from "@/prisma/prisma";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  data: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedData = LoginSchema.parse(data);
  if (!validatedData) {
    return {
      error: "Invalid input data.",
    };
  }
  const { email, password } = validatedData;

  const userExistance = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!userExistance || !userExistance.password || !userExistance.email) {
    return {
      error: "User not found. Register yourself first!",
    };
  }

  console.log("After user check ......");

  try {
    await signIn("credentials", {
      email: userExistance.email,
      password: password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Please confirm your email address and password" };
      }
    }
    throw error;
  }

  return {
    success: "User logged in successfully",
  };
};
```

- Now, we have to complete the credentials login functionality in **auth.ts** file.

## Credentials function for signIn:

```ts
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { prisma } from "./prisma/prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedData = LoginSchema.safeParse(credentials);
        if (!validatedData.success) return null;
        const { email, password } = validatedData.data;
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        if (!user || !user.password || !user.email) {
          return null;
        }
        const passwordMached = await bcrypt.compare(password, user.password);
        if (passwordMached) {
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
```

- This way with google and github we have added credentials configuration also.

- Lets build custom buttons for Google and Github login.

- For that first make the actions for those buttons

- ### Google Login Action:

```ts
// actions > google-login.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function GoogleAuthentication() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Google Login Failed!" };
    }
    throw error;
  }
}
```

- ### Github Login Action:

```ts
// actions > github-login.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function GithubAuthentication() {
  try {
    await signIn("github");
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Github Authentication failed!",
      };
    }
    throw error;
  }
}
```

- Lets create a component with two buttons Google and Github.

- First we have made a custom Goggle-login button.

```ts
"use client";

import React from "react";
import { GoogleAuthentication } from "@/actions/google-login";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const [errorMessageGoogle, dispatchGoogleAction] = useActionState(
    GoogleAuthentication,
    undefined
  );
  return (
    <form action={dispatchGoogleAction} className="w-full">
      <Button className="w-full" variant={"outline"}>
        <FcGoogle />
      </Button>
      <p className="text-rose-400 text-sm mt-5">{errorMessageGoogle}</p>
    </form>
  );
};

export default GoogleLogin;
```

- and similar way Github-login compoent:

```ts
"use client";

import React from "react";
import { GithubAuthentication } from "@/actions/github-login";
import { useActionState } from "react";
import { BsGithub } from "react-icons/bs";

import { Button } from "@/components/ui/button";

const GithubLogin = () => {
  const [errorMessageGithub, dispatchGithubAction] = useActionState(
    GithubAuthentication,
    undefined
  );
  return (
    <form action={dispatchGithubAction} className="w-full">
      <Button className="w-full" variant={"outline"}>
        <BsGithub />
      </Button>
      <p>{errorMessageGithub}</p>
    </form>
  );
};

export default GithubLogin;
```

- Now, a component named Socials has been made:

```ts
"use client";

import React from "react";
import GoogleLogin from "@/components/auth/google-login";
import GithubLogin from "@/components/auth/github-login";

const Socials = () => {
  return (
    <div className="w-full">
      <hr />
      <p className="w-full my-6 text-center text-sm text-slate-300">
        Or, Sign in with
      </p>

      <div className="w-full flex gap-x-2">
        <div className="w-1/2">
          <GoogleLogin />
        </div>
        <div className="w-1/2">
          <GithubLogin />
        </div>
      </div>
    </div>
  );
};

export default Socials;
```

### So, we have to done with the credentials and providers authentication.

---

## Callbacks:

### Callbacks are asynchronous function which help us control what happens when any action is performed.

- First of all, as we are using strategy as "jwt", so we are going to use jwt callback

- So, now we'll make two utility function which will be called inside this jwt callback

```ts
// data/account.ts
import { prisma } from "@/prisma/prisma";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
      },
    });
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

and

```ts
// data/user.ts
import { prisma } from "@/prisma/prisma";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

- Now, we have to configure our callback and session in **auth.ts** file:

### **"jwt"** and **"session"** callback:

```ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "./data/account";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
        },
      };
    },
  },
});
```

- > NOTE: We do this stuff, as session is accessible in client side but jwt not so we can use user id or image to show their dp or any other stuffs as session is accessible to the client side.

- Now, one more callback is there called **signIn** callback.

  > Use this signIn() callback to control if a user is allowed to sign in.

- So, after adding **signIn** callback our auth.ts file will be:

### **SignIn** callback:

```ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "./data/account";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id ?? "");
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
        },
      };
    },
  },
});
```

---

## Middlewares:

- For setting up middleware, first we have to make a file named as **middleware.ts** file.

- Now, we will make another file named **routes.ts** where we can specify our all private, public and auth routes like this:

```ts
export const DEFAULT_LOGIN_REDIRECT = "/settings";

export const publicRoutes = ["/", "/auth/email-confirmation"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";
```

- Now, in our **middleware.ts** file we can use these routes.

```ts
import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  //   console.log("Middleware called", req.nextUrl.pathname);
  //   console.log("Logged in or not: ", req.auth);
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

- Here the middleware run in all routes matching with the matcher config.

### This way we can setup middleware for our nextauth project.

---

## Email Verification:

### Now we have to verify the email for the user. Otherwise the user will register with any invalid email address.

- First we have to add a new model as VerificationToken

```prisma
model VerificationToken {
  id String @id @default(cuid())
  email String
  token String @unique
  expires DateTime

  @@unique([email, token])
}
```

- Now, run two prisma command for this model

```
npx prisma generate
```

```
npx prisma db push
```

- First, we have to search that is there any token present, if present check if not create one. So first make this function

```ts
// data/verification-tokens.ts
import { prisma } from "@/prisma/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
```

- These two function is going to use in the upcoming sections.

- Now, we have to make a function to generate verification token for us.

```ts
// lib/token.ts
import { v4 as uuidv4 } from "uuid";
// import crypto from "crypto";

import { prisma } from "@/prisma/prisma";
import { getVerificationTokenByEmail } from "@/data/verification-tokens";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
```

- Now, we can use this function in our register and login server action.

```ts
//actions/register.ts
await prisma.user.create({
  data: {
    email: lowercaseEmail,
    name,
    password: hashedPassword,
  },
});

const verificationToken = await generateVerificationToken(email);
// this way after creating the user we can generate the token.

return {
  success: "Confirmation email has been sent to your email.",
};
```

- Similarly, we can do this for login server action also.

### Mailsender (Nodemailer):

> We have to make a function to send email using Nodemailer package.

```ts
// lib/mailSender.ts
import nodemailer from "nodemailer";
import { baseUrl } from "@/lib/url";
import { emailTemplates } from "@/lib/emailTemplates";

interface EmailSendingProps {
  email: string;
  token: string;
  title: string;
  body: string;
  type: "VERIFY" | "RESET" | "TWO_FA";
}

export const sendVerificationEmail = async ({
  email,
  token,
  title,
  body,
  type,
}: EmailSendingProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Create appropriate link based on the type
    const confirmLink =
      type === "VERIFY"
        ? `${baseUrl}/auth/confirm-email?token=${token}`
        : type === "RESET"
        ? `${baseUrl}/auth/reset-password?token=${token}`
        : "";

    // Get the HTML template based on the type
    const html =
      type === "TWO_FA"
        ? emailTemplates.TWO_FA(token)
        : type === "VERIFY"
        ? emailTemplates.VERIFY(confirmLink, body)
        : emailTemplates.RESET(confirmLink, body);

    // Send the email
    await transporter.sendMail({
      from: `"Next-Auth - by Kanad" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html,
    });

    return {
      success:
        type === "VERIFY"
          ? "Confirmation mail has been sent!"
          : "Reset password mail has been sent!",
    };
  } catch (error) {
    console.log("Nodemailer error: ", error);

    return {
      error: "Some error occurred while sending mail",
    };
  }
};
```

- We have made this function dynamic for all our upcoming process for verifying email, resetting password and Two factor authentication.

- Now before signIn callback run we have to check if the user email is verified or not. If yes then proceed else let the user to verify their email first.

```ts
// actions/login.ts
// ..............
if (!userExistance.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    const mailResponse = await sendVerificationEmail({
      email: userExistance.email,
      token: verificationToken.token,
      title: "Email Confirmation - NextAuth",
      body: "Confirm your email by clicking the link below",
      type: "VERIFY",
    });

    console.log("Nodemailer response: ", mailResponse);

    return {
      success: "Confirmation email sent successfully!",
    };
  }

  try {
    await signIn("credentials", {
      email: userExistance.email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
// .....................
```

- This way we will restrict the user to verify his email before signin.

- In same way we can send this email after any user register

```ts
await prisma.user.create({
  data: {
    email: lowercaseEmail,
    name,
    password: hashedPassword,
  },
});

const verificationToken = await generateVerificationToken(email);

// Send the verification email:
const mailResponse = await sendVerificationEmail({
  email: verificationToken.email,
  token: verificationToken.token,
  title: "Email Confirmation - NextAuth",
  body: "Confirm your email by clicking this button below!",
  type: "VERIFY",
});

console.log("Mailresponse in register: ", mailResponse);

return {
  success: "Confirmation email has been sent to your email.",
};
```

- Now, we have to make a server action to verify our email.

- First lets make two utility function that needed for this.
  1. getVerificationTokenByToken and
  2. getUserByEmail

```ts
//data/verification-tokens.ts
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
```

and

```ts
// data/user.ts
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

- Now, we can use these two utulity in our email-verification server action.

```ts
// action/email-verification.ts
"use server";

import { prisma } from "@/prisma/prisma";
import { getVerificationTokenByToken } from "@/data/verification-tokens";
import { getUserByEmail } from "@/data/user";

export const verifyEmailToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has been expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email has been verified!",
  };
};
```

- Now we've to make a custom email-verification form page

```tsx
"use client";

import { BeatLoader } from "react-spinners";
import BackButton from "./back-button";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { verifyEmailToken } from "@/actions/email-verification";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    verifyEmailToken(token)
      .then((res) => {
        if (res.success) {
          setSuccess(res?.success);
        }
        if (res.error) {
          setError(res?.error);
        }
      })
      .catch(() => {
        setError("Something went wrong. Retry again.");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-3xl bg-gradient-to-r from-rose-500 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-slate-900 p-3 rounded-lg shadow-md shadow-slate-950 text-nowrap font-semibold">
          Email Confirmation
        </h1>
        <div className="flex flex-col space-y-4">
          <p className="text-indigo-500 text-center font-medium animate-pulse">
            Confirming your email{" "}
          </p>
          {!success && !error && (
            <div className="flex items-center justify-center">
              <BeatLoader color="#aac7ff" />
            </div>
          )}
          {success && <FormSuccess successMessage={success} />}
          {error && <FormError errorMessage={error} />}
        </div>
        <BackButton label="Back to login" href="/auth/login" />
      </div>
    </div>
  );
};

export default VerifyEmailForm;
```

- > We've use this form inside app > auth > email-confirmation > page.tsx

### So, this way we can verify our email.

---

## Reset Password:

- For this functionality, we can build a new schema

```prisma
model PasswordResetToken {
  id      String   @id @default(cuid())
  email   String
  token   String   @unique
  expires DateTime

  @@unique([email, token])
}
```

- Now we have to make some utility function.

```ts
// data/password-reset-token.ts
import { prisma } from "@/prisma/prisma";

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordRessetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordRessetToken;
  } catch (error) {
    return null;
  }
};

export const getPassworResetTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};
```

- Now, we can use these function inside the token.ts file inside lib

```ts
// lib/tokens.ts
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};
```

- Now, we can use this password generating token function in reset-password server action

```ts
"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/prisma";
import { getPassworResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => {
  try {
    const validatedFields = ResetPasswordSchema.parse(data);
    if (!validatedFields) {
      return {
        error: "Inputs are not valid.",
      };
    }
    const { token, password, confirmNewPassword } = validatedFields;
    if (password !== confirmNewPassword) {
      return {
        error: "Both passwords should be matched!",
      };
    }
    if (!token) {
      return {
        error: "Token is required!",
      };
    }

    const existingPasswordToken = await getPassworResetTokenByToken(token);
    if (!existingPasswordToken) {
      return {
        error: "Token is not exist!",
      };
    }
    const hasExpired = new Date(existingPasswordToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: "Token has been expired!",
      };
    }
    const existingUser = await getUserByEmail(existingPasswordToken.email);
    if (!existingUser) {
      return {
        error: "User not exists.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: existingPasswordToken.id,
      },
    });
    return {
      success: "Password has been reset successfully!",
    };
  } catch (error) {
    return {
      error: "Something went wrong while resetting password.",
    };
  }
};
```

- Now, we can use this server action inside the reset-password-form.tsx.

### This way we can reset our password successfully.

---

## TWO Factor Authentication:

- First we have to add and do some changes in our **schema.prisma** file

```prisma
model User {
  id                    String                 @id @default(cuid())
  name                  String?
  email                 String                 @unique
  emailVerified         DateTime?
  accounts              Account[]
  password              String?
  image                 String?
  createdAt             DateTime               @default(now())
  updatedAt             DateTime               @updatedAt
  isTwoFactorEnabled    Boolean                @default(false)
  twoFactorConfirmation TwoFactorConfirmation?
}

model TwoFactorToken {
  id      String   @id @default(cuid())
  email   String
  token   String   @unique
  expires DateTime
}

model TwoFactorConfirmation {
  id     String @id @default(cuid())
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId])
}

```

- These changes has been done in schema.

- > Note: Now after changing schemas don't forget to run:

```
npx prisma generate
```

```
npx prisma db push
```

- Now, lets create a utility file for two factor token:

```tsx
// @/data/two-factor-token.ts
import { prisma } from "@/prisma/prisma";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};
```

- Now, one more utility function is needed to know about two factor confirmation for an user.

```ts
import { prisma } from "@/prisma/prisma";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      }
    );
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
```

- Now, we have to make a function in tokens.ts in lib which will be used in server action.

```ts
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};
```

- In **mailSender.ts** we have configured email template for 2FA.

- Now, we'll modify our **login.ts** server action and **auth.ts** file.

```ts
// @/actions/login.ts
    return {
      success: "Confirmation email sent successfully!",
    };
  }

  if (userExistance.isTwoFactorEnabled && userExistance.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        userExistance.email
      );
      if (!twoFactorToken) {
        return {
          error: "Invalid Code!",
        };
      }
      if (twoFactorToken.token !== code) {
        return {
          error: "Invalid Code!",
        };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return {
          error: "Two factor code has been expired!",
        };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        userExistance.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: userExistance.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      await sendVerificationEmail({
        email: twoFactorToken.email,
        token: twoFactorToken.token,
        title: "Two Factor Authentication - NextAuth",
        body: "Copy the 6-digit code below and paste it",
        type: "TWO_FA",
      });
      return {
        twoFactor: true,
      };
    }
  }
```

- Here, we're returning **twoFactor: true** to the frontEnd so that we can render a form to enter two factor code.

- These porition of code is modified in login.ts file and in signIn callback:

```ts
async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id ?? "");
      if (!existingUser?.emailVerified) {
        return false;
      }
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }
      return true;
},
```

- Here is a diragram how its working

```
User logs in
   |
   v
Check if Two-Factor Authentication (2FA) is enabled
   |
   +---- YES -----> Generate 2FA token and send email with the 6-digit code
   |                   |
   |                   v
   |         Return: { twoFactor: true }
   |
   +---- NO -------> Validate credentials
                        |
                        v
           Login success if credentials are valid
                        |
                        v
             Trigger `signIn` callback
                        |
                        v
        Check if `emailVerified` in `signIn` callback
                        |
                        +---- NO -------> Deny login
                        |
                        +---- YES ------> Continue to 2FA check
                                              |
                                              v
        Check if 2FA confirmation exists in `signIn` callback
                        |
                        +---- NO -------> Deny login
                        |
                        +---- YES ------> Delete 2FA confirmation
                                              |
                                              v
                                        Login success

If 2FA is enabled and user submits code:
   |
   v
Validate 2FA code
   |
   +---- Code invalid -> Return: { error: "Invalid Code!" }
   |
   +---- Code expired -> Return: { error: "Two-factor code has expired!" }
   |
   +---- Code valid -----> Check for existing 2FA confirmation
                               |
                               v
         Delete existing 2FA confirmation (if any)
                               |
                               v
         Create a new 2FA confirmation for the user
                               |
                               v
                         Login success

```

### So, here the 2FA authentication has been done successfully.

---

### Now, here the full Next-Auth is done properly and now some extra frontend staffs are done

---

## Things to remember:

- ### next-auth.d.ts:

```ts
 async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
          email: token.email,
          isOauth: token.isOauth,
          isTwoFactorEnabled: token.isTwoFactorEnabled,
        },
      };
```

- Here, we have added some more user details in session in **auth.ts** file.
- So, according to the documentation of Auth.js, we can add one more file **next-auth.d.ts** file and there we can add those fields types in the user and can export that and can be used throughout the application.

- For ex:

```ts
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isOauth: boolean;
  isTwoFactorEnabled: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
```

- And now, we can use this file in our components

```tsx
import { ExtendedUser } from "@/next-auth";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}
```

- Here just how we have used it in user-info.tsx file in **uils/user-info.tsx** file.

---

### So, this way we can use next-auth in our project and after deployment don't forget to change the callback url and homepage url in GitHub and Google Console OAuth configuration.

- ### If you guys like this, star this repo and make use of it. I'll update this repo as well if any changes occur in next-auth in future.

- ### Please Follow me! Check out my projects.
- ### Thank You!!!
