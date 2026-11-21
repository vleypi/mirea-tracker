"use client";

import { useRef } from "react";
import { useKeyboardShortcut } from "@/shared/lib";
import { Icon } from "@/shared/ui/Icon";

interface ISearchFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FOCUS_SHORTCUT = "/";

export const SearchField = ({ label, placeholder, value, onChange }: ISearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useKeyboardShortcut(FOCUS_SHORTCUT, () => inputRef.current?.focus());

  return (
    <label className="relative block flex-1">
      <span className="sr-only">{label}</span>
      <Icon name="search" className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-zinc-400" />
      <input
        ref={inputRef}
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl bg-white py-4 pr-14 pl-14 text-base shadow-sm outline-none transition placeholder:text-zinc-400 focus:shadow-lg focus:shadow-zinc-900/5"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 rounded-md bg-zinc-100 px-2 py-0.5 font-sans text-xs text-zinc-500 sm:block">
        {FOCUS_SHORTCUT}
      </kbd>
    </label>
  );
};
