import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "SecureAuth Platform",
    description: "Enterprise authentication system with MFA and OAuth2 implementation",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    image: "https://images.unsplash.com/photo-1760199789463-b523db55dd8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMGRpZ2l0YWx8ZW58MXx8fHwxNzYzNzE2MjA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Security Tools",
  },
  {
    title: "CloudOps Dashboard",
    description: "Real-time infrastructure monitoring and management platform",
    tags: ["Next.js", "TypeScript", "Docker", "Prometheus"],
    image: "https://images.unsplash.com/photo-1548544027-1a96c4c24c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBpbmZyYXN0cnVjdHVyZSUyMGRhdGFjZW50ZXJ8ZW58MXx8fHwxNzYzNzMzNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Web Apps",
  },
  {
    title: "Vulnerability Scanner",
    description: "Automated security scanner for web applications and APIs",
    tags: ["Python", "Flask", "Docker", "Security"],
    image: "https://images.unsplash.com/photo-1742072594013-c87f855e29ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZGV2ZWxvcG1lbnQlMjBzY3JlZW58ZW58MXx8fHwxNzYzNzMzNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Security Tools",
  },
  {
    title: "Microservices Framework",
    description: "Scalable microservices architecture with service mesh",
    tags: ["Java", "Spring Boot", "Kubernetes", "Docker"],
    image: "https://images.unsplash.com/photo-1761259789036-9dab4536026e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYWJzdHJhY3QlMjBkYXJrJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzYzNzMzNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Java Development",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl">
            A selection of projects showcasing expertise in Java development, web applications, and security tools.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-800">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-slate-700 text-slate-300 bg-slate-800/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700/50 hover:text-white flex-1"
                    >
                      <ExternalLink className="mr-2 size-4" />
                      View Live
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700/50 hover:text-white"
                    >
                      <Github className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
