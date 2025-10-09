import { motion } from "framer-motion";
import { Calendar, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Announcements", "Styling Tips", "Behind the Scenes", "Limited Drops"];

  const posts = [
    {
      id: 1,
      title: "Terminal Collection: Coming Soon",
      excerpt: "Get ready for our most technical collection yet. Inspired by command-line interfaces and digital workspaces.",
      content: "Full article content here...",
      date: "2025-01-15",
      readTime: "3 min read",
      category: "Announcements",
      image: "/api/placeholder/800/500",
      featured: true,
    },
    {
      id: 2,
      title: "The Story Behind 'Wear The Code'",
      excerpt: "How we merged tech culture with streetwear to create a unique fashion statement.",
      content: "Full article content here...",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Behind the Scenes",
      image: "/api/placeholder/800/500",
      featured: false,
    },
    {
      id: 3,
      title: "Styling Tips: Tech Meets Street",
      excerpt: "Our guide to combining technical pieces with everyday streetwear for a clean, modern look.",
      content: "Full article content here...",
      date: "2025-01-05",
      readTime: "4 min read",
      category: "Styling Tips",
      image: "/api/placeholder/800/500",
      featured: false,
    },
    {
      id: 4,
      title: "Behind The Scenes: Design Process",
      excerpt: "From concept to creation - see how we develop our collections from initial sketches to final products.",
      content: "Full article content here...",
      date: "2024-12-28",
      readTime: "6 min read",
      category: "Behind the Scenes",
      image: "/api/placeholder/800/500",
      featured: false,
    },
    {
      id: 5,
      title: "Limited Drop Alert: Midnight Series",
      excerpt: "Exclusive midnight colorway dropping this month. Only 50 pieces available worldwide.",
      content: "Full article content here...",
      date: "2024-12-20",
      readTime: "2 min read",
      category: "Limited Drops",
      image: "/api/placeholder/800/500",
      featured: false,
    },
    {
      id: 6,
      title: "How to Layer Streetwear This Season",
      excerpt: "Master the art of layering with our technical pieces and classic streetwear staples.",
      content: "Full article content here...",
      date: "2024-12-15",
      readTime: "5 min read",
      category: "Styling Tips",
      image: "/api/placeholder/800/500",
      featured: false,
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-card border-b border-border">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-6xl font-hero font-bold mb-6">
              <span className="glitch">On3 Blog & Drop News</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated on the latest collections, tips, and stories
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Link to={`/blog/${featuredPost.id}`}>
              <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-smooth group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-heading font-semibold rounded-sm">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-xs font-heading text-primary mb-3 block">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-4xl font-hero font-bold mb-4 group-hover:text-primary transition-smooth">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <Button className="w-fit">Read More</Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-heading rounded-sm transition-smooth ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground border border-border hover:border-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-smooth group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-heading text-primary mb-3 block">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-smooth">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1">
                      {post.excerpt}
                    </p>
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
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-card rounded-lg p-12 border border-border text-center"
        >
          <h3 className="text-3xl font-hero font-bold mb-4">Stay in the Loop</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to get notified about new drops, styling tips, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
