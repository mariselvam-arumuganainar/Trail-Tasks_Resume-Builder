"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { cn } from "@/lib/utils";

const templates = [
  { id: "modern", name: "Modern", description: "Clean and contemporary" },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional corporate style",
  },
  { id: "creative", name: "Creative", description: "Bold and artistic" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant" },
] as const;

export default function TemplateSelector() {
  const { resumeData, updateTemplate } = useResumeStore();

  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((template) => (
        <motion.button
          key={template.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => updateTemplate(template.id)}
          className={cn(
            "relative p-4 rounded-lg border-2 text-left transition-all",
            resumeData.template === template.id
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          )}
        >
          {resumeData.template === template.id && (
            <motion.div
              layoutId="selected-template"
              className="absolute top-2 right-2 p-1 rounded-full bg-indigo-500 text-white"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            >
              <Check className="w-3 h-3" />
            </motion.div>
          )}
          <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
          <p className="text-xs text-muted-foreground">
            {template.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
