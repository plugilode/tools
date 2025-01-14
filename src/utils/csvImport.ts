import { Tool } from "@/data/tools";

export function parseCSVToTools(csvContent: string): Tool[] {
  if (!csvContent) {
    console.error('No CSV content provided');
    return [];
  }

  try {
    const lines = csvContent.split('\n');
    if (lines.length < 2) {
      console.error('CSV file is empty or malformed');
      return [];
    }

    const headers = lines[0].split(',');
    const foundCategories = new Set<string>();
    
    return lines.slice(1)
      .filter(line => line.trim()) // Skip empty lines
      .map((line, index) => {
        try {
          const values = line.split(',');
          const categoriesText = values[2] ? values[2].replace(/[""]/g, '').trim() : '';
          
          // Extract categories, clean them up, and ensure at least one category
          let categories = categoriesText
            ? categoriesText
                .split('\n')
                .map(cat => cat.trim())
                .filter(cat => cat.startsWith('#'))
                .map(cat => cat.substring(1).trim().toLowerCase())
            : [];
          
          // If no valid categories found, assign to "Other"
          if (!categories || categories.length === 0) {
            categories = ['other'];
          }
          
          // Add found categories to our set
          categories.forEach(cat => foundCategories.add(cat));

          return {
            id: (index + 1).toString(),
            name: values[0]?.trim() || 'Unnamed Tool',
            description: values[1]?.trim() || 'No description available',
            category: categories[0], // Use first category as primary
            visitUrl: values[5]?.trim() || '#',
            tags: categories, // Use all categories as tags
            logo: "https://placehold.co/60x60",
            rating: 0,
            reviews: parseInt(values[6]) || 0,
            pricing: values[3]?.trim() || "Free Trial",
            featured: values[8]?.includes('2') || false,
            bookmarks: 0
          };
        } catch (err) {
          console.error(`Error parsing line ${index + 1}:`, err);
          return null;
        }
      })
      .filter((tool): tool is Tool => tool !== null && Boolean(tool.name && tool.name !== 'Unnamed Tool'));
  } catch (err) {
    console.error('Error parsing CSV:', err);
    return [];
  }
} 