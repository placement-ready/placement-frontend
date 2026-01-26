'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Download, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/components/dashboard/motion';

const initialResume = {
  name: 'Nora Jensen',
  role: 'Product Manager',
  summary:
    'Product leader focused on zero-to-one launches and measurable growth. Previously scaled B2B workflows that improved activation by 18% and automated reporting for 40+ customer teams.',
  skills: 'Product strategy, Roadmapping, Experimentation, User research, Stakeholder alignment',
  experience:
    'Senior Product Manager — Lumen Analytics\nGrew self-serve onboarding funnel from 22% to 35% completion in two quarters by simplifying activation loops and partnering closely with design research.\n\nProduct Manager — SummitOS\nLaunched a collaborative planning tool used weekly by 70% of enterprise accounts and reduced planning cycle time by 24%.',
  projects:
    'Growth Targeting Revamp\nDefined scoring signals for account propensity and led roll-out that drove a 14% uplift in qualified pipeline.\n\nSignal Playbooks\nPartnered with RevOps to package customer insights into modular playbooks consumed across GTM teams.',
};

export default function ResumePage() {
  const [formData, setFormData] = useState(initialResume);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange =
    (field: keyof typeof initialResume) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.info('Mock save', formData);
    setIsSaving(false);
  };

  const handleExport = () => {
    console.info('Mock export', formData);
  };

  const parsedSkills = formData.skills
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <motion.div
      className="mx-auto max-w-6xl space-y-8 px-4 py-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
            <p className="text-sm text-muted-foreground">Craft your story with live preview</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form Card */}
        <Card className="border-border/60 bg-card shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="text-foreground">Profile Details</span>
              <span className="text-xs font-medium text-muted-foreground">Auto-saved</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  className="border-input bg-background focus-visible:ring-emerald-500"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="role"
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Role / Title
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange('role')}
                  className="border-input bg-background focus-visible:ring-emerald-500"
                  placeholder="Your role"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="summary"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Professional Summary
              </Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={handleInputChange('summary')}
                rows={4}
                className="border-input bg-background focus-visible:ring-emerald-500"
                placeholder="A brief overview of your experience and goals..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="skills"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Skills (comma separated)
              </Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={handleInputChange('skills')}
                className="border-input bg-background focus-visible:ring-emerald-500"
                placeholder="Skill 1, Skill 2, Skill 3..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="experience"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Experience
              </Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={handleInputChange('experience')}
                rows={6}
                className="border-input bg-background focus-visible:ring-emerald-500"
                placeholder="Your work experience..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="projects"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Key Projects
              </Label>
              <Textarea
                id="projects"
                value={formData.projects}
                onChange={handleInputChange('projects')}
                rows={5}
                className="border-input bg-background focus-visible:ring-emerald-500"
                placeholder="Notable projects and achievements..."
              />
            </div>

            <div className="flex flex-wrap gap-3 border-t border-border/50 pt-6">
              <Button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleExport}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="border-border/60 bg-muted/30 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-foreground">Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">{formData.name || 'Your Name'}</h2>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {formData.role || 'Role / Title'}
              </p>
            </section>

            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Summary
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                {formData.summary || 'Add a short overview that highlights your impact.'}
              </p>
            </section>

            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {parsedSkills.length ? (
                  parsedSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {skill}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Add skills to see them here</span>
                )}
              </div>
            </section>

            <PreviewBlock label="Experience" body={formData.experience} />
            <PreviewBlock label="Projects" body={formData.projects} />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

interface PreviewBlockProps {
  label: string;
  body: string;
}

function PreviewBlock({ label, body }: PreviewBlockProps) {
  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div
        className={cn(
          'rounded-xl border border-border bg-background/80 p-4 text-sm text-foreground/80',
          body ? 'whitespace-pre-line' : 'text-muted-foreground',
        )}
      >
        {body || 'Use the form to add details and they will appear here automatically.'}
      </div>
    </section>
  );
}
