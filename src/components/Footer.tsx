import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [currentLogo, setCurrentLogo] = useState(0);
  const logos = ["/simplelogo.png", "/logo.png"];

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 2000);

    return () => clearInterval(logoInterval);
  }, []);

  return (
    <footer className="bg-charcoal border-t border-taupe/20 relative overflow-hidden">
      {/* Crazy animated background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving diagonal lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-taupe/10 to-transparent"
            style={{
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: '-100%',
              width: `${Math.random() * 300 + 150}px`,
            }}
            animate={{
              left: ['-100%', '100%'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}

        {/* Pulsating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              background: `radial-gradient(circle, hsla(var(--taupe) / ${Math.random() * 0.15 + 0.05}) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Rotating rings */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute border-taupe/10 rounded-full"
              style={{
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                borderWidth: '1px',
                top: '50%',
                left: '50%',
                marginLeft: `${-(i + 1) * 40}px`,
                marginTop: `${-(i + 1) * 40}px`,
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <motion.div
            className="space-y-4 col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center justify-center sm:justify-start w-fit mx-auto sm:mx-0 relative group">
              <div className="relative h-20 w-20 md:h-24 md:w-24">
                {/* Background rotating logos */}
                {logos.map((logo, index) => (
                  <motion.img
                    key={`bg-${logo}`}
                    src={logo}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain opacity-10"
                    animate={{
                      rotate: index % 2 === 0 ? 360 : -360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 15 + index * 3,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                ))}

                {/* Main cycling logo */}
                <motion.div
                  className="absolute inset-0 bg-cream rounded-full shadow-lg shadow-taupe/30 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-taupe/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <motion.img
                    key={currentLogo}
                    src={logos[currentLogo]}
                    alt="On3 Logo"
                    className="h-full w-full object-contain relative z-10 p-2"
                    initial={{ opacity: 0, rotate: -10 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 10 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      filter: 'drop-shadow(0 0 10px hsla(var(--taupe) / 0.3))',
                    }}
                  />
                </motion.div>

                {/* Spinning ring */}
                <motion.div
                  className="absolute inset-0 border border-taupe/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transform: 'scale(1.15)' }}
                />
              </div>
            </Link>
            <motion.p
              className="text-sm text-cream/50 font-mono relative group order-1 md:order-2"
              whileHover={{ scale: 1.05 }}
            >
              &lt;wear_the_code();&gt;
            </motion.p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-taupe transition-all duration-300 relative group"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-taupe/20 blur-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Instagram className="h-5 w-5 relative z-10" />
              </motion.a>
              <motion.a
                href="mailto:hello@on3wear.com"
                className="text-cream/60 hover:text-taupe transition-all duration-300 relative group"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-taupe/20 blur-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Mail className="h-5 w-5 relative z-10" />
              </motion.a>
            </div>
          </motion.div>

          {/* Shop */}
          <motion.div
            className="text-center sm:text-left col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h4
              className="font-hero font-semibold mb-4 text-cream relative inline-block"
              whileHover={{ x: 5 }}
            >
              <motion.span
                className="absolute -left-5   text-taupe"
                animate={{ x: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ▶
              </motion.span>
              Shop
            </motion.h4>
            <ul className="space-y-2">
              {['All Products', 'T-Shirts', 'Hoodies', 'Lowers'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to="/shop"
                    className="text-sm text-cream/60 hover:text-taupe transition-all duration-300 relative group inline-block font-body"
                  >
                    <motion.span
                      className="absolute -left-4 top-1/2 -translate-y-1/2 text-taupe opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      ◆
                    </motion.span>
                    <motion.span whileHover={{ x: 5 }} className="inline-block">
                      {item}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            className="text-center sm:text-left col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h4
              className="font-hero font-semibold mb-4 text-cream relative inline-block"
              whileHover={{ x: 5 }}
            >
              <motion.span
                className="absolute -left-5 text-taupe"
                animate={{ x: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ▶
              </motion.span>
              Support
            </motion.h4>
            <ul className="space-y-2">
              {[
                { label: 'FAQ', path: '/faq' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'About', path: '/about' },
                { label: 'Blog', path: '/blog' },
              ].map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={item.path}
                    className="text-sm text-cream/60 hover:text-taupe transition-all duration-300 relative group inline-block font-body"
                  >
                    <motion.span
                      className="absolute -left-4 top-1/2 -translate-y-1/2 text-taupe opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      ◆
                    </motion.span>
                    <motion.span whileHover={{ x: 5 }} className="inline-block">
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="col-span-2 lg:col-span-1 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h4
              className="font-hero font-semibold mb-4 text-cream relative inline-block"
              whileHover={{ x: 5 }}
            >
              <motion.span
                className="absolute -left-5 text-taupe"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ★
              </motion.span>
              Stay Updated
            </motion.h4>
            <motion.p
              className="text-sm text-cream/60 mb-4 font-body"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              Subscribe for exclusive drops and codes.
            </motion.p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <motion.div
                className="flex-1 relative"
                whileFocus={{ scale: 1.02 }}
              >
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="bg-charcoal/50 border-taupe/30 text-cream placeholder:text-cream/40 focus:border-taupe focus:ring-1 focus:ring-taupe/50 transition-all backdrop-blur-sm w-full"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-taupe text-charcoal hover:bg-cream font-hero font-semibold relative overflow-hidden group w-full sm:w-auto">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative z-10">Join</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-taupe/20 mt-6 md:mt-8 pt-6 md:pt-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {/* Scanning line effect */}
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-taupe to-transparent"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{ width: '50%' }}
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <motion.p
              className="text-sm text-cream/50 font-body order-2 md:order-1"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              © 2025 On3. All rights reserved.
            </motion.p>
            <motion.p
              className="text-sm text-cream/50 font-mono relative group order-1 md:order-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="absolute -left-2 text-taupe"
                animate={{
                  x: [-3, 0, -3],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {'{'}
              </motion.span>
              <motion.span
                className="absolute -right-3 text-taupe"
                animate={{
                  x: [3, 0, 3],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {'}'}
              </motion.span>
              &lt;wear_the_code();&gt;
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
