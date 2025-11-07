// components/CTASection.js
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const CTASection = () => {
  return (
    <div className="relative bg-accent py-16 px-6 mt-10 mb-16 mx-4 md:mx-10 rounded-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0">
        {/* Right Content (Text) */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl font-bold text-white font-heading text-center">
            Ready to simplify appointments?
          </h2>
          <p className="mt-4 text-lg text-white/80 text-center">
            Get started today — it’s free for early users.
          </p>

          <div className='flex flex-col items-center justify-center md:flex-row md:gap-6'>
            <Link href={"/book-appointment"}>
                <Button className="mt-6 px-6 py-3 cursor-pointer text-white font-semibold rounded-md shadow-md transition-all">
                    Book a Service
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
