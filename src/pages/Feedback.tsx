import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your time and will use your input to improve our services.",
    });
    
    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      rating,
      feedback: formData.get("feedback"),
    });
    
    e.currentTarget.reset();
    setRating(0);
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Exceptional service and beautiful rooms. The staff went above and beyond to make our stay memorable!",
      initials: "PS"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Best hotel experience in India! The loyalty program benefits are fantastic. Highly recommended!",
      initials: "RK"
    },
    {
      name: "Ananya Reddy",
      location: "Bangalore",
      rating: 4,
      comment: "Great amenities and convenient location. The booking process was smooth and hassle-free.",
      initials: "AR"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-card py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Feedback</h1>
          <p className="text-xl text-muted-foreground">
            Share your experience and help us serve you better
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <Card className="shadow-elegant animate-scale-in">
            <CardHeader>
              <CardTitle>Leave Your Feedback</CardTitle>
              <CardDescription>Tell us about your stay</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label>Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoverRating || rating)
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback *</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Share your experience with us..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 animate-slide-in">What Our Guests Say</h2>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{testimonial.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
