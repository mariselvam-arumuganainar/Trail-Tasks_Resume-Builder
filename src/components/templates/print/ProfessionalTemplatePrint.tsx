"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplatePrint({ data }: TemplateProps) {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    certifications,
  } = data;

  return (
    <div className="space-y-5">
      {/* Header - Centered */}
      <div className="text-center pb-4 border-b-2 border-slate-800">
        <h1 className="text-3xl font-bold mb-3 uppercase tracking-wide text-slate-900">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300">
          Professional Summary
        </h2>
        <p className="text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.position}</h3>
                <span className="text-xs text-slate-600 italic">
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-sm font-semibold mb-1 text-slate-700">
                {exp.company}
              </p>
              <ul className="list-disc list-outside ml-5 text-sm space-y-0.5">
                {exp.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">
                {edu.degree} in {edu.field}
              </h3>
              <span className="text-xs text-slate-600 italic">
                {formatDate(edu.endDate)}
              </span>
            </div>
            <p className="text-sm">{edu.institution}</p>
            {edu.gpa && (
              <p className="text-xs text-slate-600">GPA: {edu.gpa}</p>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300">
          Core Competencies
        </h2>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {skills
            .flatMap((s) => s.items)
            .map((skill, idx) => (
              <div key={idx} className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
                {skill}
              </div>
            ))}
        </div>
      </div>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300">
            Certifications
          </h2>
          <div className="space-y-1 text-sm">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <span className="font-semibold">{cert.name}</span> -{" "}
                {cert.issuer}, {cert.date}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
