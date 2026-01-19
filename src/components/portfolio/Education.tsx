import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const education = [
  {
    type: "education",
    title: "Bachelor of Science in Information Technology",
    institution: "University of Technology",
    period: "2021 - Present (Expected 2025)",
    description: "Focus on software development, database management, and IT infrastructure. Dean's Lister for academic excellence.",
  },
];

const experience = [
  {
    type: "experience",
    title: "IT Intern",
    institution: "Tech Solutions Inc.",
    period: "Summer 2024",
    description: "Assisted in network maintenance, hardware troubleshooting, and software installation. Gained hands-on experience with enterprise IT systems.",
  },
  {
    type: "experience",
    title: "Freelance Web Developer",
    institution: "Self-Employed",
    period: "2023 - Present",
    description: "Developed simple websites for local businesses using HTML, CSS, and JavaScript. Managed client requirements and project timelines.",
  },
];

const certifications = [
  "Cisco Networking Basics Certificate",
  "SQL for Data Science (Coursera)",
  "Introduction to Cybersecurity (Cisco)",
  "Google IT Support Professional Certificate (In Progress)",
];

const TimelineItem = ({
  item,
  index,
  isInView,
}: {
  item: (typeof education)[0];
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15 }}
      className="relative pl-8 pb-8 border-l border-border last:pb-0"
    >
      {/* Dot */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-glow" />
      
      {/* Content */}
      <div className="glass p-5 rounded-lg">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          <span className="text-xs text-primary font-mono">{item.period}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{item.institution}</p>
        <p className="text-sm text-muted-foreground/80">{item.description}</p>
      </div>
    </motion.div>
  );
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-12 max-w-4xl mx-auto">
            <span className="text-primary font-mono text-sm">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Education & Experience</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Education Column */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="flex items-center gap-2 mb-6"
              >
                <GraduationCap className="text-primary" size={20} />
                <h3 className="text-lg font-medium">Education</h3>
              </motion.div>
              <div>
                {education.map((item, index) => (
                  <TimelineItem
                    key={item.title}
                    item={item}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-6"
              >
                <Briefcase className="text-primary" size={20} />
                <h3 className="text-lg font-medium">Experience</h3>
              </motion.div>
              <div>
                {experience.map((item, index) => (
                  <TimelineItem
                    key={item.title}
                    item={item}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <Award className="text-primary" size={20} />
                <h3 className="text-lg font-medium">Certifications</h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="glass p-5 rounded-lg"
              >
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <motion.li
                      key={cert}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {cert}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
