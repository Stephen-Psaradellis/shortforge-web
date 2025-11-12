'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { inquiriesApi } from '@/lib';
import toast from 'react-hot-toast';
import { ContactForm as ContactFormType } from '@/types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  service_interest: z.enum(['ai_agents', 'automation', 'it_consulting']).optional()
});

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'hello@shortforge.com',
    description: 'Send us an email anytime',
    href: 'mailto:hello@shortforge.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+1 (555) 123-4567',
    description: 'Mon-Fri 9AM-6PM EST',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Innovation Drive',
    description: 'Tech City, TC 12345',
    href: '#'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Fri: 9AM - 6PM',
    description: 'Weekend support available',
    href: '#'
  }
];

const ServiceInterest = ({ register, errors }: any) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-secondary-300">
      Service Interest (Optional)
    </label>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {[
        { value: 'ai_agents', label: 'AI Agents' },
        { value: 'automation', label: 'Automation Systems' },
        { value: 'it_consulting', label: 'IT Consulting' }
      ].map((service) => (
        <label key={service.value} className="relative">
          <input
            type="radio"
            value={service.value}
            {...register('service_interest')}
            className="sr-only peer"
          />
          <div className="card cursor-pointer peer-checked:border-primary-600 peer-checked:bg-primary-600/10 hover:border-primary-600 transition-all duration-200">
            <div className="text-center">
              <div className="text-white font-medium">{service.label}</div>
            </div>
          </div>
        </label>
      ))}
    </div>
    {errors.service_interest && (
      <p className="text-red-400 text-sm">{errors.service_interest.message}</p>
    )}
  </div>
);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);
    try {
      await inquiriesApi.create(data);
      setIsSubmitted(true);
      reset();
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
            <p className="text-secondary-300 mb-8">
              Thank you for reaching out. We've received your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Ready to transform your business with AI and automation? Let's discuss how
            ShortForge can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            <p className="text-secondary-300 mb-8">
              Choose the method that works best for you. We're here to help and
              typically respond within 24 hours.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-primary-400 hover:text-primary-300 transition-colors block font-medium"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <div className="text-primary-400 font-medium">{info.content}</div>
                    )}
                    <div className="text-secondary-400 text-sm">{info.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ElevenLabs Voice Widget Placeholder */}
            <div className="mt-12 card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  🎤
                </div>
                Talk to Forge Assistant
              </h3>
              <p className="text-secondary-300 mb-4">
                Experience our AI voice assistant for instant responses to your questions.
              </p>
              <div className="bg-secondary-800 rounded-lg p-8 text-center border-2 border-dashed border-secondary-600">
                <div className="text-secondary-400 mb-2">[ElevenLabs Voice Widget]</div>
                <div className="text-sm text-secondary-500">
                  Voice interaction widget will be integrated here
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="input-field"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="input-field"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    {...register('company')}
                    className="input-field"
                    placeholder="Your Company"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  {...register('subject')}
                  className="input-field"
                  placeholder="How can we help you?"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <ServiceInterest register={register} errors={errors} />

              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Tell us about your project and requirements..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Calendly Integration Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="card text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Schedule a Consultation
            </h2>
            <p className="text-secondary-300 mb-8">
              Prefer to speak with us directly? Book a free 30-minute consultation
              to discuss your project in detail.
            </p>
            <div className="bg-secondary-800 rounded-lg p-12 border-2 border-dashed border-secondary-600">
              <div className="text-secondary-400 mb-2">[Calendly Widget]</div>
              <div className="text-sm text-secondary-500">
                Interactive scheduling widget will be integrated here
              </div>
              <button className="btn-secondary mt-4">
                Open Calendar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
