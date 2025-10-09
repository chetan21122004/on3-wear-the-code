import { motion } from "framer-motion";
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { id } = useParams();

  // This would typically come from an API or data source
  const posts = [
    {
      id: 1,
      title: "Terminal Collection: Coming Soon",
      excerpt: "Get ready for our most technical collection yet. Inspired by command-line interfaces and digital workspaces.",
      content: `
        <h2>The Future of Tech-Inspired Streetwear</h2>
        <p>We're excited to announce our most ambitious collection yet - the Terminal Collection. Drawing inspiration from the digital workspaces that define modern life, this collection merges the clean aesthetics of command-line interfaces with bold streetwear silhouettes.</p>
        
        <h3>Design Philosophy</h3>
        <p>Every piece in the Terminal Collection features carefully selected typography that mimics code syntax, creating a unique visual language. We've worked with monospace fonts, terminal green accents, and minimalist layouts to create pieces that speak to developers, designers, and digital natives alike.</p>
        
        <h3>What to Expect</h3>
        <p>The collection includes oversized hoodies with embedded "code snippets," cargo pants with utility pockets designed for modern carry, and graphic tees featuring terminal commands that resonate with tech culture.</p>
        
        <blockquote>"Fashion is code. Style is the compiler." - On3 Design Team</blockquote>
        
        <p>Mark your calendars for February 2025. This is one drop you don't want to miss.</p>
      `,
      date: "2025-01-15",
      readTime: "3 min read",
      category: "Announcements",
      author: "On3 Team",
      image: "/api/placeholder/1200/600",
    },
    {
      id: 2,
      title: "The Story Behind 'Wear The Code'",
      excerpt: "How we merged tech culture with streetwear to create a unique fashion statement.",
      content: `
        <h2>From Concept to Reality</h2>
        <p>On3 was born from a simple observation: the people building our digital future deserved clothing that reflected their world. "Wear The Code" isn't just a tagline - it's a philosophy.</p>
        
        <h3>The Beginning</h3>
        <p>It started in a small studio in 2024, with sketches that combined monospace fonts with streetwear cuts. We asked ourselves: what if code could be fashion? What if the terminal aesthetic could translate to clothing?</p>
        
        <p>The answer was clear. Tech culture has its own visual language, and we wanted to make it wearable.</p>
        
        <h3>Our Mission</h3>
        <p>Every On3 piece tells a story. Whether it's a hoodie with a clever algorithm reference or a tee featuring your favorite programming language syntax, we celebrate the intersection of technology and style.</p>
      `,
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Behind the Scenes",
      author: "Founder's Story",
      image: "/api/placeholder/1200/600",
    },
    {
      id: 3,
      title: "Styling Tips: Tech Meets Street",
      excerpt: "Our guide to combining technical pieces with everyday streetwear for a clean, modern look.",
      content: `
        <h2>Mastering the Tech-Street Aesthetic</h2>
        <p>Blending technical pieces with classic streetwear doesn't have to be complicated. Here's our guide to nailing the look.</p>
        
        <h3>Layer with Purpose</h3>
        <p>Start with a clean base - our graphic tees work perfectly under oversized hoodies or technical jackets. The key is contrast: pair structured pieces with relaxed fits.</p>
        
        <h3>Keep Colors Minimal</h3>
        <p>Stick to our signature palette: charcoal, taupe, and cream. Add pops of color sparingly through accessories or limited edition pieces.</p>
        
        <h3>Mix Textures</h3>
        <p>Combine smooth cotton with technical fabrics. Our cargo pants pair perfectly with classic hoodies, creating visual interest through texture contrast.</p>
        
        <h3>Footwear Matters</h3>
        <p>Clean sneakers or boots complete the look. Keep them minimal - let your On3 pieces be the statement.</p>
      `,
      date: "2025-01-05",
      readTime: "4 min read",
      category: "Styling Tips",
      author: "Style Guide",
      image: "/api/placeholder/1200/600",
    },
  ];

  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-hero font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="bg-card rounded-lg p-8 md:p-12 border border-border mb-8">
            <span className="text-xs font-heading text-primary mb-4 block">
              {post.category}
            </span>
            <h1 className="text-5xl font-hero font-bold mb-6">
              {post.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <span>By {post.author}</span>
            </div>

            {/* Share Button */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="mb-8"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            {/* Article Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Related Posts */}
          <div className="mt-16 mb-16">
            <h3 className="text-2xl font-heading font-bold mb-8">More Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {posts
                .filter(p => p.id !== post.id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-smooth group">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-heading text-primary mb-2 block">
                          {relatedPost.category}
                        </span>
                        <h4 className="font-heading font-bold group-hover:text-primary transition-smooth">
                          {relatedPost.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
