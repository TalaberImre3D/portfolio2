"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";
import ModelCard from "./ModelCard";

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((item, index) => (
        item.type === "model" ? (
          <ModelCard
            key={item.src}
            src={item.src}
            poster={item.poster}
            alt={item.alt}
            aspectRatio={item.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          />
        ) : (
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            key={item.src}
            radius="m"
            aspectRatio={item.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={item.src}
            alt={item.alt}
          />
        )
      ))}
    </MasonryGrid>
  );
}
