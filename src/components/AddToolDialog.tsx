import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tool, categories } from "@/data/tools";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddToolDialogProps {
  onSave: (tool: Partial<Tool>) => void;
}

export function AddToolDialog({ onSave }: AddToolDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    visitUrl: "",
    description: "",
    category: "",
    tags: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTool: Partial<Tool> = {
      id: Date.now().toString(),
      name: formData.name,
      visitUrl: formData.visitUrl,
      description: formData.description,
      logo: "https://placehold.co/60x60",
      rating: 0,
      reviews: 0,
      pricing: "Free Trial",
      tags: formData.tags.split(',').map(tag => tag.trim()),
      category: formData.category,
      featured: false,
      bookmarks: 0,
    };

    onSave(newTool);
    setFormData({ name: "", visitUrl: "", description: "", category: "", tags: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="dark:text-gray-300"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tool</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tool Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter tool name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={formData.visitUrl}
              onChange={(e) => setFormData({ ...formData, visitUrl: e.target.value })}
              placeholder="Enter tool URL"
              type="url"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="AI, Technology, Tool"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter tool description"
              required
            />
          </div>
          <Button type="submit" className="w-full">Save Tool</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 