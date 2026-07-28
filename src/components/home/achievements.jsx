import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { data } from "@/data/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconTrophy } from "@tabler/icons-react";
import { ExperienceItem } from "@/components/home/experience";

export default function Achievements() {
  if (!data.achievements || data.achievements.length === 0) return null;

  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconTrophy className={headingIconClass} />}>
        Achievements & Honors
      </SectionHeading>
      <TracingBeam>
        <div className="space-y-4">
          {data.achievements.map((item, index) => (
            <BlurFade key={`${item.company}-${item.role}-${index}`} delay={0.10 + index * 0.05} direction="right" inView>
              <ExperienceItem
                image={item.image}
                company={item.company}
                role={item.role}
                date={item.date}
                description={item.description}
                location={item.location}
                skills={item.skills}
                href={item.href}
              />
            </BlurFade>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
