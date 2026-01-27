import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Joven P. Benagua. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart size={14} className="text-primary" /> using React & Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
