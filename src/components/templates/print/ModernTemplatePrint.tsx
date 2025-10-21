"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplatePrint({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } =
    data;
  const { theme } = data;

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        width: "100%",
        minHeight: "100%",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: "8px",
          borderRadius: "9999px",
          flexShrink: 0,
          background: `linear-gradient(to bottom, ${theme.primaryColor}, ${theme.secondaryColor})`,
          minHeight: "1000px",
        }}
      />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: `2px solid ${theme.primaryColor}`,
            paddingBottom: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: theme.primaryColor,
              margin: "0 0 8px 0",
            }}
          >
            {personalInfo.fullName}
          </h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "16px" }}>✉</span>
              <span>{personalInfo.email}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "16px" }}>☎</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "16px" }}>📍</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              margin: 0,
              color: "#334155",
            }}
          >
            {summary}
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: theme.primaryColor,
              margin: "0 0 12px 0",
            }}
          >
            Experience
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {experience.map((exp) => (
              <div key={exp.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        margin: "0 0 4px 0",
                        color: "#1e293b",
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: theme.secondaryColor,
                        margin: 0,
                        fontWeight: "500",
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    margin: "8px 0 0 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "#475569",
                  }}
                >
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginBottom: "4px" }}>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: theme.primaryColor,
              margin: "0 0 12px 0",
            }}
          >
            Education
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {education.map((edu) => (
              <div key={edu.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h3
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        margin: "0 0 4px 0",
                        color: "#1e293b",
                      }}
                    >
                      {edu.institution}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: 0,
                        color: "#475569",
                      }}
                    >
                      {edu.degree} in {edu.field}
                    </p>
                    {edu.gpa && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          margin: "2px 0 0 0",
                        }}
                      >
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
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
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: theme.primaryColor,
              margin: "0 0 12px 0",
            }}
          >
            Skills
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {skills
              .flatMap((s) => s.items)
              .map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    backgroundColor: `${theme.primaryColor}22`,
                    color: theme.primaryColor,
                    display: "inline-block",
                  }}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: theme.primaryColor,
                margin: "0 0 12px 0",
              }}
            >
              Projects
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {projects.map((project) => (
                <div key={project.id}>
                  <h3
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      margin: "0 0 4px 0",
                      color: "#1e293b",
                    }}
                  >
                    {project.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#475569",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "12px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            backgroundColor: `${theme.secondaryColor}22`,
                            color: theme.secondaryColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
