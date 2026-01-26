import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "library-management-system",
    title: "Library Management System",
    description:
      "A comprehensive system for managing library resources, including book cataloging, member management, borrowing/returning functionality, and overdue tracking.",
    technologies: ["Java", "MySQL", "NetBeans"],
    role: "Full Stack Developer",
    github: "https://github.com",
    live: null,
    featured: true,
  },
  {
    id: "iot-water-quality-monitoring",
    title: "IoT Water Quality Monitoring",
    description:
      "An IoT-based solution that monitors water quality parameters in real-time using sensors, with data visualization and alert systems for contamination detection.",
    technologies: ["Arduino", "PHP", "MySQL", "Bootstrap"],
    role: "Backend Developer & System Integration",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: "route-finder-fare-estimator",
    title: "Route Finder & Fare Estimator",
    description:
      "A mobile-friendly web application that helps commuters find optimal routes and estimate transportation fares using local transit data.",
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    role: "Frontend Developer",
    github: "https://github.com",
    live: "https://routemate-final.vercel.app/",
    featured: true,
  },
];

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
      className="group relative p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Folder className="text-primary" size={40} />
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View GitHub repository"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
          )}

        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Role */}
      <p className="text-xs text-primary mb-4">
        Role: {project.role}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* View Details Link */}
      <Link
        to={`/project/${project.id}`}
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline group/link"
      >
        View Details
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.article>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-12 max-w-4xl mx-auto">
            <span className="text-primary font-mono text-sm">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
