import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury hotel lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Experience Luxury & Comfort
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Premium hospitality with world-class amenities in the heart of India
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rooms">
                <Button size="lg" variant="secondary" className="text-lg">
                  Explore Rooms
                </Button>
              </Link>
              <Link to="/booking">
                <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose MotelOperation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Star,
                title: "5-Star Service",
                description: "Exceptional hospitality and attention to detail"
              },
              {
                icon: Award,
                title: "Loyalty Rewards",
                description: "Earn points and unlock exclusive benefits"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance for your comfort"
              },
              {
                icon: Shield,
                title: "Secure Booking",
                description: "Safe and encrypted reservation system"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-elegant transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your perfect room today and experience hospitality redefined
          </p>
          <Link to="/booking">
            <Button size="lg" variant="secondary" className="text-lg">
              Start Booking
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
