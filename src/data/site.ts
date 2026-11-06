import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostman,
  SiHtml5,
  SiCss,
} from "react-icons/si";

/* ------------------------------------------------------------------
   Single source of truth for all editable site content.
   To change anything on the page (projects, skills, links...), edit
   this file — components read from here.
------------------------------------------------------------------- */

export const site = {
  brand: "NAHID",
  fullName: "Nadiul Islam Nahid",
  firstName: "Nadiul Islam",
  lastName: "Nahid",
  designation: "Full Stack Developer",
  tagline:
    "Hi, I am Nadiul Islam Nahid — I build fast, responsive and user-friendly web applications.",
  location: "Dhaka, Bangladesh",
  email: "md.nahid186502@gmail.com",
  phone: "01690197119",
  whatsapp: "01690197119",
  resume: "/resume/Nahid-Resume.pdf", // file not ready yet — button stays clickable
  availability: "Available for Freelance",
  responseTime: "Within 24 hours",
  profileImage: "/images/profile.png",
  copyrightName: "Nadiul Islam Nahid",
  githubUsername: "nahid1838",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/nahid1838" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nadiul-islam-nahid/" },
  { label: "Email", href: "mailto:md.nahid186502@gmail.com" },
];

export const about = {
  eyebrow: "About Me",
  title: "Building Digital Solutions That Make a Difference",
  intro:
    "Hi, I'm Nadiul Islam Nahid, a web developer based in Dhaka, Bangladesh. I'm training to become a Full Stack Developer through Programming Hero's Complete Web Development course (Batch 14), building complete web applications from interface to database.",
  blocks: [
    {
      title: "My Journey",
      text: "I started with HTML, CSS and JavaScript, then moved to Tailwind CSS, TypeScript and Next.js. I'm now growing on the backend with Node.js, Express.js, MongoDB and secure authentication using Better Auth. I learn by building, so every new concept becomes a real project deployed live on Vercel.",
    },
    {
      title: "What I Enjoy",
      text: "I enjoy crafting clean, responsive interfaces and connecting them to reliable backends. I care about details like readable code, smooth interactions and a clear structure, and I like solving problems one step at a time.",
    },
    {
      title: "Beyond Code",
      text: "Outside programming, I'm interested in web design and visual aesthetics, and I enjoy making cartoon-style video content. Both keep me creative and help me think more visually when I design websites.",
    },
    {
      title: "My Goal",
      text: "I'm aiming to grow into a professional full stack developer and contribute to real-world products. I'm open to internships, junior developer roles and freelance projects.",
    },
  ],
  quickFacts: [
    { label: "Location", value: "Dhaka, Bangladesh" },
    { label: "Learning", value: "Programming Hero" },
    { label: "Focus", value: "Next.js, TypeScript, MongoDB" },
    { label: "Interests", value: "Web Design, Video Content" },
  ],
};

export const services = [
  {
    title: "Web Development",
    description:
      "Complete web applications built with Next.js, React and Node.js — from interface to database, deployed live on Vercel.",
  },
  {
    title: "Frontend Development",
    description:
      "Responsive, interactive user interfaces with React, Next.js, TypeScript and Tailwind CSS.",
  },
  {
    title: "Backend Development",
    description:
      "RESTful APIs, secure authentication with Better Auth and JWT, and MongoDB integration using Express.js.",
  },
];

export const skillBars = [
  { label: "JavaScript / TypeScript", pct: 95 },
  { label: "React / Next.js", pct: 92 },
  { label: "Node.js / Express", pct: 90 },
  { label: "MongoDB / SQL", pct: 85 },
  { label: "HTML / CSS / Tailwind", pct: 95 },
  { label: "Git & Deployment", pct: 80 },
];

export const techs: {
  name: string;
  icon: IconType;
  color: string;
}[] = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
    { name: "Express", icon: SiExpress, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#ffffff" },
    { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss, color: "#1572B6" },
  ];

export const projects = [
  {
    slug: "togetherly",
    title: "Togetherly – Small Acts. Big Impact.",
    description:
      "A community-driven social events platform where people create, explore and join meaningful events to support local communities and make a positive impact.",
    overview:
      "Togetherly encourages people to make a difference through small acts of kindness, community participation and meaningful connections. Users can register, publish their own community events, discover upcoming events and join them to connect with other participants. Event creators get full control to edit or delete their events, and every user can update their profile name and image. I built it with Next.js (App Router) and TypeScript on the frontend, BetterAuth with JWT for authentication, and an Express + MongoDB backend.",
    features: [
      "Secure user registration and login with BetterAuth",
      "Create and publish community events (authenticated users)",
      "Explore upcoming social events and join them",
      "Manage events: view, edit and delete your own events",
      "Update profile name and profile image",
      "Fully responsive on desktop, tablet and mobile",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "BetterAuth",
      "JWT",
      "Express.js",
      "MongoDB",
    ],
    image: "/projects/togetherly.png",
    live: "https://togetherly-frontend.vercel.app/",
    frontendRepo: "https://github.com/nahid1838/A8-Togetherly-Frontend",
    backendRepo: "https://github.com/nahid1838/Togetherly-Backend",
  },
  {
    slug: "project-two",
    title: "Project Two",
    description:
      "Replace this with a short summary of your project — what it does and the problem it solves.",
    overview:
      "Replace this with the story of your project: what problem it solves, who it is for, and what you learned while building it. This paragraph appears on the project details page.",
    features: [
      "Replace this with a real feature of your project",
      "Another feature placeholder — edit me in src/data/site.ts",
      "Responsive layout that works on all devices",
      "Fourth feature placeholder",
    ],
    tags: ["React", "Node.js", "Express"],
    image: "",
    live: "#",
    frontendRepo: "",
    backendRepo: "",
  },
  {
    slug: "project-three",
    title: "Project Three",
    description:
      "Replace this with a short summary of your project — what it does and the problem it solves.",
    overview:
      "Replace this with the story of your project: what problem it solves, who it is for, and what you learned while building it. This paragraph appears on the project details page.",
    features: [
      "Replace this with a real feature of your project",
      "Another feature placeholder — edit me in src/data/site.ts",
      "Responsive layout that works on all devices",
      "Fourth feature placeholder",
    ],
    tags: ["Tailwind CSS", "React", "Firebase"],
    image: "",
    live: "#",
    frontendRepo: "",
    backendRepo: "",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const contact = {
  eyebrow: "Get in Touch",
  title: "Let's Build Something Amazing Together",
  text: "Have a project in mind? Drop me a message and I'll get back to you within 24 hours.",
  projectTypes: [
    "Web Application",
    "Frontend Development",
    "Backend Development",
    "Other",
  ],
  budgetRanges: ["Under $100", "$100 – $500", "$500 – $1000", "$1000+"],
  info: [
    { label: "Email", value: "md.nahid186502@gmail.com", href: "mailto:md.nahid186502@gmail.com" },
    { label: "Phone (WhatsApp)", value: "01690197119", href: "tel:+8801690197119" },
    { label: "Location", value: "Dhaka, Bangladesh", href: "" },
    { label: "Response Time", value: "Within 24 hours", href: "" },
  ],
};
