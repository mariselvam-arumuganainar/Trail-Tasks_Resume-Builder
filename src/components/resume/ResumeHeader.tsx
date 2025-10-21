"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { PersonalInfo, ResumeTheme } from "@/types/resume";
import { fadeInUp } from "@/lib/animations";

interface ResumeHeaderProps {
  data: PersonalInfo;
  summary: string;
  theme: ResumeTheme;
}

export default function ResumeHeader({
  data,
  summary,
  theme,
}: ResumeHeaderProps) {
  const links = [
    { icon: Mail, value: data.email, href: `mailto:${data.email}` },
    { icon: Phone, value: data.phone, href: `tel:${data.phone}` },
    { icon: MapPin, value: data.location },
    { icon: Globe, value: data.portfolio, href: data.portfolio },
    { icon: Linkedin, value: data.linkedin, href: `https://${data.linkedin}` },
    { icon: Github, value: data.github, href: `https://${data.github}` },
  ].filter((link) => link.value);

  return (
    <motion.div
      variants={fadeInUp}
      className="mb-8 pb-6 border-b-2"
      style={{ borderColor: theme.primaryColor }}
    >
      <h1
        className="text-4xl font-bold mb-2"
        style={{ color: theme.primaryColor }}
      >
        {data.fullName}
      </h1>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400 mb-4">
        {links.map((link, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <link.icon className="w-4 h-4" />
            {link.href ? (
              <a href={link.href} className="hover:underline">
                {link.value}
              </a>
            ) : (
              <span>{link.value}</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {summary}
      </p>
    </motion.div>
  );
}
