"use client";

import { motion } from "framer-motion";
import { Project, ResumeTheme } from "@/types/resume";
import { fadeInUp } from "@/lib/animations";
import { ExternalLink } from "lucide-react";

interface ProjectsSectionProps {
  items: Project[];
  theme: ResumeTheme;
}

export default function ProjectsSection({
  items,
  theme,
}: ProjectsSectionProps) {
  return (
    <motion.div variants={fadeInUp} className="mb-6">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: theme.primaryColor }}
      >
        Projects
      </h2>
      <div className="space-y-4">
        {items.map((project) => (
          <div key={project.id}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-base">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  className="text-sm"
                  style={{ color: theme.secondaryColor }}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md"
                  style={{
                    backgroundColor: `${theme.secondaryColor}15`,
                    color: theme.secondaryColor,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
