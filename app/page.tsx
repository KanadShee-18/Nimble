import NavBar from "@/components/common/navbar-section";
import ThemeToggler from "@/components/common/theme-toggler";
import Hero from "@/components/hero/hero-section";
import { currentUser } from "@/lib/auth";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="dark:bg-black">
      <Hero user={user} />
    </div>
  );
}
