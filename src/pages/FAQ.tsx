import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your shipping policy?",
      answer: "We offer free shipping on all orders above ₹2999. Standard orders are shipped within 3-5 business days. You'll receive a tracking number once your order is dispatched.",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 15 days of delivery. Items must be unworn, unwashed, and in original packaging with all tags attached. Refunds are processed within 5-7 business days after we receive the returned item.",
    },
    {
      question: "How do I use promo codes?",
      answer: "You can enter promo codes at checkout or use our Virtual Keypad feature. Exclusive codes are shared on our Instagram page. Each code can typically be used once per customer.",
    },
    {
      question: "What are your size recommendations?",
      answer: "Our items generally fit true to size. We recommend checking the size guide on each product page. For an oversized fit, consider sizing up. If you're between sizes, we suggest going with the larger size.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can use this tracking number to monitor your package's journey to your doorstep.",
    },
    {
      question: "Do you restock sold-out items?",
      answer: "Some items are restocked based on demand, while others are limited edition. Follow us on Instagram to stay updated on restocks and new drops.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All transactions are secured with industry-standard encryption.",
    },
    {
      question: "How do I care for my On3 items?",
      answer: "Machine wash cold with like colors, tumble dry low. Do not bleach. Iron on low heat if needed. Following these instructions will help maintain the quality and print of your garments.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-hero font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about On3
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-sm px-6"
            >
              <AccordionTrigger className="text-left font-heading hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-card p-8 rounded-sm border border-border">
          <h3 className="text-xl font-heading font-semibold mb-4">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            We're here to help. Reach out to us anytime.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-sm font-heading hover:bg-primary/90 transition-smooth"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
