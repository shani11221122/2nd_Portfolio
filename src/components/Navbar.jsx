import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowDownToLine } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// The CV now lives inside the project itself (public/assets/cv/), so it
// downloads directly from the site instead of opening a Google Drive tab.
const CV_PATH = "/assets/cv/Muhammad-Zeeshan-CV.pdf";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // "active" tracks which section id is currently in view, so the matching
  // nav link can be highlighted — a small but genuinely useful touch,
  // similar to how a real app tells you which page you're on.
  const [active, setActive] = useState("top");

  // useScroll (Framer Motion) gives us "scrollYProgress": a value from 0
  // (top of page) to 1 (bottom of page). useSpring smooths it out so the
  // bar doesn't move in a jumpy, mechanical way.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // IntersectionObserver watches each section and tells us when it
    // crosses the middle of the screen — that section becomes "active".
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" } // triggers when a section is near screen-center
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll progress bar — a thin line that fills up as you scroll
          down the page. Sits above the navbar itself (z-[60]). */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-[2px] accent-line origin-left z-[60]"
      />

      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-base sm:text-lg font-semibold tracking-tight"
        >
          <span className="text-ink">Muhammad</span>{" "}
          <span className="text-emerald">Zeeshan</span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`transition-colors ${
                  active === link.href
                    ? "text-emerald font-medium"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={CV_PATH}
            download="Muhammad-Zeeshan-CV.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm font-medium text-ink border border-border rounded-lg px-4 py-2 hover:border-emerald/50 hover:text-emerald transition-colors"
          >
            <ArrowDownToLine size={16} />
            Resume
          </motion.a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block text-base transition-colors ${
                      active === link.href ? "text-emerald" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CV_PATH}
                  download="Muhammad-Zeeshan-CV.pdf"
                  className="flex items-center gap-2 text-emerald font-medium"
                >
                  <ArrowDownToLine size={16} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
