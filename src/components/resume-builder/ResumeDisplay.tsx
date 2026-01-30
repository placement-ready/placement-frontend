'use client';

import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Award,
  Languages,
  Trophy,
  FileText,
} from 'lucide-react';
import type { FinalResume } from '@/providers/ResumeBuilderProvider';

interface ResumeDisplayProps {
  resume: FinalResume;
}

export function ResumeDisplay({ resume }: ResumeDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Section icon={User} title="Personal Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem label="Full Name" value={resume.personalInfo.fullName} />
          <InfoItem label="Email" value={resume.personalInfo.email} />
          <InfoItem label="Phone" value={resume.personalInfo.phone} />
          <InfoItem label="Location" value={resume.personalInfo.location} />
          <InfoItem label="Website" value={resume.personalInfo.website} isLink />
          <InfoItem label="LinkedIn" value={resume.personalInfo.linkedin} isLink />
          <InfoItem label="GitHub" value={resume.personalInfo.github} isLink />
        </div>
      </Section>

      {/* Summary */}
      <Section icon={FileText} title="Professional Summary">
        <p className="text-sm leading-relaxed text-muted-foreground">{resume.summary}</p>
      </Section>

      {/* Experience */}
      {resume.experience.length > 0 && (
        <Section icon={Briefcase} title="Work Experience">
          <div className="space-y-4">
            {resume.experience.map((exp, idx) => (
              <div key={idx} className="rounded-lg border border-border/50 bg-muted/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground">{exp.role}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <p className="mt-1 text-xs text-muted-foreground">{exp.location}</p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <Section icon={GraduationCap} title="Education">
          <div className="space-y-4">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="rounded-lg border border-border/50 bg-muted/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    {edu.field && <p className="text-xs text-muted-foreground">{edu.field}</p>}
                  </div>
                  {edu.endDate && (
                    <span className="text-xs text-muted-foreground">{edu.endDate}</span>
                  )}
                </div>
                {edu.gpa && <p className="mt-1 text-xs text-muted-foreground">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <Section icon={Wrench} title="Skills">
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-600 dark:text-emerald-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <Section icon={FolderOpen} title="Projects">
          <div className="space-y-4">
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="rounded-lg border border-border/50 bg-muted/20 p-4">
                <h4 className="font-medium text-foreground">{proj.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <Section icon={Award} title="Certifications">
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {resume.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {resume.languages.length > 0 && (
        <Section icon={Languages} title="Languages">
          <div className="flex flex-wrap gap-2">
            {resume.languages.map((lang, idx) => (
              <span
                key={idx}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {lang}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Achievements */}
      {resume.achievements.length > 0 && (
        <Section icon={Trophy} title="Achievements">
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {resume.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

// Helper components
interface SectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-emerald-500" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string | null;
  isLink?: boolean;
}

function InfoItem({ label, value, isLink = false }: InfoItemProps) {
  if (!value) return null;

  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      {isLink ? (
        <dd>
          <a
            href={value.startsWith('http') ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
          >
            {value}
          </a>
        </dd>
      ) : (
        <dd className="text-sm text-foreground">{value}</dd>
      )}
    </div>
  );
}
