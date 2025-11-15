import Image from 'next/image'
import React from 'react'

function AboutSection() {
  return (
    <div>          
        <section className="py-6 sm:pt-12">
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
                          <div className=" border-2 border-dashed rounded-xl w-16 h-16">
                            <Image width={100} height={100} className='w-full h-full object-cover rounded-xl'
                             src={'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600'} alt=''/>
                          </div>
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
          </div>
  )
}

export default AboutSection