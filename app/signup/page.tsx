import { SignupForm } from "@/components/signup-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-5xl flex bg-white overflow-hidden rounded-xl shadow-lg">
        {/* Left: Form */}
        <div className="w-full md:w-1/2">
          <SignupForm className="rounded"/>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1592947945242-69312358628b?w=600&auto=format&fit=crop&q=60"
            alt="Therapy"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
