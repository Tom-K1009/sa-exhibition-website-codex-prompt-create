"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Menu,
  Play,
  Users,
  X
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  type Variants,
  useMotionValueEvent,
  useScroll,
  useTransform
} from "framer-motion";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

const navItems = [
  "Home",
  "About",
  "Works",
  "Making",
  "PV",
  "Class"
];

type ScreeningWork = {
  id: string;
  category: string;
  title: string;
  videoSrc: string | null;
};

const screeningWorks: ScreeningWork[] = [
  {
    id: "SA—F01",
    category: "Short Film",
    title: "Meteor",
    videoSrc: null
  },
  {
    id: "SA—MV01",
    category: "Music Video",
    title: "Tokyo Flash",
    videoSrc: null
  }
];

const galleryItems = [
  {
    src: assetPath("/tokyo-flash-mv-optimized.webp"),
    caption: "Location study and visual planning"
  },
  {
    src: assetPath("/tokyo-flash-mv-optimized.webp"),
    caption: "Music video production"
  },
  {
    src: assetPath("/shooting-stars-film-optimized.webp"),
    caption: "Short film production"
  },
  {
    src: assetPath("/tokyo-flash-mv-optimized.webp"),
    caption: "Lighting and camera test"
  },
  {
    src: assetPath("/shooting-stars-film-optimized.webp"),
    caption: "On-set direction"
  },
  {
    src: assetPath("/tokyo-flash-mv-optimized.webp"),
    caption: "Editing and post-production"
  }
];

const teamPhotos = [
  {
    src: assetPath("/team/mv-plus-optimized.webp"),
    label: "MV Team"
  },
  {
    src: assetPath("/team/short-film-team-2026.webp"),
    label: "Short Film Team"
  },
  {
    src: assetPath("/team/advertisement-optimized.webp"),
    label: "Advertisement Team"
  }
];

const schedule = [
  ["Opening", "Welcome and introduction to SA G2 Exhibition 2026"],
  ["Music Video Presentation", "Tokyo Flash screening and production notes"],
  ["Short Film Presentation", "Meteor screening and production notes"],
  ["Advertisement Presentation", "Exhibition promotion and campaign presentation"],
  ["Closing Ceremony", "Reflections, acknowledgements, and final message"]
];

const classCredits = [
  "Yonyon",
  "Aran",
  "Yuino",
  "Sayuki",
  "Ziyi",
  "Nao",
  "Karina",
  "Tom",
  "Seio",
  "Kojiro",
  "Nobusuke",
  "Rehan",
  "Ayaka",
  "Kai",
  "Haku Nonoichiya",
  "Niina"
];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: "easeOut" }
  }
};

function SectionTitle({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <motion.div
      className="mb-16 border-t border-white/12 pt-5"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.06em] text-aurora">
        {eyebrow}
      </p>
      <h2 className="max-w-4xl font-display text-4xl font-medium leading-[0.96] text-white sm:text-6xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
          {body}
        </p>
      ) : null}
    </motion.div>
  );
}

function PassingLight() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <motion.span
        className="absolute left-[-180px] top-[28%] h-px w-36 origin-right -rotate-[6deg] bg-gradient-to-r from-transparent via-white/35 to-white/90 shadow-[0_0_6px_rgba(255,255,255,0.28)]"
        animate={{
          x: [0, "calc(100vw + 360px)"],
          y: [0, 36],
          opacity: [0, 0.85, 0.85, 0]
        }}
        transition={{ duration: 0.82, repeat: Infinity, repeatDelay: 7.2, ease: "easeOut" }}
      >
        <span className="absolute -right-px top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </motion.span>
      <motion.span
        className="absolute right-[-150px] top-[68%] h-px w-24 origin-left rotate-[4deg] bg-gradient-to-l from-transparent via-white/28 to-white/72 shadow-[0_0_5px_rgba(255,255,255,0.2)]"
        animate={{
          x: [0, "calc(-100vw - 300px)"],
          y: [0, -24],
          opacity: [0, 0.62, 0.62, 0]
        }}
        transition={{
          delay: 3.4,
          duration: 0.68,
          repeat: Infinity,
          repeatDelay: 11.5,
          ease: "easeOut"
        }}
      >
        <span className="absolute -left-px top-1/2 h-[2px] w-[2px] -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_7px_rgba(255,255,255,0.75)]" />
      </motion.span>
    </div>
  );
}

function HiddenStar({
  id,
  found,
  className,
  onFind
}: {
  id: number;
  found: boolean;
  className: string;
  onFind: (id: number) => void;
}) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <AnimatePresence>
        {!found ? (
          <motion.button
            key={`hidden-star-${id}`}
            type="button"
            aria-label={`Hidden star ${id} of 3`}
            className="group grid h-10 w-10 place-items-center rounded-full text-white/30 outline-none focus-visible:ring-1 focus-visible:ring-aurora"
            initial={{ opacity: 0.62 }}
            animate={{ opacity: [0.52, 0.9, 0.52] }}
            exit={{
              opacity: [0.35, 0.8, 0],
              scale: [1, 3.2, 3.8],
              filter: ["blur(0px)", "blur(1px)", "blur(4px)"],
              transition: { duration: 0.55, ease: "easeOut" }
            }}
            transition={{
              opacity: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ opacity: 1 }}
            whileTap={{ opacity: 1 }}
            onClick={() => onFind(id)}
          >
            <span className="relative h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.9),0_0_14px_rgba(255,255,255,0.38)] transition group-hover:shadow-[0_0_7px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.58)]">
              <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[3px]" />
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const secretFutureSections = [
  "Behind-the-scenes photos",
  "Offshots",
  "Unused ideas",
  "Member comments"
];

const offshotVideos = [
  {
    src: assetPath("/offshots/offshot-peace-optimized.mp4"),
    poster: assetPath("/offshots/offshot-peace-poster.webp"),
    label: "Peace"
  },
  {
    src: assetPath("/offshots/offshot-gif-optimized.mp4"),
    poster: assetPath("/offshots/offshot-gif-poster.webp"),
    label: "GIF"
  },
  {
    src: assetPath("/offshots/offshot-Rec-optimized.mp4"),
    poster: assetPath("/offshots/offshot-Rec-poster.webp"),
    label: "Rec"
  },
  {
    src: assetPath("/offshots/offshot-walk-optimized.mp4"),
    poster: assetPath("/offshots/offshot-walk-poster.webp"),
    label: "Walk"
  }
];

export default function ExhibitionPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [foundStars, setFoundStars] = useState<number[]>([]);
  const [completionDismissed, setCompletionDismissed] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [memeOpen, setMemeOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 70]);
  const heroOpacity = useTransform(scrollY, [0, 620], [0.92, 0.42]);
  const foundCount = foundStars.length;
  const allFound = foundCount === 3;
  const showCompletion = allFound && !completionDismissed && !secretOpen;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  useEffect(() => {
    if (!showCompletion && !secretOpen && !memeOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (memeOpen) {
        setMemeOpen(false);
      } else if (secretOpen) {
        setSecretOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [memeOpen, secretOpen, showCompletion]);

  useEffect(() => {
    if (!secretOpen) return;

    const hiddenImage = new window.Image();
    hiddenImage.src = assetPath("/secret/maki-meme-optimized.webp");
  }, [secretOpen]);

  const findStar = (id: number) => {
    setFoundStars((current) => {
      if (current.includes(id)) return current;
      return [...current, id];
    });
  };

  const viewSecret = () => {
    setCompletionDismissed(true);
    setSecretOpen(true);
  };

  const resetDiscovery = () => {
    setFoundStars([]);
    setCompletionDismissed(false);
    setSecretOpen(false);
    setMemeOpen(false);
  };

  return (
    <main className="relative overflow-hidden bg-ink text-pearl">
      <PassingLight />
      <motion.header
        className={`fixed inset-x-3 top-3 z-50 mx-auto max-w-[1120px] rounded-[8px] px-3 py-2 transition-all duration-300 sm:inset-x-5 sm:top-5 sm:px-4 ${
          scrolled
            ? "border border-white/10 bg-[#0a0a0a] shadow-[0_18px_60px_rgba(0,0,0,0.38)]"
            : "border border-white/10 bg-[#0a0a0a]"
        }`}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <nav className="relative flex items-center justify-between gap-4" aria-label="Primary navigation">
          <a
            href="#home"
            className="flex h-10 min-w-0 items-center gap-2.5 px-1 font-display text-[13px] font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            <span className="grid h-7 w-8 shrink-0 place-items-center rounded-[5px] bg-white text-[10px] font-bold text-ink">
              G2
            </span>
            <span className="truncate">SA Exhibition</span>
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="inline-flex h-9 items-center rounded-[5px] px-2.5 text-[11px] font-medium text-white/58 transition hover:bg-white/8 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#works"
              className="group hidden h-9 items-center gap-1.5 rounded-[5px] bg-white px-3 text-[11px] font-semibold text-ink transition hover:bg-aurora focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
            >
              View works
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-[5px] border border-white/12 text-white/75 transition hover:bg-white/8 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora lg:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                id="mobile-navigation"
                className="absolute left-0 right-0 top-[calc(100%+12px)] overflow-hidden rounded-[8px] border border-white/12 bg-[#0a0a0a] p-2 shadow-2xl lg:hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                  {navItems.map((item, index) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="flex min-h-11 items-center justify-between rounded-[5px] px-3 text-xs font-medium text-white/68 transition hover:bg-white/8 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{item}</span>
                      <span className="type-index text-[9px] text-white/28">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  ))}
                </div>
                <a
                  href="#works"
                  className="mt-1 flex min-h-11 items-center justify-between rounded-[5px] bg-white px-3 text-xs font-semibold text-ink sm:hidden"
                  onClick={() => setMenuOpen(false)}
                >
                  View works
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </motion.header>

      <motion.div
        className="fixed right-4 top-[4.5rem] z-40 flex flex-col items-end rounded-[4px] bg-black/55 px-2 py-2 font-sans text-[9px] font-medium tracking-[0.08em] text-white/42 backdrop-blur-sm sm:right-3 sm:top-1/2 sm:-translate-y-1/2 sm:bg-transparent sm:text-[10px] sm:text-white/36 sm:backdrop-blur-none"
        aria-live="polite"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="flex items-center">
          FOUND&nbsp;
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={foundCount}
              className="type-index inline-block min-w-[1.25em] text-right text-white/60"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.2 }}
            >
              {String(foundCount).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          —03
        </span>
        <AnimatePresence>
          {foundCount > 0 ? (
            <motion.button
              type="button"
              className="mt-2 border-b border-white/15 pb-0.5 text-[9px] font-medium tracking-[0.06em] text-white/32 transition hover:border-white/45 hover:text-white/72 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              onClick={resetDiscovery}
            >
              RESET
            </motion.button>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <Image
            src={assetPath("/tokyo-flash-mv-optimized.webp")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.14] grayscale"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.72)_0%,rgba(10,10,10,0.58)_48%,rgba(10,10,10,1)_100%)]" />
        </motion.div>
        <div className="section-shell relative z-10 pb-16 pt-20">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.06em] text-white/56">
              <span className="h-px w-5 bg-white/50" aria-hidden="true" />
              Digital Hollywood University
            </p>
            <div className="relative w-fit max-w-full pb-3">
              <h1 className="font-display text-5xl font-medium uppercase leading-[0.84] text-white sm:text-7xl lg:text-[7.5rem]">
                <span className="block">SA G2</span>
                <span className="block">Exhibition</span>
              </h1>
            </div>
            <p className="mt-8 max-w-xl border-l border-white/20 pl-5 text-lg leading-7 text-white/68 sm:text-xl sm:leading-8">
              Two stories. One exhibition.
            </p>
            <div className="mt-10">
              <motion.a
                href="#about"
                className="inline-flex h-14 items-center gap-3 rounded-[8px] bg-white px-6 font-semibold text-ink shadow-glow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Exhibition
                <ArrowUpRight className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="relative py-24">
        <HiddenStar
          id={1}
          found={foundStars.includes(1)}
          className="bottom-[12%] right-[8%] sm:right-[12%]"
          onFind={findStar}
        />
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.06em] text-aurora">
              About
            </p>
            <h2 className="font-display text-4xl font-medium leading-[0.96] text-white sm:text-6xl">
              <span className="block">Visual stories,</span>
              <span className="block text-white/58">presented in English.</span>
            </h2>
          </motion.div>
          <motion.div
            className="glass rounded-[8px] p-7 sm:p-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
          >
            <p className="text-lg leading-9 text-white/74">
              SA G2 Exhibition is a creative showcase where students of Digital
              Hollywood University present visual storytelling projects in
              English through filmmaking, music videos, and digital media.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="works" className="py-24">
        <div className="section-shell">
          <SectionTitle eyebrow="Works" title="Short Film & Music Video" />
          <div className="grid gap-10 lg:grid-cols-2">
            {screeningWorks.map((work, index) => (
              <motion.article
                key={work.id}
                className="border-t border-white/14 pt-4"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-aurora">
                    {work.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
                    {work.title}
                  </h3>
                </div>

                <div className="relative aspect-video overflow-hidden bg-[#0d0d0d]">
                  {work.videoSrc ? (
                    <video
                      className="h-full w-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={`${work.category}: ${work.title}`}
                    >
                      <source src={work.videoSrc} type="video/mp4" />
                      Your browser does not support this video.
                    </video>
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <Play className="mx-auto h-5 w-5 text-white/28" aria-hidden="true" />
                        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.05em] text-white/34">
                          Coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="making" className="py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Behind the Scenes"
            title="Pictures from the making process."
            body="Production photographs will document planning, filming, direction, and editing by the SA G2 English Class."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <motion.figure
                key={`${item.caption}-${index}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white/5"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 backdrop-blur-0 transition duration-500 group-hover:bg-ink/42 group-hover:backdrop-blur-sm" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-sm font-semibold text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="pv" className="py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Exhibition PV"
            title="One preview for the complete exhibition."
            body="The general promotional video will introduce both featured works and the students behind the exhibition."
          />
          <motion.div
            className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
          >
            <video
              className="h-full w-full bg-black object-contain"
              controls
              playsInline
              preload="metadata"
              poster={assetPath("/pv/final-pv-poster.webp")}
              aria-label="SA G2 Exhibition 2026 promotional video"
            >
              <source src={assetPath("/pv/final-pv-optimized.mp4")} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </motion.div>
        </div>
      </section>

      <section id="schedule" className="py-24">
        <div className="section-shell">
          <SectionTitle eyebrow="Schedule" title="Program" />
          <div className="mx-auto max-w-3xl">
            {schedule.map(([title, detail], index) => (
              <motion.div
                key={title}
                className="relative grid grid-cols-[64px_1fr] gap-4 pb-10 last:pb-0 sm:gap-6"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative">
                  <div className="type-index flex h-12 items-center font-display text-[10px] font-medium text-white/42">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {index < schedule.length - 1 ? (
                    <div className="absolute left-0 top-12 h-full w-px bg-white/10" />
                  ) : null}
                </div>
                <div className="glass rounded-[8px] p-6">
                  <h3 className="font-display text-2xl font-medium leading-tight text-white">{title}</h3>
                  <p className="mt-2 leading-7 text-white/62">{detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="class" className="relative py-24">
        <HiddenStar
          id={2}
          found={foundStars.includes(2)}
          className="left-[4%] top-[42%] sm:left-[7%]"
          onFind={findStar}
        />
        <div className="section-shell">
          <motion.div
            className="relative overflow-hidden rounded-[8px] border border-white/12 bg-white text-ink"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
          >
            <div className="absolute right-0 top-0 h-64 w-64 bg-aurora/30 blur-3xl" />
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.05em] text-midnight/56">
                  SA—G2 / Class Information
                </p>
                <h2 className="font-display text-4xl font-medium leading-[0.96] sm:text-6xl">
                  <span className="block">Created by students,</span>
                  <span className="block text-midnight/54">together.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-midnight/68">
                  SA G2 English Class students planned and produced the exhibition,
                  from visual storytelling and filming to English presentations.
                </p>
              </div>
              <div className="rounded-[8px] border border-ink/10 bg-ink p-6 text-white">
                <Users className="mb-5 h-6 w-6 text-aurora" aria-hidden="true" />
                <p className="text-[11px] uppercase tracking-[0.05em] text-white/44">
                  Organized by
                </p>
                <p className="mt-3 text-2xl font-semibold">SA G2 English Class</p>
                <p className="mt-2 text-white/58">Digital Hollywood University</p>
                <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-white/54">
                  Member profiles and individual roles will be added here.
                </p>
              </div>
            </div>
          </motion.div>
          <div className="mt-14 flex items-end justify-between gap-6 border-b border-white/12 pb-5">
            <div>
              <p className="text-[11px] font-medium uppercase text-white/42">
                SA G2 English Class
              </p>
              <h3 className="mt-2 font-display text-3xl font-medium text-white sm:text-4xl">
                Production Teams
              </h3>
            </div>
          </div>
          <div className="mt-7 grid gap-x-5 gap-y-9 md:grid-cols-2">
            {teamPhotos.map((photo) => (
              <motion.figure
                key={photo.src}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-white/[0.04]">
                  <Image
                    src={photo.src}
                    alt={`${photo.label} group photo`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-[1.015]"
                  />
                </div>
                <figcaption className="mt-3 border-t border-white/10 pt-3">
                  <span className="text-sm font-medium text-white/78">{photo.label}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <motion.div
            className="mt-16 border-t border-white/12 pt-5"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-medium uppercase text-white/42">
                  SA G2 English Class
                </p>
                <h3 className="mt-2 font-display text-3xl font-medium text-white sm:text-4xl">
                  Credits
                </h3>
              </div>
              <p className="type-index text-[10px] text-white/32">16 MEMBERS</p>
            </div>
            <ul className="mt-7 grid grid-cols-2 border-t border-white/10 sm:grid-cols-3 lg:grid-cols-4">
              {classCredits.map((name) => (
                <li
                  key={name}
                  className="border-b border-white/10 py-3 pr-3 text-sm text-white/66"
                >
                  {name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 py-10">
        <HiddenStar
          id={3}
          found={foundStars.includes(3)}
          className="bottom-4 right-[16%] sm:right-[20%]"
          onFind={findStar}
        />
        <div className="section-shell flex flex-col gap-4 text-sm text-white/54 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display font-medium uppercase leading-tight text-white">
            <span className="block">SA G2</span>
            <span className="block">Exhibition 2026</span>
          </p>
          <p>Digital Hollywood University</p>
          <p>Designed and Developed by SA G2 English Class</p>
        </div>
      </footer>

      <AnimatePresence>
        {showCompletion ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-[#080808] px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <div className="max-w-3xl">
              <motion.p
                className="font-sans text-sm font-medium tracking-[0.06em] text-white/88 sm:text-base"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.2 }}
              >
                YOU FOUND SOMETHING.
              </motion.p>
              <motion.p
                className="mt-6 text-xs font-normal tracking-[0.05em] text-white/48"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 1.2 }}
              >
                BEHIND SA EXHIBITION
              </motion.p>
              <motion.button
                type="button"
                className="mt-12 h-11 rounded-[4px] border border-white/20 px-5 text-[11px] font-medium tracking-[0.06em] text-white/75 transition hover:border-white/45 hover:bg-white hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8, duration: 0.8 }}
                whileTap={{ scale: 0.98 }}
                onClick={viewSecret}
              >
                VIEW SECRET
              </motion.button>
              <motion.button
                type="button"
                className="mx-auto mt-5 block border-b border-white/15 pb-1 text-[10px] font-medium tracking-[0.05em] text-white/34 transition hover:border-white/45 hover:text-white/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.2, duration: 0.6 }}
                onClick={resetDiscovery}
              >
                RESET EXPERIENCE
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {secretOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#050505] px-4 py-8 sm:px-8 sm:py-14"
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="mx-auto max-w-4xl border-y border-white/16 bg-[#050505] py-10 sm:py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-medium tracking-[0.06em] text-white/42">SECRET 01</p>
                  <h2 id="secret-title" className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-white sm:text-5xl">
                    BEHIND THE EXHIBITION
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close secret"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
                  onClick={() => {
                    setMemeOpen(false);
                    setSecretOpen(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-14 max-w-xl space-y-7 text-lg leading-8 text-white/66">
                <p>This exhibition was created by SA.</p>
                <p>
                  Some ideas disappeared.<br />
                  Some scenes changed.<br />
                  Some moments remained.
                </p>
                <p className="font-display font-semibold text-white">SA EXHIBITION 2026</p>
              </div>

              <div className="mt-16 grid gap-px overflow-hidden rounded-[8px] border border-white/10 bg-white/10 sm:grid-cols-2">
                {secretFutureSections.map((section, index) => (
                  <div
                    key={section}
                    className={`relative min-h-36 bg-[#0a0a0a] p-6 ${section === "Offshots" ? "sm:col-span-2" : ""}`}
                  >
                    {section === "Unused ideas" ? (
                      <motion.button
                        type="button"
                        aria-label="Open secret 02"
                        className="group absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                        animate={{ opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ opacity: 1 }}
                        onClick={() => setMemeOpen(true)}
                      >
                        <span className="relative h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.9),0_0_14px_rgba(255,255,255,0.38)] transition group-hover:shadow-[0_0_7px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.58)]">
                          <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[3px]" />
                        </span>
                      </motion.button>
                    ) : null}
                    <p className="text-xs tracking-[0.04em] text-white/30">0{index + 1}</p>
                    <h3 className="mt-8 font-display text-lg font-semibold text-white/72">{section}</h3>
                    {section === "Offshots" ? (
                      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {offshotVideos.map((video, videoIndex) => (
                          <figure key={video.src} className="mx-auto w-full max-w-[210px]">
                            <video
                              className="aspect-[4/5] w-full bg-black object-contain"
                              controls
                              playsInline
                              preload="none"
                              poster={video.poster}
                              aria-label={`Offshot ${videoIndex + 1}: ${video.label}`}
                            >
                              <source src={video.src} type="video/mp4" />
                              Your browser does not support this video.
                            </video>
                            <figcaption className="mt-2 flex items-center justify-between gap-2 text-[10px] text-white/38">
                              <span className="type-index">OF—0{videoIndex + 1}</span>
                              <span>{video.label}</span>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-xs uppercase tracking-[0.04em] text-white/28">Coming later</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {memeOpen ? (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-black/96 px-5 py-8"
            role="dialog"
            aria-modal="true"
            aria-label="Secret 02"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <motion.div
              className="relative mx-auto w-full max-w-md"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
            >
              <button
                type="button"
                aria-label="Close secret 02"
                className="absolute right-2 top-2 z-10 grid h-10 w-10 place-items-center rounded-full border border-black/15 bg-white/85 text-black/65 backdrop-blur transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                onClick={() => setMemeOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
              <Image
                src={assetPath("/secret/maki-meme-optimized.webp")}
                alt="Maki meme with the caption You fell for it, guys!!"
                width={1152}
                height={1536}
                loading="eager"
                sizes="(min-width: 640px) 448px, calc(100vw - 40px)"
                className="max-h-[calc(100vh-64px)] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
