import { useState } from 'react';
import { ArrowLeft, MapPin, TrendingUp, Users, Package, BarChart3, CheckCircle, Clock, Building2, Eye, Store, DollarSign, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LocationDetailWhiteLabelProps {
  location: {
    id: number;
    city: string;
    state: string;
    businesses: number;
    activeDeals: number;
    monthlyGrowth: number;
    totalRevenue: number;
    status: string;
  };
  onBack: () => void;
}

export function LocationDetailWhiteLabel({ location, onBack }: LocationDetailWhiteLabelProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed location data
  const locationDetails = {
    ...location,
    fullName: `${location.city}, ${location.state}`,
    totalViews: Math.floor(location.businesses * 324),
    totalSaves: Math.floor(location.businesses * 56),
    avgRating: 4.7,
  };

  // Analytics data
  const stats = {
    totalBusinesses: location.businesses,
    activeBusinesses: Math.floor(location.businesses * 0.95),
    activeDeals: location.activeDeals,
    totalRedemptions: Math.floor(location.activeDeals * 2.8),
    monthlyGrowth: location.monthlyGrowth,
    totalRevenue: location.totalRevenue,
    viewsThisMonth: Math.floor(location.businesses * 124),
  };

  // Charts data
  const growthData = [
    { name: 'Jan', businesses: Math.floor(location.businesses * 0.7), deals: Math.floor(location.activeDeals * 0.6) },
    { name: 'Feb', businesses: Math.floor(location.businesses * 0.75), deals: Math.floor(location.activeDeals * 0.7) },
    { name: 'Mar', businesses: Math.floor(location.businesses * 0.8), deals: Math.floor(location.activeDeals * 0.75) },
    { name: 'Apr', businesses: Math.floor(location.businesses * 0.85), deals: Math.floor(location.activeDeals * 0.85) },
    { name: 'May', businesses: Math.floor(location.businesses * 0.92), deals: Math.floor(location.activeDeals * 0.92) },
    { name: 'Jun', businesses: location.businesses, deals: location.activeDeals },
  ];

  const categoryData = [
    { name: 'Dining', value: Math.floor(location.businesses * 0.25), color: '#000000' },
    { name: 'Retail', value: Math.floor(location.businesses * 0.20), color: '#374151' },
    { name: 'Services', value: Math.floor(location.businesses * 0.30), color: '#6b7280' },
    { name: 'Health', value: Math.floor(location.businesses * 0.15), color: '#9ca3af' },
    { name: 'Other', value: Math.floor(location.businesses * 0.10), color: '#d1d5db' },
  ];

  const dealActivityData = [
    { name: 'Mon', redemptions: Math.floor(location.activeDeals * 0.12) },
    { name: 'Tue', redemptions: Math.floor(location.activeDeals * 0.11) },
    { name: 'Wed', redemptions: Math.floor(location.activeDeals * 0.15) },
    { name: 'Thu', redemptions: Math.floor(location.activeDeals * 0.13) },
    { name: 'Fri', redemptions: Math.floor(location.activeDeals * 0.19) },
    { name: 'Sat', redemptions: Math.floor(location.activeDeals * 0.17) },
    { name: 'Sun', redemptions: Math.floor(location.activeDeals * 0.10) },
  ];

  // Top businesses in this location
  const topBusinesses = [
    { id: 1, name: 'Pizza Paradise', category: 'Dining', views: 847, rating: 4.8, status: 'Active' },
    { id: 2, name: 'Yoga Studio', category: 'Health & Wellness', views: 726, rating: 4.9, status: 'Active' },
    { id: 3, name: 'Car Wash Pro', category: 'Services', views: 612, rating: 4.6, status: 'Active' },
    { id: 4, name: 'Fresh Market', category: 'Retail', views: 534, rating: 4.7, status: 'Active' },
    { id: 5, name: 'Tech Repair', category: 'Services', views: 428, rating: 4.5, status: 'Active' },
  ].slice(0, Math.min(5, location.businesses));

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'New deal created', description: 'Pizza Paradise added 20% off deal', date: '2 hours ago' },
    { id: 2, action: 'Business updated', description: 'Yoga Studio updated hours', date: '5 hours ago' },
    { id: 3, action: 'Deal redeemed', description: 'Customer redeemed Car Wash deal', date: '1 day ago' },
    { id: 4, action: 'New business', description: 'Fresh Market approved', date: '2 days ago' },
    { id: 5, action: 'Deal redeemed', description: 'Customer redeemed Yoga Studio deal', date: '2 days ago' },
  ];

  const tabs = ['overview', 'analytics', 'businesses', 'activity'];

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
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <h1 className="text-xl sm:text-2xl truncate">{locationDetails.fullName}</h1>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default">{location.status}</Badge>
                  <span className="text-sm text-muted-foreground">{stats.totalBusinesses} businesses</span>
                </div>
              </div>
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

          <TabsList className="hidden sm:grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Store className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalBusinesses}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Businesses</p>
                  <p className="text-xs text-green-600 mt-1">{stats.activeBusinesses} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.activeDeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Deals</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.totalRedemptions} redemptions</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">+{stats.monthlyGrowth}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly Growth</p>
                  <p className="text-xs text-green-600 mt-1">Trending up</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">${stats.totalRevenue}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Location Info */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Information</CardTitle>
                  <CardDescription>Details about this location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">City</span>
                    <span className="text-sm font-medium">{location.city}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">State</span>
                    <span className="text-sm font-medium">{location.state}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant="default">{location.status}</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Businesses</span>
                    <span className="text-sm font-medium">{stats.totalBusinesses}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Businesses</span>
                    <span className="text-sm font-medium">{stats.activeBusinesses}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Key metrics for this location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Growth</span>
                    <span className="text-sm font-medium text-green-600">+{stats.monthlyGrowth}%</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Deals</span>
                    <span className="text-sm font-medium">{stats.activeDeals}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deal Redemptions</span>
                    <span className="text-sm font-medium">{stats.totalRedemptions}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Revenue</span>
                    <span className="text-sm font-medium">${stats.totalRevenue}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Views</span>
                    <span className="text-sm font-medium">{stats.viewsThisMonth.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Business Distribution</CardTitle>
                <CardDescription>Businesses by category in this location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Business and deal growth over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="businesses" stroke="#000" strokeWidth={2} name="Businesses" />
                      <Line type="monotone" dataKey="deals" stroke="#6b7280" strokeWidth={2} name="Deals" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded" />
                    <span className="text-xs text-muted-foreground">Businesses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded" />
                    <span className="text-xs text-muted-foreground">Deals</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deal Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Deal Redemptions</CardTitle>
                <CardDescription>Deal redemption activity for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dealActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="redemptions" fill="#000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.viewsThisMonth.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly Views</p>
                  <Progress value={stats.monthlyGrowth} className="mt-2 h-1" />
                  <p className="text-xs text-green-600 mt-2">+{stats.monthlyGrowth}% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.totalRedemptions}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Redemptions</p>
                  <Progress value={68} className="mt-2 h-1" />
                  <p className="text-xs text-muted-foreground mt-2">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl">{locationDetails.avgRating}</p>
                  <p className="text-xs text-muted-foreground mt-1">Average Rating</p>
                  <Progress value={locationDetails.avgRating * 20} className="mt-2 h-1" />
                  <p className="text-xs text-muted-foreground mt-2">Across all businesses</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Businesses</CardTitle>
                <CardDescription>Most viewed businesses in {location.city}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  {topBusinesses.map((business, index) => (
                    <div key={business.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{business.name}</p>
                            <p className="text-xs text-muted-foreground">{business.category}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="text-xs">{business.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span>{business.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{business.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topBusinesses.map((business, index) => (
                        <TableRow key={business.id}>
                          <TableCell>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                              {business.views}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              {business.rating}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{business.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and events in {location.city}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-muted rounded-lg flex-shrink-0">
                        <Clock className="w-4 h-4 text-muted-foreground" />
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
