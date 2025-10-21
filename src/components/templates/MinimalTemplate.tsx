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

export default function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    removeExperience,
    removeEducation,
  } = useResumeStore();

  const firstName = personalInfo.fullName.split(" ")[0];
  const lastName = personalInfo.fullName.split(" ").slice(1).join(" ");

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header - Ultra minimal & Editable */}
      <div className="space-y-2">
        <EditableText
          value={firstName}
          onChange={(value) =>
            updatePersonalInfo({ fullName: `${value} ${lastName}` })
          }
          className="text-6xl font-light tracking-tight text-slate-900 dark:text-white"
          placeholder="First"
        />
        <EditableText
          value={lastName}
          onChange={(value) =>
            updatePersonalInfo({ fullName: `${firstName} ${value}` })
          }
          className="text-4xl font-light text-slate-500 dark:text-slate-400"
          placeholder="Last Name"
        />
        <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400 pt-2">
          <EditableText
            value={personalInfo.email}
            onChange={(value) => updatePersonalInfo({ email: value })}
            placeholder="email"
          />
          <span>·</span>
          <EditableText
            value={personalInfo.phone}
            onChange={(value) => updatePersonalInfo({ phone: value })}
            placeholder="phone"
          />
          <span>·</span>
          <EditableText
            value={personalInfo.location}
            onChange={(value) => updatePersonalInfo({ location: value })}
            placeholder="location"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-slate-800" />

      {/* Summary - Editable */}
      <div>
        <EditableText
          value={summary}
          onChange={updateSummary}
          className="text-base leading-relaxed text-slate-700 dark:text-slate-300 font-light"
          multiline
          placeholder="Your professional summary..."
        />
      </div>

      {/* Experience - Editable */}
      <div className="space-y-6">
        <h3 className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
          Experience
        </h3>
        {experience.map((exp) => (
          <div key={exp.id} className="space-y-2 group relative">
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 dark:bg-red-900/20 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>

            <div className="flex justify-between items-baseline">
              <EditableText
                value={exp.position}
                onChange={(value) =>
                  updateExperience(exp.id, { position: value })
                }
                className="text-xl font-light text-slate-900 dark:text-white"
                placeholder="Position"
              />
              <span className="text-sm text-slate-500 dark:text-slate-400 font-light">
                {formatDate(exp.startDate)} —{" "}
                {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <EditableText
              value={exp.company}
              onChange={(value) => updateExperience(exp.id, { company: value })}
              className="text-sm text-slate-600 dark:text-slate-400 font-medium"
              placeholder="Company"
            />
            <EditableList
              items={exp.description}
              onChange={(items) =>
                updateExperience(exp.id, { description: items })
              }
              className="font-light"
            />
          </div>
        ))}
      </div>

      {/* Education - Editable */}
      <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
          Education
        </h3>
        {education.map((edu) => (
          <div key={edu.id} className="group relative">
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
                  className="text-lg font-light text-slate-900 dark:text-white"
                  placeholder="Degree"
                />
                <span>,</span>
                <EditableText
                  value={edu.field}
                  onChange={(value) =>
                    updateEducation(edu.id, { field: value })
                  }
                  className="text-lg font-light text-slate-900 dark:text-white"
                  placeholder="Field"
                />
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-light">
                {formatDate(edu.endDate)}
              </span>
            </div>
            <EditableText
              value={edu.institution}
              onChange={(value) =>
                updateEducation(edu.id, { institution: value })
              }
              className="text-sm text-slate-600 dark:text-slate-400"
              placeholder="Institution"
            />
          </div>
        ))}
      </div>

      {/* Skills - Editable */}
      <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
          Skills
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700 dark:text-slate-300 font-light">
          {skills
            .flatMap((s) => s.items)
            .map((skill, idx) => (
              <EditableText
                key={idx}
                value={skill}
                onChange={(value) => {
                  // Update skill logic
                }}
                placeholder="Skill"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
