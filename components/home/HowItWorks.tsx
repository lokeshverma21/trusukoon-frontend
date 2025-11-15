// import {
//   Calendar1,
//   Compass,
//   Wallet,
// } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import Link from "next/link";

// export default function HowItWorks() {
//   return (
//     <div className="mt-14 md:mt-6 min-h-full px-0">
//       <h3 className="text-center text-5xl">
//         How it works
//       </h3>

//       <div className="flex flex-col md:flex-row items-center justify-evenly mt-10 gap-12">
//         {/* Clients Section */}
//         <div className="w-full">
//           <div className="flex flex-col md:flex-row items-center justify-evenly gap-6 font-body w-full">
//             <Card className="max-w-sm w-full bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2  ">
//                   <Compass className="text-primary" />
//                   Discover
//                 </CardTitle>
//                 <CardDescription className="text-muted-foreground">
//                   Find nearby or your favorite trainers, therapists, and more — all in one place.
//                 </CardDescription>
//               </CardHeader>
//             </Card>

//             <Card className="w-full max-w-sm bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="font-heading text-lg flex items-center gap-2">
//                   <Calendar1/>
//                   Book Instantly
//                 </CardTitle>
//                 <CardDescription className="text-muted-foreground">
//                   Choose a service, pick a provider (if available), and book a real-time time slot.
//                 </CardDescription>
//               </CardHeader>
//             </Card>

//             <Card className="w-full max-w-sm bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Wallet/>
//                   Pay & Relax
//                 </CardTitle>
//                 <CardDescription className="text-muted-foreground">
//                   Secure payments, instant confirmation, and reminders before your appointment.
//                 </CardDescription>
//               </CardHeader>
//             </Card>

//           </div>
//         </div>

//       </div>
//         <div className="w-full text-center py-4">
//             <Link href="/book-appointment">
//               <Button className="font-heading mt-2">
//                 Start Booking Now
//               </Button>
//             </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, FC, HTMLAttributes } from 'react';
import type { NextPage } from 'next';
import { CalendarDays, CheckCircle2, Clock, ListChecks, UserRoundCheck, ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

// Helper function for merging Tailwind CSS classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock shadcn/ui components for self-contained example ---

const cardVariants = {
  base: 'rounded-xl border bg-card text-foreground shadow-sm',
};

const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn(cardVariants.base, className)} {...props} />
);

const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight text-primary', className)} {...props} />
);

const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
);

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ className, variant, size, ...props }) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};

// --- Component Data ---

const bookingSteps = [
  {
    step: 1,
    icon: ListChecks,
    title: 'Choose Your Service',
    description: 'Begin by selecting the therapy service that best addresses your needs, from individual counseling to specialized treatments.',
  },
  {
    step: 2,
    icon: UserRoundCheck,
    title: 'Select a Therapist',
    description: 'Browse our team of certified professionals. Choose a therapist whose expertise and approach align with your personal goals.',
  },
  {
    step: 3,
    icon: CalendarDays,
    title: 'Pick a Date',
    description: 'Consult their schedule and find a date that works for you. Our flexible booking system makes it easy to plan ahead.',
  },
  {
    step: 4,
    icon: Clock,
    title: 'Find a Time Slot',
    description: 'Select from the available time slots on your chosen date. We offer various times to accommodate your schedule.',
  },
  {
    step: 5,
    icon: CheckCircle2,
    title: 'Confirm & Book',
    description: 'Review your appointment details, provide final information, and confirm your booking. Your path to wellness begins here.',
  },
];

// --- Main Page Component ---

const HowItWorksPage: NextPage = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="bg-background text-foreground font-sans">
      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-2 lg:pt-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-accent sm:text-4xl lg:text-3xl">
            A Clear Path to Your Well-Being
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Booking your therapy session is a simple and straightforward process. Follow these five steps to begin your journey with us.
          </p>
        </div>

        <div className="relative mt-16 md:mt-24">
          {/* The vertical line in the middle for desktop */}
          <div className="absolute left-1/2 top-2 hidden h-full w-0.5 -translate-x-1/2 transform bg-border md:block" />
          {/* The vertical line on the left for mobile */}
          <div className="absolute left-8 top-2 block h-full w-0.5 -translate-x-1/2 transform bg-border md:hidden" />

          <div className="space-y-12 md:space-y-0">
            {bookingSteps.map((item, index) => {
              const isActive = activeStep === item.step;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className="relative flex items-center md:grid md:grid-cols-2 md:gap-x-12"
                  onMouseEnter={() => setActiveStep(item.step)}
                >
                  {/* Timeline Dot */}
                  <div className={cn(
                    'absolute left-8 top-2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-2 transition-all duration-300',
                    isActive ? 'border-primary bg-primary/10' : 'border-border bg-card',
                    'md:left-1/2'
                  )}>
                    <div className={cn(
                      'h-3 w-3 rounded-full transition-all duration-300',
                      isActive ? 'bg-primary' : 'bg-border'
                    )} />
                  </div>

                  {/* Card Content */}
                  <div className={cn(
                    'w-full pl-20 md:pl-0',
                    isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-2 md:text-left'
                  )}>
                    <Card className={cn(
                      'transform transition-all duration-300 ease-in-out',
                      isActive ? 'scale-105 shadow-lg shadow-primary/10 border-primary' : 'hover:shadow-md',
                      isEven ? 'md:translate-x-0' : 'md:translate-x-0'
                    )}>
                      <CardHeader className={cn('flex flex-row items-start gap-4', isEven ? 'md:flex-row-reverse md:text-right' : '')}>
                        <item.icon className={cn('h-10 w-10 shrink-0', isActive ? 'text-primary' : 'text-accent')} strokeWidth={1.5} />
                        <div className="grow">
                          <p className="mb-1 font-semibold text-accent">Step {item.step}</p>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription className="mt-2">{item.description}</CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className={cn('hidden md:block', isEven ? 'md:col-start-2' : 'md:col-start-1')}></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center text-center md:mt-24">
          <h3 className="text-2xl font-bold text-primary">Ready to Get Started?</h3>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Take the first step towards a more balanced life. Our therapists are here to support you.
          </p>
          <Link href={'/book-appointment'}>
            <Button size="lg" className="mt-8 group">
              Start Booking
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
