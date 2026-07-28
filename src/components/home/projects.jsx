import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { data } from "@/data/data";
import { IconBrush, IconLink } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";

export default function Projects() {
  const totalProjects = data.projects.length;

  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconBrush className={headingIconClass} />}>
        Projects
      </SectionHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-auto w-full">
        {data.projects.map((item, index) => {
          const isLast = index === totalProjects - 1;
          const isOdd = totalProjects % 2 !== 0;

          return (
            <BlurFade
              key={item.title}
              delay={0.04 * 12 + index * 0.05}
              className={
                isLast && isOdd
                  ? "sm:col-span-2 sm:w-[calc(50%-0.5rem)] sm:mx-auto w-full"
                  : "w-full"
              }
            >
              <ProjectCard
                href={item.href}
                title={item.title}
                description={item.description}
                dates={item.dates}
                tags={item.technologies}
                thumbnail={item.thumbnail}
              />
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectCard({ title, href, description, tags, thumbnail }) {
  return (
    <a href={href || "#"} target="_blank" rel="noopener noreferrer" className="block h-full group">
      <Card
        className={
          "relative flex flex-col overflow-hidden border border-zinc-800 hover:shadow-md transition-all duration-300 ease-out h-full bg-background/50"
        }
      >
        <div className="relative overflow-hidden h-48 bg-muted">
          <img
            src={thumbnail || "/website_screenshot.png"}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/40 text-white rounded-full p-1.5 z-20 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <IconLink className="h-4 w-4" />
          </div>
        </div>
        <CardHeader className="px-4 pt-3">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-base text-white">{title}</CardTitle>
            <div className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
              {description}
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-4 pb-4 pt-2">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  className="px-2 py-0.5 text-[11px] bg-zinc-800/80 text-zinc-300 border-zinc-700/50"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  );
}
