import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Network, Lightbulb } from "lucide-react";

const interests = [
  { icon: Code2, label: "Software Development" },
  { icon: Database, label: "Database Management" },
  { icon: Network, label: "Networking" },
  { icon: Lightbulb, label: "Problem Solving" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-primary font-mono text-sm">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 space-y-4"
            >
              <p className="text-muted-foreground leading-relaxed">
                I'm a <span className="text-foreground font-medium">Bachelor of Science in Information Technology</span> student 
                with a genuine passion for technology and its potential to solve real-world problems. My journey in IT 
                has been driven by curiosity and the desire to understand how systems work at their core.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently, I'm focused on building a strong foundation in <span className="text-foreground font-medium">database management</span>, 
                <span className="text-foreground font-medium"> networking fundamentals</span>, and <span className="text-foreground font-medium">software development</span>. 
                I believe in continuous learning and am always eager to take on new challenges that push my boundaries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My goal is to secure an <span className="text-foreground font-medium">entry-level IT position</span> where I can apply my 
                academic knowledge, contribute to meaningful projects, and continue growing as a technology professional.
              </p>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Areas of Interest
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {interests.map(({ icon: Icon, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg glass"
                  >
                    <Icon size={18} className="text-primary" />
                    <span className="text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
