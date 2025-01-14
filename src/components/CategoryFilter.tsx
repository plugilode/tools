import { tools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  // Get actual number of valid tools (excluding empty or invalid entries)
  const validToolCount = tools.filter(tool => 
    tool.name && tool.name !== 'Unnamed Tool' && 
    tool.description && tool.description !== 'No description available'
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
      <h2 className="font-semibold mb-4 dark:text-white">Categories</h2>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          <Button
            variant="default"
            className="w-full justify-start"
            onClick={() => onSelectCategory(null)}
          >
            All Categories
            <span className="ml-auto text-xs text-gray-500">
              {validToolCount}
            </span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;