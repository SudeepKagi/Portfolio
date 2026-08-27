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
        Electronics & Communication Engineering got me into hardware — the MERN stack is what's kept me up past 3 AM ever since. I'm{" "}
        <span className="font-semibold text-foreground">
          Sudeep Shankaranand Kagi
        </span>
        , a fourth-year ECE student at{" "}
        <span className="font-semibold text-foreground">
          Nitte Meenakshi Institute of Technology (NMIT), Bengaluru
        </span>{" "}
        who taught himself full-stack development because shipping something people could actually click through beat simulating circuits on paper.
        Since then: <span className="font-semibold text-foreground">150+ DSA problems solved</span>, five full-stack projects spanning VPN-isolated exam proctoring to AI-classified civic platforms, and a{" "}
        <span className="font-semibold text-foreground">
          Runner-Up finish — out of 120+ teams
        </span>{" "}
        at a national hackathon where I led a 4-person team to a working product in 24 hours. I'm looking for a{" "}
        <span className="font-semibold text-foreground">
          full-time engineering role
        </span>{" "}
        where "move fast" is a real expectation, not a poster on the wall.
      </p>
    </div>
  );
}
