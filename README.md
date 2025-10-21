# 📝 Trail Task Resume Builder Mariselvam A

> **Next-generation resume builder with AI-powered customization and real-time preview**

A premium career ecosystem platform built with Next.js 15, React 19, and TypeScript. Create beautiful, professional resumes with live editing, multiple templates, and instant PDF export.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **4 Premium Templates**

- **Modern** - Clean two-column layout with gradient accent bar
- **Professional** - Traditional corporate single-column design
- **Creative** - Bold header with visual timeline and sidebar
- **Minimal** - Ultra-clean typography-focused layout

### ⚡ **Real-Time Editing**

- **Inline Editing** - Click any text to edit directly in the preview
- **Live Preview** - See changes instantly as you type
- **Auto-Save** - Changes saved automatically to localStorage
- **Undo/Redo** - Coming soon

### 🎨 **Customization**

- **Color Themes** - 6 pre-designed color palettes
- **Typography** - 6+ font families with size controls
- **Layout Options** - Adjust spacing and structure
- **Dark Mode** - System-aware theme switching

### 📥 **Export & Share**

- **PDF Download** - High-quality PDF generation
- **JSON Export** - Save resume data as JSON
- **Share Link** - Web Share API integration
- **Print-Friendly** - Optimized print layouts

### 💾 **Data Management**

- **LocalStorage Persistence** - Resume data saved locally
- **Multiple Resumes** - Save and manage multiple versions
- **Import/Export** - Backup and restore resume data

## 🚀 Tech Stack

### **Frontend**

- **Framework**: Next.js 15.5.6 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4 + CSS Variables
- **Components**: Shadcn UI + Radix UI
- **Animations**: Framer Motion 11.5

### **State Management**

- **Zustand** 4.5.0 with persist middleware
- **Local Storage** for data persistence

### **PDF Generation**

- **html2canvas** 1.4.1 - HTML to canvas conversion
- **jsPDF** 3.0.3 - PDF generation

### **Additional Libraries**

- **next-themes** 0.3.0 - Theme management
- **lucide-react** 0.447.0 - Icon library
- **sonner** 2.0.7 - Toast notifications
- **react-hook-form** 7.53.0 - Form management

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Clone the Repository

git clone https://github.com/mariselvam-arumuganainar/Trail-Tasks_Resume-Builder.git
cd resume-builder

text

### Install Dependencies

npm install --legacy-peer-deps

text

**Note**: The `--legacy-peer-deps` flag is required due to React 19 peer dependency conflicts with `next-themes@0.3.0`.

### Run Development Server

npm run dev

text

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

resume-builder/
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── layout.tsx # Root layout with providers
│ │ ├── page.tsx # Home page
│ │ └── globals.css # Global styles + Tailwind
│ │
│ ├── components/
│ │ ├── builder/ # Main builder components
│ │ │ ├── BuilderLayout.tsx
│ │ │ ├── Header.tsx
│ │ │ ├── CustomizationPanel.tsx
│ │ │ └── ResumePreview.tsx
│ │ │
│ │ ├── templates/ # Resume templates (editable)
│ │ │ ├── ModernTemplate.tsx
│ │ │ ├── ProfessionalTemplate.tsx
│ │ │ ├── CreativeTemplate.tsx
│ │ │ └── MinimalTemplate.tsx
│ │ │
│ │ ├── controls/ # Customization controls
│ │ │ ├── ColorPicker.tsx
│ │ │ ├── FontSelector.tsx
│ │ │ └── TemplateSelector.tsx
│ │ │
│ │ ├── shared/ # Shared components
│ │ │ ├── EditableText.tsx
│ │ │ ├── EditableList.tsx
│ │ │ └── ThemeToggle.tsx
│ │ │
│ │ └── ui/ # Shadcn UI components
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ └── ... (other UI components)
│ │
│ ├── lib/ # Utility functions
│ │ ├── utils.ts # General utilities
│ │ ├── animations.ts # Framer Motion variants
│ │ ├── pdfExport.ts # PDF generation logic
│ │ └── shareUtils.ts # Web Share API
│ │
│ ├── store/ # Zustand stores
│ │ ├── useResumeStore.ts # Resume data store
│ │ └── useThemeStore.ts # Theme preferences
│ │
│ └── types/ # TypeScript types
│ └── resume.ts # Resume data interfaces
│
├── public/ # Static assets
├── .npmrc # npm configuration
├── netlify.toml # Netlify deployment config
├── next.config.mjs # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── package.json # Dependencies

text

## 🎯 Usage Guide

### Creating a Resume

1. **Enter Personal Information**

   - Click any field in the preview to edit inline
   - All changes save automatically

2. **Add Experience**

   - Click "Add item" to add achievements
   - Use delete button (hover) to remove items

3. **Choose Template**

   - Select from 4 professional templates
   - See changes in real-time

4. **Customize Colors**

   - Pick from 6 color themes
   - Each template adapts colors automatically

5. **Export Resume**
   - Click "Download PDF" for high-quality PDF
   - Use "Save" to keep multiple versions
   - "Share" to send via Web Share API

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mariselvam-arumuganainar/Trail-Tasks_Resume-Builder)

npm install -g vercel
vercel

text

### Deploy to Netlify

**Important**: Due to React 19 peer dependencies, you need special configuration.

1. Add `.npmrc` to your project:
   legacy-peer-deps=true

text

2. Create `netlify.toml`:
   [build]
   command = "npm install --legacy-peer-deps && npm run build"
   publish = ".next"

[build.environment]
NODE_VERSION = "20"
NPM_CONFIG_LEGACY_PEER_DEPS = "true"

[[plugins]]
package = "@netlify/plugin-nextjs"

text

3. Push to GitHub and connect to Netlify

4. Add environment variable in Netlify:
   - Key: `NPM_CONFIG_LEGACY_PEER_DEPS`
   - Value: `true`

## ⚙️ Configuration

### Environment Variables

No environment variables required for basic functionality.

### Customization

#### Adding New Templates

1. Create new template in `src/components/templates/`
2. Import in `ResumePreview.tsx`
3. Add to template selector

#### Changing Color Themes

Edit `src/components/controls/ColorPicker.tsx`:
const colors = [
{ name: 'Your Color', value: 'HEX_CODE' },
// ... more colors
];

text

## 🐛 Known Issues

### Peer Dependency Warnings

React 19 causes peer dependency conflicts with `next-themes@0.3.0`. This doesn't affect functionality. Install with:
npm install --legacy-peer-deps

text

### PDF Export Alignment

Some complex layouts may have minor alignment differences in PDF. We're working on improvements.

## 🗺️ Roadmap

- [ ] AI-powered content suggestions
- [ ] More template options (10+ templates)
- [ ] ATS (Applicant Tracking System) optimization
- [ ] Cloud sync and multi-device support
- [ ] Collaborative editing
- [ ] LinkedIn import
- [ ] Cover letter builder
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Mariselvam Arumuganainar**

- GitHub: [@mariselvam-arumuganainar](https://github.com/mariselvam-arumuganainar)
- Project: [Resume Builder](https://github.com/mariselvam-arumuganainar/Trail-Tasks_Resume-Builder)
  -Netlify: [Resume Builder] (https://resumebuildertrailtaskmariselavm.netlify.app)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

For support, email avmariselvambiz@gmail.com or open an issue on GitHub.

---

⭐ **Star this repository** if you find it helpful!

**Built with ❤️ using Next.js 15 and React 19**
