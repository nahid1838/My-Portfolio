import {
  FiUser,
  FiMail,
  FiMapPin,
  FiClock,
  FiDownload,
} from "react-icons/fi";
import { about, site } from "@/data/site";

const infoRows = [
  { icon: FiUser, label: "Name", value: site.fullName },
  { icon: FiMail, label: "Email", value: site.email },
  { icon: FiMapPin, label: "Location", value: site.location },
  { icon: FiClock, label: "Availability", value: site.availability },
];

export default function About() {
  return (
    <section id="about" className="border-t border-white/5 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---- Left: heading + copy ---- */}
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-brand uppercase">
            <span aria-hidden="true">—</span> {about.eyebrow}
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            {about.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
            {about.intro}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {about.blocks.map((block) => (
              <div key={block.title}>
                <h3 className="text-sm font-semibold text-brand">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: info card, facts, signature ---- */}
        <div>
          <div className="rounded-2xl border border-white/10 bg-surface p-6">
            <ul className="space-y-4">
              {infoRows.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-wider text-gray-500 uppercase">
                      {label}
                    </p>
                    <p className="truncate text-sm font-medium text-gray-200">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {about.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
              >
                <p className="text-[10px] tracking-wider text-gray-500 uppercase">
                  {fact.label}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-300 sm:text-sm">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
            <p
              className="signature -rotate-2 text-4xl text-white/90 sm:text-5xl"
              aria-hidden="true"
            >
              {site.lastName}
            </p>
            <a
              href={site.resume}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold tracking-wider text-white transition-colors hover:border-brand hover:text-brand"
            >
              DOWNLOAD RESUME <FiDownload aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
