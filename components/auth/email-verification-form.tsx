// "use client";

// import { BeatLoader } from "react-spinners";
// import BackButton from "./back-button";
// import { useSearchParams } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { verifyEmailToken } from "@/actions/email-verification";
// import FormSuccess from "./form-success";
// import FormError from "./form-error";

// const VerifyEmailForm = () => {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const onSubmit = useCallback(() => {
//     if (!token) {
//       setError("Missing token!");
//       return;
//     }
//     verifyEmailToken(token)
//       .then((res) => {
//         if (res.success) {
//           setSuccess(res?.success);
//         }
//         if (res.error) {
//           setError(res?.error);
//         }
//       })
//       .catch(() => {
//         setError("Something went wrong. Retry again.");
//       });
//   }, [token]);

//   useEffect(() => {
//     onSubmit();
//   }, [onSubmit]);

//   return (
//     <div className="h-screen w-full flex items-center justify-center">
//       <div className="fixed w-1/2 h-[400px] rounded-full bg-emerald-300 -top-10 right-0 blur-[150px] opacity-25" />
//       <div className="fixed w-1/2 h-[400px] rounded-full bg-blue-300 -bottom-10 left-0 blur-[150px] opacity-25" />
//       <div className="fixed w-1/2 h-[400px] rounded-full bg-rose-400 -bottom-10 right-0 blur-[150px] opacity-25" />
//       <div className="w-fit relative space-y-6 bg-slate-800 p-4 md:p-10 rounded-md shadow-sm shadow-blue-500">
//         <h1 className="text-3xl bg-gradient-to-r from-rose-500 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-slate-900 p-3 rounded-lg shadow-md shadow-slate-950 text-nowrap font-semibold">
//           Email Confirmation
//         </h1>
//         <div className="flex flex-col space-y-4">
//           <p className="text-indigo-500 text-center font-medium animate-pulse">
//             Confirming your email{" "}
//           </p>
//           {!success && !error && (
//             <div className="flex items-center justify-center">
//               <BeatLoader color="#aac7ff" />
//             </div>
//           )}
//           {success && <FormSuccess successMessage={success} />}
//           {error && <FormError errorMessage={error} />}
//         </div>
//         <BackButton label="Back to login" href="/auth/login" />
//       </div>
//     </div>
//   );
// };

// export default VerifyEmailForm;

"use client";

import { BeatLoader } from "react-spinners";
import BackButton from "./back-button";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, Suspense } from "react";
import { verifyEmailToken } from "@/actions/email-verification";
import FormSuccess from "./form-success";
import FormError from "./form-error";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(() => {
    setLoading(true);
    if (!token) {
      setError("Missing token!");
      return;
    }
    verifyEmailToken(token)
      .then((res) => {
        if (res.success) {
          setSuccess(res.success);
        }
        if (res.error) {
          setError(res.error);
        }
      })
      .catch(() => {
        setError("Something went wrong. Retry again.");
      });
    setLoading(false);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="fixed w-1/2 h-[400px] rounded-full bg-emerald-300 -top-10 right-0 blur-[150px] opacity-25" />
      <div className="fixed w-1/2 h-[400px] rounded-full bg-blue-300 -bottom-10 left-0 blur-[150px] opacity-25" />
      <div className="fixed w-1/2 h-[400px] rounded-full bg-rose-400 -bottom-10 right-0 blur-[150px] opacity-25" />
      <div className="w-fit relative space-y-6 bg-slate-800 p-4 md:p-10 rounded-md shadow-sm shadow-blue-500">
        <h1 className="text-3xl bg-gradient-to-r from-rose-500 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-slate-900 p-3 rounded-lg shadow-md shadow-slate-950 text-nowrap font-semibold">
          Email Confirmation
        </h1>
        <div className="flex flex-col space-y-4">
          <p
            className={`text-indigo-500 text-center font-medium ${
              loading && "animate-pulse"
            }`}
          >
            {loading ? "Confirming your email" : "Email has been confirmed!"}
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

export default function VerifyEmailFormWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
