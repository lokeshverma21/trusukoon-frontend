"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Is online therapy effective?",
    answer:
      "Yes, online therapy has been shown to be just as effective as in-person therapy for many mental health conditions. Research demonstrates that virtual sessions provide the same quality of care while offering added convenience and comfort. Many clients find it easier to open up from the safety of their own space, which can enhance the therapeutic process.",
  },
  {
    question: "Are my conversations private?",
    answer:
      "Absolutely. Your privacy is our top priority. All sessions are conducted through secure, HIPAA-compliant platforms with end-to-end encryption. Your therapist is bound by strict confidentiality laws, and your personal information is never shared without your explicit consent.",
  },
  {
    question: "How do I choose the right therapist?",
    answer:
      "We understand that finding the right fit is crucial for successful therapy. Our matching process considers your specific needs, preferences, and goals. You can browse therapist profiles, read about their specialties and approaches, and schedule initial consultations.",
  },
  {
    question: "What happens in the first session?",
    answer:
      "Your first session is about building trust and understanding your needs. Your therapist will listen to your concerns, discuss your goals, and answer any questions. There’s no pressure to share everything at once – you set the pace.",
  },
  {
    question: "How are payments handled?",
    answer:
      "We offer transparent pricing with flexible payment options. You can pay per session or choose package plans. We accept major credit cards, HSA/FSA accounts, and some insurance plans. Payments are handled securely through our platform.",
  },
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 max-w-3xl md:mx-auto text-center mx-4">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-accent mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-muted-foreground mb-12">
        We understand that starting therapy can feel overwhelming. Here are
        answers to common questions to help you feel more comfortable and
        informed about your mental health journey.
      </p>

      {/* FAQ Accordion */}
      <Accordion
        type="single"
        collapsible
        className="space-y-4 text-left"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-lg bg-background data-[state=open]:bg-card data-[state=open]:shadow-md data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger
              className="px-4 py-3 text-foreground font-medium hover:no-underline 
                        transition-colors rounded-lg"
            >
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
