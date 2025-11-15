import React from 'react';
import {
  Brain,
  CloudRain,
  Heart,
  Briefcase,
  HeartPulse,
  Baby,
  FireExtinguisher,
  Sparkles
} from 'lucide-react';

// TypeScript type for a therapy service
export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  icon: React.ElementType;
};

// Array of therapy services with icons
const services: Service[] = [
  {
    id: 'anxiety',
    title: 'Anxiety Therapy',
    shortDescription: 'Find calm and learn strategies to manage worry, panic, and fear.',
    icon: Brain
  },
  {
    id: 'depression',
    title: 'Depression Counseling',
    shortDescription: 'Healing from depression with compassionate, personalized support.',
    icon: CloudRain
  },
  {
    id: 'couples',
    title: 'Relationship / Couples Therapy',
    shortDescription: 'Strengthen bonds and improve communication with your partner.',
    icon: Heart
  },
  {
    id: 'stress',
    title: 'Stress & Burnout Management',
    shortDescription: 'Regain balance and resilience from work and life pressures.',
    icon: Briefcase
  },
  {
    id: 'trauma',
    title: 'Trauma & Healing Therapy',
    shortDescription: 'Gentle, effective therapy to process and heal from traumatic experiences.',
    icon: HeartPulse
  },
  {
    id: 'child',
    title: 'Child & Adolescent Counseling',
    shortDescription: 'Specialized support for the unique mental health needs of young people.',
    icon: Baby
  },
  {
    id: 'grief',
    title: 'Grief & Loss Support',
    shortDescription: 'Compassionate guidance through the difficult journey of loss.',
    icon: FireExtinguisher
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness & Wellness Coaching',
    shortDescription: 'Cultivate inner peace and holistic well-being.',
    icon: Sparkles
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-background py-16 px-4 sm:px-0 lg:px-0">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 text-center">
          <h2 className="text-accent text-3xl sm:text-4xl font-bold">
            Services We Offer
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted text-base sm:text-lg">
            Discover our range of specialized therapy services designed to support your unique journey towards healing and growth.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map(({ id, title, shortDescription, icon: Icon }) => (
            <article
              key={id}
              tabIndex={0}
              className="group cursor-pointer rounded-xl bg-white p-6 shadow-sm border border-secondary/20 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={title}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-accent transition-colors duration-300 group-hover:bg-secondary/30">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-foreground text-lg font-semibold mb-2 group-hover:text-primary">
                {title}
              </h3>
              <p className="text-muted text-sm line-clamp-3">
                {shortDescription}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
