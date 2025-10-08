import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Terminal Collection: Coming Soon",
      excerpt: "Get ready for our most technical collection yet. Inspired by command-line interfaces and digital workspaces.",
      date: "2025-01-15",
      readTime: "3 min read",
      category: "Next Drop",
    },
    {
      id: 2,
      title: "The Story Behind 'Wear The Code'",
      excerpt: "How we merged tech culture with streetwear to create a unique fashion statement.",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Brand Story",
    },
    {
      id: 3,
      title: "Styling Tips: Tech Meets Street",
      excerpt: "Our guide to combining technical pieces with everyday streetwear for a clean, modern look.",
      date: "2025-01-05",
      readTime: "4 min read",
      category: "Style Guide",
    },
    {
      id: 4,
      title: "Behind The Scenes: Design Process",
      excerpt: "From concept to creation - see how we develop our collections from initial sketches to final products.",
      date: "2024-12-28",
      readTime: "6 min read",
      category: "Behind The Scenes",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-hero font-bold mb-4">Blog & Drops</h1>
          <p className="text-xl text-muted-foreground">
            Stories, updates, and what's coming next
          </p>
        </motion.div>

        {/* Next Drop Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-sm p-12 mb-16 border border-border text-center"
        >
          <span className="text-sm font-heading text-primary mb-4 block">NEXT DROP</span>
          <h2 className="text-4xl font-hero font-bold mb-4">
            <span className="glitch">Terminal Collection</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            Launching February 2025
          </p>
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Mark your calendars</span>
          </div>
        </motion.div>

        {/* Blog Posts */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-sm p-8 border border-border hover:border-primary transition-smooth cursor-pointer group"
            >
              <span className="text-xs font-heading text-primary mb-3 block">
                {post.category}
              </span>
              <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-smooth">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-6">{post.excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
