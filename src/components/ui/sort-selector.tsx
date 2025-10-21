'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ArrowDownAZ, ArrowUpAZ, CalendarDays, Star, ChevronDown } from "lucide-react";

export type SortOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
  orderBy: string;
  direction: "asc" | "desc";
};

export interface SortSelectorProps {
  options: SortOption[];
  onSortChange: (option: SortOption) => void;
  className?: string;
}

export const SortSelector = ({ options, onSortChange, className = "" }: SortSelectorProps) => {
  const [selected, setSelected] = useState<SortOption>(options[0]);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onSortChange(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-2 ${className}`}
        >
          {selected.icon}
          <span>Sort by: {selected.label}</span>
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

export const defaultSortOptions: SortOption[] = [
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
  },
  {
    id: "rating",
    label: "Highest Rated",
    icon: <Star size={16} />,
    orderBy: "rating",
    direction: "desc"
  }
];
