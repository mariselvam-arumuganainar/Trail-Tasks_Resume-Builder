"use client";

import { motion } from "framer-motion";
import { Palette, Type, Layout, Sparkles, FileText } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ColorPicker from "../controls/ColorPicker";
import FontSelector from "../controls/FontSelector";
import TemplateSelector from "./TemplateSelector";
import { fadeInUp } from "@/lib/animations";

export default function CustomizationPanel() {
  const sections = [
    {
      id: "template",
      icon: FileText,
      title: "Template",
      description: "Choose your resume style",
      component: <TemplateSelector />,
    },
    {
      id: "colors",
      icon: Palette,
      title: "Color Theme",
      description: "Customize your palette",
      component: <ColorPicker />,
    },
    {
      id: "typography",
      icon: Type,
      title: "Typography",
      description: "Font and sizing",
      component: <FontSelector />,
    },
    {
      id: "layout",
      icon: Layout,
      title: "Layout",
      description: "Structure and spacing",
      component: (
        <div className="text-sm text-muted-foreground">
          Layout controls coming soon...
        </div>
      ),
    },
    {
      id: "ai",
      icon: Sparkles,
      title: "AI Suggestions",
      description: "Smart optimization",
      component: (
        <div className="text-sm text-muted-foreground">
          AI features coming soon...
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="pb-4 border-b border-white/10"
      >
        <h2 className="text-2xl font-bold gradient-text">Customize Resume</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Real-time preview updates as you edit
        </p>
      </motion.div>

      {/* Control Sections */}
      <Accordion
        type="single"
        collapsible
        defaultValue="template"
        className="space-y-3"
      >
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <AccordionItem
              value={section.id}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-white/5 rounded-xl overflow-hidden hover:border-indigo-400/50 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline group">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white group-hover:scale-110 transition-transform">
                    <section.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-sm font-semibold">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-5 pb-4">
                <div className="pt-2">{section.component}</div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
}
