import ContactUsForm from "@/components/contact-us/ContactUsForm";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-br from-primary/10 via-secondary/5 to-background py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are here to support you on your journey to wellness. Reach out to schedule a session or ask any questions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-6">
{/* form */}
        <div className="w-full">
            <ContactUsForm/>
        </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="bg-card rounded-xl shadow-md p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground text-sm">
                      123 Peaceful Lane, Suite 200
                      <br />
                      Serenity City, SC 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-md p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground text-sm">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri: 9am - 6pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-md p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm">
                      contact@therapybooking.com
                      <br />
                      We reply within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
              <h3 className="font-semibold text-foreground mb-3">Our Therapists</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our team of licensed therapists specializes in various therapeutic approaches including CBT, mindfulness, and family therapy.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Licensed</span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">Experienced</span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Compassionate</span>
              </div>
            </div>
          </div>
      </div>

        <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1647887432986!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
        </div>

      <div className="bg-linear-to-t from-primary/5 to-transparent py-12 px-4 mt-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-3 text-accent">
            Your Peace of Mind Matters
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards a healthier, happier you. Our caring team is ready to support you with personalized therapy sessions.
          </p>
        </div>
      </div>
    </div>
  );
}