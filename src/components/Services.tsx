import { FiCode, FiMonitor, FiServer, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import { services } from "@/data/site";

const serviceIcons: IconType[] = [FiCode, FiMonitor, FiServer];

export default function Services() {
  return (
    <section
      id="services"
      className="border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand uppercase">
            What I Do
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Services
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <article
                key={service.title}
                className="group rounded-2xl border border-white/5 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-2xl text-brand transition-colors group-hover:bg-brand group-hover:text-black">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand"
                >
                  LEARN MORE <FiArrowRight aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
