
'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  ArrowDownAZ, 
  ArrowUpAZ, 
  CalendarDays, 
  Star, 
  ChevronDown,
  Clock,
  Award,
  Building
} from "lucide-react";

export type SortOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
  orderBy: string;
  direction: "asc" | "desc";
};

export interface UniversalSortProps {
  options: SortOption[];
  onSortChange: (option: SortOption) => void;
  defaultOption?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export const UniversalSort = ({ 
  options, 
  onSortChange, 
  defaultOption,
  className = "",
  variant = "outline",
  size = "sm"
}: UniversalSortProps) => {
  const [selected, setSelected] = useState<SortOption>(
    () => options.find(option => option.id === defaultOption) || options[0]
  );

  useEffect(() => {
    const newSelected = options.find(option => option.id === defaultOption) || options[0];
    if (newSelected) {
        setSelected(newSelected);
    }
  }, [options, defaultOption]);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onSortChange(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant as any} 
          size={size as any}
          className={`flex items-center gap-2 ${className}`}
        >
          {selected.icon}
          <span className="max-w-[120px] truncate">Sort: {selected.label}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleSelect(option)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Common sort options that can be reused across pages
export const getCommonSortOptions = (customOptions?: SortOption[] | null): SortOption[] => {
  const defaultOptions: SortOption[] = [
    {
      id: "newest",
      label: "Newest First",
      icon: <CalendarDays size={16} />,
      orderBy: "date",
      direction: "desc"
    },
    {
      id: "oldest",
      label: "Oldest First",
      icon: <CalendarDays size={16} />,
      orderBy: "date",
      direction: "asc"
    },
    {
      id: "az",
      label: "A-Z",
      icon: <ArrowDownAZ size={16} />,
      orderBy: "title",
      direction: "asc"
    },
    {
      id: "za",
      label: "Z-A",
      icon: <ArrowUpAZ size={16} />,
      orderBy: "title",
      direction: "desc"
    }
  ];
  
  if (customOptions) {
    return [...defaultOptions, ...customOptions];
  }
  
  return defaultOptions;
};

export const projectSortOptions: SortOption[] = [
  ...getCommonSortOptions(),
  {
    id: "complexity",
    label: "Most Complex",
    icon: <Star size={16} />,
    orderBy: "complexity",
    direction: "desc"
  }
];

export const achievementSortOptions: SortOption[] = [
  ...getCommonSortOptions(),
  {
    id: "organization",
    label: "By Organization",
    icon: <Building size={16} />,
    orderBy: "organization",
    direction: "asc"
  }
];

export const certificationSortOptions: SortOption[] = [
  ...getCommonSortOptions(),
  {
    id: "issuer",
    label: "By Issuer",
    icon: <Award size={16} />,
    orderBy: "issuer",
    direction: "asc"
  }
];

export const gallerySortOptions: SortOption[] = [
  ...getCommonSortOptions(),
  {
    id: "recent",
    label: "Recently Added",
    icon: <Clock size={16} />,
    orderBy: "added",
    direction: "desc"
  }
];
