"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin, Sparkles, Trash2 } from "lucide-react";
import EditableText from "../shared/EditableText";
import EditableList from "../shared/EditableList";
import { useResumeStore } from "@/store/useResumeStore";

interface TemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } =
    data;
  const { theme } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    removeExperience,
  } = useResumeStore();

  return (
    <div>
      {/* Bold Header with Background - Editable */}
      <div
        className="relative -mx-12 -mt-12 mb-6 p-8 pb-6"
        style={{
          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-white">
          <EditableText
            value={personalInfo.fullName}
            onChange={(value) => updatePersonalInfo({ fullName: value })}
            className="text-5xl font-bold mb-2 drop-shadow-lg text-white"
            placeholder="Your Name"
          />
          <EditableText
            value={experience[0]?.position || "Professional"}
            onChange={(value) =>
              updateExperience(experience[0]?.id, { position: value })
            }
            className="text-xl opacity-90 mb-4 text-white"
            placeholder="Your Title"
          />
          <div className="flex flex-wrap gap-4 text-sm text-white">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <EditableText
                value={personalInfo.email}
                onChange={(value) => updatePersonalInfo({ email: value })}
                className="text-white"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <EditableText
                value={personalInfo.phone}
                onChange={(value) => updatePersonalInfo({ phone: value })}
                className="text-white"
                placeholder="Phone"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <EditableText
                value={personalInfo.location}
                onChange={(value) => updatePersonalInfo({ location: value })}
                className="text-white"
                placeholder="Location"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Skills with Progress Bars - Editable */}
          <div>
            <h2
              className="text-lg font-bold mb-3 flex items-center gap-2"
              style={{ color: theme.primaryColor }}
            >
              <Sparkles className="w-5 h-5" />
              Skills
            </h2>
            <div className="space-y-3">
              {skills
                .flatMap((s) => s.items.slice(0, 6))
                .map((skill, idx) => (
                  <div key={idx}>
                    <EditableText
                      value={skill}
                      onChange={(value) => {
                        // Update skill logic
                      }}
                      className="text-sm font-medium mb-1"
                      placeholder="Skill name"
                    />
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${85 + Math.random() * 15}%`,
                          backgroundColor: theme.primaryColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Education - Editable */}
          <div>
            <h2
              className="text-lg font-bold mb-3"
              style={{ color: theme.primaryColor }}
            >
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <EditableText
                  value={edu.degree}
                  onChange={(value) =>
                    updateEducation(edu.id, { degree: value })
                  }
                  className="font-semibold text-sm"
                  placeholder="Degree"
                />
                <EditableText
                  value={edu.institution}
                  onChange={(value) =>
                    updateEducation(edu.id, { institution: value })
                  }
                  className="text-xs text-slate-600 dark:text-slate-400"
                  placeholder="Institution"
                />
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - 2/3 width */}
        <div className="col-span-2 space-y-6">
          {/* About - Editable */}
          <div>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: theme.primaryColor }}
            >
              About Me
            </h2>
            <EditableText
              value={summary}
              onChange={updateSummary}
              className="text-sm leading-relaxed"
              multiline
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Experience - Editable */}
          <div>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: theme.primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-6 border-l-2 group"
                  style={{ borderColor: theme.secondaryColor }}
                >
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute -left-3 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 dark:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </button>

                  <div
                    className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-[7px]"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <EditableText
                        value={exp.position}
                        onChange={(value) =>
                          updateExperience(exp.id, { position: value })
                        }
                        className="font-bold text-base"
                        placeholder="Position"
                      />
                      <EditableText
                        value={exp.company}
                        onChange={(value) =>
                          updateExperience(exp.id, { company: value })
                        }
                        className="text-sm font-semibold"
                        style={{ color: theme.secondaryColor }}
                        placeholder="Company"
                      />
                    </div>
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Now" : formatDate(exp.endDate)}
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

          {/* Projects - Editable */}
          {projects && projects.length > 0 && (
            <div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: theme.primaryColor }}
              >
                Featured Projects
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {projects.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="p-3 rounded-lg border-2"
                    style={{ borderColor: `${theme.primaryColor}30` }}
                  >
                    <EditableText
                      value={project.name}
                      onChange={(value) => {
                        // Update project logic
                      }}
                      className="font-bold text-sm mb-1"
                      placeholder="Project name"
                    />
                    <EditableText
                      value={project.description}
                      onChange={(value) => {
                        // Update project description
                      }}
                      className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2"
                      multiline
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
