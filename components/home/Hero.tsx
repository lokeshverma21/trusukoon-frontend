import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="max-w-5xl mx-auto bg-background flex flex-col items-center justify-evenly md:flex-row px-0 gap-6">
        <div className="flex flex-wrap flex-col w-fit gap-4 py-6">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
                  A gentle step towards healing
            </p>
          <div className="flex items-center justify-start">
              <div
                className="absolute rounded-full bg-primary opacity-8"
                style={{ width: "12rem", height: "12rem", top: "6rem", right: "26rem" }}
              />
              <div
                className="absolute rounded-full bg-sky-100 opacity-20 "
                style={{ width: "10rem", height: "10rem", bottom: "1rem", right: "4rem" }}
              />

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
                Welcome to <span className="text-accent">TruSukoon</span>
              </h1>
            <Image
              width={100}
              height={200}
              src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291bnNlbGxpbmd8ZW58MHwxfDB8fHwy&auto=format&fit=crop&q=60&w=600"
              alt="Wellness image"
              className="rounded-full shadow-lg md:hidden" // Optional styling for image
            />
          </div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-6">
                Your trusted space for peace and healing, where your voice is heard
                with warmth, respect, and complete confidentiality.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Verified, licensed therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
                  <span>Private & secure sessions</span>
                </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-start gap-6">
            <Link href={"/book-appointment"}>
              <Button className="bg-primary shadow-2xl font-heading w-fit py-4 px-6 text-white rounded-full cursor-pointer">
                Book An Appointment
              </Button>
            </Link>

            <Link href={'/login'}>
              <Button className="bg-transparent border border-primary shadow-2xl font-heading w-fit py-4 px-6 text-primary rounded-full cursor-pointer hover:text-white                ">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="">
            <Image
              width={300}
              height={600}
              src="https://images.unsplash.com/photo-1518708909080-704599b19972?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fG1lbnRhbCUyMGhlYWx0aHxlbnwwfDF8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
              alt="Wellness image"
              className="rounded-full shadow-lg hidden md:block" // Optional styling for image
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-4">
          <div className="rounded-full border border-secondary min-w-60 min-h-28 flex items-center justify-center flex-col">
            <p className="text-primary font-heading text-3xl">48+</p>
            <p className="font-body">Professional Staff</p>
          </div>
          <div className="rounded-full border border-secondary min-w-60 min-h-28 flex items-center justify-center flex-col">
            <p className="text-primary font-heading text-3xl">38+</p>
            <p className="font-body">Professional Staff</p>
          </div>
          <div className="rounded-full border border-secondary min-w-60 min-h-28 flex items-center justify-center flex-col">
            <p className="text-primary font-heading text-3xl">48+</p>
            <p className="font-body">Professional Staff</p>
          </div>
        </div> */}
      </div>

    </>
  );
}
