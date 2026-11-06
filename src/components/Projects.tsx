import Link from "next/link";
import Image from "next/image";
import {
  FiExternalLink,
  FiGithub,
  FiFolder,
  FiArrowRight,
} from "react-icons/fi";
import { projects } from "@/data/site";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-brand uppercase">
              Featured Projects
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Some of My Recent Work
            </h2>
          </div>
          <a
            href="https://github.com/nahid1838"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-brand px-5 py-2.5 text-xs font-semibold tracking-wider text-brand transition-colors hover:bg-brand hover:text-black sm:self-auto"
          >
            VIEW ALL PROJECTS <FiArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-surface transition-all hover:-translate-y-1 hover:border-brand/40"
            >
              {/* Screenshot when provided, placeholder visual otherwise */}
              <Link
                href={`/projects/${project.slug}`}
                className="flex aspect-video flex-col overflow-hidden bg-gradient-to-br from-[#1f1f26] to-[#121215]"
                aria-label={`View details of ${project.title}`}
              >
                <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-white/5 px-3">
                  <span className="h-2 w-2 rounded-full bg-red-500/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                  <span className="h-2 w-2 rounded-full bg-green-500/70" />
                </div>
                <div className="relative flex-1">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="rounded-2xl bg-brand/10 p-5 text-5xl text-brand/60 transition-colors group-hover:text-brand">
                        <FiFolder />
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-5">
                <h3 className="font-bold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-brand"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View details + quick links */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-black transition-colors hover:bg-brand-light"
                  >
                    VIEW DETAILS <FiArrowRight aria-hidden="true" />
                  </Link>
                  <div className="flex gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        title="Live demo"
                        aria-label={`${project.title} live preview`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-brand hover:text-brand"
                      >
                        <FiExternalLink aria-hidden="true" />
                      </a>
                    )}
                    {project.frontendRepo && (
                      <a
                        href={project.frontendRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Frontend repository"
                        aria-label={`${project.title} frontend repository`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-brand hover:text-brand"
                      >
                        <FiGithub aria-hidden="true" />
                      </a>
                    )}
                    {project.backendRepo && (
                      <a
                        href={project.backendRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Backend repository"
                        aria-label={`${project.title} backend repository`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-brand hover:text-brand"
                      >
                        <FiGithub aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
