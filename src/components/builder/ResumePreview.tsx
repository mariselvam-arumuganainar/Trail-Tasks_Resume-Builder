"use client";

import { motion } from "framer-motion";
import { Download, Share2, ZoomIn } from "lucide-react";
import { ResumeData } from "@/types/resume";
import ModernTemplate from "../templates/ModernTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const previewVariants = {
    enter: { opacity: 0, scale: 0.95, rotateY: -10 },
    center: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      rotateY: 10,
      transition: { duration: 0.3 },
    },
  };

  const renderTemplate = () => {
    switch (data.template) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Floating Actions */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute -top-16 right-0 flex gap-3 z-10"
      >
        {[
          { icon: Download, label: "Download" },
          { icon: Share2, label: "Share" },
          { icon: ZoomIn, label: "Preview" },
        ].map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-3 rounded-xl glass-light dark:glass shadow-lg hover:shadow-xl"
          >
            <action.icon className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Resume Canvas */}
      <motion.div
        key={data.template}
        variants={previewVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="relative w-full aspect-[8.5/11] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
        style={{
          fontSize: `${data.theme.fontSize}px`,
          fontFamily: data.theme.fontFamily,
          lineHeight: data.theme.lineHeight,
        }}
      >
        <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none" />

        {/* Content - THIS IS WHAT GETS CAPTURED FOR PDF */}
        <div className="resume-canvas-content h-full overflow-y-auto custom-scrollbar p-12">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {renderTemplate()}
          </motion.div>
        </div>

        {/* Gradient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5" />
      </motion.div>
    </div>
  );
}
