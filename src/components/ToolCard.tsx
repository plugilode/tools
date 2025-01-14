import { Tool } from "@/data/tools";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Bookmark } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg dark:text-white">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {tool.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {tool.featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" className="ml-2">
                  {tool.pricing}
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {tool.reviews} reviews
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Bookmark className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {tool.bookmarks}
                  </span>
                </div>
              </div>
              <a
                href={tool.visitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;