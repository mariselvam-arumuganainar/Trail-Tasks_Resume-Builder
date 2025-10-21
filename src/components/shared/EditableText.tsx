"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
}

export default function EditableText({
  value,
  onChange,
  className,
  multiline = false,
  placeholder = "Click to edit",
  style,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current && elementRef.current.textContent !== value) {
      elementRef.current.textContent = value;
    }
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    const newValue = elementRef.current?.textContent || "";
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      elementRef.current?.blur();
    }
    if (e.key === "Escape") {
      if (elementRef.current) {
        elementRef.current.textContent = value;
      }
      elementRef.current?.blur();
    }
  };

  return (
    <div
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      style={style}
      className={cn(
        "outline-none cursor-text transition-all editable-text",
        isEditing && "ring-2 ring-indigo-500 ring-offset-2 rounded",
        !value && "text-gray-400",
        className
      )}
    >
      {value || placeholder}
    </div>
  );
}
