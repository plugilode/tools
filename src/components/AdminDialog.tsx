import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tool } from "@/data/tools";
import { Pencil, Trash2, Star, StarOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface AdminDialogProps {
  tools: Tool[];
  onUpdateTools: (tools: Tool[]) => void;
  children: React.ReactNode;
}

export function AdminDialog({ tools, onUpdateTools, children }: AdminDialogProps) {
  const [open, setOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);

  const handleDelete = (toolId: string) => {
    const updatedTools = tools.filter(tool => tool.id !== toolId);
    onUpdateTools(updatedTools);
    localStorage.setItem('tools', JSON.stringify(updatedTools));
  };

  const handleToggleFeatured = (toolId: string) => {
    const updatedTools = tools.map(tool => 
      tool.id === toolId ? { ...tool, featured: !tool.featured } : tool
    );
    onUpdateTools(updatedTools);
    localStorage.setItem('tools', JSON.stringify(updatedTools));
  };

  const handleSaveEdit = (toolId: string, updatedName: string, updatedDescription: string) => {
    const updatedTools = tools.map(tool => 
      tool.id === toolId 
        ? { ...tool, name: updatedName, description: updatedDescription }
        : tool
    );
    onUpdateTools(updatedTools);
    localStorage.setItem('tools', JSON.stringify(updatedTools));
    setEditingTool(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-red-600 font-bold">
            ⚠️ AUTHORIZED PERSONNEL ONLY ⚠️
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full pr-4">
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="border p-4 rounded-lg space-y-2">
                {editingTool?.id === tool.id ? (
                  <div className="space-y-2">
                    <Input
                      defaultValue={tool.name}
                      onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                    />
                    <Input
                      defaultValue={tool.description}
                      onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(tool.id, editingTool.name, editingTool.description)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingTool(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingTool(tool)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleToggleFeatured(tool.id)}
                        >
                          {tool.featured ? (
                            <StarOff className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(tool.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Category: {tool.category}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 