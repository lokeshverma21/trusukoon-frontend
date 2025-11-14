import Link from "next/link";

export default function Footer(){
    return(
    <footer className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header section */}
        <div className="flex mb-8 flex-col gap-6 md:flex-row">
          <h2 className="text-4xl font-bold font-heading text-accent">Book & manage appointments — beautifully simple..</h2>
          <div className="font-body">
            <p className="text-lg">8821, Sector-21 Gurugram, Haryana</p>
            <p className="text-lg">support@trusukoon.com</p>
            <p className="text-lg">+91-9999999999</p>
          </div>
        </div>

        <div className="w-full h-1 bg-primary"></div>

        {/* Links and contact info */}
       <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

          <div className="flex space-x-4">
            <Link href={'/about-us'} className="text-lg hover:underline">About</Link>
            <Link href={'/contact-us'} className="text-lg hover:underline">Contact</Link>
            <Link href={'/book-appointment'} className="text-lg hover:underline">Book Appointment</Link>
          </div>
            {/* Copyright section */}
            <div className="text-center text-sm">
            <p>© Copyright {new Date().getFullYear()}, All Rights Reserved</p>
            </div>
        </div>

      </div>
    </footer>
    )
}