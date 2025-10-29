import { MapPin, Phone, Mail, Globe, Clock, Star, Tag, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  image: string;
  featured: boolean;
  hasDeals: boolean;
  deal?: string;
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities?: string[];
  gallery?: string[];
}

interface ListingDetailProps {
  businessId: string;
  businesses: Business[];
  onBack: () => void;
  isUserLoggedIn: boolean;
  onLoginRequired: () => void;
  savedDeals: string[];
  onToggleSave: (businessId: string) => void;
}

export function ListingDetail({
  businessId,
  businesses,
  onBack,
  isUserLoggedIn,
  onLoginRequired,
  savedDeals,
  onToggleSave,
}: ListingDetailProps) {
  const business = businesses.find(b => b.id === businessId);

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Business not found.</p>
        <Button onClick={onBack} className="mt-4">
          Back to Directory
        </Button>
      </div>
    );
  }

  const isSaved = savedDeals.includes(businessId);

  const handleSaveToggle = () => {
    if (!isUserLoggedIn) {
      onLoginRequired();
      return;
    }
    onToggleSave(businessId);
    toast.success(isSaved ? 'Removed from saved deals' : 'Added to saved deals');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Directory
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Main Image */}
                <CarouselItem>
                  <div className="relative rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={business.image}
                      alt={business.name}
                      className="w-full h-96 object-cover"
                    />
                    {business.featured && (
                      <Badge className="absolute top-4 right-4 bg-black hover:bg-gray-900 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CarouselItem>
                
                {/* Gallery Images */}
                {business.gallery && business.gallery.length > 0 && business.gallery.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={img}
                        alt={`${business.name} - Image ${index + 1}`}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Business Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="mb-2">{business.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{business.category}</Badge>
                    {business.hasDeals && (
                      <Badge variant="destructive">
                        <Tag className="w-3 h-3 mr-1" />
                        Active Deal
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-gray-900">
                      <Star className="w-5 h-5 fill-current" />
                      <span>{business.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({business.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={isSaved ? "default" : "outline"}
                    size="icon"
                    onClick={handleSaveToggle}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">About</h3>
                  <p className="text-gray-600">{business.description}</p>
                </div>

                {business.hasDeals && business.deal && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Tag className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-red-700 mb-1">Current Deal</h3>
                        <p className="text-red-700">{business.deal}</p>
                      </div>
                    </div>
                  </div>
                )}

                {business.amenities && business.amenities.length > 0 && (
                  <div>
                    <h3 className="mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {business.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3>Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-600">{business.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <a href={`tel:${business.phone}`} className="text-gray-600 hover:text-gray-900">
                    {business.phone}
                  </a>
                </div>
                {business.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <a href={`mailto:${business.email}`} className="text-gray-600 hover:text-gray-900">
                      {business.email}
                    </a>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <a
                      href={`https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {business.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hours */}
          {business.hours && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <h3>Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {daysOfWeek.map(day => (
                    <div
                      key={day}
                      className={`flex justify-between ${
                        day === today ? 'font-semibold text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      <span className="capitalize">{day}</span>
                      <span>{business.hours![day as keyof typeof business.hours]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              Contact Business
            </Button>
            {business.hasDeals && (
              <Button className="w-full" size="lg" variant="outline" onClick={handleSaveToggle}>
                <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved to Deals' : 'Save Deal'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
