import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-hero font-bold mb-6">
            <span className="glitch">Wear The Code</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We bridge the gap between tech culture and street fashion, creating pieces that speak the language of modern creators.
          </p>
        </motion.div>

        {/* Our Story */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-hero font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  On3 was born from the intersection of code and creativity. We saw a generation that speaks in binary but dresses in style, that builds digital worlds while living in the physical one.
                </p>
                <p>
                  Our designs celebrate the beauty of simplicity, the power of expression, and the spirit of innovation that defines modern streetwear. Every piece tells a story written in the language of technology and style.
                </p>
                <p>
                  From minimal graphics inspired by terminal interfaces to subtle nods to code aesthetics, we create clothing for those who see fashion as another form of creative expression.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-sm p-12 text-center"
            >
              <p className="font-mono text-sm text-primary mb-4">{'<code>'}</p>
              <h3 className="text-2xl font-hero font-bold mb-4">
                Fashion = Function + Form
              </h3>
              <p className="text-muted-foreground mb-4">
                Where utility meets aesthetics in perfect harmony
              </p>
              <p className="font-mono text-sm text-primary">{'</code>'}</p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-hero font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Minimal",
                description: "Less noise, more impact. We believe in the power of simplicity and clean design.",
              },
              {
                title: "Expressive",
                description: "Every piece tells a story. Fashion is a language, and we help you speak it fluently.",
              },
              {
                title: "Quality",
                description: "Premium materials, thoughtful construction. Built to last, designed to impress.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card p-8 rounded-sm"
              >
                <h3 className="text-xl font-heading font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-card py-16 rounded-sm"
        >
          <h2 className="text-3xl font-hero font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To create a community of creators, coders, and creatives who express themselves through fashion that's as thoughtful as the code they write and as bold as the ideas they bring to life.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
