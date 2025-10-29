import { useState, useEffect } from 'react';
import { Edit, Eye, TrendingUp, Users, Phone, Mail, DollarSign } from 'lucide-react';
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

interface BusinessDashboardProps {
  businessId: string | null;
}

// Mock analytics data
const viewsData = [
  { date: 'Mon', views: 45 },
  { date: 'Tue', views: 52 },
  { date: 'Wed', views: 61 },
  { date: 'Thu', views: 58 },
  { date: 'Fri', views: 73 },
  { date: 'Sat', views: 89 },
  { date: 'Sun', views: 67 },
];

const clicksData = [
  { date: 'Mon', clicks: 12 },
  { date: 'Tue', clicks: 15 },
  { date: 'Wed', clicks: 18 },
  { date: 'Thu', clicks: 14 },
  { date: 'Fri', clicks: 22 },
  { date: 'Sat', clicks: 28 },
  { date: 'Sun', clicks: 19 },
];

export function BusinessDashboard({ businessId }: BusinessDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasDeal, setHasDeal] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    deal: '',
  });
  const [analytics, setAnalytics] = useState({
    total_views: 0,
    total_clicks: 0,
    weekly_views: 0,
    weekly_clicks: 0,
    phone_clicks: 0,
    email_clicks: 0,
    website_clicks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (businessId) {
      loadBusinessData();
      loadAnalytics();
    }
  }, [businessId]);

  const loadBusinessData = async () => {
    try {
      const data = await apiService.getBusiness(businessId!);
      setBusinessData({
        name: data.name,
        description: data.description,
        phone: data.phone,
        email: data.email,
        address: data.address,
        deal: data.deal || '',
      });
      setHasDeal(data.has_deals);
      setIsFeatured(data.featured);
    } catch (error) {
      toast.error('Failed to load business data');
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await apiService.getBusinessAnalytics(businessId!);
      setAnalytics(data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await apiService.updateBusiness(businessId!, {
        ...businessData,
        has_deals: hasDeal,
        deal_description: hasDeal ? businessData.deal : null,
      });
      setIsEditing(false);
      toast.success('Success! Your listing has been updated.');
    } catch (error) {
      toast.error('Failed to update business listing');
    }
  };

  const handleChange = (field: string, value: string) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }));
  };

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
                <div className="text-2xl">{analytics.total_views}</div>
                <p className="text-xs text-gray-600 mt-1">Total views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Profile Clicks</CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics.total_clicks}</div>
                <p className="text-xs text-gray-600 mt-1">Total clicks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Phone Clicks</CardTitle>
                <Phone className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics.phone_clicks}</div>
                <p className="text-xs text-gray-600 mt-1">Phone clicks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Email Clicks</CardTitle>
                <Mail className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{analytics.email_clicks}</div>
                <p className="text-xs text-gray-600 mt-1">Email clicks</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Views</CardTitle>
                <CardDescription>Total profile views over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#000000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Click Activity</CardTitle>
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
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
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
                  value={businessData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={businessData.description}
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
                    value={businessData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessData.email}
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
                  value={businessData.address}
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
                  checked={hasDeal}
                  onCheckedChange={setHasDeal}
                  disabled={!isEditing}
                />
              </div>

              {hasDeal && (
                <div className="space-y-2">
                  <Label htmlFor="deal">Deal Description</Label>
                  <Textarea
                    id="deal"
                    placeholder="e.g., 20% off all services this month!"
                    value={businessData.deal}
                    onChange={(e) => handleChange('deal', e.target.value)}
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
