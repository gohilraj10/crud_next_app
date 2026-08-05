"use client";

import { Search } from "lucide-react";

import { Input } from "n@/components/ui/input";
import { cn } from "n@/lib/utils";

interface PageSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PageSearch({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: PageSearchProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-6"
      />
    </div>
  );
}
