import { useState, useEffect } from 'react';
import { Heart, Eye, TrendingUp, MapPin, Phone, Mail, Globe, Clock, Star, Tag, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AdminDashboard } from './admin-dashboard';
import { PartnerDashboard } from './partner-dashboard';
import { DistributionPartnerDashboard } from './distribution-partner-dashboard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { apiService } from '../services/api';
import { Business } from '../types';

interface UserDashboardProps {
  userType: 'user' | 'partner' | 'distribution' | 'admin';
  userName: string;
  savedDeals?: string[];
  onNavigate: (page: string) => void;
  isUserLoggedIn?: boolean;
  onToggleSave?: (businessId: string) => void;
  onLogout?: () => void;
}

export function UserDashboard({ userType, userName, savedDeals = [], onNavigate, isUserLoggedIn = true, onToggleSave, onLogout }: UserDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Business[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Regular User Dashboard
  if (userType === 'user') {
    // Fetch recommendations (featured businesses with deals)
    useEffect(() => {
      const fetchRecommendations = async () => {
        if (!isUserLoggedIn) return;
        setIsLoadingRecommendations(true);
        try {
          const businesses = await apiService.getBusinesses({ featured: true, deals: true });
          // Limit to top 5 recommendations
          setRecommendations(businesses.slice(0, 5));
        } catch (error) {
          console.error('Failed to load recommendations:', error);
          // Keep empty array on error
        } finally {
          setIsLoadingRecommendations(false);
        }
      };
      fetchRecommendations();
    }, [isUserLoggedIn]);

    // Recent activity - placeholder (no backend endpoint yet)
    const recentActivity: Array<{ action: string; business: string; date: string }> = [];

    const selectedBusiness = recommendations.find(rec => String(rec.id) === selectedRecommendation);
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
              {recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">No recent activity</p>
                  <p className="text-xs text-muted-foreground">Your activity history will appear here</p>
                </div>
              ) : (
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
              )}
              <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('saved-deals')}>
                View All Saved Deals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Featured businesses with exclusive deals</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRecommendations ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Loading recommendations...</p>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">No recommendations available</p>
                  <Button size="sm" variant="outline" onClick={() => onNavigate('directory')}>
                    Browse Directory
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div className="flex-1">
                        <p className="mb-1">{rec.name}</p>
                        {rec.deal && <p className="text-sm text-muted-foreground">{rec.deal}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{rec.category}</Badge>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => setSelectedRecommendation(String(rec.id))}>View</Button>
                    </div>
                  ))}
                </div>
              )}
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
                    {selectedBusiness.deal && (
                      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <Tag className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="text-red-700 mb-1">Current Deal</h3>
                            <p className="text-red-700">{selectedBusiness.deal}</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                    </div>
                  </div>

                  <Separator />

                  {/* Business Hours */}
                  {selectedBusiness.hours && (
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
                            <span>{selectedBusiness.hours?.[day] || 'Closed'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
    return <DistributionPartnerDashboard userName={userName} onNavigate={onNavigate} onLogout={onLogout} />;
  }

  // Admin Dashboard
  if (userType === 'admin') {
    return <AdminDashboard userName={userName} onLogout={onLogout} />;
  }

  // Business Partner Dashboard
  if (userType === 'partner') {
    return <PartnerDashboard userName={userName} onNavigate={onNavigate} onLogout={onLogout} />;
  }

  // Default return (shouldn't reach here)
  return null;
}
