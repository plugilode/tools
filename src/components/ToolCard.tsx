import { Tool } from "@/data/tools";
import { Star, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex-none space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={tool.logo} 
              alt={tool.name} 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg dark:text-white">{tool.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm dark:text-gray-300">{tool.rating}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">({tool.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <Badge variant={
            tool.pricing === "Free Trial" ? "secondary" :
            tool.pricing === "Freemium" ? "outline" : "default"
          } className="dark:border-gray-600">
            {tool.pricing}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {tool.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-none pt-4 border-t dark:border-gray-700">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{tool.bookmarks}</span>
          </div>
          <div className="flex space-x-2">
            {tool.dealUrl && (
              <a 
                href={tool.dealUrl}
                className="text-sm px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deal
              </a>
            )}
            <a 
              href={tool.visitUrl}
              className="text-sm px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}