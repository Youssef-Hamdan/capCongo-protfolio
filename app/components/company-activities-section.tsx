"use client";

import Image from "next/image";
import {
  ProgressSlider,
  SliderBtn,
  SliderBtnGroup,
  SliderContent,
  SliderWrapper,
} from "@/components/ui/progressive-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export type ActivityStep = {
  title: string;
  description: string;
  image: string;
};

export type CompanyActivity = {
  name: string;
  /** Optional short subtitle under the activity name. */
  subtitle?: string;
  steps: ActivityStep[];
};

type AccentColor = "green" | "yellow" | "blue";

type CompanyActivitiesSectionProps = {
  activities: CompanyActivity[];
  accentColor?: AccentColor;
};

const ACCENT_CLASS: Record<
  AccentColor,
  { title: string; bar: string; badge: string }
> = {
  green: {
    title: "text-cap-green",
    bar: "bg-cap-green",
    badge: "bg-cap-green text-background",
  },
  yellow: {
    title: "text-cap-dark-green",
    bar: "bg-cap-yellow",
    badge: "bg-cap-yellow text-cap-dark",
  },
  blue: {
    title: "text-cap-blue",
    bar: "bg-cap-blue",
    badge: "bg-cap-blue text-background",
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ActivityCarousel({
  activity,
  accentColor,
}: {
  activity: CompanyActivity;
  accentColor: AccentColor;
}) {
  const isDesktopOrTablet = useMediaQuery("(min-width: 768px)");
  const accent = ACCENT_CLASS[accentColor];
  const steps = activity.steps;
  const activeSlider = steps[0]
    ? `${slugify(activity.name)}-0`
    : "step-0";

  if (!steps.length) return null;

  return (
    <section
      className="relative my-10 flex w-full flex-col bg-background"
      aria-labelledby={`activity-${slugify(activity.name)}`}
    >
      <header className="shrink-0 px-5 pb-4 pt-8 sm:px-8 sm:pt-10 md:px-12 lg:px-16">
        <p className="font-unbounded text-[10px] font-semibold uppercase tracking-[0.25em] text-cap-green sm:text-xs">
          Activités
        </p>
        <h2
          id={`activity-${slugify(activity.name)}`}
          className="mt-2 font-unbounded text-xl font-bold uppercase tracking-tight text-cap-dark sm:text-2xl md:text-3xl"
        >
          {activity.name}
        </h2>
        {activity.subtitle ? (
          <p className="mt-1.5 font-sora text-sm font-medium text-cap-grey md:text-base">
            {activity.subtitle}
          </p>
        ) : null}
      </header>

      <div className="relative mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-cap-dark/10 bg-card shadow-lg md:h-[650px]">
          <ProgressSlider
            vertical={isDesktopOrTablet}
            fastDuration={300}
            duration={5000}
            activeSlider={activeSlider}
            className="flex h-full min-h-0 flex-col-reverse md:flex-row"
          >
            <SliderBtnGroup className="z-10 grid h-fit max-h-[45%] w-full grid-cols-1 overflow-y-auto bg-background/95 p-3 backdrop-blur-md md:flex md:h-full md:max-h-none md:min-h-0 md:w-[380px] md:shrink-0 md:flex-col md:overflow-hidden md:p-0 md:bg-gradient-to-b md:from-background md:to-background/80">
              {steps.map((step, index) => {
                const value = `${slugify(activity.name)}-${index}`;
                return (
                  <SliderBtn
                    key={value}
                    value={value}
                    className={cn(
                      "group relative border-cap-dark/10 p-4 text-left transition-colors duration-300 md:flex md:min-h-0 md:flex-1 md:items-center md:border-b md:border-b-cap-dark/10 last:border-b-0",
                      "hover:bg-cap-dark/[0.03]",
                      "aria-selected:bg-cap-dark/[0.06]"
                    )}
                    progressBarClass={cn(
                      "absolute bottom-0 left-0 h-1.5 w-full md:top-0 md:left-0 md:h-full md:w-1.5",
                      accent.bar
                    )}
                  >
                    <div className="relative z-10 pl-2 md:flex md:h-full md:w-full md:flex-col md:justify-center md:pl-4">
                      <h3
                        className={cn(
                          "relative mb-2 w-fit rounded-sm px-2.5 py-1 font-sora text-xs font-bold md:text-sm",
                          accent.badge
                        )}
                      >
                        <span className="mr-1.5 tabular-nums opacity-80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {step.title}
                      </h3>
                      <p className="line-clamp-2 font-sora text-xs font-medium leading-relaxed text-cap-grey md:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </SliderBtn>
                );
              })}
            </SliderBtnGroup>

            <SliderContent className="relative min-h-0 w-full flex-1 md:h-full md:min-w-0 border-l border-cap-dark/10">
              {steps.map((step, index) => {
                const value = `${slugify(activity.name)}-${index}`;
                return (
                  <SliderWrapper
                    key={value}
                    value={value}
                    className="group absolute inset-0 h-full w-full"
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 70vw"
                        priority={index === 0}
                      />
                    </div>
                  </SliderWrapper>
                );
              })}
            </SliderContent>
          </ProgressSlider>
        </div>
      </div>
    </section>
  );
}

export function CompanyActivitiesSection({
  activities,
  accentColor = "green",
}: CompanyActivitiesSectionProps) {
  if (!activities.length) return null;

  return (
    <div className="w-full">
      {activities.map((activity) => (
        <ActivityCarousel
          key={activity.name}
          activity={activity}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}