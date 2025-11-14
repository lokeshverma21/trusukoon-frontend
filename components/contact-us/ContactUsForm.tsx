"use client"
import React, { useState } from 'react'

interface FormData {
  fullName: string;
  contact: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  contact?: string;
  message?: string;
}

function ContactUsForm() {
      const [formData, setFormData] = useState<FormData>({
    fullName: '',
    contact: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$|^\+?[\d\s\-()]{10,}$/.test(formData.contact.trim())) {
      newErrors.contact = 'Please enter a valid email or phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ fullName: '', contact: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div>
                <div className="grid lg:grid-cols-1">
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Send us a Message
            </h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary">
                Thank you! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.fullName ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
                  Email or Phone *
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.contact ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                  placeholder="john@example.com or +1 234 567 8900"
                />
                {errors.contact && (
                  <p className="mt-1 text-sm text-destructive">{errors.contact}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-destructive' : 'border-input'
                  } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>


        </div>
    </div>
  )
}

export default ContactUsForm