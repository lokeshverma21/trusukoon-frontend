'use client'
import React, { useEffect, useRef, useState } from "react";

const therapistsData = [
  {
    name: "Dr. Ananya Sharma",
    role: "Clinical Psychologist",
    focus: "Anxiety, stress management, and mindfulness-based therapy.",
  },
  {
    name: "Rahul Verma",
    role: "Counselling Psychologist",
    focus: "Relationship counselling and emotional well-being.",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Trauma Specialist",
    focus: "Healing from trauma, grief, and life transitions.",
  },
];

const testimonialsData = [
  {
    name: "Aarav",
    quote:
      "I feel heard and understood. The platform’s approach gave me the clarity I needed to move forward in life.",
  },
  {
    name: "Kavya",
    quote:
      "TruSukoon helped me find a therapist who truly understands my background and values.",
  },
  {
    name: "Rohan",
    quote:
      "The sessions are calm, structured, and deeply reassuring. I feel safer with every conversation.",
  },
];

const socialIcons = [
  { name: "Instagram", label: "Visit our Instagram" },
  { name: "LinkedIn", label: "Visit our LinkedIn" },
  { name: "YouTube", label: "Visit our YouTube" },
];

const HomePage: React.FC = () => {
  const therapistsRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
      setIsAnimating(false);
    }, 300);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTestimonial();
    }, 7000);
    return () => clearInterval(interval);
  });


  const handlePrevTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) =>
        prev === 0 ? testimonialsData.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const scrollToTherapists = () => {
    if (therapistsRef.current) {
      therapistsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTestimonials = () => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{
        backgroundColor: "#F6FBFB", // main light background
        fontFamily: "var(--font-geist-sans, system-ui, -apple-system, BlinkMacSystemFont)",
      }}
    >
      {/* Subtle top motif strip */}
      <div
        className="w-full h-6 bg-gradient-to-r from-teal-100 via-sky-100 to-emerald-100"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(186, 230, 253, 0.6), rgba(187, 247, 208, 0.6)), repeating-linear-gradient(135deg, rgba(11, 122, 116, 0.18) 0, rgba(11, 122, 116, 0.18) 4px, transparent 4px, transparent 8px)",
        }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <header className="relative overflow-hidden">
          {/* Soft gradient halo in background */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-full h-full bg-gradient-to-br from-teal-50 via-sky-50 to-emerald-50 opacity-80"
            />
            <div
              className="absolute rounded-full bg-teal-100 opacity-60"
              style={{ width: "12rem", height: "12rem", top: "2rem", right: "3rem" }}
            />
            <div
              className="absolute rounded-full bg-sky-100 opacity-60"
              style={{ width: "10rem", height: "10rem", bottom: "2rem", left: "2rem" }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-16">
            <nav className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 rounded-full p-2 border border-teal-200">
                  <span
                    className="block h-6 w-6 rounded-full"
                    style={{
                      background: "conic-gradient(from 90deg, #2ABBB1, #5AA7D8, #2ABBB1)",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold tracking-wide text-teal-900">
                    TruSukoon
                  </span>
                  <span className="text-xs text-slate-500">
                    Your space for inner calm
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
                <button
                  onClick={scrollToTherapists}
                  className="hover:text-teal-700 transition-colors"
                >
                  Therapists
                </button>
                <button
                  onClick={scrollToTestimonials}
                  className="hover:text-teal-700 transition-colors"
                >
                  Stories
                </button>
                <button
                  className="rounded-full border border-teal-200 px-4 py-1.5 text-xs font-medium text-teal-900 bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  Hindi / English
                </button>
              </div>
            </nav>

            <div className="flex flex-col items-center text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-teal-700 mb-4">
                A gentle step towards healing
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
                Welcome to <span className="text-teal-700">TruSukoon</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-6">
                Your trusted space for peace and healing, where your voice is heard
                with warmth, respect, and complete confidentiality.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <button
                  onClick={scrollToTherapists}
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition transform hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: "#0B7A74" }}
                >
                  Explore Our Therapists
                  <span className="ml-2 text-xs" aria-hidden="true">
                    
                  </span>
                </button>
                <button
                  onClick={scrollToTestimonials}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium border border-teal-200 text-teal-900 bg-white/60 hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition"
                >
                  Start Your Healing Journey
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Verified, licensed therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
                  <span>Private & secure sessions</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* About Section */}
        <main className="flex-1">
          <section className="py-10 sm:py-14">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/80 backdrop-blur rounded-xl md:rounded-2xl shadow-sm shadow-teal-100 border border-teal-50 p-6 sm:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                      About TruSukoon
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600">
                      At TruSukoon, we believe in the power of therapeutic healing to
                      restore peace and clarity. We understand that taking the first
                      step towards therapy can feel vulnerable, and we are here to
                      walk with you gently.
                    </p>
                    <p className="text-sm sm:text-base text-slate-600">
                      Our platform connects you with experienced therapists who
                      understand your needs, your culture, and your pace. Every
                      session is designed to offer personalized care in a safe,
                      non-judgmental space.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-900 border border-teal-100">
                        Mindful | करुणा
                      </span>
                      <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-900 border border-sky-100">
                        Culturally rooted
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="relative inline-flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage:
                            "conic-gradient(from 180deg, rgba(11,122,116,0.12), rgba(90,167,216,0.12), rgba(11,122,116,0.12))",
                        }}
                      />
                      <div className="relative rounded-full bg-white border border-teal-100 p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-900">
                              A therapist is listening
                            </p>
                            <p className="text-xs text-slate-500">
                              Schedule a calm, confidential session at a time that
                              works for you.
                            </p>
                            <p
                              className="text-[11px] text-teal-700"
                              style={{ fontFamily: "var(--font-geist-mono, ui-monospace)" }}
                            >
                              sukoon ~ peace | sukoon ~ शांति
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Therapists Section */}
          <section ref={therapistsRef} className="py-10 sm:py-14 bg-gradient-to-b from-teal-50/60 via-sky-50/60 to-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1">
                    Meet Our Team
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md">
                    A compassionate team of Indian and globally trained therapists,
                    dedicated to holding space for your story.
                  </p>
                </div>
                <button
                  onClick={scrollToTestimonials}
                  className="mt-4 sm:mt-0 inline-flex items-center rounded-full px-4 py-2 text-xs font-medium border border-teal-200 bg-white/70 text-teal-900 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition"
                >
                  Read client stories
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {therapistsData.map((therapist) => (
                  <article
                    key={therapist.name}
                    className="group bg-white/80 backdrop-blur rounded-xl shadow-sm shadow-teal-100 border border-teal-50 p-5 flex flex-col h-full transition transform hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">
                          {therapist.name}
                        </h3>
                        <p className="text-xs text-teal-800 mb-1">{therapist.role}</p>
                        <p className="text-[11px] text-slate-500">5+ years experience</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 flex-1 mb-4">{therapist.focus}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-auto">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Online & in-person
                      </span>
                      <button
                        className="inline-flex items-center gap-1 text-teal-700 group-hover:text-teal-800 transition-colors"
                      >
                        View profile
                        <span aria-hidden="true" className="text-[10px]">
                          
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            ref={testimonialsRef}
            className="py-10 sm:py-14"
            style={{ backgroundColor: "#F0F7FB" }}
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  Client Testimonials
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  Gentle reflections from people who chose to prioritise their
                  emotional well-being.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <div
                    className={`bg-white/90 backdrop-blur rounded-2xl shadow-md shadow-sky-100 border border-sky-100 p-6 sm:p-8 transition-all duration-300 ease-out ${
                      isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="mt-1 rounded-full p-2"
                        style={{ backgroundColor: "#5AA7D8" }}
                      >
                        <span className="block h-6 w-6 rounded-full bg-white/90" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-slate-700 mb-3">
                          {testimonialsData[currentTestimonial].quote}
                        </p>
                        <p className="text-xs text-slate-500 mb-1">
                           {testimonialsData[currentTestimonial].name}, TruSukoon client
                        </p>
                        <p
                          className="text-[11px] text-sky-700"
                          style={{ fontFamily: "var(--font-geist-mono, ui-monospace)" }}
                        >
                          {`"sukoon" is the gentle exhale after a long day.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevTestimonial}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 text-xs hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition"
                        aria-label="Previous testimonial"
                      >
                        
                      </button>
                      <button
                        onClick={handleNextTestimonial}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 text-xs hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition"
                        aria-label="Next testimonial"
                      >
                        
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      {testimonialsData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            index === currentTestimonial
                              ? "bg-sky-500 w-4"
                              : "bg-sky-200 hover:bg-sky-300"
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <footer
          className="mt-8 text-sm"
          style={{ backgroundColor: "oklch(0.145 0 0)" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-slate-300">
            <div className="flex flex-col sm:flex-row justify-between gap-6 mb-6">
              <div className="space-y-2 max-w-sm">
                <p className="text-base font-medium text-slate-50">
                  TruSukoon
                </p>
                <p className="text-xs text-slate-400">
                  A gentle, confidential space for therapy, grounded in care and
                  cultural understanding.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-xs text-slate-400">
                <div className="space-y-2">
                  <p className="text-[11px] font-medium text-slate-200 uppercase tracking-wide">
                    Explore
                  </p>
                  <button className="block hover:text-teal-300 transition-colors text-left">
                    Contact Us
                  </button>
                  <button className="block hover:text-teal-300 transition-colors text-left">
                    FAQ
                  </button>
                  <button className="block hover:text-teal-300 transition-colors text-left">
                    Terms & Conditions
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-medium text-slate-200 uppercase tracking-wide">
                    Support
                  </p>
                  <button className="block hover:text-teal-300 transition-colors text-left">
                    Privacy Policy
                  </button>
                  <button className="block hover:text-teal-300 transition-colors text-left">
                    Emergency Resources
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-medium text-slate-200 uppercase tracking-wide">
                  Stay connected
                </p>
                <div className="flex items-center gap-3">
                  {socialIcons.map((icon) => (
                    <button
                      key={icon.name}
                      aria-label={icon.label}
                      className="h-8 w-8 rounded-full bg-slate-800/70 border border-slate-600 flex items-center justify-center text-[11px] text-slate-200 hover:bg-slate-700 hover:text-teal-200 transition-colors"
                    >
                      {icon.name.charAt(0)}
                    </button>
                  ))}
                </div>
                <p
                  className="text-[11px] text-slate-500"
                  style={{ fontFamily: "var(--font-geist-mono, ui-monospace)" }}
                >
                  This space is not for emergencies. If you are in crisis, please
                  contact your local helpline.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
              <p>a9 {new Date().getFullYear()} TruSukoon. All rights reserved.</p>
              <p>Made with care in India </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;