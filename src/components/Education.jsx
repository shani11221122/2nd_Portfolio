import { motion } from "framer-motion";
import { School, Landmark, GraduationCap, MapPin } from "lucide-react";

// One entry per stage of education, in the order they actually happened.
// "percent" drives the width of the animated score bar below each entry —
// it's computed from the marks/CGPA so the bar and the number always agree.
const EDUCATION = [
  {
    step: "01",
    icon: School,
    level: "Matriculation · Science",
    institute: "F.G Public Boys School",
    location: "Kharian Cantt",
    image: "/assets/education/school.jpg",
    scoreLabel: "Marks",
    scoreValue: "955 / 1100",
    percent: 87,
  },
  {
    step: "02",
    icon: Landmark,
    level: "FSc · Pre-Medical · Science",
    institute: "APS&CS Sargodha Cantt",
    location: "Army Public School & College",
    image: "/assets/education/college.jpg",
    scoreLabel: "Marks",
    scoreValue: "1013 / 1100",
    percent: 92,
  },
  {
    step: "03",
    icon: GraduationCap,
    level: "BS Information Technology",
    institute: "University of Sargodha",
    location: "Specialization: Full-Stack Development",
    image: "/assets/education/university.jpg",
    scoreLabel: "CGPA",
    scoreValue: "3.25 / 4.00",
    percent: 81,
  },
];

export default function Education() {
  return (
    <section id="education" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-ink"
        >
          Education
        </motion.h2>

        <div className="mt-14 space-y-16">
          {EDUCATION.map((edu, index) => {
            const Icon = edu.icon;
            // On desktop, odd rows show image-left/text-right and even
            // rows flip to image-right/text-left — this alternating
            // "zigzag" is what gives the section an editorial, premium feel
            // instead of a flat repeating list.
            const reversed = index % 2 === 1;

            return (
              <motion.div
                key={edu.institute}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  reversed ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Image, with a numbered badge overlapping its corner */}
                <div className={reversed ? "md:[direction:ltr]" : ""}>
                  <div className="relative">
                    <div className="glass rounded-2xl p-3">
                      <div className="accent-line h-[3px] w-full rounded-full mb-3" />
                      <img
                        src={edu.image}
                        alt={edu.institute}
                        className="rounded-xl w-full h-56 sm:h-64 object-cover"
                      />
                    </div>
                    <div className="absolute -top-4 -left-4 w-14 h-14 rounded-xl glass flex flex-col items-center justify-center shadow-xl">
                      <Icon size={18} className="text-emerald" />
                      <span className="font-mono text-[10px] text-muted mt-0.5">
                        {edu.step}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text + score bar */}
                <div className={reversed ? "md:[direction:ltr]" : ""}>
                  <p className="font-mono text-sm text-indigo">{edu.level}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                    {edu.institute}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={14} />
                    {edu.location}
                  </p>

                  {/* Score bar — starts at 0 width and animates to the real
                      percentage once this block scrolls into view. */}
                  <div className="mt-6 max-w-xs">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-xs text-muted">
                        {edu.scoreLabel}
                      </span>
                      <span className="font-mono text-sm text-ink">
                        {edu.scoreValue}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${edu.percent}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full accent-line"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
