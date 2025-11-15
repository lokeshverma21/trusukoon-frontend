export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Unauthorized
        </h1>
        <p className="text-muted-foreground mb-6">
          You don’t have permission to view this page.  
          Please log in with the correct account.
        </p>

        <a
          href="/login"
          className="text-accent underline hover:text-primary transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
