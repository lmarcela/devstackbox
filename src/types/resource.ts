export type Resource = {
  id: string;
  title: string;
  slug: string;
  url: string;
  category: string;
  tags: string[];
  description?: string;
  createdAt: string;
};

export type ResourceProps = {
  resource: Resource;
};
