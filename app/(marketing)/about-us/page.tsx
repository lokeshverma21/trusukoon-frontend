"use client"
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FlowerIcon, Heart, Smile } from "lucide-react";

const AboutPage: NextPage = () => {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Trigger animations that depend on client-side mount
    setHasMounted(true);
  }, []);

  const handleToggleStory = () => {
    setIsStoryExpanded((prev) => !prev);
  };

  return (
    <main className="min-h bg-background text-slate-900 scroll-smooth">
      {/* Page Wrapper */}
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-10 md:px-0 md:py-6">
        {/* Hero Section */}
        <section
          aria-labelledby="about-hero-heading"
          className={`overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 via-secondary/5 to-background p-8 shadow-md md:p-12 ${
            hasMounted ? "animate-fadeIn" : ""
          }`}
        >
          <header className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-4 md:space-y-6">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                About TruSukoon
              </p>
              <h1
                id="about-hero-heading"
                className="text-3xl font-semibold text-accent md:text-4xl lg:text-5xl"
              >
                The Heart Behind TruSukoon
              </h1>
              <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                Born out of a need for peace in a busy world, TruSukoon is your digital haven
                for emotional healing and human connection. We make it easier for you to find
                trusted therapists in India, without judgment or stigma.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="#story"
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-accent shadow-sm transition-all duration-300 ease-in-out hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Learn our story
                </Link>
                <span className="text-xs text-slate-500 md:text-sm">
                  India-first, stigma-free mental wellness platform.
                </span>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="mt-6 flex flex-1 justify-center md:mt-0">
              <div className="relative flex items-center justify-center rounded-2xl bg-white p-4 shadow-lg">
                {/* Decorative aura behind illustration */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-primary/10 via-secondary/10 to-background" />
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Calm mind, one session at a time
                  </div>
                  {/* Replace src with a real illustration asset in a real project */}
                  <div className="rounded-xl bg-background p-3 shadow-inner">
                    <Image
                      src="/assets/img2.jpg"
                      alt="A calming illustration symbolizing mindfulness and emotional healing"
                      width={160}
                      height={160}
                      className="rounded-xl"
                    />
                  </div>
                  <p className="text-center text-xs text-slate-500">
                    Designed for people navigating studies, work, relationships, and life in India.
                  </p>
                </div>
              </div>
            </div>
          </header>
        </section>

        {/* Story Section */}
        <section
          id="story"
          aria-labelledby="story-heading"
          className={`rounded-2xl bg-secondary/5 p-6 shadow-sm md:p-10 ${
            hasMounted ? "animate-slideUp" : ""
          }`}
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Story Text */}
            <article className="space-y-4 md:space-y-6">
              <h2
                id="story-heading"
                className="text-2xl font-semibold text-accent md:text-3xl"
              >
                Our Story
              </h2>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                A safe space, rooted in the Indian experience.
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                TruSukoon began with a simple vision — to make emotional wellness approachable
                for everyone. In a world that moves too fast, we wanted to create a space where
                you can pause, reflect, and heal at your own pace.
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                In many Indian homes, it&apos;s still hard to talk about anxiety, therapy, or
                heartbreak. We saw students, working professionals, parents, and caregivers
                silently carrying emotional burdens because they didn&apos;t know where to turn or
                whom to trust.
              </p>
              <div className="space-y-3">
                <p className="text-base leading-relaxed text-slate-700">
                  TruSukoon was built to gently change that. By connecting you with verified,
                  compassionate therapists who understand the cultural nuances of life in India,
                  we aim to make seeking support feel natural, calm, and stigma-free.
                </p>
                {isStoryExpanded && (
                  <p className="text-base leading-relaxed text-slate-700">
                    Whether you are navigating exam stress, workplace burnout, relationship
                    challenges, or just a persistent sense of unease, TruSukoon offers a
                    confidential bridge to help. Every experience on our platform is designed to
                    feel warm, human, and judgment-free — so you can show up exactly as you are
                    and take one small step towards peace.
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleToggleStory}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-medium text-accent shadow-sm transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary/5"
                  aria-expanded={isStoryExpanded}
                  aria-controls="story-more-text"
                >
                  {isStoryExpanded ? "Show less" : "Read more about our beginning"}
                </button>
                <div id="story-more-text" className="sr-only">
                  Additional details about the TruSukoon story are revealed when the button is toggled.
                </div>
              </div>
            </article>

            {/* Story Illustration / Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
                <div className="mb-4 h-10 w-24 rounded-full bg-primary/10" />
                <div className="mb-4 space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-secondary/10" />
                  <div className="h-3 w-2/3 rounded-full bg-secondary/10" />
                  <div className="h-3 w-1/2 rounded-full bg-secondary/10" />
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-background p-4">
                  {/* Required placeholder pattern */}
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="space-y-2">
                    <div className="h-3 w-28 rounded-full bg-primary/10" />
                    <div className="h-3 w-20 rounded-full bg-secondary/10" />
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  A gentle visual reminder that it&apos;s okay to ask for help. TruSukoon bridges the
                  gap between you and trusted mental health professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section
          aria-labelledby="mission-heading"
          className="rounded-2xl bg-background p-6 shadow-sm md:p-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="mission-heading"
              className="text-2xl font-semibold text-accent md:text-3xl"
            >
              Our Mission
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
              To bring peace, trust, and cultural understanding into every therapy conversation,
              so you feel seen, heard, and supported — wherever you are in India.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <article
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-lg" aria-hidden="true">
                    <Heart />
                  </span>
                </div>
                <h3 className="text-base font-semibold text-accent">Peace of Mind</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                We believe therapy should feel natural, not clinical. TruSukoon is designed to be
                gentle, inviting, and easy to return to whenever life feels overwhelming.
              </p>
              <div className="mt-4 h-1 w-12 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
            </article>

            {/* Card 2 */}
            <article
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <span className="text-lg" aria-hidden="true">
                    <Smile />
                  </span>
                </div>
                <h3 className="text-base font-semibold text-accent">Trust &amp; Safety</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Every interaction on TruSukoon is confidential and respectful. We prioritise
                ethical practice, privacy, and clarity so you can open up with confidence.
              </p>
              <div className="mt-4 h-1 w-12 rounded-full bg-secondary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-secondary" />
            </article>

            {/* Card 3 */}
            <article
              className="group flex flex-col rounded-2xl bg-white p-5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-accent">
                  <span className="text-lg" aria-hidden="true">
                    <FlowerIcon />
                  </span>
                </div>
                <h3 className="text-base font-semibold text-accent">Cultural Connection</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                We understand the Indian context of emotions, relationships, and healing. Our
                therapists respect your language, background, and lived realities.
              </p>
              <div className="mt-4 h-1 w-12 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
            </article>
          </div>
        </section>

        {/* Closing CTA Section */}
        <section
          aria-labelledby="cta-heading"
          className={`rounded-2xl bg-linear-to-r from-primary/10 via-secondary/10 to-background p-8 text-center shadow-md md:p-10 ${
            hasMounted ? "animate-fadeIn" : ""
          }`}
        >
          <div className="mx-auto max-w-2xl space-y-4 md:space-y-6">
            <h2
              id="cta-heading"
              className="text-2xl font-semibold text-accent md:text-3xl"
            >
              Your Journey to Calmness Begins Here
            </h2>
            <p className="text-base leading-relaxed text-slate-700 md:text-lg">
              You don&apos;t have to carry everything alone. Take your first step towards emotional
              clarity and peace by connecting with a therapist who truly understands you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Book a therapy session on TruSukoon"
              >
                Book a Session
              </Link>

              <Link
                href="#story"
                className="inline-flex items-center rounded-full border border-accent/20 bg-white px-5 py-2.5 text-sm font-medium text-accent shadow-sm transition-all duration-300 ease-in-out hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore our story
              </Link>
            </div>

            <p className="text-xs text-slate-500">
              TruSukoon is not a crisis service. If you are in immediate distress, please reach
              out to your nearest helpline or emergency support.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
