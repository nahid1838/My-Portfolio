"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { navLinks } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#home" aria-label="Back to top" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-brand px-5 py-2 text-xs font-semibold tracking-wider text-brand transition-colors hover:bg-brand hover:text-black md:inline-block"
        >
          LET&apos;S TALK
        </a>

        <button
          type="button"
          className="text-2xl text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/5 bg-[#0a0a0b]/95 px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-brand"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 block rounded-full bg-brand px-5 py-2.5 text-center text-xs font-semibold tracking-wider text-black transition-colors hover:bg-brand-light"
            onClick={() => setOpen(false)}
          >
            LET&apos;S TALK
          </a>
        </nav>
      )}
    </header>
  );
}
