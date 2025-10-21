"use client";

import { motion } from "framer-motion";
import { FileText, Download, Share2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { fadeIn } from "@/lib/animations";
import { useResumeStore } from "@/store/useResumeStore";
import { downloadResumePDF } from "@/lib/pdfExport";
import { shareResume } from "@/lib/shareUtils";
import { toast } from "sonner";
import { useState } from "react";

export default function Header() {
  const { resumeData, saveResume, exportResumeJSON } = useResumeStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    toast.loading("Generating PDF...", { id: "pdf-download" });

    try {
      await downloadResumePDF(
        `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`
      );
      toast.success("Resume downloaded successfully!", { id: "pdf-download" });
    } catch (error) {
      toast.error("Failed to download PDF", { id: "pdf-download" });
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = () => {
    const name = prompt(
      "Enter a name for this resume:",
      `Resume_${new Date().toLocaleDateString()}`
    );
    if (name) {
      saveResume(name);
      toast.success(`Resume "${name}" saved successfully!`);
    }
  };

  const handleShare = async () => {
    try {
      await shareResume(resumeData);
      toast.success("Shared successfully!");
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleExportJSON = () => {
    const json = exportResumeJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName}_Resume_Data.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Resume data exported!");
  };

  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="border-b border-white/10 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                Resume Builder Pro
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Career Ecosystem Platform
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
