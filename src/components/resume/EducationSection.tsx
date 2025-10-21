"use client";

import { motion } from "framer-motion";
import { Education, ResumeTheme } from "@/types/resume";
import { formatDate } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface EducationSectionProps {
  items: Education[];
  theme: ResumeTheme;
}

export default function EducationSection({
  items,
  theme,
}: EducationSectionProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-6">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: theme.primaryColor }}
      >
        Education
      </h2>
      <div className="space-y-4">
        {items.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-base">{edu.institution}</h3>
                <p className="text-sm">
                  {edu.degree} in {edu.field}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </span>
            </div>
            {edu.achievements.length > 0 && (
              <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300">
                {edu.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
