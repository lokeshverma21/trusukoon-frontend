import {
  Calendar1,
  Compass,
  Wallet,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="mt-14 md:mt-6 min-h-full px-0">
      <h3 className="text-center text-5xl">
        How it works
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-evenly mt-10 gap-12">
        {/* Clients Section */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-evenly gap-6 font-body w-full">
            <Card className="max-w-sm w-full bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2  ">
                  <Compass className="text-primary" />
                  Discover
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Find nearby or your favorite trainers, therapists, and more — all in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-full max-w-sm bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Calendar1/>
                  Book Instantly
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose a service, pick a provider (if available), and book a real-time time slot.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-full max-w-sm bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet/>
                  Pay & Relax
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Secure payments, instant confirmation, and reminders before your appointment.
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>

      </div>
        <div className="w-full text-center py-4">
            <Link href="/book-appointment">
              <Button className="font-heading mt-2">
                Start Booking Now
              </Button>
            </Link>
      </div>
    </div>
  );
}
