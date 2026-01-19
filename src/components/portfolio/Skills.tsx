import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Wrench, Users, Database, Globe, Terminal } from "lucide-react";

const skillSections = [
  {
    icon: Code2,
    title: "Development",
    description: "Proficient in building web interfaces with HTML and CSS, creating structured and visually appealing layouts. Experienced in Java programming for backend logic and application development, with a focus on clean, maintainable code.",
    tags: ["HTML", "CSS", "Java", "JavaScript Basics"],
  },
  {
    icon: Database,
    title: "Database & Systems",
    description: "Skilled in MySQL database design, management, and optimization. Experienced with relational database concepts, query writing, and data modeling to support robust application backends.",
    tags: ["MySQL", "Database Design", "SQL Queries", "Data Modeling"],
  },
  {
    icon: Globe,
    title: "Networking",
    description: "Foundational knowledge in networking concepts including TCP/IP, DNS, and basic network troubleshooting. Familiar with network architecture and protocols essential for IT support roles.",
    tags: ["TCP/IP", "DNS", "Troubleshooting", "Network Basics"],
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    description: "Comfortable working with modern development tools and environments. Proficient in VS Code for coding, XAMPP for local server setup, MySQL Workbench for database management, and Git for version control.",
    tags: ["VS Code", "XAMPP", "MySQL Workbench", "Git", "Microsoft Office"],
  },
  {
    icon: Terminal,
    title: "IT Support",
    description: "Passionate about providing technical support and troubleshooting. Experienced in diagnosing hardware and software issues, system maintenance, and helping users resolve technical problems efficiently.",
    tags: ["Troubleshooting", "System Maintenance", "Technical Support", "Documentation"],
  },
  {
    icon: Users,
    title: "Professional Skills",
    description: "Strong problem-solving abilities combined with adaptability to new technologies. Excellent teamwork and communication skills developed through collaborative academic projects. Committed to continuous learning and professional growth.",
    tags: ["Problem Solving", "Teamwork", "Adaptability", "Time Management", "Communication"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-6 max-w-5xl mx-auto">
            <span className="text-primary font-mono text-sm">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Skills & Expertise</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-center mb-12"
          >
            A comprehensive overview of my technical abilities and professional competencies
          </motion.p>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skillSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass p-6 rounded-xl group hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <section.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold pt-2">{section.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {section.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
