import Image from "next/image";
import { FiArrowRight, FiFolder, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
} from "react-icons/si";
import { site, socials } from "@/data/site";

const badgeStyle =
  "absolute flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#16161a]/90 px-2.5 py-1.5 text-[10px] font-medium text-gray-200 shadow-xl backdrop-blur sm:text-xs";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <FaGithub aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn aria-hidden="true" />,
  Email: <FiMail aria-hidden="true" />,
};

export default function Hero() {
  return (
    <section id="home" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* ---- Copy ---- */}
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-brand uppercase">
            <span aria-hidden="true">—</span> Hello, I&apos;m
          </p>

          <h1 className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {site.firstName}{" "}
            <span className="text-brand">{site.lastName}</span>
          </h1>

          <p className="mt-4 text-xl font-semibold text-gray-300 sm:text-2xl lg:text-3xl">
            {site.designation}{" "}
            <span className="cursor-blink text-brand" aria-hidden="true">
              |
            </span>
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
            {site.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-brand-light"
            >
              HIRE ME <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
            >
              VIEW MY WORK <FiFolder aria-hidden="true" />
            </a>
          </div>

          <p className="mt-8 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase sm:text-xs">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-green-500"
              aria-hidden="true"
            />
            {site.availability}
          </p>

          <div className="mt-6 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-base text-gray-400 transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
              >
                {socialIcons[social.label]}
              </a>
            ))}
          </div>
        </div>

        {/* ---- Portrait with orbital rings ---- */}
        <div className="relative mx-auto w-[260px] sm:w-[320px] lg:w-[400px]">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full bg-gradient-to-tr from-brand/20 via-transparent to-amber-500/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-full border border-dashed border-white/10"
          />
          <div className="relative aspect-square overflow-hidden rounded-full border-2 border-brand/40 shadow-[0_0_60px_rgba(249,115,22,0.25)]">
            <Image
              src={site.profileImage}
              alt={`${site.fullName} — ${site.designation}`}
              fill
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 400px"
              className="object-cover object-top saturate-[0.9]"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b]/50"
            />
          </div>

          {/* Floating tech badges */}
          <span className={`${badgeStyle} -top-3 right-0 sm:-right-6`}>
            <SiReact className="text-[#61DAFB]" aria-hidden="true" /> React.js
          </span>
          <span className={`${badgeStyle} top-[30%] -left-6 sm:-left-12`}>
            <SiNodedotjs className="text-[#5FA04E]" aria-hidden="true" /> Node.js
          </span>
          <span className={`${badgeStyle} bottom-[24%] -left-5 sm:-left-10`}>
            <SiTypescript className="text-[#3178C6]" aria-hidden="true" /> TypeScript
          </span>
          <span className={`${badgeStyle} bottom-6 right-0 sm:-right-4`}>
            <SiMongodb className="text-[#47A248]" aria-hidden="true" /> MongoDB
          </span>
        </div>
      </div>
    </section>
  );
}
