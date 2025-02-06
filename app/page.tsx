import Hero from "@/components/hero/hero-section";
import { currentUser } from "@/lib/auth";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="dark:bg-[#0d0c11]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="w-3/4 h-3/4 fixed -top-1/2 left-1/5 bg-gradient-to-r from-emerald-400 via-indigo-500 to-slate-600  rounded-full opacity-30 blur-[170px]" />
      <div className="w-3/4 h-3/4 fixed bottom-0 left-0 bg-gradient-to-br from-green-700 via-indigo-700 to-slate-700  rounded-full opacity-10 blur-[240px]" />
      <Hero user={user} />
    </div>
  );
}
