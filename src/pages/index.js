"use client";
import SignInButton from "@/components/SignInButton";

export default function Home() {
  return (
    <div className="flex justify-between h-screen bg-gray-800 text-white text-xl">
      <div>
        <SignInButton />
      </div>
    </div>
  );
}
