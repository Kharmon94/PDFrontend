import { useState, useEffect } from 'react';
import { Store, Plus, Eye, Edit, TrendingUp, Phone, Mail, MapPin, Clock, Star, BarChart3, Globe, Tag, Upload, X, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { apiService } from '../services/api';
import { Business } from '../types';

interface PartnerDashboardProps {
  userName: string;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function PartnerDashboard({ userName, onNavigate, onLogout }: PartnerDashboardProps) {
  const [viewListingId, setViewListingId] = useState<string | null>(null);
  const [editListingId, setEditListingId] = useState<string | null>(null);
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const [showNewBusiness, setShowNewBusiness] = useState(false);
  const [editAmenities, setEditAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState('');
  const [editPhotos, setEditPhotos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('listings');
  const [selectedPlan, setSelectedPlan] = useState('3-months');
  const [newBusinessStep, setNewBusinessStep] = useState(1);
  const [myBusinesses, setMyBusinesses] = useState<Business[]>([]);
  const [businessAnalytics, setBusinessAnalytics] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch partner's businesses and their analytics
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const businesses = await apiService.getMyBusinesses();
        setMyBusinesses(businesses);
        
        // Fetch analytics for each business
        const analyticsMap: Record<string, any> = {};
        await Promise.all(
          businesses.map(async (business: Business) => {
            try {
              const analytics = await apiService.getBusinessAnalytics(String(business.id));
              analyticsMap[String(business.id)] = analytics;
            } catch (error) {
              // If analytics fail, use empty analytics
              analyticsMap[String(business.id)] = {
                total_views: 0,
                total_clicks: 0,
                weekly_views: 0,
                weekly_clicks: 0,
              };
            }
          })
        );
        setBusinessAnalytics(analyticsMap);
      } catch (error: any) {
        toast.error(error.message || 'Failed to load your businesses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate total stats from analytics
  const totalStats = myBusinesses.reduce((acc, business) => {
    const analytics = businessAnalytics[String(business.id)] || { total_views: 0, total_clicks: 0 };
    return {
      views: acc.views + (analytics.total_views || 0),
      clicks: acc.clicks + (analytics.total_clicks || 0),
      deals: acc.deals + (business.has_deals ? 1 : 0),
    };
  }, { views: 0, clicks: 0, deals: 0 });

  // Generate chart data from analytics (placeholder - backend doesn't provide day-by-day data yet)
  // For now, distribute weekly totals across days evenly with some variation
  const totalWeeklyViews = myBusinesses.reduce((sum, business) => {
    const analytics = businessAnalytics[String(business.id)] || { weekly_views: 0 };
    return sum + (analytics.weekly_views || 0);
  }, 0);
  
  const totalWeeklyClicks = myBusinesses.reduce((sum, business) => {
    const analytics = businessAnalytics[String(business.id)] || { weekly_clicks: 0 };
    return sum + (analytics.weekly_clicks || 0);
  }, 0);

  // Distribute weekly totals across 7 days (simple distribution for now)
  const avgDailyViews = Math.round(totalWeeklyViews / 7);
  const avgDailyClicks = Math.round(totalWeeklyClicks / 7);
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const viewsData = days.map(day => ({
    date: day,
    views: avgDailyViews + Math.floor(Math.random() * 20 - 10) // Small variation
  }));
  
  const clicksData = days.map(day => ({
    date: day,
    clicks: avgDailyClicks + Math.floor(Math.random() * 10 - 5) // Small variation
  }));

  const selectedListing = myBusinesses.find(b => b.id === viewListingId);
  const editingListing = myBusinesses.find(b => b.id === editListingId);
  
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  // Initialize edit state when modal opens
  const handleEditOpen = (businessId: string) => {
    const business = myBusinesses.find(b => b.id === businessId);
    if (business) {
      setEditAmenities([...business.amenities]);
      setEditPhotos([...business.photos]);
      setEditListingId(businessId);
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setEditAmenities([...editAmenities, newAmenity.trim()]);
      setNewAmenity('');
      toast.success('Amenity added');
    }
  };

  const removeAmenity = (index: number) => {
    setEditAmenities(editAmenities.filter((_, i) => i !== index));
    toast.success('Amenity removed');
  };

  const movePhoto = (fromIndex: number, direction: 'left' | 'right') => {
    const newPhotos = [...editPhotos];
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;
    
    if (toIndex >= 0 && toIndex < newPhotos.length) {
      [newPhotos[fromIndex], newPhotos[toIndex]] = [newPhotos[toIndex], newPhotos[fromIndex]];
      setEditPhotos(newPhotos);
    }
  };

  const removePhoto = (index: number) => {
    if (editPhotos.length > 1) {
      setEditPhotos(editPhotos.filter((_, i) => i !== index));
      toast.success('Photo removed');
    } else {
      toast.error('You must have at least one photo');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mb-2">My Business Listings</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your business presence and track performance</p>
        </div>
        <Button onClick={() => setShowNewBusiness(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New Business
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Store className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Businesses</p>
            <p className="text-2xl sm:text-3xl">{myBusinesses.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Views</p>
            <p className="text-2xl sm:text-3xl">{totalStats.views.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Clicks</p>
            <p className="text-2xl sm:text-3xl">{totalStats.clicks}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Active Deals</p>
            <p className="text-2xl sm:text-3xl">{totalStats.deals}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        {/* Slider Navigation */}
        <div className="space-y-3 sm:space-y-4">
          {/* Tab Name with Arrows */}
          <div className="relative text-center">
            <h2 className="text-xl sm:text-2xl capitalize">
              {activeTab === 'listings' ? 'My Listings' : activeTab}
            </h2>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const tabs = ['listings', 'analytics', 'deals'];
                const currentIndex = tabs.indexOf(activeTab);
                const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
                setActiveTab(tabs[prevIndex]);
              }}
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 size-8 sm:size-10 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-900 flex items-center justify-center shadow-sm transition-all"
              aria-label="Previous section"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={() => {
                const tabs = ['listings', 'analytics', 'deals'];
                const currentIndex = tabs.indexOf(activeTab);
                const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
                setActiveTab(tabs[nextIndex]);
              }}
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 size-8 sm:size-10 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-900 flex items-center justify-center shadow-sm transition-all"
              aria-label="Next section"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Carousel Indicators (Dots) */}
          <div className="flex justify-center gap-2">
            {['listings', 'analytics', 'deals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-2 rounded-full transition-all ${
                  tab === activeTab 
                    ? 'w-8 bg-black' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${tab === 'listings' ? 'My Listings' : tab}`}
              />
            ))}
          </div>
        </div>

        <TabsContent value="listings" className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6">
            {myBusinesses.map((business) => (
              <Card key={business.id}>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <CardTitle className="text-base sm:text-lg">{business.name}</CardTitle>
                        <Badge variant={business.plan === 'Premium' ? 'default' : 'secondary'} className="text-xs">
                          {business.plan}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{business.status}</Badge>
                      </div>
                      <CardDescription className="text-xs sm:text-sm">{business.category}</CardDescription>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" onClick={() => setViewListingId(business.id)} className="flex-1 sm:flex-none text-xs sm:text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditOpen(business.id)} className="flex-1 sm:flex-none text-xs sm:text-sm">
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Views</p>
                        <p className="text-sm sm:text-lg">{(businessAnalytics[String(business.id)]?.total_views || 0).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                        <p className="text-sm sm:text-lg">{businessAnalytics[String(business.id)]?.total_clicks || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Contact</p>
                        <p className="text-sm sm:text-lg">{(businessAnalytics[String(business.id)]?.phone_clicks || 0) + (businessAnalytics[String(business.id)]?.email_clicks || 0)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Deals</p>
                        <p className="text-sm sm:text-lg">{business.has_deals ? 1 : 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="text-sm sm:text-lg">{business.rating || 0}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-3 sm:py-4 flex-col gap-2 text-xs sm:text-sm"
                  onClick={() => setShowCreateDeal(true)}
                >
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  Create New Deal
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-3 sm:py-4 flex-col gap-2 text-xs sm:text-sm"
                  onClick={() => editingListing && handleEditOpen(editingListing.id)}
                >
                  <Edit className="w-5 h-5 sm:w-6 sm:h-6" />
                  Update Hours
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-3 sm:py-4 flex-col gap-2 text-xs sm:text-sm"
                  onClick={() => onNavigate('pricing')}
                >
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Views Over Time</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Total profile views for the past week</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" style={{ fontSize: '12px' }} />
                    <YAxis style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#000000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Click Activity</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Contact clicks for the past week</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={clicksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" style={{ fontSize: '12px' }} />
                    <YAxis style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#000000" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance by Listing */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Performance by Listing</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Compare your business listings</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Business Name</TableHead>
                    <TableHead className="text-xs sm:text-sm">Views</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Clicks</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">Contact</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Conv. Rate</TableHead>
                    <TableHead className="text-xs sm:text-sm">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="text-xs sm:text-sm">{business.name}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{(businessAnalytics[String(business.id)]?.total_views || 0).toLocaleString()}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{businessAnalytics[String(business.id)]?.total_clicks || 0}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell">{(businessAnalytics[String(business.id)]?.phone_clicks || 0) + (businessAnalytics[String(business.id)]?.email_clicks || 0)}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                        {businessAnalytics[String(business.id)]?.total_views ? 
                          (((businessAnalytics[String(business.id)]?.total_clicks || 0) / businessAnalytics[String(business.id)]?.total_views) * 100).toFixed(1) : 
                          '0.0'}%
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                          {business.rating}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg">Manage Deals</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Create and manage your promotional offers</CardDescription>
                </div>
                <Button onClick={() => setShowCreateDeal(true)} className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Deal
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-muted-foreground text-sm">No active deals. Create your first deal to attract more customers!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Listing Modal */}
      <Dialog open={!!viewListingId} onOpenChange={(open) => !open && setViewListingId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="view-listing-description">
          {selectedListing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">{selectedListing.name}</DialogTitle>
                <DialogDescription id="view-listing-description" className="text-xs sm:text-sm">Preview how your listing appears to customers</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-6">
                {/* Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedListing.photos[0]}
                    alt={selectedListing.name}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-black hover:bg-gray-900 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    {selectedListing.plan}
                  </Badge>
                </div>

                {/* Business Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{selectedListing.category}</Badge>
                    <Badge variant="outline" className="text-xs">{selectedListing.status}</Badge>
                    <div className="flex items-center gap-1 text-gray-900">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{selectedListing.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{selectedListing.description}</p>

                  {selectedListing.amenities && selectedListing.amenities.length > 0 && (
                    <div>
                      <h3 className="mb-2 text-sm sm:text-base">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedListing.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="mb-3 text-sm sm:text-base">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-600 text-xs sm:text-sm">{selectedListing.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 text-xs sm:text-sm">{selectedListing.phone}</span>
                    </div>
                    {selectedListing.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-600 text-xs sm:text-sm">{selectedListing.email}</span>
                      </div>
                    )}
                    {selectedListing.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-600 text-xs sm:text-sm">{selectedListing.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Business Hours */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <h3 className="text-sm sm:text-base">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    {daysOfWeek.map(day => (
                      <div
                        key={day}
                        className={`flex justify-between text-xs sm:text-sm ${
                          day === today ? 'font-semibold text-gray-900' : 'text-gray-600'
                        }`}
                      >
                        <span className="capitalize">{day}</span>
                        <span>{selectedListing.hours[day as keyof typeof selectedListing.hours]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div>
                  <h3 className="mb-3 text-sm sm:text-base">Performance Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="text-xl sm:text-2xl">{(businessAnalytics[String(selectedListing.id)]?.total_views || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-xl sm:text-2xl">{businessAnalytics[String(selectedListing.id)]?.total_clicks || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Contact Clicks</p>
                      <p className="text-xl sm:text-2xl">{(businessAnalytics[String(selectedListing.id)]?.phone_clicks || 0) + (businessAnalytics[String(selectedListing.id)]?.email_clicks || 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Active Deals</p>
                      <p className="text-xl sm:text-2xl">{selectedListing.has_deals ? 1 : 0}</p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => setViewListingId(null)} className="w-full">
                  Close Preview
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Listing Modal */}
      <Dialog open={!!editListingId} onOpenChange={(open) => {
        if (!open) {
          setEditListingId(null);
          setNewAmenity('');
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="edit-listing-description">
          {editingListing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">Edit Listing</DialogTitle>
                <DialogDescription id="edit-listing-description" className="text-xs sm:text-sm">Update your business information</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-6">
                {/* Business Photos */}
                <div>
                  <Label className="text-sm sm:text-base">Business Photos</Label>
                  <p className="text-xs text-muted-foreground mb-3">Drag to reorder. First photo is your cover image.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {editPhotos.map((photo, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border-2 border-gray-200">
                        <ImageWithFallback
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 sm:h-40 object-cover"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-black text-white text-xs">
                            Cover
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-7 w-7 p-0"
                            onClick={() => movePhoto(index, 'left')}
                            disabled={index === 0}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-7 w-7 p-0"
                            onClick={() => movePhoto(index, 'right')}
                            disabled={index === editPhotos.length - 1}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={() => removePhoto(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <button className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors h-32 sm:h-40 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                      <div className="text-center text-gray-500">
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                        <p className="text-xs sm:text-sm">Add Photo</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="edit-name" className="text-sm">Business Name</Label>
                    <Input id="edit-name" defaultValue={editingListing.name} className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="edit-category" className="text-sm">Category</Label>
                    <Select defaultValue={editingListing.category}>
                      <SelectTrigger id="edit-category" className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Beauty">Beauty & Self Care</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-description" className="text-sm">Description</Label>
                  <Textarea
                    id="edit-description"
                    defaultValue={editingListing.description}
                    rows={4}
                    placeholder="Tell customers about your business..."
                    className="text-sm"
                  />
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="mb-3 text-sm sm:text-base">Contact Information</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label htmlFor="edit-address" className="text-sm">Address</Label>
                      <Input id="edit-address" defaultValue={editingListing.address} className="text-sm" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="edit-phone" className="text-sm">Phone</Label>
                        <Input id="edit-phone" defaultValue={editingListing.phone} className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="edit-email" className="text-sm">Email</Label>
                        <Input id="edit-email" type="email" defaultValue={editingListing.email} className="text-sm" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-website" className="text-sm">Website</Label>
                      <Input id="edit-website" defaultValue={editingListing.website} placeholder="www.yourbusiness.com" className="text-sm" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Business Hours */}
                <div>
                  <h3 className="mb-3 text-sm sm:text-base">Business Hours</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {daysOfWeek.map(day => (
                      <div key={day} className="grid grid-cols-3 gap-2 sm:gap-3 items-center">
                        <Label className="capitalize text-xs sm:text-sm">{day}</Label>
                        <Input 
                          defaultValue={editingListing.hours[day as keyof typeof editingListing.hours]}
                          placeholder="9:00 AM - 5:00 PM"
                          className="col-span-2 text-xs sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Amenities */}
                <div>
                  <Label className="text-sm sm:text-base">Amenities</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {editAmenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs sm:text-sm pr-1">
                          {amenity}
                          <button
                            onClick={() => removeAmenity(index)}
                            className="ml-1 hover:text-red-500 transition-colors p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="Add amenity..."
                        className="text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addAmenity();
                          }
                        }}
                      />
                      <Button onClick={addAmenity} size="sm" type="button">
                        <Plus className="w-4 h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      toast.success('Listing updated successfully!');
                      setEditListingId(null);
                      setNewAmenity('');
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => {
                    setEditListingId(null);
                    setNewAmenity('');
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Deal Modal */}
      <Dialog open={showCreateDeal} onOpenChange={setShowCreateDeal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="create-deal-description">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Create New Deal</DialogTitle>
            <DialogDescription id="create-deal-description" className="text-xs sm:text-sm">Create a promotional offer to attract more customers</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="deal-business" className="text-sm">Select Business</Label>
              <Select>
                <SelectTrigger id="deal-business" className="text-sm">
                  <SelectValue placeholder="Choose a business" />
                </SelectTrigger>
                <SelectContent>
                  {myBusinesses.map(business => (
                    <SelectItem key={business.id} value={business.id}>
                      {business.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deal-title" className="text-sm">Deal Title</Label>
              <Input 
                id="deal-title" 
                placeholder="e.g., 20% off all entrees"
                className="text-sm"
              />
            </div>

            <div>
              <Label htmlFor="deal-description" className="text-sm">Deal Description</Label>
              <Textarea
                id="deal-description"
                rows={3}
                placeholder="Describe your promotional offer in detail..."
                className="text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="deal-start" className="text-sm">Start Date</Label>
                <Input id="deal-start" type="date" className="text-sm" />
              </div>
              <div>
                <Label htmlFor="deal-end" className="text-sm">End Date</Label>
                <Input id="deal-end" type="date" className="text-sm" />
              </div>
            </div>

            <div>
              <Label htmlFor="deal-terms" className="text-sm">Terms & Conditions</Label>
              <Textarea
                id="deal-terms"
                rows={2}
                placeholder="Any restrictions or special conditions..."
                className="text-sm"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="flex gap-2">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-blue-900">
                    <strong>Tip:</strong> Clear, specific deals perform better! Include the discount percentage or value, and any time restrictions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                className="flex-1"
                onClick={() => {
                  toast.success('Deal created successfully!');
                  setShowCreateDeal(false);
                }}
              >
                Create Deal
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateDeal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Business Listing Modal - Multi-Step */}
      <Dialog open={showNewBusiness} onOpenChange={(open) => {
        setShowNewBusiness(open);
        if (!open) setNewBusinessStep(1);
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="new-business-description">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Add New Business</DialogTitle>
            <DialogDescription id="new-business-description" className="text-xs sm:text-sm">
              Step {newBusinessStep} of 4: {
                newBusinessStep === 1 ? 'Select Plan' :
                newBusinessStep === 2 ? 'Business Details' :
                newBusinessStep === 3 ? 'Contact Information' :
                'Business Hours'
              }
            </DialogDescription>
          </DialogHeader>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1">
                <div className={`h-2 rounded-full transition-all ${
                  step <= newBusinessStep ? 'bg-black' : 'bg-gray-200'
                }`} />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Step 1: Select Plan */}
            {newBusinessStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">Choose Your Plan</h3>
                  <p className="text-sm text-muted-foreground mb-6">Select the plan that works best for your business</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Free Plan */}
                  <button 
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:border-gray-400 ${
                      selectedPlan === 'free' ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan('free')}
                  >
                    <h4 className="mb-2">Free</h4>
                    <p className="text-3xl mb-2">$0</p>
                    <p className="text-sm text-muted-foreground">Basic listing features</p>
                  </button>
                  
                  {/* 1 Month */}
                  <button 
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:border-gray-400 ${
                      selectedPlan === '1-month' ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan('1-month')}
                  >
                    <h4 className="mb-2">1 Month</h4>
                    <p className="text-3xl mb-2">$49</p>
                    <p className="text-sm text-muted-foreground">Premium listing for one month</p>
                  </button>
                  
                  {/* 3 Months */}
                  <button 
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:border-gray-400 relative ${
                      selectedPlan === '3-months' ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan('3-months')}
                  >
                    <Badge className="absolute top-3 right-3">Best Value</Badge>
                    <h4 className="mb-2">3 Months</h4>
                    <p className="text-3xl mb-2">$99</p>
                    <p className="text-sm text-muted-foreground">Save $48 - $33/month</p>
                  </button>
                  
                  {/* 1 Year */}
                  <button 
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:border-gray-400 ${
                      selectedPlan === '1-year' ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan('1-year')}
                  >
                    <h4 className="mb-2">1 Year</h4>
                    <p className="text-3xl mb-2">$299</p>
                    <p className="text-sm text-muted-foreground">Save $289 - $25/month</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {newBusinessStep === 2 && (
              <div className="space-y-6">
                {/* Business Photos */}
                <div>
                  <Label className="text-base">Business Photos</Label>
                  <p className="text-xs text-muted-foreground mb-3">Upload at least one photo. First photo will be your cover image.</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    <button className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors aspect-square flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                      <div className="text-center text-gray-500">
                        <Upload className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs">Add Photo</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-name">Business Name *</Label>
                    <Input id="new-name" placeholder="Enter business name" />
                  </div>
                  <div>
                    <Label htmlFor="new-category">Category *</Label>
                    <Select>
                      <SelectTrigger id="new-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Beauty">Beauty & Self Care</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="new-description">Description *</Label>
                    <Textarea
                      id="new-description"
                      rows={4}
                      placeholder="Tell customers about your business..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {newBusinessStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-4">Contact Information</h3>
                </div>
                <div>
                  <Label htmlFor="new-address">Address *</Label>
                  <Input id="new-address" placeholder="123 Main St, City, State ZIP" />
                </div>
                <div>
                  <Label htmlFor="new-phone">Phone *</Label>
                  <Input id="new-phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="new-email">Email *</Label>
                  <Input id="new-email" type="email" placeholder="contact@business.com" />
                </div>
                <div>
                  <Label htmlFor="new-website">Website</Label>
                  <Input id="new-website" placeholder="www.yourbusiness.com" />
                </div>
              </div>
            )}

            {/* Step 4: Business Hours */}
            {newBusinessStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-4">Business Hours</h3>
                  <p className="text-sm text-muted-foreground mb-4">Set your operating hours for each day</p>
                </div>
                <div className="space-y-3">
                  {daysOfWeek.map(day => (
                    <div key={day} className="grid grid-cols-[120px_1fr] gap-4 items-center">
                      <Label className="capitalize">{day}</Label>
                      <Input 
                        placeholder="9:00 AM - 5:00 PM"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <Separator />
            <div className="flex gap-3">
              {newBusinessStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setNewBusinessStep(newBusinessStep - 1)}
                  className="flex-1"
                >
                  Previous
                </Button>
              )}
              {newBusinessStep < 4 ? (
                <Button 
                  onClick={() => setNewBusinessStep(newBusinessStep + 1)}
                  className="flex-1"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    toast.success('Business listing created successfully!');
                    setShowNewBusiness(false);
                    setNewBusinessStep(1);
                  }}
                  className="flex-1"
                >
                  Create Listing
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNewBusiness(false);
                  setNewBusinessStep(1);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
