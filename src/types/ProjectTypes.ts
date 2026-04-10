export interface ProjectTypes {
  text: string;
  images: string[] | undefined;
  id: number;
  title: string;
  type: string;
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
  purpose: {
    text: string;
    images: string[];
  };
  designApproach: {
    text: string;
    images: string[];
  };
  challenges: {
    text: string;
    images: string[];
  };
}
