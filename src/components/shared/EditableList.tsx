"use client";

import React from "react";
import { Trash2, Plus } from "lucide-react";
import EditableText from "./EditableText";

interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  className?: string;
}

export default function EditableList({
  items,
  onChange,
  className,
}: EditableListProps) {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleAdd = () => {
    onChange([...items, "New item"]);
  };

  return (
    <div className={className}>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index} className="group flex items-start gap-2">
            <EditableText
              value={item}
              onChange={(value) => handleItemChange(index, value)}
              className="flex-1 text-sm"
            />
            <button
              onClick={() => handleDelete(index)}
              className="no-print opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
            >
              <Trash2 className="w-3 h-3 text-red-600" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAdd}
        className="no-print mt-2 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <Plus className="w-3 h-3" />
        Add item
      </button>
    </div>
  );
}
