"use client"
import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="min-h-screen z-50 flex items-center justify-center bg-background">
      <Loader />
    </div>
  );
}
