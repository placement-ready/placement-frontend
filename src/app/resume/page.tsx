'use client';
import React, { useState, useRef, useCallback } from 'react';
import {
  User, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Sparkles, Plus, X, Download
} from 'lucide-react';
// Update the import path if Navbar is located elsewhere, e.g.:
import Navbar from '../../components/Navbar';
// Or create the Navbar component at '../../components/Navbar.tsx' if it does not exist.
const uniqueId = (() => {
  let n = 1;
  return () => n++;
})();
type SectionId = 'personal' | 'experience' | 'education' | 'skills' | 'achievements';
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}
interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
interface Education {
  id: number;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
}
interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  achievements: string[];
}
const ResumeBuilder: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(() => ({
    personal: { fullName: '', email: '', phone: '', location: '', website: '', summary: '' },
    experience: [{ id: uniqueId(), title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
    education: [{ id: uniqueId(), degree: '', school: '', location: '', graduationDate: '', gpa: '' }],
    skills: [],
    achievements: []
  }));
  const [newSkill, setNewSkill] = useState<string>('');
  const [newAchievement, setNewAchievement] = useState<string>('');
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];
  const updatePersonal = useCallback((field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  }, []);
  const updateExperience = useCallback((id: number, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  }, []);
  const addExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        id: uniqueId(), 
        title: '', 
        company: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        current: false, 
        description: '' 
      }]
    }));
  }, []);
  const removeExperience = useCallback((id: number) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  }, []);
  const updateEducation = useCallback((id: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  }, []);
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { 
        id: uniqueId(), 
        degree: '', 
        school: '', 
        location: '', 
        graduationDate: '', 
        gpa: '' 
      }]
    }));
  }, []);
  const removeEducation = useCallback((id: number) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  }, []);
  const addSkill = useCallback(() => {
    if (newSkill.trim()) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  }, [newSkill]);
  const removeSkill = useCallback((index: number) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  }, []);
  const addAchievement = useCallback(() => {
    if (newAchievement.trim()) {
      setResumeData(prev => ({ ...prev, achievements: [...prev.achievements, newAchievement.trim()] }));
      setNewAchievement('');
    }
  }, [newAchievement]);
  const removeAchievement = useCallback((index: number) => {
    setResumeData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  }, []);
  const generateAISuggestion = useCallback((type: 'summary' | 'description') => {
    const suggestions = {
      summary: "Results-driven professional with over 5 years of experience in software development, specializing in creating high-impact solutions and optimizing user experiences. Proven ability to lead cross-functional teams and exceed project targets.",
      description: "• Spearheaded the development of a new client-facing feature, resulting in a 15% increase in user engagement.\n• Implemented agile methodologies that improved team productivity by 25%.\n• Mentored junior developers, fostering a culture of continuous learning and growth."
    };
    return suggestions[type];
  }, []);
  const downloadPDF = useCallback(async () => {
    if (!resumeRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const resumeHTML = `
      <!DOCTYPE html><html><head><title>${resumeData.personal.fullName || 'Resume'}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #111827; background: white; -webkit-print-color-adjust: exact; }
        .resume { max-width: 800px; margin: 0 auto; padding: 40px; }
        h1 { font-size: 2.25rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
        .contact-info { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 24px; font-size: 0.875rem; color: #4b5563; margin-top: 12px; }
        .contact-info > div { display: flex; align-items: center; }
        .contact-info svg { width: 14px; height: 14px; margin-right: 6px; }
        .header { text-align: center; margin-bottom: 2rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 1.5rem; }
        .section { margin-bottom: 1.75rem; }
        .section-title { font-size: 1.125rem; font-weight: 600; color: #059669; margin-bottom: 1rem; border-bottom: 1px solid #d1d5db; padding-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        h3 { font-size: 1rem; font-weight: 600; color: #1f2937; margin-bottom: 2px; }
        .meta-info { font-size: 0.875rem; color: #4b5563; margin-bottom: 8px; }
        .description { color: #374151; white-space: pre-line; font-size: 0.95rem; }
        .skills-container { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { background-color: #f0fdf4; color: #15803d; padding: 4px 12px; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;}
        ul { list-style-type: disc; margin-left: 20px; font-size: 0.95rem; } li { margin-bottom: 5px; }
        .item { margin-bottom: 1.25rem; }
      </style></head><body><div class="resume">${resumeRef.current.innerHTML}</div></body></html>
    `;
    printWindow.document.write(resumeHTML);
    printWindow.document.close();
    printWindow.onload = () => { setTimeout(() => { printWindow.print(); printWindow.close(); }, 300); };
  }, [resumeData.personal.fullName]);
  const Input = React.memo<{ 
    label: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    placeholder?: string; 
    type?: string; 
    disabled?: boolean 
  }>(({ label, value, onChange, placeholder = '', type = 'text', disabled = false }) => (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        disabled={disabled}
        className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none disabled:bg-gray-200 transition-colors caret-green-600"
      />
    </div>
  ));
  const Textarea = React.memo<{ 
    label: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
    placeholder?: string; 
    rows?: number; 
    aiClick?: () => void; 
  }>(({ label, value, onChange, placeholder = '', rows = 4, aiClick }) => (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {aiClick && (
          <button 
            type="button" 
            onClick={aiClick} 
            className="flex items-center text-green-600 text-xs font-semibold hover:text-green-700"
          >
            <Sparkles className="w-3 h-3 mr-1" /> AI Suggest
          </button>
        )}
      </div>
      <textarea 
        rows={rows} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none resize-vertical transition-colors caret-green-600"
      />
    </div>
  ));
  const PersonalInfoSection = React.memo(() => (
    <div className="space-y-4">
      <Input 
        label="Full Name *" 
        value={resumeData.personal.fullName} 
        onChange={e => updatePersonal('fullName', e.target.value)} 
        placeholder="John Doe" 
      />
      <Input 
        label="Email *" 
        type="email" 
        value={resumeData.personal.email} 
        onChange={e => updatePersonal('email', e.target.value)} 
        placeholder="john.doe@email.com" 
      />
      <Input 
        label="Phone Number" 
        type="tel" 
        value={resumeData.personal.phone} 
        onChange={e => updatePersonal('phone', e.target.value)} 
        placeholder="+1 234 567 890" 
      />
      <Input 
        label="Location" 
        value={resumeData.personal.location} 
        onChange={e => updatePersonal('location', e.target.value)} 
        placeholder="New York, NY" 
      />
      <Input 
        label="Website/Portfolio" 
        type="url" 
        value={resumeData.personal.website} 
        onChange={e => updatePersonal('website', e.target.value)} 
        placeholder="https://johndoe.dev" 
      />
      <Textarea 
        label="Professional Summary" 
        value={resumeData.personal.summary} 
        onChange={e => updatePersonal('summary', e.target.value)} 
        placeholder="A brief summary of your career..." 
        rows={5} 
        aiClick={() => updatePersonal('summary', generateAISuggestion('summary'))} 
      />
    </div>
  ));
  const ExperienceSection = React.memo(() => (
    <div className="space-y-6">
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="bg-white rounded-lg p-5 border border-gray-200 relative space-y-4">
          {resumeData.experience.length > 1 && (
            <button 
              onClick={() => removeExperience(exp.id)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
          <Input 
            label="Job Title *" 
            value={exp.title} 
            onChange={e => updateExperience(exp.id, 'title', e.target.value)} 
            placeholder="Software Engineer" 
          />
          <Input 
            label="Company *" 
            value={exp.company} 
            onChange={e => updateExperience(exp.id, 'company', e.target.value)} 
            placeholder="Tech Solutions Inc." 
          />
          <Input 
            label="Location" 
            value={exp.location} 
            onChange={e => updateExperience(exp.id, 'location', e.target.value)} 
            placeholder="San Francisco, CA" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              type="month" 
              value={exp.startDate} 
              onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} 
            />
            <Input 
              label="End Date" 
              type="month" 
              value={exp.endDate} 
              onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} 
              disabled={exp.current} 
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={exp.current} 
              onChange={e => updateExperience(exp.id, 'current', e.target.checked)} 
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
            />
            Currently work here
          </label>
          <Textarea 
            label="Description & Achievements" 
            value={exp.description} 
            onChange={e => updateExperience(exp.id, 'description', e.target.value)} 
            placeholder="Describe your responsibilities and achievements..." 
            rows={5} 
            aiClick={() => updateExperience(exp.id, 'description', generateAISuggestion('description'))} 
          />
        </div>
      ))}
      <button 
        onClick={addExperience} 
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
      >
        <Plus size={16} /> Add Experience
      </button>
    </div>
  ));
  const EducationSection = React.memo(() => (
    <div className="space-y-6">
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="bg-white rounded-lg p-5 border border-gray-200 relative space-y-4">
          {resumeData.education.length > 1 && (
            <button 
              onClick={() => removeEducation(edu.id)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
          <Input 
            label="Degree/Qualification *" 
            value={edu.degree} 
            onChange={e => updateEducation(edu.id, 'degree', e.target.value)} 
            placeholder="B.Sc. in Computer Science" 
          />
          <Input 
            label="School/University *" 
            value={edu.school} 
            onChange={e => updateEducation(edu.id, 'school', e.target.value)} 
            placeholder="University of Technology" 
          />
          <Input 
            label="Location" 
            value={edu.location} 
            onChange={e => updateEducation(edu.id, 'location', e.target.value)} 
            placeholder="California, USA" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Graduation Date" 
              type="month" 
              value={edu.graduationDate} 
              onChange={e => updateEducation(edu.id, 'graduationDate', e.target.value)} 
            />
            <Input 
              label="GPA (Optional)" 
              value={edu.gpa} 
              onChange={e => updateEducation(edu.id, 'gpa', e.target.value)} 
              placeholder="3.8 / 4.0" 
            />
          </div>
        </div>
      ))}
      <button 
        onClick={addEducation} 
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
      >
        <Plus size={16} /> Add Education
      </button>
    </div>
  ));
  const SkillsSection = React.memo(() => (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input 
          value={newSkill} 
          onChange={e => setNewSkill(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && addSkill()} 
          placeholder="e.g., JavaScript" 
          className="flex-grow px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors caret-green-600"
        />
        <button 
          type="button" 
          onClick={addSkill} 
          className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {resumeData.skills.map((skill, i) => (
          <span key={`skill-${i}`} className="flex items-center gap-1.5 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {skill} 
            <button 
              type="button" 
              onClick={() => removeSkill(i)} 
              className="text-green-600 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        {resumeData.skills.length === 0 && (
          <p className="text-sm text-gray-500 italic">No skills added yet.</p>
        )}
      </div>
    </div>
  ));
  const AchievementsSection = React.memo(() => (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input 
          value={newAchievement} 
          onChange={e => setNewAchievement(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && addAchievement()} 
          placeholder="e.g., Won 'Best Project' award" 
          className="flex-grow px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors caret-green-600"
        />
        <button 
          type="button" 
          onClick={addAchievement} 
          className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {resumeData.achievements.map((ach, i) => (
          <li key={`achievement-${i}`} className="flex justify-between items-center text-sm">
            <span>{ach}</span> 
            <button 
              type="button" 
              onClick={() => removeAchievement(i)} 
              className="text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </li>
        ))}
        {resumeData.achievements.length === 0 && (
          <p className="text-sm text-gray-500 italic">No achievements added yet.</p>
        )}
      </ul>
    </div>
  ));
  const ResumePreview = React.memo(() => (
    <div className="p-8 md:p-12" ref={resumeRef}>
      <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {resumeData.personal.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
          {resumeData.personal.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} /> {resumeData.personal.email}
            </div>
          )}
          {resumeData.personal.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} /> {resumeData.personal.phone}
            </div>
          )}
          {resumeData.personal.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} /> {resumeData.personal.location}
            </div>
          )}
          {resumeData.personal.website && (
            <div className="flex items-center gap-1">
              <Globe size={14} /> {resumeData.personal.website}
            </div>
          )}
        </div>
      </div>
      
      {resumeData.personal.summary && (
        <div className="mb-7">
          <h2 className="text-lg font-semibold text-green-600 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {resumeData.personal.summary}
          </p>
        </div>
      )}
      
      {resumeData.experience.some(e => e.title) && (
        <div className="mb-7">
          <h2 className="text-lg font-semibold text-green-600 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Experience
          </h2>
          {resumeData.experience.filter(e => e.title).map(exp => (
            <div key={exp.id} className="mb-5">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {exp.title} at {exp.company}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.education.some(e => e.school) && (
        <div className="mb-7">
          <h2 className="text-lg font-semibold text-green-600 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Education
          </h2>
          {resumeData.education.filter(e => e.school).map(edu => (
            <div key={edu.id} className="mb-5">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {edu.degree} - {edu.school}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {edu.graduationDate} | {edu.location}
              </p>
              {edu.gpa && (
                <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.skills.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-semibold text-green-600 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, i) => (
              <span key={`preview-skill-${i}`} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {resumeData.achievements.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-semibold text-green-600 uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">
            Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {resumeData.achievements.map((ach, i) => (
              <li key={`preview-achievement-${i}`}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ));
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-24 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg mb-8 lg:mb-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Resume Editor</h1>
              <button 
                onClick={downloadPDF} 
                className="flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
              {sections.map(section => (
                <button 
                  key={section.id} 
                  onClick={() => setActiveSection(section.id as SectionId)} 
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full font-semibold ${
                    activeSection === section.id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  <section.icon size={16} /> {section.label}
                </button>
              ))}
            </div>
            
            <div>
              {activeSection === 'personal' && <PersonalInfoSection />}
              {activeSection === 'experience' && <ExperienceSection />}
              {activeSection === 'education' && <EducationSection />}
              {activeSection === 'skills' && <SkillsSection />}
              {activeSection === 'achievements' && <AchievementsSection />}
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="lg:sticky top-24">
              <div className="h-[calc(100vh-120px)] w-full bg-white rounded-2xl shadow-lg overflow-y-auto border border-gray-200">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ResumeBuilder;