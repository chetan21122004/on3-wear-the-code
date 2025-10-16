import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code2, Target, Eye, ArrowRight } from "lucide-react";
import heroImage from "@/assets/about-banner.jpg";

const About = () => {
  const team = [
    { name: "Arjun Mehta", role: "Creative Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Priya Sharma", role: "Lead Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { name: "Kabir Singh", role: "Head of Production", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 1️⃣ Hero Section */}
      <div className="relative h-[70vh] overflow-hidden border-b border-[#81715D]/20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="On3 Streetwear" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#191919]/80 via-[#191919]/60 to-[#191919]" />
          {/* Code-inspired overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(129, 113, 93, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 113, 93, 0.2) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-hero font-bold text-[#DDCEB6] mb-6">
              Wear The Code<span className="cursor-blink">_</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#DDCEB6]/70 font-body max-w-2xl mx-auto">
              Where streetwear meets digital minimalism
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* 2️⃣ Brand Story */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#DDCEB6] mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-[#DDCEB6]/80 text-lg font-body leading-relaxed">
                <p>
                  On3 merges bold designs with cultural expression. From T-shirts to hoodies and cordsets, we craft streetwear for bold creators — from Gen Z to grown creatives.
                </p>
                <p>
                  Born from the intersection of code culture and street style, we create pieces that speak to the modern creator. Every design is a statement, every piece tells a story.
                </p>
                <p>
                  We believe fashion is more than fabric — it's a language of self-expression, creativity, and individuality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop" 
                alt="On3 Production"
                className="w-full h-64 object-cover rounded-lg border border-[#81715D]/20"
              />
              <img 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop" 
                alt="On3 Team"
                className="w-full h-64 object-cover rounded-lg border border-[#81715D]/20 mt-8"
              />
            </motion.div>
          </div>
        </section>

        {/* 3️⃣ Mission / Vision */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#DDCEB6]/5 backdrop-blur-sm border border-[#81715D]/20 rounded-lg p-10 hover:border-[#81715D]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#81715D]/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#DDCEB6]" />
                </div>
                <h3 className="text-3xl font-hero font-bold text-[#DDCEB6]">Mission</h3>
              </div>
              <p className="text-[#DDCEB6]/80 text-lg font-body leading-relaxed">
                To empower individuality through minimal yet expressive streetwear that bridges the gap between fashion and identity
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#DDCEB6]/5 backdrop-blur-sm border border-[#81715D]/20 rounded-lg p-10 hover:border-[#81715D]/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#81715D]/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#DDCEB6]" />
                </div>
                <h3 className="text-3xl font-hero font-bold text-[#DDCEB6]">Vision</h3>
              </div>
              <p className="text-[#DDCEB6]/80 text-lg font-body leading-relaxed">
                To create a community where fashion meets creativity and code culture — a space for modern creators to express their unique identity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4️⃣ Philosophy Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#DDCEB6] mb-8">
              The Philosophy Behind <span className="glitch">"Wear The Code"</span>
            </h2>
            <p className="text-[#DDCEB6]/80 text-lg font-body leading-relaxed mb-12">
              On3 is more than a streetwear label — it's a code of individuality.
              We stand for the fearless, the expressive, the unapologetic.
              Our philosophy is simple: wear what defines you, not what confines you.
              Each drop is a new chapter in a larger story — one written by you.
              Wear the Code. Live your Story.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { icon: Code2, title: "Code-Inspired", desc: "Subtle tech aesthetics in every design" },
                { icon: Target, title: "Minimal & Clean", desc: "Less noise, more impact" },
                { icon: Eye, title: "Self-Expression", desc: "Fashion as a creative language" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-[#191919] border border-[#81715D]/20 rounded-lg p-8 hover:border-[#81715D]/40 transition-all"
                >
                  <item.icon className="w-10 h-10 text-[#81715D] mb-4 mx-auto" />
                  <h4 className="text-xl font-heading font-semibold text-[#DDCEB6] mb-3">{item.title}</h4>
                  <p className="text-[#DDCEB6]/70 font-body">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5️⃣ Team / Makers */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#DDCEB6] mb-4">
              The Makers
            </h2>
            <p className="text-[#DDCEB6]/70 text-lg font-body">
              Meet the creative minds behind On3
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#81715D]/20 group-hover:border-[#81715D]/60 transition-all">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-[#DDCEB6] mb-2">{member.name}</h3>
                <p className="text-[#81715D] font-body">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6️⃣ Media / Portfolio (Optional - Brand Highlights) */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#DDCEB6]/5 backdrop-blur-sm border border-[#81715D]/20 rounded-lg p-12 text-center"
          >
            <h3 className="text-3xl font-hero font-bold text-[#DDCEB6] mb-6">
              Featured & Trusted
            </h3>
            <p className="text-[#DDCEB6]/70 font-body mb-8">
              Worn by creators, designers, and innovators across the community
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {["Streetwear India", "Urban Style Mag", "Code Culture", "Gen Z Fashion"].map((brand) => (
                <div key={brand} className="text-[#DDCEB6]/50 font-heading text-lg font-semibold">
                  {brand}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7️⃣ Call-to-Action */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-[#81715D] rounded-lg p-16 text-center"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="glitch absolute inset-0" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-hero font-bold text-[#191919] mb-6">
              Explore Our Latest Drops
            </h2>
            <p className="text-[#191919]/80 text-lg font-body mb-8 max-w-2xl mx-auto">
              Wear the code yourself. Discover curated streetwear pieces designed for modern creators.
            </p>
            <Link to="/collections">
              <Button 
                size="lg"
                className="bg-[#191919] hover:bg-[#191919]/90 text-[#DDCEB6] font-heading font-semibold text-lg px-8 py-6 group"
              >
                Shop Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
