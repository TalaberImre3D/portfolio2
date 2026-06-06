"use client";

import { Carousel } from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <Carousel
      sizes="(max-width: 960px) 100vw, 960px"
      items={images.map((image) => ({
        slide: image,
        alt: title,
      }))}
    />
  );
};
