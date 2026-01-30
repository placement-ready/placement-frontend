'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeaturePageLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: FeatureItem[];
  benefits: string[];
  ctaTitle: string;
  ctaDescription: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturePageLayout({
  badge,
  title,
  subtitle,
  description,
  features,
  benefits,
  ctaTitle,
  ctaDescription,
}: FeaturePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            {badge}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-2 text-xl font-medium text-primary">
            {subtitle}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/dashboard">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground">Why Choose This Feature?</h2>
            <p className="mt-4 text-muted-foreground">
              Designed to give you the competitive edge in your job search.
            </p>
          </motion.div>

          <motion.ul
            className="mt-12 grid gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {benefits.map((benefit) => (
              <motion.li
                key={benefit}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-foreground">{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground">{ctaTitle}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{ctaDescription}</p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/auth/signup">
                Start Practicing Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
