import { FC } from 'react';
import { Quote } from 'lucide-react';

// Define the type for a single testimonial for type safety
type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

// Static data for testimonials. This can be replaced with an API call in the future.
const testimonialsData: Testimonial[] = [
  {
    quote: "Finding the right therapist felt overwhelming, but this platform made it so simple and reassuring. I felt understood from the very first session. It's been a life-changing experience.",
    author: 'R.P.',
    location: 'Mumbai',
  },
  {
    quote: "The level of care and professionalism is outstanding. My therapist provides a safe and non-judgmental space that has allowed me to open up and work through things I never thought I could.",
    author: 'S.K.',
    location: 'Bangalore',
  },
  {
    quote: "I was skeptical about online therapy, but it has been incredibly convenient and effective. The comfort of being in my own home has made a huge difference in my journey to better mental health.",
    author: 'A.M.',
    location: 'Delhi',
  },
];

const TestimonialCard: FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-card rounded-xl border border-border p-8 flex flex-col shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
    <Quote className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
    <p className="text-foreground flex-grow mb-6">{testimonial.quote}</p>
    <div className="mt-auto text-right">
      <p className="font-semibold text-muted">{testimonial.author}</p>
      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
    </div>
  </div>
);

const TestimonialsSection: FC = () => {
  return (
    <section className="bg-background w-full py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your journey to well-being is personal and unique. We are honored to provide a space where trust, comfort, and healing can flourish.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
