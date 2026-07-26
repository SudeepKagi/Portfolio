import React from "react";
import Hero from "@/components/home/hero";
import Dashboard from "@/components/home/dashboard";
import Projects from "@/components/home/projects";
import Experience from "@/components/home/experience";
import { BlurFade } from "@/components/ui/blur-fade";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { data } from "@/data/data";

const BLUR_FADE_DELAY = 0.005;

export default function App() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background dark text-foreground">
      <Navbar navItems={data.nav} />
      <img
        src="/layout/background-ellipse3.svg"
        alt=""
        className="z-1 blur-lg absolute max-w-5xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-5/9 w-full pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-5xl flex-col space-y-12 sm:space-y-32 px-4">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="hero">
            <Hero />
          </section>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <section id="dashboard">
            <Dashboard />
          </section>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <section id="projects">
            <Projects />
          </section>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="experience">
            <Experience />
          </section>
        </BlurFade>
      </div>

      <Footer />
    </div>
  );
}
