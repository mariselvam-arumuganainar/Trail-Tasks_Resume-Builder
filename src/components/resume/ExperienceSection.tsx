"use client";

import { motion } from "framer-motion";
import { Experience, ResumeTheme } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface ExperienceSectionProps {
  items: Experience[];
  theme: ResumeTheme;
}

export default function ExperienceSection({
  items,
  theme,
}: ExperienceSectionProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-6">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: theme.primaryColor }}
      >
        Experience
      </h2>
      <div className="space-y-5">
        {items.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-base">{exp.position}</h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: theme.secondaryColor }}
                >
                  {exp.company}
                </p>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {formatDate(exp.startDate)} -{" "}
                {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
              {exp.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
            {exp.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md"
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
