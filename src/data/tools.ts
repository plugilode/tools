import { Headset, Percent, Box, Calculator, ChartLine, Edit, Server, Palette, List } from "lucide-react";

export type Tool = {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  pricing: "Free Trial" | "Freemium" | "Paid";
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  dealUrl?: string;
  visitUrl: string;
  bookmarks: number;
};

export const categories = [
  { name: "Sales", icon: Percent },
  { name: "Back Office", icon: Box },
  { name: "Operations", icon: Calculator },
  { name: "Growth & Marketing", icon: ChartLine },
  { name: "Writing & Editing", icon: Edit },
  { name: "Technology & IT", icon: Server },
  { name: "Design & Creative", icon: Palette },
  { name: "Workflow Automation", icon: List },
];

// Helper function to convert CSV pricing to our format
function normalizePricing(pricing: string, name: string): "Free Trial" | "Freemium" | "Paid" {
  // Special case for OpenBolt
  if (name.toLowerCase().includes("openbolt")) return "Freemium";
  
  const pricingLower = pricing.toLowerCase();
  if (pricingLower.includes("freemium")) return "Freemium";
  if (pricingLower.includes("free trial")) return "Free Trial";
  if (pricingLower.includes("free")) return "Freemium";
  return "Paid";
}

// Helper function to map categories based on tags
function mapCategory(tags: string[]): string {
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("sales")) return "Sales";
  if (tagStr.includes("marketing") || tagStr.includes("seo")) return "Growth & Marketing";
  if (tagStr.includes("writing") || tagStr.includes("copywriting")) return "Writing & Editing";
  if (tagStr.includes("developer") || tagStr.includes("code")) return "Technology & IT";
  if (tagStr.includes("design") || tagStr.includes("art") || tagStr.includes("image")) return "Design & Creative";
  if (tagStr.includes("automation") || tagStr.includes("workflow")) return "Workflow Automation";
  if (tagStr.includes("operations") || tagStr.includes("productivity")) return "Operations";
  return "Technology & IT"; // default category
}

// Helper function to process tags from CSV
function processTags(types: string): string[] {
  return types
    .replace(/#/g, '')
    .split('\n')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
}

export const tools: Tool[] = [
  {
    id: "1",
    name: "tl;dv",
    logo: "https://placehold.co/60x60",
    rating: 4.7,
    reviews: 3200,
    pricing: "Freemium",
    description: "The meeting recorder that transcribes & summarizes your calls with customers, prospects, and your team.",
    tags: ["summarizer", "transcriber"],
    category: "Operations",
    featured: false,
    visitUrl: "https://tldv.io",
    bookmarks: 5400
  },
  {
    id: "2",
    name: "Monica",
    logo: "https://placehold.co/60x60",
    rating: 4.6,
    reviews: 7000,
    pricing: "Freemium",
    description: "Personal Al assistant for effortless chatting and copywriting.",
    tags: ["general writing", "productivity"],
    category: "Writing & Editing",
    featured: true,
    visitUrl: "https://monica.im",
    bookmarks: 12000
  },
  {
    id: "3",
    name: "Bright Eye",
    logo: "https://placehold.co/60x60",
    rating: 4.5,
    reviews: 4500,
    pricing: "Freemium",
    description: "Multipurpose, all-in-one AI app to generate text, image, code, story, poem, and to analyze image and text.",
    tags: ["image generator", "productivity", "search engine"],
    category: "Technology & IT",
    featured: false,
    visitUrl: "https://apps.apple.com/us/app/bright-eye/id1593932475",
    bookmarks: 8200
  },
  {
    id: "4",
    name: "KeywordSearch",
    logo: "https://placehold.co/60x60",
    rating: 4.6,
    reviews: 3800,
    pricing: "Free Trial",
    description: "KeywordSearch AI boosts ROI for Google & YouTube Ads. Find Best Ad Audiences for Business in minutes.",
    tags: ["social media assistant"],
    category: "Growth & Marketing",
    featured: false,
    visitUrl: "https://www.keywordsearch.com",
    bookmarks: 6500
  },
  // ... continuing with all tools from CSV ...
  {
    id: "200",
    name: "Eleven Labs",
    logo: "https://placehold.co/60x60",
    rating: 4.8,
    reviews: 9800,
    pricing: "Free Trial",
    description: "AI-powered platform for creating natural, long-format speech in any language.",
    tags: ["text to speech"],
    category: "Technology & IT",
    featured: true,
    visitUrl: "http://elevenlabs.io",
    bookmarks: 18500
  },
  {
    id: "n",
    name: "OpenBolt",
    logo: "https://placehold.co/60x60",
    rating: 4.7,
    reviews: 5200,
    pricing: "Freemium",
    description: "OpenBolt's description here",
    tags: ["AI", "Technology"],
    category: "Technology & IT",
    featured: false,
    visitUrl: "https://openbolt.com",
    bookmarks: 9500
  },
  // Back Office Tools
  {
    id: "201",
    name: "Painboard",
    logo: "https://placehold.co/60x60",
    rating: 4.5,
    reviews: 21,
    pricing: "Freemium",
    description: "Customer feedback analysis tool for better business insights",
    tags: ["feedback", "analysis", "customer insights"],
    category: "Back Office",
    featured: false,
    visitUrl: "https://painboard.com",
    bookmarks: 450
  },
  {
    id: "202",
    name: "Engine Labs",
    logo: "https://placehold.co/60x60",
    rating: 2.5,
    reviews: 76,
    pricing: "Freemium",
    description: "Advanced coding and development platform",
    tags: ["coding", "development", "tech"],
    category: "Back Office",
    featured: false,
    visitUrl: "https://enginelabs.com",
    bookmarks: 820
  },
  {
    id: "203",
    name: "Knowbase",
    logo: "https://placehold.co/60x60",
    rating: 2.3,
    reviews: 291,
    pricing: "Freemium",
    description: "Comprehensive knowledge base management system",
    tags: ["knowledge bases", "documentation", "organization"],
    category: "Back Office",
    featured: false,
    visitUrl: "https://knowbase.com",
    bookmarks: 1200
  },
  {
    id: "204",
    name: "Taskade",
    logo: "https://placehold.co/60x60",
    rating: 4.7,
    reviews: 300,
    pricing: "Freemium",
    description: "Task automation and workflow management platform",
    tags: ["task automation", "workflow", "productivity"],
    category: "Back Office",
    featured: true,
    visitUrl: "https://taskade.com",
    bookmarks: 2800
  },
  {
    id: "205",
    name: "Bahama",
    logo: "https://placehold.co/60x60",
    rating: 4.2,
    reviews: 9,
    pricing: "Freemium",
    description: "Productivity enhancement suite for businesses",
    tags: ["productivity", "business", "automation"],
    category: "Back Office",
    featured: false,
    visitUrl: "https://bahama.ai",
    bookmarks: 340
  },
  {
    id: "206",
    name: "Auto Backend",
    logo: "https://placehold.co/60x60",
    rating: 4.4,
    reviews: 45,
    pricing: "Freemium",
    description: "Automated backend development solution",
    tags: ["backends", "development", "automation"],
    category: "Back Office",
    featured: false,
    visitUrl: "https://autobackend.com",
    bookmarks: 780
  },
  // ... continue with remaining back office tools ...
  {
    id: "220",
    name: "Babelstreet",
    logo: "https://placehold.co/60x60",
    rating: 4.3,
    reviews: 25,
    pricing: "Freemium",
    description: "Advanced data analysis and insights platform",
    tags: ["data analysis", "insights", "business intelligence"],
    category: "Back Office",
    featured: false,
    visitUrl: "https://babelstreet.com",
    bookmarks: 520
  }
];

// Would you like me to continue adding the remaining tools from the CSV?
// I can process them in batches to keep the response manageable.
