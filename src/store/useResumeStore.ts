import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ResumeTheme } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  savedResumes: { id: string; name: string; data: ResumeData; savedAt: string }[];
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateTheme: (theme: Partial<ResumeTheme>) => void;
  updateTemplate: (template: ResumeData['template']) => void;
  addExperience: (experience: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  updateSummary: (summary: string) => void;
  saveResume: (name: string) => void;
  loadResume: (id: string) => void;
  deleteResume: (id: string) => void;
  exportResumeJSON: () => string;
  importResumeJSON: (jsonString: string) => void;
}

const initialResumeData: ResumeData = {
  template: 'modern',
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    portfolio: 'https://johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },
  summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Full Stack Developer',
      startDate: '2021-01',
      endDate: '2024-10',
      current: true,
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored team of 5 junior developers',
      ],
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8',
      achievements: ['Dean\'s List', 'CS Excellence Award'],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Resume Builder Pro',
      description: 'Next-gen resume builder with AI-powered content suggestions',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand'],
      github: 'github.com/johndoe/resume-builder',
    },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-06',
    },
  ],
  theme: {
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6',
    accentColor: '#06B6D4',
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 1.6,
    spacing: 1,
  },
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: initialResumeData,
      savedResumes: [],

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      updateTheme: (theme) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            theme: { ...state.resumeData.theme, ...theme },
          },
        })),

      updateTemplate: (template) =>
        set((state) => ({
          resumeData: { ...state.resumeData, template },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      // Save current resume
      saveResume: (name) =>
        set((state) => {
          const newResume = {
            id: Date.now().toString(),
            name,
            data: state.resumeData,
            savedAt: new Date().toISOString(),
          };
          return {
            savedResumes: [...state.savedResumes, newResume],
          };
        }),

      // Load saved resume
      loadResume: (id) =>
        set((state) => {
          const resume = state.savedResumes.find((r) => r.id === id);
          if (resume) {
            return { resumeData: resume.data };
          }
          return state;
        }),

      // Delete saved resume
      deleteResume: (id) =>
        set((state) => ({
          savedResumes: state.savedResumes.filter((r) => r.id !== id),
        })),

      // Export as JSON
      exportResumeJSON: () => {
        return JSON.stringify(get().resumeData, null, 2);
      },

      // Import from JSON
      importResumeJSON: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          set({ resumeData: data });
        } catch (error) {
          console.error('Invalid JSON:', error);
        }
      },
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        resumeData: state.resumeData,
        savedResumes: state.savedResumes,
      }),
    }
  )
);
