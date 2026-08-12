export interface ProjectTypes {
  text: string;
  images: string[] | undefined;
  id: number;
  title: string;
  type: string;
  status?: "in-development";
  stack: string[];
  description: string;
  longDescription: string;
  insights: InsightTypes;
  code: string;
  deploy: string;
  frontImage: string;
  image: string;
  image2: string;
  gallery: string[];
  buttonText: string;
}
export interface InsightTypes {
  // Every block renders its images when present; most older projects only
  // carry them on designApproach and challenges.
  purpose: {
    text: string;
    images?: string[];
  };
  designApproach: {
    text: string;
    images?: string[];
  };
  challenges: {
    text: string;
    images?: string[];
  };
}
