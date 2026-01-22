import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "library-management-system",
    title: "Library Management System",
    description:
      "A comprehensive system for managing library resources, including book cataloging, member management, borrowing/returning functionality, and overdue tracking.",
    fullDescription: `This Library Management System was developed as an academic project to streamline library operations. The system provides a complete solution for managing books, members, and transactions.

Key Features:
• Book cataloging with ISBN, title, author, and category management
• Member registration and profile management
• Borrowing and returning functionality with due date tracking
• Overdue detection and fine calculation
• Search and filter capabilities for books and members
• Reporting system for library statistics

The system was built using Java with a MySQL database backend, providing a robust and reliable solution for library management needs.`,
    technologies: ["Java", "MySQL", "NetBeans", "JDBC"],
    role: "Full Stack Developer",
    github: "https://github.com",
    live: null,
    date: "2023",
    challenges: "Implementing the complex borrowing logic with overdue tracking and fine calculations was challenging. I solved this by creating a scheduled task system that checks due dates daily.",
    outcome: "Successfully deployed for academic use, handling 500+ book records and 200+ member accounts.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "iot-water-quality-monitoring",
    title: "IoT Water Quality Monitoring",
    description:
      "An IoT-based solution that monitors water quality parameters in real-time using sensors, with data visualization and alert systems for contamination detection.",
    fullDescription: `This IoT-based Water Quality Monitoring System was developed to provide real-time monitoring of water quality parameters. The system uses various sensors to measure pH levels, turbidity, temperature, and dissolved oxygen.

Key Features:
• Real-time sensor data collection using Arduino microcontroller
• Web-based dashboard for data visualization
• Historical data storage and trend analysis
• Alert system for abnormal readings
• Mobile-responsive design for monitoring on-the-go
• Data export functionality for reporting

The backend was built with PHP and MySQL, while the frontend uses Bootstrap for a responsive user interface.`,
    technologies: ["Arduino", "PHP", "MySQL", "Bootstrap", "JavaScript"],
    role: "Backend Developer & System Integration",
    github: "https://github.com",
    live: null,
    date: "2024",
    challenges: "Integrating hardware sensors with the web application required careful handling of serial communication and data parsing. I developed a reliable data transmission protocol to ensure accuracy.",
    outcome: "The system successfully monitored water quality in a local water treatment facility for a pilot test period of 3 months.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "route-finder-fare-estimator",
    title: "Route Finder & Fare Estimator",
    description:
      "A mobile-friendly web application that helps commuters find optimal routes and estimate transportation fares using local transit data.",
    fullDescription: `The Route Finder & Fare Estimator is a practical web application designed to help commuters in Metro Manila navigate public transportation more efficiently.

Key Features:
• Interactive map interface using Google Maps API
• Route suggestions based on origin and destination
• Fare estimation for jeepneys, buses, and trains
• Multiple route options with time and cost comparisons
• Save favorite routes for quick access
• Mobile-first responsive design

This project aimed to solve a real-world problem faced by daily commuters in the Philippines.`,
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    role: "Frontend Developer",
    github: "https://github.com",
    live: "https://example.com",
    date: "2023",
    challenges: "Calculating accurate fares across different transportation modes required extensive research and data collection. I built a fare matrix system that accounts for distance and vehicle type.",
    outcome: "The app has been tested by fellow students and received positive feedback for its accuracy and ease of use.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80",
  },
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 rounded-xl overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </motion.div>

            {/* Title & Meta */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {project.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  <span>{project.role}</span>
                </div>
              </motion.div>
            </div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-xl mb-10"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink size={18} className="text-primary" />
                Project Links
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <Button asChild variant="outline" className="gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={18} />
                      View Source Code
                    </a>
                  </Button>
                )}
                {project.live ? (
                  <Button asChild className="bg-gradient-primary hover:opacity-90 gap-2">
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} />
                      View Live App
                    </a>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                    <ExternalLink size={16} />
                    No live demo available (Academic project)
                  </span>
                )}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Code size={18} className="text-primary" />
                <h2 className="text-lg font-semibold">Technologies Used</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-secondary text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass p-8 rounded-xl mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">About This Project</h2>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {project.fullDescription}
              </div>
            </motion.div>

            {/* Challenges & Outcome */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">Challenges</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">Outcome</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.outcome}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
