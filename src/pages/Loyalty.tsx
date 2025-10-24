import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Crown, Sparkles } from "lucide-react";

const Loyalty = () => {
  const tiers = [
    {
      name: "Silver",
      icon: Star,
      points: "0 - 999",
      benefits: [
        "5% discount on all bookings",
        "Early check-in subject to availability",
        "Welcome drink on arrival",
        "Priority customer support"
      ],
      color: "text-gray-500"
    },
    {
      name: "Gold",
      icon: Sparkles,
      points: "1,000 - 4,999",
      benefits: [
        "10% discount on all bookings",
        "Guaranteed early check-in",
        "Complimentary breakfast",
        "Room upgrade subject to availability",
        "Free WiFi upgrade"
      ],
      color: "text-primary",
      popular: true
    },
    {
      name: "Platinum",
      icon: Crown,
      points: "5,000+",
      benefits: [
        "15% discount on all bookings",
        "Guaranteed room upgrade",
        "Complimentary meals",
        "Late check-out",
        "Exclusive lounge access",
        "Dedicated concierge service"
      ],
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loyalty Rewards Program</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn points with every stay and unlock exclusive benefits
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <Card className="shadow-elegant animate-scale-in">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Book & Stay</h3>
                <p className="text-sm text-muted-foreground">
                  Earn 1 point for every ₹100 spent
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Collect Points</h3>
                <p className="text-sm text-muted-foreground">
                  Points accumulate with each booking
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Unlock Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Progress through tiers for better benefits
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card 
              key={tier.name} 
              className={`shadow-soft hover:shadow-elegant transition-all duration-300 animate-scale-in ${
                tier.popular ? "border-2 border-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <tier.icon className={`h-12 w-12 mx-auto mb-4 ${tier.color}`} />
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-lg">{tier.points} Points</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loyalty;
