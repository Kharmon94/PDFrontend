import { useState } from 'react';
import { ArrowLeft, Store, MapPin, Phone, Mail, Globe, Calendar, DollarSign, TrendingUp, Users, Eye, Heart, Tag, BarChart3, Edit, Trash2, CheckCircle, Clock, Star, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface BusinessDetailAdminProps {
  business: {
    id: number;
    name: string;
    owner: string;
    category: string;
    status: string;
    joined: string;
    plan: string;
  };
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function BusinessDetailAdmin({ business, onBack, onEdit, onDelete }: BusinessDetailAdminProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed business data
  const businessDetails = {
    ...business,
    email: 'contact@' + business.name.toLowerCase().replace(/\s+/g, '') + '.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Downtown',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    website: 'www.' + business.name.toLowerCase().replace(/\s+/g, '') + '.com',
    description: 'A premier business offering exceptional services and products to the community. Known for quality and customer satisfaction.',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
    subscriptionStartDate: business.joined,
    nextBillingDate: 'Nov 20, 2025',
    monthlyRevenue: 49,
    totalRevenue: 294,
    amenities: ['WiFi', 'Parking', 'Wheelchair Accessible', 'Pet Friendly'],
    tags: ['Popular', 'Verified', 'Local Favorite'],
  };

  // Analytics data
  const stats = {
    totalViews: 2847,
    totalSaves: 156,
    totalClicks: 423,
    dealRedemptions: 89,
    averageRating: 4.8,
    totalReviews: 127,
    monthlyViews: 847,
    viewGrowth: 15.2,
    engagementRate: 32.5,
  };

  // Charts data
  const viewsData = [
    { name: 'Mon', views: 420 },
    { name: 'Tue', views: 380 },
    { name: 'Wed', views: 520 },
    { name: 'Thu', views: 460 },
    { name: 'Fri', views: 680 },
    { name: 'Sat', views: 590 },
    { name: 'Sun', views: 350 },
  ];

  const engagementData = [
    { name: 'Jan', saves: 45, clicks: 120 },
    { name: 'Feb', saves: 52, clicks: 145 },
    { name: 'Mar', saves: 48, clicks: 132 },
    { name: 'Apr', saves: 61, clicks: 168 },
    { name: 'May', saves: 58, clicks: 154 },
    { name: 'Jun', saves: 67, clicks: 189 },
  ];

  // Active deals
  const activeDeals = [
    {
      id: 1,
      title: '20% Off All Services',
      description: 'Get 20% off on all services this month',
      validUntil: 'Dec 31, 2025',
      redemptions: 45,
      views: 234,
      status: 'Active',
      created: 'Oct 1, 2025',
    },
    {
      id: 2,
      title: 'Buy One Get One Free',
      description: 'Buy any item and get another one free',
      validUntil: 'Nov 30, 2025',
      redemptions: 28,
      views: 189,
      status: 'Active',
      created: 'Oct 15, 2025',
    },
    {
      id: 3,
      title: 'Weekend Special',
      description: 'Special weekend pricing on select items',
      validUntil: 'Nov 15, 2025',
      redemptions: 16,
      views: 156,
      status: 'Active',
      created: 'Oct 20, 2025',
    },
  ];

  // Payment history
  const paymentHistory = [
    {
      id: 1,
      date: 'Oct 20, 2025',
      amount: 49,
      status: 'Paid',
      plan: business.plan,
      method: 'Visa •••• 4242',
    },
    {
      id: 2,
      date: 'Sep 20, 2025',
      amount: 49,
      status: 'Paid',
      plan: business.plan,
      method: 'Visa •••• 4242',
    },
    {
      id: 3,
      date: 'Aug 20, 2025',
      amount: 49,
      status: 'Paid',
      plan: business.plan,
      method: 'Visa •••• 4242',
    },
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Deal created', description: 'Created "20% Off All Services"', date: '2 hours ago' },
    { id: 2, action: 'Profile updated', description: 'Updated business hours', date: '1 day ago' },
    { id: 3, action: 'Deal redeemed', description: 'Customer redeemed "Buy One Get One"', date: '2 days ago' },
    { id: 4, action: 'Review received', description: 'New 5-star review from customer', date: '3 days ago' },
    { id: 5, action: 'Payment processed', description: 'Monthly subscription payment', date: '5 days ago' },
  ];

  const tabs = ['overview', 'analytics', 'deals', 'billing', 'activity'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
              <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl truncate">{business.name}</h1>
                <p className="text-sm text-muted-foreground">{business.category} • {business.owner}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={onEdit} className="flex-1 sm:flex-initial">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={onDelete} className="flex-1 sm:flex-initial text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Mobile tab indicator dots */}
          <div className="sm:hidden flex justify-center gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-2 rounded-full transition-all ${
                  tab === activeTab 
                    ? 'w-8 bg-black' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${tab}`}
              />
            ))}
          </div>

          <TabsList className="hidden sm:grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Views</p>
                  <p className="text-xs text-green-600 mt-1">+{stats.viewGrowth}% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalSaves}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Saves</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.engagementRate}% engagement</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Tag className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.dealRedemptions}</p>
                  <p className="text-xs text-muted-foreground mt-1">Deal Redemptions</p>
                  <p className="text-xs text-muted-foreground mt-1">{activeDeals.length} active deals</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-2xl">{stats.averageRating}</p>
                  <p className="text-xs text-muted-foreground mt-1">Average Rating</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.totalReviews} reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Business Details */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Contact and location details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Store className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Business Name</p>
                      <p className="text-sm text-muted-foreground">{businessDetails.name}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {businessDetails.address}<br />
                        {businessDetails.city}, {businessDetails.state} {businessDetails.zip}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{businessDetails.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{businessDetails.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Website</p>
                      <p className="text-sm text-muted-foreground">{businessDetails.website}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Operating schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(businessDetails.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between">
                        <p className="text-sm capitalize font-medium">{day}</p>
                        <p className="text-sm text-muted-foreground">{hours}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subscription & Status */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>Plan and billing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Plan</span>
                    <Badge variant={business.plan === 'Featured' ? 'default' : 'secondary'}>
                      {business.plan}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant={business.status === 'Active' ? 'default' : 'secondary'}>
                      {business.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Joined</span>
                    <span className="text-sm text-muted-foreground">{businessDetails.subscriptionStartDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Billing</span>
                    <span className="text-sm text-muted-foreground">{businessDetails.nextBillingDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Revenue</span>
                    <span className="text-sm font-medium">${businessDetails.monthlyRevenue}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="text-sm font-medium">${businessDetails.totalRevenue}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                  <CardDescription>Business description and features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{businessDetails.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {businessDetails.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {businessDetails.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.monthlyViews.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly Views</p>
                  <Progress value={stats.viewGrowth} className="mt-2 h-1" />
                  <p className="text-xs text-green-600 mt-2">+{stats.viewGrowth}% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.engagementRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Engagement Rate</p>
                  <Progress value={stats.engagementRate} className="mt-2 h-1" />
                  <p className="text-xs text-muted-foreground mt-2">Saves + Clicks / Views</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Tag className="w-5 h-5 text-orange-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.dealRedemptions}</p>
                  <p className="text-xs text-muted-foreground mt-1">Deal Redemptions</p>
                  <Progress value={65} className="mt-2 h-1" />
                  <p className="text-xs text-muted-foreground mt-2">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Views</CardTitle>
                <CardDescription>View activity for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#000" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>Saves and clicks over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="saves" fill="#6b7280" />
                      <Bar dataKey="clicks" fill="#000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded" />
                    <span className="text-xs text-muted-foreground">Saves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded" />
                    <span className="text-xs text-muted-foreground">Clicks</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Stats */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Key metrics overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Profile Views</span>
                    <span className="text-sm font-medium">{stats.totalViews.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Saves</span>
                    <span className="text-sm font-medium">{stats.totalSaves}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Clicks</span>
                    <span className="text-sm font-medium">{stats.totalClicks}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deal Redemptions</span>
                    <span className="text-sm font-medium">{stats.dealRedemptions}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">{stats.averageRating}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Reviews</span>
                    <span className="text-sm font-medium">{stats.totalReviews}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Indicators</CardTitle>
                  <CardDescription>Month-over-month performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Views Growth</span>
                      <span className="text-sm font-medium text-green-600">+{stats.viewGrowth}%</span>
                    </div>
                    <Progress value={stats.viewGrowth} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="text-sm font-medium text-green-600">{stats.engagementRate}%</span>
                    </div>
                    <Progress value={stats.engagementRate} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Deal Performance</span>
                      <span className="text-sm font-medium text-green-600">+22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Customer Satisfaction</span>
                      <span className="text-sm font-medium text-green-600">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Deals</CardTitle>
                    <CardDescription>Currently running promotions</CardDescription>
                  </div>
                  <Badge variant="secondary">{activeDeals.length} Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeDeals.map((deal) => (
                    <Card key={deal.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-3">
                              <Tag className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium mb-1">{deal.title}</h4>
                                <p className="text-sm text-muted-foreground">{deal.description}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs">Redemptions</p>
                                <p className="font-medium">{deal.redemptions}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Views</p>
                                <p className="font-medium">{deal.views}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Valid Until</p>
                                <p className="font-medium text-xs">{deal.validUntil}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Created</p>
                                <p className="font-medium text-xs">{deal.created}</p>
                              </div>
                            </div>
                          </div>

                          <Badge variant="default" className="flex-shrink-0">
                            {deal.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deal Performance Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">{activeDeals.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Deals</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">{activeDeals.reduce((sum, deal) => sum + deal.views, 0)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Deal Views</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl">{activeDeals.reduce((sum, deal) => sum + deal.redemptions, 0)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Redemptions</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Transaction history and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">${payment.amount}</span>
                        <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{payment.date}</p>
                        <p>{payment.plan} Plan</p>
                        <p>{payment.method}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="font-medium">${payment.amount}</TableCell>
                          <TableCell>{payment.plan}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                  <CardDescription>Lifetime revenue from this business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Subscription</span>
                    <span className="text-sm font-medium">${businessDetails.monthlyRevenue}/mo</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="text-sm font-medium">${businessDetails.totalRevenue}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Payment</span>
                    <span className="text-sm font-medium">{businessDetails.nextBillingDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Method</span>
                    <span className="text-sm text-muted-foreground">Visa •••• 4242</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Status</CardTitle>
                  <CardDescription>Current plan and billing cycle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Plan</span>
                    <Badge variant={business.plan === 'Featured' ? 'default' : 'secondary'}>
                      {business.plan}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Started</span>
                    <span className="text-sm text-muted-foreground">{businessDetails.subscriptionStartDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Renewal</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">12</p>
                  <p className="text-xs text-muted-foreground mt-1">Profile Updates</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">{activeDeals.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Deals Created</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl">6</p>
                  <p className="text-xs text-muted-foreground mt-1">Payments Made</p>
                  <p className="text-xs text-muted-foreground mt-1">Lifetime</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
