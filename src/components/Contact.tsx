"use client";

import { useEffect, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiChevronDown,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { contact, site } from "@/data/site";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 transition-colors focus:border-brand focus:outline-none";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-dismiss toasts after 4.5s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return; // guard against double submissions

    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      const data = Object.fromEntries(new FormData(form).entries());

      const res = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          "Project Type": data.projectType,
          "Budget Range": data.budget,
          message: data.message,
        }),
      });

      if (!res.ok) {
        let serverMessage = "";
        try {
          const body = await res.json();
          serverMessage = body?.errors?.[0]?.message ?? "";
        } catch {
          // non-JSON error body — fall through to the generic message
        }
        throw new Error(
          serverMessage || `Request failed with status ${res.status}`,
        );
      }

      setToast({
        type: "success",
        message: "Message sent! I'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (err) {
      setToast({
        type: "error",
        message:
          err instanceof Error && err.message
            ? err.message
            : "Something went wrong — please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---- Left: heading + visual-only form ---- */}
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-brand uppercase">
            <span aria-hidden="true">—</span> {contact.eyebrow}
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            {contact.text}
          </p>

          <form
            className="mt-8 space-y-4"
            aria-label="Contact form"
            action="https://formspree.io/f/xrppvzqa"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className={fieldClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className={fieldClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <select
                  name="projectType"
                  defaultValue=""
                  aria-label="Project Type"
                  required
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Project Type
                  </option>
                  {contact.projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-500"
                />
              </div>
              <div className="relative">
                <select
                  name="budget"
                  defaultValue=""
                  aria-label="Budget Range"
                  required
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Budget Range
                  </option>
                  {contact.budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              className={fieldClass}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" aria-hidden="true" />{" "}
                  SENDING...
                </>
              ) : (
                <>
                  SEND MESSAGE <FiArrowRight aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ---- Right: contact info card ---- */}
        <div className="lg:pt-16">
          <div className="rounded-2xl border border-white/10 bg-surface p-6">
            <ul className="space-y-5">
              {contact.info.map(({ label, value, href }) => {
                const icon =
                  label === "Email" ? (
                    <FiMail />
                  ) : label.startsWith("Phone") ? (
                    <FiPhone />
                  ) : label === "Location" ? (
                    <FiMapPin />
                  ) : (
                    <FiClock />
                  );
                const content = (
                  <>
                    <span className="text-[11px] tracking-wider text-gray-500 uppercase">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium break-words text-gray-200">
                      {value}
                    </span>
                  </>
                );
                return (
                  <li key={label} className="flex items-start gap-3.5">
                    <span
                      className="mt-0.5 shrink-0 text-brand"
                      aria-hidden="true"
                    >
                      {icon}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="min-w-0 transition-colors hover:text-brand"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="min-w-0">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Prefer chat? Message me on WhatsApp at{" "}
            <a
              href={`https://wa.me/88${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand hover:underline"
            >
              {site.whatsapp}
            </a>
            .
          </p>
        </div>
      </div>

      {/* Toast notifications (fixed — no layout impact) */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`toast-enter fixed right-4 top-20 z-[60] flex max-w-sm items-start gap-3 rounded-xl border bg-[#16161a] px-4 py-3 shadow-2xl sm:right-6 ${
            toast.type === "success"
              ? "border-green-500/40"
              : "border-red-500/40"
          }`}
        >
          <span
            className={`mt-0.5 shrink-0 ${
              toast.type === "success" ? "text-green-500" : "text-red-400"
            }`}
            aria-hidden="true"
          >
            {toast.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          <p className="text-sm leading-snug text-gray-200">{toast.message}</p>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setToast(null)}
            className="ml-auto shrink-0 text-gray-500 transition-colors hover:text-white"
          >
            <FiX />
          </button>
        </div>
      )}
    </section>
  );
}
