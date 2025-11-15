import { useState } from 'react';
import { Heart, Eye, TrendingUp, MapPin, Phone, Mail, Globe, Clock, Star, Tag, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DashboardSwitcher } from './dashboard-switcher';
import { AdminDashboard } from './admin-dashboard';
import { PartnerDashboard } from './partner-dashboard';
import { DistributionPartnerDashboard } from './distribution-partner-dashboard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface UserDashboardProps {
  userType: 'user' | 'partner' | 'distribution' | 'admin';
  userName: string;
  savedDeals?: string[];
  onNavigate: (page: string) => void;
  onDashboardTypeChange?: (type: 'user' | 'partner' | 'distribution' | 'admin') => void;
  isUserLoggedIn?: boolean;
  onToggleSave?: (businessId: string) => void;
}

export function UserDashboard({ userType, userName, savedDeals = [], onNavigate, onDashboardTypeChange, isUserLoggedIn = true, onToggleSave }: UserDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  // Regular User Dashboard
  if (userType === 'user') {
    const recentActivity = [
      { action: 'Saved deal', business: 'Fresh Bistro', date: '2 hours ago' },
      { action: 'Viewed listing', business: 'Wellness Spa', date: '1 day ago' },
      { action: 'Saved deal', business: 'Tech Repair Pro', date: '3 days ago' },
    ];

    const recommendations = [
      { 
        id: '1', 
        name: 'Bella Salon', 
        category: 'Beauty', 
        deal: '20% off first visit', 
        distance: '0.5 mi',
        description: 'Full-service salon offering haircuts, styling, coloring, and beauty treatments. Our experienced stylists will help you look and feel your best.',
        address: '456 Beauty Lane, Downtown',
        phone: '(555) 234-5678',
        email: 'info@bellasalon.com',
        website: 'www.bellasalon.com',
        rating: 4.7,
        reviewCount: 92,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        hours: {
          monday: '9:00 AM - 7:00 PM',
          tuesday: '9:00 AM - 7:00 PM',
          wednesday: '9:00 AM - 7:00 PM',
          thursday: '9:00 AM - 8:00 PM',
          friday: '9:00 AM - 8:00 PM',
          saturday: '8:00 AM - 6:00 PM',
          sunday: 'Closed',
        },
      },
      { 
        id: '2', 
        name: 'FitLife Gym', 
        category: 'Health', 
        deal: 'Free trial week', 
        distance: '1.2 mi',
        description: 'State-of-the-art fitness facility with top-notch equipment, personal trainers, and group fitness classes. Start your fitness journey with us!',
        address: '789 Fitness Drive',
        phone: '(555) 345-6789',
        email: 'info@fitlifegym.com',
        website: 'www.fitlifegym.com',
        rating: 4.9,
        reviewCount: 156,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
        hours: {
          monday: '5:00 AM - 11:00 PM',
          tuesday: '5:00 AM - 11:00 PM',
          wednesday: '5:00 AM - 11:00 PM',
          thursday: '5:00 AM - 11:00 PM',
          friday: '5:00 AM - 10:00 PM',
          saturday: '7:00 AM - 8:00 PM',
          sunday: '7:00 AM - 8:00 PM',
        },
      },
      { 
        id: '3', 
        name: 'Pasta Paradise', 
        category: 'Dining', 
        deal: 'Buy 1 Get 1 Free', 
        distance: '0.8 mi',
        description: 'Traditional Italian restaurant serving homemade pasta, wood-fired pizzas, and authentic Italian dishes made with fresh, locally-sourced ingredients.',
        address: '321 Italian Way',
        phone: '(555) 456-7890',
        email: 'info@pastaparadise.com',
        website: 'www.pastaparadise.com',
        rating: 4.8,
        reviewCount: 203,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
        hours: {
          monday: '11:00 AM - 10:00 PM',
          tuesday: '11:00 AM - 10:00 PM',
          wednesday: '11:00 AM - 10:00 PM',
          thursday: '11:00 AM - 10:00 PM',
          friday: '11:00 AM - 11:00 PM',
          saturday: '11:00 AM - 11:00 PM',
          sunday: '12:00 PM - 9:00 PM',
        },
      },
    ];

    const selectedBusiness = recommendations.find(rec => rec.id === selectedRecommendation);
    const isSaved = selectedRecommendation ? savedDeals.includes(selectedRecommendation) : false;

    const handleSaveToggle = (businessId: string) => {
      if (onToggleSave) {
        onToggleSave(businessId);
        toast.success(isSaved ? 'Removed from saved deals' : 'Added to saved deals');
      }
    };

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {onDashboardTypeChange && (
          <DashboardSwitcher currentType={userType} onTypeChange={onDashboardTypeChange} />
        )}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your saved deals</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Saved Deals</p>
                  <p className="text-3xl">{savedDeals.length}</p>
                </div>
                <Heart className="w-8 h-8 text-gray-900" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Deals Expiring Soon</p>
                  <p className="text-3xl">3</p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Businesses Viewed</p>
                  <p className="text-3xl">24</p>
                </div>
                <Eye className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="mb-1">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.business}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('saved-deals')}>
                View All Saved Deals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <p className="mb-1">{rec.name}</p>
                      <p className="text-sm text-muted-foreground">{rec.deal}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{rec.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {rec.distance}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setSelectedRecommendation(rec.id)}>View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Detail Modal */}
        <Dialog open={!!selectedRecommendation} onOpenChange={(open) => !open && setSelectedRecommendation(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="business-detail-description">
            {selectedBusiness && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedBusiness.name}</DialogTitle>
                  <DialogDescription id="business-detail-description">
                    View business details and exclusive deals
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image */}
                  <div className="relative rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={selectedBusiness.image}
                      alt={selectedBusiness.name}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white">
                      <Tag className="w-3 h-3 mr-1" />
                      Active Deal
                    </Badge>
                  </div>

                  {/* Business Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{selectedBusiness.category}</Badge>
                      <div className="flex items-center gap-1 text-gray-900">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{selectedBusiness.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({selectedBusiness.reviewCount} reviews)
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{selectedBusiness.description}</p>

                    {/* Deal Highlight */}
                    <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Tag className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-red-700 mb-1">Current Deal</h3>
                          <p className="text-red-700">{selectedBusiness.deal}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div>
                    <h3 className="mb-3">Contact Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-600">{selectedBusiness.address}</p>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(selectedBusiness.address)}`}
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
                        <a href={`tel:${selectedBusiness.phone}`} className="text-gray-600 hover:text-gray-900">
                          {selectedBusiness.phone}
                        </a>
                      </div>
                      {selectedBusiness.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <a href={`mailto:${selectedBusiness.email}`} className="text-gray-600 hover:text-gray-900">
                            {selectedBusiness.email}
                          </a>
                        </div>
                      )}
                      {selectedBusiness.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <a
                            href={`https://${selectedBusiness.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                          >
                            {selectedBusiness.website}
                          </a>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{selectedBusiness.distance} away</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Business Hours */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
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
                          <span>{selectedBusiness.hours[day as keyof typeof selectedBusiness.hours]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => {
                        if (selectedRecommendation) {
                          handleSaveToggle(selectedRecommendation);
                        }
                      }}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Saved to Deals' : 'Save Deal'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedRecommendation(null)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Distribution Partner Dashboard
  if (userType === 'distribution') {
    return <DistributionPartnerDashboard userName={userName} />;
  }

  // Admin Dashboard
  if (userType === 'admin') {
    return <AdminDashboard userName={userName} />;
  }

  // Business Partner Dashboard
  if (userType === 'partner') {
    return <PartnerDashboard userName={userName} onNavigate={onNavigate} />;
  }

  // Default return (shouldn't reach here)
  return null;
}
