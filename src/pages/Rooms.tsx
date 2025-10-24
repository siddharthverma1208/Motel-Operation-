import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Wifi, Coffee, Tv } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import standardRoom from "@/assets/standard-room.jpg";
import deluxeRoom from "@/assets/deluxe-room.jpg";
import suiteRoom from "@/assets/suite-room.jpg";

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      name: "Standard Room",
      image: standardRoom,
      price: 2999,
      capacity: 2,
      amenities: ["WiFi", "TV", "AC"],
      description: "Comfortable room with essential amenities for a pleasant stay"
    },
    {
      id: 2,
      name: "Deluxe Room",
      image: deluxeRoom,
      price: 4999,
      capacity: 3,
      amenities: ["WiFi", "TV", "AC", "Mini Bar", "Room Service"],
      description: "Spacious room with premium amenities and city view",
      popular: true
    },
    {
      id: 3,
      name: "Executive Suite",
      image: suiteRoom,
      price: 8999,
      capacity: 4,
      amenities: ["WiFi", "TV", "AC", "Mini Bar", "Room Service", "Living Area"],
      description: "Luxurious suite with separate living area and premium services"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of carefully designed rooms to suit your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <Card key={room.id} className="overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-56 object-cover"
                />
                {room.popular && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    Most Popular
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">
                    {formatCurrency(room.price)}
                  </span>
                  <span className="text-muted-foreground">per night</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Up to {room.capacity} guests</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link to="/booking" state={{ room }} className="w-full">
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
