"use client";

import { motion } from "framer-motion";
import { Skill, ResumeTheme } from "@/types/resume";
import { fadeInUp } from "@/lib/animations";

interface SkillsSectionProps {
  skills: Skill[];
  theme: ResumeTheme;
}

export default function SkillsSection({ skills, theme }: SkillsSectionProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-6">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: theme.primaryColor }}
      >
        Skills
      </h2>
      <div className="space-y-3">
        {skills.map((skillGroup, idx) => (
          <div key={idx}>
            <h3
              className="font-semibold text-sm mb-2"
              style={{ color: theme.secondaryColor }}
            >
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-sm rounded-lg font-medium"
                  style={{
                    backgroundColor: `${theme.primaryColor}15`,
                    color: theme.primaryColor,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
