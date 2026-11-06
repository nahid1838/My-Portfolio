import { skillBars, techs } from "@/data/site";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand uppercase">
            My Expertise
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Skills &amp; Technologies
          </h2>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---- Progress bars ---- */}
          <div className="space-y-6">
            {skillBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-300">{bar.label}</span>
                  <span className="font-semibold text-brand">{bar.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="skill-fill h-full rounded-full bg-gradient-to-r from-brand to-amber-400"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ---- Tech tiles ---- */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {techs.map(({ name, icon: Icon, color }) => (
              <div
                key={name}
                title={name}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-surface px-2 py-4 transition-all hover:-translate-y-0.5 hover:border-brand/40"
              >
                <Icon className="text-3xl" style={{ color }} aria-hidden="true" />
                <span className="text-[11px] text-gray-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
