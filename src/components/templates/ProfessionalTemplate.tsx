"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import EditableText from "../shared/EditableText";
import EditableList from "../shared/EditableList";
import { useResumeStore } from "@/store/useResumeStore";

interface TemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: TemplateProps) {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    certifications,
  } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    removeExperience,
    removeEducation,
  } = useResumeStore();

  return (
    <div className="space-y-5">
      {/* Header - Centered & Editable */}
      <div className="text-center pb-4 border-b-2 border-slate-800 dark:border-slate-300">
        <EditableText
          value={personalInfo.fullName}
          onChange={(value) => updatePersonalInfo({ fullName: value })}
          className="text-3xl font-bold mb-3 uppercase tracking-wide text-slate-900 dark:text-white"
          placeholder="Your Full Name"
        />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
          <EditableText
            value={personalInfo.email}
            onChange={(value) => updatePersonalInfo({ email: value })}
            placeholder="email@example.com"
          />
          <span>•</span>
          <EditableText
            value={personalInfo.phone}
            onChange={(value) => updatePersonalInfo({ phone: value })}
            placeholder="Phone"
          />
          <span>•</span>
          <EditableText
            value={personalInfo.location}
            onChange={(value) => updatePersonalInfo({ location: value })}
            placeholder="Location"
          />
        </div>
      </div>

      {/* Professional Summary - Editable */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300 dark:border-slate-700">
          Professional Summary
        </h2>
        <EditableText
          value={summary}
          onChange={updateSummary}
          className="text-sm leading-relaxed"
          multiline
          placeholder="Add your professional summary..."
        />
      </div>

      {/* Experience - Editable */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300 dark:border-slate-700">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="group relative">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 dark:bg-red-900/20 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>

              <div className="flex justify-between items-baseline mb-1">
                <EditableText
                  value={exp.position}
                  onChange={(value) =>
                    updateExperience(exp.id, { position: value })
                  }
                  className="font-bold text-base"
                  placeholder="Position Title"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 italic">
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <EditableText
                value={exp.company}
                onChange={(value) =>
                  updateExperience(exp.id, { company: value })
                }
                className="text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300"
                placeholder="Company Name"
              />
              <EditableList
                items={exp.description}
                onChange={(items) =>
                  updateExperience(exp.id, { description: items })
                }
                className="ml-5"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Education - Editable */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300 dark:border-slate-700">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2 group relative">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 dark:bg-red-900/20 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>

            <div className="flex justify-between items-baseline">
              <div className="flex gap-2">
                <EditableText
                  value={edu.degree}
                  onChange={(value) =>
                    updateEducation(edu.id, { degree: value })
                  }
                  className="font-bold text-base"
                  placeholder="Degree"
                />
                <span>in</span>
                <EditableText
                  value={edu.field}
                  onChange={(value) =>
                    updateEducation(edu.id, { field: value })
                  }
                  className="font-bold text-base"
                  placeholder="Field"
                />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 italic">
                {formatDate(edu.endDate)}
              </span>
            </div>
            <EditableText
              value={edu.institution}
              onChange={(value) =>
                updateEducation(edu.id, { institution: value })
              }
              className="text-sm"
              placeholder="Institution Name"
            />
            {edu.gpa && (
              <EditableText
                value={`GPA: ${edu.gpa}`}
                onChange={(value) =>
                  updateEducation(edu.id, { gpa: value.replace("GPA: ", "") })
                }
                className="text-xs text-slate-600 dark:text-slate-400"
              />
            )}
          </div>
        ))}
      </div>

      {/* Skills - Editable Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300 dark:border-slate-700">
          Core Competencies
        </h2>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {skills
            .flatMap((s) => s.items)
            .map((skill, idx) => (
              <div key={idx} className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-300 mr-2" />
                <EditableText
                  value={skill}
                  onChange={(value) => {
                    // Handle skill update
                  }}
                  className="text-sm"
                  placeholder="Skill"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Certifications - Editable */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-300 dark:border-slate-700">
            Certifications
          </h2>
          <div className="space-y-1 text-sm">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex gap-2">
                <EditableText
                  value={cert.name}
                  onChange={(value) => {
                    // Update cert logic
                  }}
                  className="font-semibold"
                  placeholder="Certification Name"
                />
                <span>-</span>
                <EditableText
                  value={cert.issuer}
                  onChange={(value) => {
                    // Update cert issuer
                  }}
                  placeholder="Issuer"
                />
                <span>,</span>
                <span>{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
