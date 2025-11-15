import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="text-accent underline hover:text-primary transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
