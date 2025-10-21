"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Label } from "@/components/ui/label";

const colors = [
  { name: "Indigo", value: "#6366F1" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
];

export default function ColorPicker() {
  const { resumeData, updateTheme } = useResumeStore();

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-3 block">Primary Color</Label>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateTheme({ primaryColor: color.value })}
              className="group relative aspect-square rounded-lg border-2 hover:scale-110 transition-transform"
              style={{
                backgroundColor: color.value,
                borderColor:
                  resumeData.theme.primaryColor === color.value
                    ? color.value
                    : "transparent",
              }}
            >
              <span className="sr-only">{color.name}</span>
              {resumeData.theme.primaryColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
