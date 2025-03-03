"use client";
import { useRouter } from "next/navigation";

export default function Home() {


  const router = useRouter();

  return (

    <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-20">
      <h1 className="text-3xl font-bold">
        Welcome to Nexus WWeb Bot
      </h1>
      <p className="text-xl">
        This is a Next.js app bootstrapped with <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">create-nexus-app</code>.
      </p>
      <button className="btn btn-primary" onClick={() => router.push('/auth/login')}>
        Go now!!
      </button>
    </div>

  );
}
