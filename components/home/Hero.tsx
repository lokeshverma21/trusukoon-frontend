import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="bg-background flex flex-col items-center justify-evenly md:flex-row min-h-screen md:min-h-[88vh] px-6 gap-6">
        <div className="flex flex-wrap flex-col w-fit gap-4 py-6">
          <h3 className="uppercase font-heading text-headings">Welcome to TouLang</h3>
          <div className="flex items-center justify-center">
            <h3 className="uppercase text-headings font-heading text-3xl sm:text-4xl md:text-6xl">
              Book & manage appointments — beautifully simple.
            </h3>
            <Image
              width={100}
              height={100}
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbG9ufGVufDB8fDB8fHww"
              alt="Wellness image"
              className="rounded-full shadow-lg md:hidden" // Optional styling for image
            />
          </div>
          <p className="text-headings text-wrap">
            Whether you’re booking your next haircut or managing your growing salon, our all-in-one scheduling platform keeps everything seamless.
          </p>
          
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
              height={100}
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbG9ufGVufDB8fDB8fHww"
              alt="Wellness image"
              className="rounded-full shadow-lg hidden md:block" // Optional styling for image
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
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
        </div>
      </div>

    </>
  );
}
