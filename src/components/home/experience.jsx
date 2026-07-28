import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { data } from "@/data/data";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconBriefcase2, IconSchool, IconTrophy } from "@tabler/icons-react";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

export default function Experience() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconBriefcase2 className={headingIconClass}/>}>
        Experience
      </SectionHeading>
      <TracingBeam>
        <div className="space-y-4">

          {/* ── Experience ── */}
          {data.experience.map((item, index) => (
            <BlurFade key={`exp-${item.company}-${index}`} delay={0.10 + index * 0.05} direction="right" inView>
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

          {/* ── Achievements ── */}
          {data.achievements && data.achievements.length > 0 && (
            <BlurFade delay={0.25} direction="right" inView>
              <SectionHeading className="my-12" icon={<IconTrophy className={headingIconClass} />}>
                Achievements & Honors
              </SectionHeading>
              <div className="space-y-4">
                {data.achievements.map((item, index) => (
                  <BlurFade key={`ach-${item.company}-${index}`} delay={0.30 + index * 0.05} direction="right" inView>
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
            </BlurFade>
          )}

          {/* ── Education ── */}
          <BlurFade delay={0.50} direction="right" inView>
            <SectionHeading className="my-12" icon={<IconSchool className={headingIconClass} />}>
              Education
            </SectionHeading>
            <div className="space-y-4">
              {data.education.map((item, index) => (
                <BlurFade key={`edu-${item.company}-${index}`} delay={0.55 + index * 0.05} direction="right" inView>
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
          </BlurFade>

        </div>
      </TracingBeam>
    </div>
  );
}

export const ExperienceItem = ({
  image,
  company,
  role,
  date,
  description = "",
  location,
  skills = [],
  href,
}) => {
  const logo = (
    <img
      src={image || "/logo/logo.svg"}
      alt={`${company} logo`}
      className="h-8 w-8 rounded-sm sm:h-10 sm:w-10 sm:rounded-md mt-1 object-contain"
    />
  );

  return (
    <div className="group/glow relative overflow-hidden p-4 border border-zinc-800 rounded-xl sm:rounded-lg bg-background transition-all duration-400">
      <SpotlightGlow />
      <div className="flex flex-row space-x-3">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${company} website`}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {logo}
          </a>
        ) : (
          logo
        )}
        <div className="flex flex-col mb-2">
          <p className="font-bold tracking-tight leading-normal text-balance text-sm sm:text-base text-primary">
            {role}
            <span className="mx-1"> • </span>
            {company}
          </p>
          <p className="text-balance leading-none tracking-tight text-xs md:text-sm font-normal text-muted-foreground mt-1">
            {date}
            <span className="mx-0.5"> • </span>
            {location}
          </p>
        </div>
      </div>
      {description && (
        <p className="text-left mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-4 flex flex-row flex-wrap gap-y-2 gap-x-2">
        {skills.map((skill, index) => (
          <BlurFade key={`${skill}-${index}`} delay={0.05 + index * 0.05} direction="up" inView>
            <div className="flex items-center justify-center bg-zinc-800/80 border border-zinc-700/50 transition-colors px-2.5 py-1 rounded-sm">
              <p className="leading-none tracking-tight text-xs md:text-sm font-semibold transition-colors text-slate-200">
                {skill}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};
