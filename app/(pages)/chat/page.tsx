import Header from "../../components/Header";
import Hero from "./_components/Hero";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";

const page = () => {
  const { userId } : { userId: string | null } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  return (
    <main className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Hero />
    </main>
  );
};

export default page;
