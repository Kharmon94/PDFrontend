import { useState, useEffect } from 'react';
import { Edit, Eye, TrendingUp, Users, Phone, Mail, DollarSign, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';
import { apiService } from '../services/api';
import { Business } from '../types';

interface BusinessDashboardProps {
  businessId: string | null;
}

interface Analytics {
  total_views: number;
  total_clicks: number;
  weekly_views: number;
  weekly_clicks: number;
  phone_clicks: number;
  email_clicks: number;
  website_clicks: number;
}

export function BusinessDashboard({ businessId }: BusinessDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    deal_description: '',
    category: '',
    has_deals: false,
    featured: false,
  });

  // Fetch business data and analytics
  useEffect(() => {
    const fetchData = async () => {
      if (!businessId) {
        // If no businessId, fetch user's first business
        try {
          const businesses = await apiService.getMyBusinesses();
          if (businesses.length > 0) {
            const firstBusiness = businesses[0];
            setBusiness(firstBusiness);
            setFormData({
              name: firstBusiness.name,
              description: firstBusiness.description || '',
              phone: firstBusiness.phone || '',
              email: firstBusiness.email || '',
              website: firstBusiness.website || '',
              address: firstBusiness.address,
              deal_description: firstBusiness.deal || '',
              category: firstBusiness.category,
              has_deals: firstBusiness.has_deals,
              featured: firstBusiness.featured,
            });
            
            // Fetch analytics
            const analyticsData = await apiService.getBusinessAnalytics(String(firstBusiness.id));
            setAnalytics(analyticsData);
          }
        } catch (error: any) {
          toast.error(error.message || 'Failed to load business data');
        } finally {
          setIsLoading(false);
        }
      } else {
        // Fetch specific business
        try {
          const businessData = await apiService.getBusiness(businessId);
          setBusiness(businessData);
          setFormData({
            name: businessData.name,
            description: businessData.description || '',
            phone: businessData.phone || '',
            email: businessData.email || '',
            website: businessData.website || '',
            address: businessData.address,
            deal_description: businessData.deal || '',
            category: businessData.category,
            has_deals: businessData.has_deals,
            featured: businessData.featured,
          });
          
          // Fetch analytics
          const analyticsData = await apiService.getBusinessAnalytics(businessId);
          setAnalytics(analyticsData);
        } catch (error: any) {
          toast.error(error.message || 'Failed to load business data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [businessId]);

  const handleSave = async () => {
    if (!business) return;
    
    setIsSaving(true);
    try {
      await apiService.updateBusiness(String(business.id), formData);
      toast.success('Business updated successfully!');
      setIsEditing(false);
      
      // Refetch business data
      const updatedBusiness = await apiService.getBusiness(String(business.id));
      setBusiness(updatedBusiness);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update business');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No business found. Create one to get started!</p>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Business Dashboard</h1>
        <p className="text-gray-600">Manage your listing and track performance</p>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="manage">Manage Listing</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Views</CardTitle>
                <Eye className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.total_views || 0}</div>
                <p className="text-xs text-gray-600 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Clicks</CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.total_clicks || 0}</div>
                <p className="text-xs text-gray-600 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Phone Clicks</CardTitle>
                <Phone className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.phone_clicks || 0}</div>
                <p className="text-xs text-gray-600 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Email Clicks</CardTitle>
                <Mail className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.email_clicks || 0}</div>
                <p className="text-xs text-gray-600 mt-1">All time</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Website Clicks</CardTitle>
                <Globe className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.website_clicks || 0}</div>
                <p className="text-xs text-gray-600 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Weekly Views</CardTitle>
                <Eye className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.weekly_views || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Last 7 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Weekly Clicks</CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics?.weekly_clicks || 0}</div>
                <p className="text-xs text-gray-600 mt-1">Last 7 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Business Info */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
                <CardDescription>Contact clicks over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clicksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#000000" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade Section */}
          <Card className="border-2 border-gray-300 bg-gray-50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Upgrade to Featured Listing</CardTitle>
                  <CardDescription className="mt-2">
                    Boost your visibility and appear at the top of search results
                  </CardDescription>
                </div>
                <Badge className="bg-black hover:bg-gray-900 text-white">Premium</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  Priority placement in search results
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  Featured badge on your listing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  3x more views on average
                </li>
              </ul>
              <Button className="w-full md:w-auto">
                <DollarSign className="w-4 h-4 mr-2" />
                Upgrade Now - $29/month
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Listing Tab */}
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Your Business Listing</CardTitle>
                  <CardDescription>Update your business information</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" disabled={isSaving}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  disabled={!isEditing}
                  className="min-h-24"
                />
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {/* Deal Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Active Deal</Label>
                  <p className="text-sm text-gray-500">
                    Enable to add a special offer to your listing
                  </p>
                </div>
                <Switch
                  checked={formData.has_deals}
                  onCheckedChange={(checked) => handleChange('has_deals', checked)}
                  disabled={!isEditing}
                />
              </div>

              {formData.has_deals && (
                <div className="space-y-2">
                  <Label htmlFor="deal">Deal Description</Label>
                  <Textarea
                    id="deal"
                    placeholder="e.g., 20% off all services this month!"
                    value={formData.deal_description}
                    onChange={(e) => handleChange('deal_description', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              )}

              {/* Featured Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="space-y-0.5">
                  <Label>Featured Status</Label>
                  <p className="text-sm text-gray-500">
                    {isFeatured ? 'Your listing is featured' : 'Upgrade to feature your listing'}
                  </p>
                </div>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
