import { useState, useEffect } from 'react';
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
import { apiService } from '../services/api';
import { Business } from '../types';

interface ListingDetailProps {
  businessId: string;
  onBack: () => void;
  isUserLoggedIn: boolean;
  onLoginRequired: () => void;
}

export function ListingDetail({
  businessId,
  onBack,
  isUserLoggedIn,
  onLoginRequired,
}: ListingDetailProps) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await apiService.getBusiness(businessId);
        setBusiness(data);
        
        // Check if saved (only if logged in)
        if (isUserLoggedIn) {
          try {
            const savedDeals = await apiService.getSavedDeals();
            setIsSaved(savedDeals.some(b => String(b.id) === businessId));
          } catch (error) {
            // User might not be authenticated
            console.error('Error checking saved status:', error);
          }
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to load business details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusiness();
  }, [businessId, isUserLoggedIn]);

  const handleToggleSave = async () => {
    if (!isUserLoggedIn) {
      toast.error('Please log in to save deals');
      onLoginRequired();
      return;
    }

    setIsSaving(true);
    try {
      const result = await apiService.toggleSavedDeal(businessId);
      setIsSaved(result.saved);
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save business');
    } finally {
      setIsSaving(false);
    }
  };

  const handleContactClick = async (type: 'phone' | 'email' | 'website') => {
    try {
      await apiService.trackBusinessClick(businessId, type);
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share && business) {
      navigator.share({
        title: business.name,
        text: business.description,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-24"></div>
          <div className="h-96 bg-muted rounded-lg"></div>
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Business not found.</p>
            <Button onClick={onBack}>Back to Directory</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Directory
      </Button>

      {/* Hero Image Section with Gallery */}
      <div className="mb-8">
        {business.gallery && business.gallery.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {business.gallery.map((image, index) => (
                <CarouselItem key={index}>
                  <ImageWithFallback
                    src={image}
                    alt={`${business.name} - Image ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <ImageWithFallback
            src={business.image || ''}
            alt={business.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <h1 className="text-3xl font-bold">{business.name}</h1>
              {business.featured && (
                <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{business.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                <span className="font-medium">{business.rating}</span>
                <span className="text-muted-foreground text-sm">({business.review_count} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={isSaved ? 'default' : 'outline'}
              size="lg"
              onClick={handleToggleSave}
              disabled={isSaving}
            >
              <Heart className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {business.has_deals && business.deal && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="py-4">
              <div className="flex items-start gap-2">
                <Tag className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive mb-1">Special Offer</p>
                  <p className="text-sm">{business.deal}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{business.description}</p>
          </section>

          {/* Amenities */}
          {business.amenities && business.amenities.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {business.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline">{amenity}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Hours */}
          {business.hours && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hours</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {Object.entries(business.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize font-medium">{day}</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Address</p>
                    <p className="text-sm text-muted-foreground">{business.address}</p>
                  </div>
                </div>

                <Separator />

                {/* Phone */}
                {business.phone && (
                  <>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">Phone</p>
                        <a
                          href={`tel:${business.phone}`}
                          onClick={() => handleContactClick('phone')}
                          className="text-sm text-primary hover:underline"
                        >
                          {business.phone}
                        </a>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Email */}
                {business.email && (
                  <>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">Email</p>
                        <a
                          href={`mailto:${business.email}`}
                          onClick={() => handleContactClick('email')}
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {business.email}
                        </a>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Website */}
                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">Website</p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleContactClick('website')}
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-2">
                {business.phone && (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      handleContactClick('phone');
                      window.location.href = `tel:${business.phone}`;
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                )}
                {business.email && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleContactClick('email');
                      window.location.href = `mailto:${business.email}`;
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                )}
                {business.website && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleContactClick('website');
                      window.open(business.website, '_blank');
                    }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
