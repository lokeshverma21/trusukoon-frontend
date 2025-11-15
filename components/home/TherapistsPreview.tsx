import Image from 'next/image';
import React from 'react';
import { Heart, Users, Brain, Sparkles } from 'lucide-react';

interface Therapist {
  id: number;
  name: string;
  experience: string;
  specialization: string;
  imageUrl: string;
  icon: React.ReactNode;
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: 'Dr. Aisha Sharma',
    experience: '8+ years experience',
    specialization: 'Anxiety & Stress Expert',
    imageUrl: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: 2,
    name: 'Dr. Karan Mehta',
    experience: '6 years experience',
    specialization: 'Relationship Therapy',
    imageUrl: 'https://images.unsplash.com/photo-1700041785712-649e859d9909?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 3,
    name: 'Dr. Nidhi Rao',
    experience: '10 years experience',
    specialization: 'Depression & Trauma',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8MHwwfHx8Mg%3D%3D',
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: 4,
    name: 'Dr. Kirti Shah',
    experience: '7 years experience',
    specialization: 'Child & Teen Counseling',
    imageUrl: 'https://images.unsplash.com/photo-1650784854286-e2ccca9e26d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const TherapistCard: React.FC<{ therapist: Therapist }> = ({ therapist }) => {
  return (
    <div
      className="bg-card border-border border rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          width={300}
          height={300}
          src={therapist.imageUrl}
          alt={therapist.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-card to-transparent p-4">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-accent text-primary-foreground p-2 rounded-full">
              {therapist.icon}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-primary text-xl font-semibold mb-2 text-center">{therapist.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted">
            <span className="text-sm">{therapist.experience}</span>
          </div>
          <div className="bg-secondary/10 rounded-lg p-3 text-center">
            <p className="text-secondary text-sm font-medium">{therapist.specialization}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TherapistsPreview: React.FC = () => {
  return (
    <section className="py-0 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-accent text-3xl md:text-4xl font-bold">Meet Our Therapists</h2>
          <p className="text-muted mt-4 text-lg">
            Connect with our compassionate, licensed professionals who are dedicated to supporting your journey towards well-being.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TherapistsPreview;
