import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiFolder,
  FiCheck,
} from "react-icons/fi";
import { projects, site } from "@/data/site";

// This route's content is fully prerendered via generateStaticParams.
// Awaiting `params` at the top level is fine here — this opts the page
// out of instant-navigation validation (docs: "allow blocking route"),
// and keeps a real 404 status for unknown slugs.
export const instant = false;

export async function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | ${site.brand}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject =
    index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <article className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-colors hover:text-brand"
        >
          <FiArrowLeft aria-hidden="true" /> All Projects
        </Link>

        {/* Heading */}
        <p className="mt-8 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-brand uppercase">
          <span aria-hidden="true">—</span> Project Details
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Visual + summary */}
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#1f1f26] to-[#121215]">
            <div className="flex h-9 items-center gap-1.5 border-b border-white/5 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="relative aspect-video">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-full items-center justify-center"
                >
                  <span className="rounded-2xl bg-brand/10 p-7 text-6xl text-brand/60">
                    <FiFolder />
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
              {project.overview}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-brand-light"
                >
                  LIVE DEMO <FiExternalLink aria-hidden="true" />
                </a>
              )}
              {project.frontendRepo && (
                <a
                  href={project.frontendRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
                >
                  FRONTEND REPO <FiGithub aria-hidden="true" />
                </a>
              )}
              {project.backendRepo && (
                <a
                  href={project.backendRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
                >
                  BACKEND REPO <FiGithub aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Key features */}
        <div className="mt-16">
          <h2 className="text-xl font-bold sm:text-2xl">Key Features</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-surface p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">
                  <FiCheck aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-gray-400">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prev / next */}
        <nav
          className="mt-16 flex items-center justify-between gap-4 border-t border-white/5 pt-8"
          aria-label="Project navigation"
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand"
            >
              <FiArrowLeft
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="text-left">
                <span className="block text-[11px] tracking-wider text-gray-500 uppercase">
                  Previous
                </span>
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand"
            >
              <span className="text-right">
                <span className="block text-[11px] tracking-wider text-gray-500 uppercase">
                  Next
                </span>
                {nextProject.title}
              </span>
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </nav>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-surface p-8 text-center sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Want a project like this?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
            I&apos;m open to internships, junior roles and freelance work —
            let&apos;s talk about what you&apos;re building.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-brand-light"
          >
            LET&apos;S TALK <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
