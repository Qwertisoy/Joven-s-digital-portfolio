import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Technical Skills",
    skills: [
      { name: "HTML & CSS", level: 85 },
      { name: "Java", level: 70 },
      { name: "MySQL", level: 75 },
      { name: "Basic Networking", level: 65 },
      { name: "Database Management", level: 70 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "VS Code", level: 90 },
      { name: "XAMPP", level: 80 },
      { name: "MySQL Workbench", level: 75 },
      { name: "Git", level: 60 },
      { name: "Microsoft Office", level: 85 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", level: 85 },
      { name: "Adaptability", level: 90 },
      { name: "Teamwork", level: 85 },
      { name: "Time Management", level: 80 },
      { name: "Communication", level: 80 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-primary"
        />
      </div>
    </div>
  );
};

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
          <div className="flex items-center gap-3 mb-12 max-w-4xl mx-auto">
            <span className="text-primary font-mono text-sm">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                className="p-6 rounded-xl glass"
              >
                <h3 className="text-lg font-semibold mb-6 text-primary">
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.3 + categoryIndex * 0.1 + skillIndex * 0.05}
                    />
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
