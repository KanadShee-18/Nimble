import ContactUsForm from "@/components/contact/contact-us-form";
import React from "react";

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen overflow-auto flex items-center justify-center pt-32">
      <div className="absolute top-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#0e0e17_1px)] bg-[size:25px_25px]"></div>
      <div className="w-3/4 h-3/4 fixed top-0 right-0 bg-gradient-to-br from-green-700 via-indigo-700 to-slate-700  rounded-full opacity-30 blur-[240px]" />
      <ContactUsForm />
    </div>
  );
};

export default ContactPage;
