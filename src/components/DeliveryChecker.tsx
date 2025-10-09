import { useState } from "react";
import { MapPin, Truck, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DeliveryChecker = () => {
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<{
    available: boolean;
    date?: string;
    days?: number;
    charge?: number;
  } | null>(null);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      // Simulate delivery check
      setDeliveryInfo({
        available: true,
        date: "Tue, Oct 15",
        days: 3,
        charge: 0,
      });
    }
  };

  return (
    <div className="bg-muted/30 rounded-sm p-4 space-y-3">
      <div className="flex items-center gap-2 text-foreground">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-semibold">Check Delivery</h3>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="font-price"
          maxLength={6}
        />
        <Button 
          onClick={checkDelivery}
          variant="outline"
          disabled={pincode.length !== 6}
          className="font-heading"
        >
          Check
        </Button>
      </div>

      {deliveryInfo && deliveryInfo.available && (
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-price text-foreground">
                Delivery by <strong>{deliveryInfo.date}</strong>
              </p>
              <p className="text-xs text-muted-foreground font-price">
                {deliveryInfo.charge === 0 ? "Free Shipping" : `₹${deliveryInfo.charge} shipping`}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-price text-foreground">
                Standard Delivery
              </p>
              <p className="text-xs text-muted-foreground font-price">
                {deliveryInfo.days}-{deliveryInfo.days + 2} business days
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
