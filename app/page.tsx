"use client";

import { useState } from "react";
import Image from "next/image";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";
import profileImage from "./profil.jpeg";

const EMAIL = "widituba88@gmail.com";

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      id: "Aplikasi Deteksi Penyakit Pada Daun Padi",
      en: "AI Disease Detection App for Rice Leaves",
    },
    stack: [
      "Next.js",
      "Python",
      "Firebase",
      "Claude API",
    ],
    desc: {
      id: "Aplikasi berbasis AI untuk mendeteksi penyakit pada daun padi secara akurat dan cepat.",
      en: "An AI-based application for accurately and quickly detecting diseases in rice leaves.",
    },
    details: {
      id: "Platform yang ditujukan untuk petani di Indonesia untuk mendeteksi penyakit pada tanaman padi mereka. Sistem menggunakan teknologi machine learning untuk menganalisis gambar daun padi dan memberikan diagnosis yang akurat. Termasuk fitur riwayat untuk hasil deteksi negatif. Dashboard dengan metrik disertakan.",
      en: "A platform designed for farmers in Indonesia to detect diseases in their rice plants. The system uses machine learning technology to analyze images of rice leaves and provide accurate diagnoses. Features include email/SMS notification for negative results and a history feature for detected cases. Dashboard with metrics included.",
    },
    media: [
      "/projects/revio/landing.png",
      "/projects/revio/dashboard.png",
      "/projects/revio/alertas.png",
      "/projects/revio/analiticas.png",
      "/projects/revio/negocios.png",
      "/projects/revio/analiticas-ia.png",
    ],
    highlights: ["nextdotjs", "tailwindcss", "python", "postgresql"],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      id: "Kontrol Suhu HACCP",
      en: "HACCP Temperature Control",
    },
    stack: [
      "Next.js 16",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "Claude API",
      "Stripe",
      "Celery",
    ],
    desc: {
      id: "Aplikasi untuk restoran yang mendigitalkan pencatatan suhu HACCP dan menghasilkan rencana dan laporan otomatis untuk inspeksi keamanan pangan.",
      en: "App for restaurants that digitises HACCP temperature logs and auto-generates plans and reports for food safety inspections.",
    },
    details: {
      id: "Digitalisasi HACCP lengkap untuk restoran: catatan suhu, ketertelusuran, alergen, dan pembuatan rencana HACCP berbantuan AI. Terintegrasi dengan Open Food Facts untuk alergen, autentikasi yang dilindungi MFA, i18n dengan next-intl, dan penagihan langganan dengan Stripe. Backend sepenuhnya asinkron dengan FastAPI + SQLAlchemy dan pekerja Celery.",
      en: "Full HACCP digitisation for a restaurant: temperature logs, traceability, allergens, and AI-assisted generation of HACCP plans. Integrates with Open Food Facts for allergens, MFA-protected auth, i18n with next-intl, subscription billing with Stripe. Fully async backend with FastAPI + SQLAlchemy and Celery workers.",
    },
    media: [
      "/projects/aptia/landing.png",
      "/projects/aptia/panel.png",
      "/projects/aptia/registros.png",
      "/projects/aptia/carta-alergenos.png",
      "/projects/aptia/inspeccion.png",
      "/projects/aptia/cuestionario.png",
    ],
    highlights: ["nextdotjs", "tailwindcss", "python", "firebase", "typescript"],
    badge: { id: "Sedang Dikembangkan", en: "In progress" },
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      id: "Pelacak Keuangan Pribadi",
      en: "Personal Finance Tracker",
    },
    stack: [
      "Django",
      "Python",
      "SQLite",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Chart.js",
      "pandas",
    ],
    desc: {
      id: "Dashboard untuk melacak pendapatan, pengeluaran, dan tujuan tabungan dengan bagan visual, impor Excel, dan laporan bulanan.",
      en: "Dashboard to track income, expenses and savings goals with visual charts, Excel import and monthly reports.",
    },
    details: {
      id: "Aplikasi Django klasik (MVT) untuk keuangan pribadi: kategorisasi pengeluaran, tujuan tabungan, impor massal dari Excel (xlsx/xls) dan grafik bertenaga Chart.js. Tema terang/gelap dalam CSS murni tanpa dependensi frontend. Proyek yang memprioritaskan kesederhanaan dan ketahanan: tidak ada kerangka kerja klien, autentikasi bawaan Django, penyimpanan SQLite.",
      en: "Classic Django (MVT) app for personal finance: expense categorisation, savings goals, bulk import from Excel (xlsx/xls) and Chart.js-powered graphs. Light/dark themes in pure CSS with zero frontend dependencies. A project that favours simplicity and robustness: no client framework, Django's built-in auth, SQLite storage.",
    },
    media: [
      "/projects/gestor-gastos/dashboard.png",
      "/projects/gestor-gastos/wallets.png",
      "/projects/gestor-gastos/transacciones.png",
      "/projects/gestor-gastos/categorias.png",
      "/projects/gestor-gastos/reportes.png",
      "/projects/gestor-gastos/inversiones.png",
    ],
    highlights: ["python", "javascript", "html5", "css"],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      id: "E-commerce Papan Dart",
      en: "Dartboards e-commerce",
    },
    stack: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Stripe",
      "Framer Motion",
    ],
    desc: {
      id: "E-commerce modern untuk penjualan papan dart dengan pembayaran terintegrasi, autentikasi sosial, panel admin, dan animasi yang halus.",
      en: "Modern e-commerce for dartboards with integrated payments, social auth, an admin panel and smooth animations.",
    },
    details: {
      id: "E-commerce lengkap dengan katalog, keranjang, dan checkout dengan Stripe. NextAuth dengan Google OAuth dan kredensial, pembatasan laju dengan Upstash Redis, validasi Zod, dan panel admin terpisah (AdminJS di Express, port 3001). Framer Motion menghadirkan transisi dan mikro-interaksi untuk nuansa yang lebih premium daripada toko biasa.",
      en: "A full e-commerce with catalogue, cart and Stripe checkout. NextAuth with Google OAuth and credentials, Upstash Redis for rate limiting, Zod validation, and a separate admin panel (AdminJS on Express, port 3001). Framer Motion powers transitions and micro-interactions for a more premium feel than a typical shop.",
    },
    media: [
      "/projects/dianas/packs.png",
      "/projects/dianas/catalogo.png",
    ],
    highlights: ["nextdotjs", "react", "typescript", "tailwindcss", "firebase"],
    badge: { id: "Sedang Dibangun", en: "Under construction" },
    align: "right",
    section: "project4",
  },
];

const aboutMe: Array<{
  role: { id: string; en: string };
  company: string;
  period: { id: string; en: string };
  location: { id: string; en: string };
  summary: { id: string; en: string };
  bullets: { id: string; en: string }[];
  stack: string[];
}> = [
  {
    role: { id: "Tentang Saya", en: "About Me" },
    company: "Lampung",
    period: { id: "Portofolio", en: "Portfolio" },
    location: { id: "Indonesia", en: "Indonesia" },
    summary: {
      id: "Sebagai seorang mahasiswa yang berdedikasi di bidang teknologi, saya menggabungkan keahlian sebagai pengembang perangkat lunak dan pembuat konten untuk membangun ekosistem digital yang komprehensif. Selain memiliki kompetensi utama dalam merancang dan mengembangkan aplikasi web yang responsif, saya juga dibekali dengan pengalaman praktis yang mendalam dalam mengeksplorasi serta mengimplementasikan solusi cerdas berbasis Internet of Things (IoT) yang menghubungkan perangkat keras dengan sistem perangkat lunak.",
      en: "As a dedicated technology student, I combine my expertise as a software developer and content creator to build comprehensive digital ecosystems. In addition to my core competence in designing and developing responsive web applications, I am also equipped with deep practical experience in exploring and implementing smart Internet of Things (IoT) solutions that connect hardware with software systems.",
    },
    bullets: [
      {
        id: "Merancang dan membangun situs web yang interaktif, responsif, dan memberikan pengalaman visual yang optimal di berbagai perangkat.",
        en: "Designing and building interactive, responsive websites that provide an optimal visual experience across various devices",
      },
      {
        id: "Menciptakan perangkat lunak yang fungsional dan efisien untuk menghadirkan solusi praktis serta mempermudah aktivitas pengguna.",
        en: "Creating functional and efficient software to deliver practical solutions and simplify user activities.",
      },
      {
        id: "Menghubungkan perangkat keras dan sensor dengan perangkat lunak untuk membangun sistem otomasi cerdas yang dapat berinteraksi dengan lingkungan fisik.",
        en: "Connecting hardware and sensors with software to build smart automation systems that can interact with the physical environment.",
      },
      {
        id: "Mengemas ide dan informasi menjadi karya digital yang kreatif, edukatif, dan menarik untuk membangun interaksi yang bermakna dengan audiens.",
        en: "Packaging ideas and information into creative, educational, and engaging digital works to build meaningful interactions with the audience.",
      },
    ],
    stack: ["Python", "C++", "Next.js", "TypeScript", "MySQL", "React", "TailwindCSS", "IoT"],
  },
];

function pick<T>(loc: { id: T; en: T }, lang: Lang): T {
  return loc[lang];
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. On mobile
            the canvas lives inside the hero instead (see below) so it scrolls
            away and the rest of the page is clean, fast 2D. */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-[0.75rem] sm:text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap max-w-[40vw] overflow-hidden text-ellipsis sm:max-w-none"
            >
              Febri Widiane
            </span>
            {/* Wrapper (not the pill itself) carries the hide: .status-pill
                hard-sets display:inline-flex, which beats Tailwind's .hidden
                due to CSS source order, so hiding must happen on a parent. */}
            <span className="hidden md:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex gap-2">
            <a
              href="https://www.instagram.com/fbriii_wda?igsi=NDlwMjZidGNkdGJq&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn py-1.5 px-3 text-xs"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" strokeWidth="2" aria-hidden>
                <defs>
                  <linearGradient id="instagram-gradient" x1="3" y1="21" x2="21" y2="3">
                    <stop offset="0%" stopColor="#F58529" />
                    <stop offset="45%" stopColor="#DD2A7B" />
                    <stop offset="100%" stopColor="#8134AF" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-gradient)" />
                <circle cx="12" cy="12" r="4" stroke="#DD2A7B" />
                <circle cx="17.5" cy="6.5" r="1" fill="#F58529" stroke="none" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@wdanee"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn py-1.5 px-3 text-xs"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M14.7 3h3.1c.3 1.7 1.3 3 3.2 3.5v3.1c-1.1-.1-2.2-.5-3.1-1.1v6.2a5.3 5.3 0 1 1-4.6-5.2v3.2a2.2 2.2 0 1 0 1.4 2.1V3Z" fill="#25F4EE" opacity="0.9" transform="translate(-1 0)" />
                <path d="M15.5 3h3.1c.3 1.7 1.3 3 3.2 3.5v3.1c-1.1-.1-2.2-.5-3.1-1.1v6.2a5.3 5.3 0 1 1-4.6-5.2v3.2a2.2 2.2 0 1 0 1.4 2.1V3Z" fill="#FE2C55" opacity="0.9" transform="translate(1 0)" />
                <path d="M15.5 3h3.1c.3 1.7 1.3 3 3.2 3.5v3.1c-1.1-.1-2.2-.5-3.1-1.1v6.2a5.3 5.3 0 1 1-4.6-5.2v3.2a2.2 2.2 0 1 0 1.4 2.1V3Z" fill="#111827" />
              </svg>
              <span>TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/fbriii_wda?igsi=NDlwMjZidGNkdGJq&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn py-1.5 px-3 text-xs"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" strokeWidth="2" aria-hidden>
                <defs>
                  <linearGradient id="instagram-gradient-header" x1="3" y1="21" x2="21" y2="3">
                    <stop offset="0%" stopColor="#F58529" />
                    <stop offset="45%" stopColor="#DD2A7B" />
                    <stop offset="100%" stopColor="#8134AF" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-gradient-header)" />
                <circle cx="12" cy="12" r="4" stroke="#DD2A7B" />
                <circle cx="17.5" cy="6.5" r="1" fill="#F58529" stroke="none" />
              </svg>
              <span>Instagram</span>
            </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {/* Mobile-only 3D centerpiece. Lives inside the hero (scrolls away
                with it) and takes pointer events so keycaps are tappable. */}
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-[2.8rem] leading-[0.88] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 whitespace-normal sm:whitespace-nowrap sm:leading-[0.92]">
                <HeroWord text="Febri" delay={120} />
                <br className="hidden sm:block" />
                <HeroWord text="Widiane" delay={260} className="text-ice-400" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
                <br />
                {t("hero.tagline")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href={lang === "en" ? "/cv_en.pdf" : "/cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary w-full justify-center sm:w-auto"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn w-full justify-center sm:w-auto"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {t("hero.hire")}
                </button>
                <a
                  href="https://www.instagram.com/fbriii_wda?igsi=NDlwMjZidGNkdGJq&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn w-full justify-center sm:w-auto"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" strokeWidth="2" aria-hidden>
                    <defs>
                      <linearGradient id="instagram-gradient-mobile" x1="3" y1="21" x2="21" y2="3">
                        <stop offset="0%" stopColor="#F58529" />
                        <stop offset="45%" stopColor="#DD2A7B" />
                        <stop offset="100%" stopColor="#8134AF" />
                      </linearGradient>
                    </defs>
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-gradient-mobile)" />
                    <circle cx="12" cy="12" r="4" stroke="#DD2A7B" />
                    <circle cx="17.5" cy="6.5" r="1" fill="#F58529" stroke="none" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack — desktop relies on the 200vh scroll + sticky title while
              the keyboard does the talking on hover. On mobile (md:) that
              choreography is gone, so we drop the tall scroll and render a
              real, legible skills grid with the same taglines. */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid (recovers the hover interaction as static
                  content the keyboard can't surface on touch). */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Experience — title is sticky at top-24 (feels anchored) but sits
              BEHIND the cards (z-0 vs. card wrapper's z-10), so as you scroll
              the card slides over the title. The section has no extra filler
              beyond the cards, so when you scroll past the last card the
              section ends and the title un-pins and exits the viewport at the
              same time — giving the "anchored then both disappear" feel. */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("aboutMe.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("aboutMe.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {aboutMe.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-4 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-[minmax(120px,160px)_1fr] gap-4 md:gap-5 items-start mb-5">
                    <Image
                      src={profileImage}
                      alt="Foto profil"
                      quality={100}
                      sizes="(min-width: 768px) 160px, 32vw"
                      className="w-32 md:w-full aspect-3/4 object-cover rounded-xl border border-ink-3 mx-auto md:mx-0"
                    />
                    <p className="text-ice-200 leading-relaxed text-left">
                      {pick(exp.summary, lang)}
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("Ver más") don't sit under the
                      // fixed SectionNav dots on the right edge. On mobile they
                      // collapse to a normal left-aligned full-width card.
                      "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary w-full justify-center sm:w-auto"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn w-full justify-center sm:w-auto"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.openMail")}
                  </a>
                  <a
                    href="https://www.instagram.com/fbriii_wda?igsi=NDlwMjZidGNkdGJq&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn w-full justify-center sm:w-auto"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" strokeWidth="2" aria-hidden>
                      <defs>
                        <linearGradient id="instagram-gradient-contact" x1="3" y1="21" x2="21" y2="3">
                          <stop offset="0%" stopColor="#F58529" />
                          <stop offset="45%" stopColor="#DD2A7B" />
                          <stop offset="100%" stopColor="#8134AF" />
                        </linearGradient>
                      </defs>
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-gradient-contact)" />
                      <circle cx="12" cy="12" r="4" stroke="#DD2A7B" />
                      <circle cx="17.5" cy="6.5" r="1" fill="#F58529" stroke="none" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 whitespace-nowrap text-[10px] uppercase tracking-[0.08em] text-ice-400 sm:text-[11px] sm:tracking-[0.25em]">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}
