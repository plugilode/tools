import csvContent from '../assets/Futurepedia_Ai_Tools_Dataset (1).csv?raw';
import { parseCSVToTools } from '@/utils/csvImport';

export interface Tool {
  id: string;
  name: string;
  description: string;
  visitUrl: string;
  category: string;
  tags: string[];
  logo: string;
  rating: number;
  reviews: number;
  pricing: string;
  featured: boolean;
  bookmarks: number;
}

// Parse tools first to get all categories
export const tools: Tool[] = parseCSVToTools(csvContent);

// Generate categories from the actual data
const uniqueCategories = new Set<string>();
tools.forEach(tool => {
  if (tool.category) {
    uniqueCategories.add(tool.category);
  }
});

export const categories = Array.from(uniqueCategories)
  .filter(Boolean)
  .sort()
  .map(name => ({ name }));
