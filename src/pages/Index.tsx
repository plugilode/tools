import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolCard from "@/components/ToolCard";
import Pagination from "@/components/Pagination";
import { tools as initialTools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Plus, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { AddToolDialog } from "@/components/AddToolDialog";
import { Tool } from "@/data/tools";
import { AdminDialog } from "@/components/AdminDialog";

const ITEMS_PER_PAGE = 20;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme, setTheme } = useTheme();
  const [tools, setTools] = useState<Tool[]>(() => {
    const savedTools = localStorage.getItem('tools');
    if (savedTools) {
      return JSON.parse(savedTools);
    }
    localStorage.setItem('tools', JSON.stringify(initialTools));
    return initialTools;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const featuredTools = filteredTools.filter(tool => tool.featured);
  const regularTools = filteredTools
    .filter(tool => !tool.featured)
    .slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTool = (newTool: Partial<Tool>) => {
    setTools(prevTools => {
      const updatedTools = [...prevTools, newTool as Tool];
      localStorage.setItem('tools', JSON.stringify(updatedTools));
      return updatedTools;
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container py-8 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <img src="/og-image.svg" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold dark:text-white">AI TOOLS DIRECTORY</h1>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <AdminDialog tools={tools} onUpdateTools={setTools}>
              <Button
                variant="outline"
                size="default"
                className={`flex items-center gap-2 bg-red-100 hover:bg-red-200 border-red-500 text-red-700`}
              >
                <Shield className="h-4 w-4" />
                ADMIN MODE
              </Button>
            </AdminDialog>
          )}
          {!isAdmin && (
            <Button
              variant="outline"
              size="default"
              onClick={() => setIsAdmin(true)}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              ADMIN
            </Button>
          )}

          <AddToolDialog onSave={handleAddTool}>
            <Button
              variant="default"
              size="default"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Tool
            </Button>
          </AddToolDialog>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="dark:text-gray-300"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>
        
        <main className="lg:col-span-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          {featuredTools.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Featured Tools</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">All Tools</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {regularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No tools found matching your criteria.</p>
            </div>
          ) : filteredTools.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
