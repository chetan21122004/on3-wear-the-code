import { Tag, Percent, CreditCard, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const OffersSection = () => {
  const offers = [
    {
      icon: Percent,
      title: "10% Off on Prepaid Orders",
      description: "Use code: PREPAID10",
    },
    {
      icon: CreditCard,
      title: "No Cost EMI",
      description: "Available on orders above ₹3000",
    },
    {
      icon: Gift,
      title: "Free Gift",
      description: "On orders above ₹5000",
    },
  ];

  return (
    <div className="bg-muted/30 rounded-sm p-4 space-y-3">
      <div className="flex items-center gap-2 text-foreground">
        <Tag className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-semibold">Available Offers</h3>
      </div>

      <div className="space-y-3">
        {offers.map((offer, idx) => (
          <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
            <offer.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-price font-semibold text-foreground">
                {offer.title}
              </p>
              <p className="text-xs text-muted-foreground font-price mt-0.5">
                {offer.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Badge variant="outline" className="text-xs font-price">
        View all offers
      </Badge>
    </div>
  );
};
