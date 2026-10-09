export type Lang = "id" | "en";

export const LANGUAGES: Lang[] = ["id", "en"];
export const DEFAULT_LANG: Lang = "id";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).id === "string";
}

export const DICT = {
  picker: {
    season: { id: "Musim", en: "Season" },
    language: { id: "Bahasa", en: "Language" },
  },
  seasons: {
    spring: { id: "Musim Semi", en: "Spring" },
    summer: { id: "Musim Panas", en: "Summer" },
    autumn: { id: "Musim Gugur", en: "Autumn" },
    winter: { id: "Musim Dingin", en: "Winter" },
  },
  nav: {
    aria: { id: "Bagian", en: "Sections" },
    home: { id: "Beranda", en: "Home" },
    stack: { id: "Stack", en: "Stack" },
    experience: { id: "Tentang Saya", en: "About Me" },
    project: { id: "Proyek", en: "Project" },
    contact: { id: "Kontak", en: "Contact" },
  },
  header: {
    availability: {
      id: "Buka untuk peluang",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { id: "Halo, saya", en: "Hi, I am" },
    roleLine: {
      id: "Software Engineer & Pembuat Konten.",
      en: "Software Engineer & Content Creator.",
    },
    tagline: {
      id: "Saya adalah seorang pengembang web, pembuat konten, dan mahasiswa yang terampil serta memiliki pengalaman di bidang Internet of Things (IoT).",
      en: "I am a web developer, content creator, and student with skills and experience in the field of Internet of Things (IoT).",
    },
    cv: { id: "Unduh CV", en: "Download CV" },
    hire: { id: "Hubungi Saya", en: "Contact me" },
    scroll: { id: "Gulir untuk menjelajahi", en: "Scroll to explore" },
    keysHint: {
      id: "· arahkan kursor ke tombol",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { id: "Tech Stack", en: "Tech Stack" },
    hint: {
      id: "(petunjuk: arahkan kursor ke tombol)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      id: "Alat yang saya gunakan untuk membangun.",
      en: "The tools I build with.",
    },
  },
  aboutMe: {
    title: { id: "Tentang Saya", en: "About Me" },
    subtitle: {
      id: "Mahasiswa Teknologi Rekayasa Perangkat Lunak | Pengembang IoT & Penggiat Data.",
      en: "Software Engineering Technology Student | IoT Developer & Data Enthusiast.",
    },
  },
  projects: {
    kicker: { id: "proyek", en: "project" },
    viewMore: { id: "Lihat lebih", en: "View more" },
    openSite: { id: "Kunjungi situs", en: "Visit site" },
    viewCode: { id: "Lihat kode", en: "View code" },
    close: { id: "Tutup", en: "Close" },
    stackLabel: { id: "Stack", en: "Stack" },
    overview: { id: "Ringkasan", en: "Overview" },
  },
  contact: {
    kicker: { id: "kontak", en: "contact" },
    title: { id: "Mari berbicara?", en: "Let's talk?" },
    body: {
      id: "Jika yang Anda lihat menarik, keyboard sudah siap menerima pesan pertama.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { id: "Salin email", en: "Copy email" },
    openMail: { id: "Buka email", en: "Open mailto" },
    github: { id: "GitHub", en: "GitHub" },
    linkedin: { id: "LinkedIn", en: "LinkedIn" },
    emailToast: { id: "Email disalin", en: "Email copied" },
    footer: {
      id: "© 2026 Febri Widiane. Semua hak dilindungi.",
      en: "© 2026 Febri Widiane. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      javascript: {
        id: "Tempat semuanya dimulai. Masih di sini, masih menguasai.",
        en: "Where it all started. Still here, still in charge.",
      },
      typescript: {
        id: "JS yang sama, dengan sabuk keselamatan.",
        en: "Same JS, with a seatbelt.",
      },
      html5: {
        id: "Tulang dari halaman apa pun.",
        en: "The bones of any page.",
      },
      css: {
        id: "Detail yang memisahkan baik dari indah.",
        en: "What separates good from beautiful.",
      },
      tailwindcss: {
        id: "Utility-first. Desain di dalam HTML.",
        en: "Utility-first. Design inside the HTML.",
      },
      python: {
        id: "Dibaca seperti Inggris, berkembang seperti roket.",
        en: "Reads like English, scales like a rocket.",
      },
      react: {
        id: "Komponen, komponen, komponen.",
        en: "Components, components, components.",
      },
      nextdotjs: {
        id: "React yang sudah dewasa: routing, SSR, edge.",
        en: "React all grown up: routing, SSR, edge.",
      },
      vuedotjs: {
        id: "Frontend paling santai.",
        en: "The most relaxed frontend.",
      },
      nodedotjs: {
        id: "JavaScript di server.",
        en: "JavaScript on the server.",
      },
      php: {
        id: "Menjalankan lebih banyak web daripada yang Anda pikirkan.",
        en: "Runs more of the web than you think.",
      },
      odoo: {
        id: "ERP yang tidak membuat Anda menangis.",
        en: "ERP that doesn't make you cry.",
      },
      postgresql: {
        id: "Database membosankan yang selalu bekerja.",
        en: "The boring database that always works.",
      },
      docker: {
        id: "Sama di mesin saya, sama di produksi.",
        en: "Same on my machine, same in production.",
      },
      git: {
        id: "Sejarah dan mesin waktu untuk kode Anda.",
        en: "History and a time machine for your code.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.id ?? path;
  return path;
}
