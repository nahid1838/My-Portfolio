import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Logo from "./Logo";
import { navLinks, services, site, socials } from "@/data/site";

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <FaGithub aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn aria-hidden="true" />,
  Email: <FiMail aria-hidden="true" />,
};

// new Date() is blocked during prerendering with cacheComponents —
// caching makes it build-time stable and still rolls over each deploy.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

function LinkColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0c0c0e]">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Full Stack Developer building fast, responsive and user-friendly
              web applications from interface to database.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-green-500"
                aria-hidden="true"
              />
              {site.availability}
            </p>
          </div>

          {/* Quick links */}
          <LinkColumn title="Quick Links">
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </LinkColumn>

          {/* Services */}
          <LinkColumn title="Services">
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </LinkColumn>

          {/* Socials */}
          <LinkColumn title="Follow Me">
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </LinkColumn>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>
            © <CopyrightYear /> {site.copyrightName}. All rights
            reserved.
          </p>
          <p>
            Built with passion ❤ and lots of coffee ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
