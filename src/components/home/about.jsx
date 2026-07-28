import React from "react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconUser } from "@tabler/icons-react";

export default function AboutMe() {
  return (
    <div className="flex flex-col space-y-4 items-center text-center">
      <SectionHeading icon={<IconUser className={headingIconClass} />}>
        About Me
      </SectionHeading>

      <p className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground font-normal tracking-tight max-w-4xl mx-auto">
        I'm{" "}
        <span className="font-semibold text-foreground">
          Sudeep Shankaranand Kagi
        </span>
        , a fourth-year Electronics & Communication Engineering student at{" "}
        <span className="font-semibold text-foreground">
          Nitte Meenakshi Institute of Technology (NMIT), Bengaluru
        </span>
        , and an aspiring Full Stack Developer. I build responsive, scalable web
        applications using the{" "}
        <span className="font-semibold text-foreground">
          MERN stack
        </span>{" "}
        and enjoy solving real-world problems through clean, efficient code. With
        a strong foundation in Data Structures, Object-Oriented Programming, Database
        Management Systems, and over{" "}
        <span className="font-semibold text-foreground">
          150 solved DSA problems
        </span>
        , I'm continuously expanding my skills by building hands-on projects.
        I'm currently seeking{" "}
        <span className="font-semibold text-foreground">
          full-time opportunities
        </span>{" "}
        where I can contribute, learn from experienced teams, and grow as a
        software engineer.
      </p>
    </div>
  );
}
