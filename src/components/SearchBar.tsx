import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search AI tools..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>
  );
};

export default SearchBar;