"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "@/store/useResumeStore";
import CustomizationPanel from "./CustomizationPanel";
import ResumePreview from "./ResumePreview";
import Header from "./Header";
import { staggerContainer, slideIn } from "@/lib/animations";

export default function BuilderLayout() {
  const { resumeData } = useResumeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
      <Header />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Customization Panel - Left */}
          <motion.div
            variants={slideIn}
            className="lg:col-span-5 xl:col-span-4 overflow-y-auto custom-scrollbar"
          >
            <div className="sticky top-0 glass-light dark:glass rounded-2xl shadow-2xl p-6">
              <CustomizationPanel />
            </div>
          </motion.div>

          {/* Resume Preview - Right */}
          <motion.div
            variants={slideIn}
            className="lg:col-span-7 xl:col-span-8 flex items-center justify-center overflow-hidden"
          >
            <div className="w-full max-w-[850px] h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <ResumePreview key={resumeData.template} data={resumeData} />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
