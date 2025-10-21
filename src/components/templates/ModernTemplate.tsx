"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Trash2, Plus } from "lucide-react";
import EditableText from "../shared/EditableText";
import EditableList from "../shared/EditableList";
import { useResumeStore } from "@/store/useResumeStore";

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } =
    data;
  const { theme } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    removeExperience,
    removeEducation,
  } = useResumeStore();

  return (
    <div className="flex gap-6 h-full">
      {/* Left accent bar */}
      <div
        className="w-2 rounded-full flex-shrink-0"
        style={{
          background: `linear-gradient(to bottom, ${theme.primaryColor}, ${theme.secondaryColor})`,
        }}
      />

      {/* Main content */}
      <div className="flex-1 space-y-6">
        {/* Header - Editable */}
        <div
          className="border-b-2 pb-4"
          style={{ borderColor: theme.primaryColor }}
        >
          <EditableText
            value={personalInfo.fullName}
            onChange={(value) => updatePersonalInfo({ fullName: value })}
            className="text-4xl font-bold mb-2"
            style={{ color: theme.primaryColor }}
          />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <EditableText
                value={personalInfo.email}
                onChange={(value) => updatePersonalInfo({ email: value })}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <EditableText
                value={personalInfo.phone}
                onChange={(value) => updatePersonalInfo({ phone: value })}
                className="text-sm"
              />
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <EditableText
                value={personalInfo.location}
                onChange={(value) => updatePersonalInfo({ location: value })}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Summary - Editable */}
        <div>
          <EditableText
            value={summary}
            onChange={updateSummary}
            className="text-sm leading-relaxed"
            multiline
            placeholder="Add your professional summary here..."
          />
        </div>

        {/* Experience - Editable */}
        <div>
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: theme.primaryColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="group relative">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 dark:bg-red-900/20 rounded hover:bg-red-200"
                  title="Delete experience"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>

                <div className="flex justify-between mb-1">
                  <div className="flex-1">
                    <EditableText
                      value={exp.position}
                      onChange={(value) =>
                        updateExperience(exp.id, { position: value })
                      }
                      className="font-semibold"
                      placeholder="Position title"
                    />
                    <EditableText
                      value={exp.company}
                      onChange={(value) =>
                        updateExperience(exp.id, { company: value })
                      }
                      className="text-sm"
                      style={{ color: theme.secondaryColor }}
                      placeholder="Company name"
                    />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <EditableList
                  items={exp.description}
                  onChange={(items) =>
                    updateExperience(exp.id, { description: items })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Education - Editable */}
        <div>
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: theme.primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="group relative">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 dark:bg-red-900/20 rounded hover:bg-red-200"
                  title="Delete education"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>

                <div className="flex justify-between">
                  <div className="flex-1">
                    <EditableText
                      value={edu.institution}
                      onChange={(value) =>
                        updateEducation(edu.id, { institution: value })
                      }
                      className="font-semibold"
                      placeholder="Institution name"
                    />
                    <div className="flex gap-2 text-sm">
                      <EditableText
                        value={edu.degree}
                        onChange={(value) =>
                          updateEducation(edu.id, { degree: value })
                        }
                        placeholder="Degree"
                      />
                      <span>in</span>
                      <EditableText
                        value={edu.field}
                        onChange={(value) =>
                          updateEducation(edu.id, { field: value })
                        }
                        placeholder="Field of study"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: theme.primaryColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills
              .flatMap((s) => s.items)
              .map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: `${theme.primaryColor}15`,
                    color: theme.primaryColor,
                  }}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {/* Projects - Editable */}
        {projects && projects.length > 0 && (
          <div>
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: theme.primaryColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <EditableText
                    value={project.name}
                    onChange={(value) => {
                      // Update project logic here
                    }}
                    className="font-semibold text-base"
                    placeholder="Project name"
                  />
                  <EditableText
                    value={project.description}
                    onChange={(value) => {
                      // Update project logic here
                    }}
                    className="text-sm text-slate-700 dark:text-slate-300"
                    multiline
                    placeholder="Project description"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
