'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative overflow-hidden px-6 py-24 text-center md:px-16 lg:py-32">
        <Image
          src="/images/bundundu/DJI_20251028123130_0313_D.webp"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-cap-ink/75" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-unbounded text-4xl font-bold uppercase tracking-wide text-cap-yellow md:text-6xl"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          >
            Vous avez une question concernant nos projets ou nos initiatives ? Nous serions ravis d&apos;échanger avec vous.
          </motion.p>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-16 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-card p-8 shadow-sm border border-border md:p-10"
          >
            <h2 className="mb-8 font-unbounded text-2xl font-semibold">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nom complet <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cap-blue focus:ring-1 focus:ring-cap-blue"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Adresse e-mail <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cap-blue focus:ring-1 focus:ring-cap-blue"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cap-blue focus:ring-1 focus:ring-cap-blue"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-cap-blue focus:ring-1 focus:ring-cap-blue resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-md bg-cap-ink px-6 py-4 font-semibold text-white transition hover:bg-cap-ink/90",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Envoyer le message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-4 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-4 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.
                  </p>
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center space-y-12 pl-0 lg:pl-10"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cap-yellow/20 text-cap-yellow">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-unbounded text-xl font-semibold mb-2">Notre Siège</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kinshasa, République Démocratique du Congo<br />
                  [Insérez l'adresse de la rue ici]
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cap-yellow/20 text-cap-yellow">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-unbounded text-xl font-semibold mb-2">Coordonnées</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex flex-wrap items-center gap-2">
                    <strong className="text-foreground">E-mail :</strong>
                    <a href="mailto:info@cap-congo.com" className="hover:text-cap-blue transition">info@cap-congo.com</a>
                  </li>
                  <li className="space-y-1">
                    <strong className="text-foreground">Téléphone :</strong>
                    <ul className="mt-1 space-y-2">
                      <li>
                        <span className="block text-xs uppercase tracking-wider text-muted-foreground/80">
                          Agro Palm &amp; Agricole Bandundu
                        </span>
                        <a href="tel:+243816448888" className="hover:text-cap-blue transition">
                          +243 816 448 888
                        </a>
                      </li>
                      <li>
                        <span className="block text-xs uppercase tracking-wider text-muted-foreground/80">
                          Pisciculture
                        </span>
                        <a href="tel:+243826200575" className="hover:text-cap-blue transition">
                          +243 826 200 575
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cap-yellow/20 text-cap-yellow">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-unbounded text-xl font-semibold mb-2">Heures d'ouverture</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between gap-8">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">08:00 - 17:00</span>
                  </li>
                  <li className="flex justify-between gap-8">
                    <span>Samedi</span>
                    <span className="font-medium">09:00 - 13:00</span>
                  </li>
                  <li className="flex justify-between gap-8">
                    <span>Dimanche</span>
                    <span className="font-medium text-red-500/80">Fermé</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}