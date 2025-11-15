import { useState } from 'react';
import { ArrowLeft, MapPin, TrendingUp, Users, Package, BarChart3, Edit, Trash2, CheckCircle, Clock, Building2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface LocationDetailAdminProps {
  location: any;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function LocationDetailAdmin({ location, onBack, onEdit, onDelete }: LocationDetailAdminProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed location data
  const locationDetails = {
    ...location,
    fullName: `${location.city}, ${location.state}, ${location.country}`,
    population: 3898747,
    marketPenetration: 2.3,
    averageIncome: 68500,
    demographics: {
      age18_24: 15,
      age25_34: 28,
      age35_44: 22,
      age45_54: 18,
      age55_plus: 17,
    },
  };

  // Analytics data
  const stats = {
    totalBusinesses: location.totalBusinesses,
    activeBusinesses: Math.floor(location.totalBusinesses * 0.92),
    totalUsers: location.totalUsers,
    activeUsers: Math.floor(location.totalUsers * 0.78),
    activeDeals: location.activeDeals,
    totalRedemptions: Math.floor(location.activeDeals * 3.2),
    monthlyGrowth: location.monthlyGrowth,
    distributors: location.distributors,
    viewsThisMonth: Math.floor(location.totalUsers * 4.5),
  };

  // Charts data
  const growthData = [
    { name: 'Jan', businesses: 520, users: 5200 },
    { name: 'Feb', businesses: 580, users: 6100 },
    { name: 'Mar', businesses: 640, users: 7200 },
    { name: 'Apr', businesses: 720, users: 8500 },
    { name: 'May', businesses: 820, users: 10100 },
    { name: 'Jun', businesses: 892, users: 11234 },
  ];

  const categoryData = [
    { name: 'Dining', value: 180, color: '#000000' },
    { name: 'Retail', value: 156, color: '#374151' },
    { name: 'Services', value: 234, color: '#6b7280' },
    { name: 'Health', value: 142, color: '#9ca3af' },
    { name: 'Entertainment', value: 98, color: '#d1d5db' },
    { name: 'Other', value: 82, color: '#e5e7eb' },
  ];

  const dealActivityData = [
    { name: 'Mon', redemptions: 42 },
    { name: 'Tue', redemptions: 38 },
    { name: 'Wed', redemptions: 52 },
    { name: 'Thu', redemptions: 46 },
    { name: 'Fri', redemptions: 68 },
    { name: 'Sat', redemptions: 59 },
    { name: 'Sun', redemptions: 35 },
  ];

  // Top businesses
  const topBusinesses = [
    { id: 1, name: 'Urban Cuts Barbershop', category: 'Services', views: 1247, rating: 4.8 },
    { id: 2, name: 'Fresh Market Grocery', category: 'Retail', views: 1156, rating: 4.7 },
    { id: 3, name: 'Wellness Spa & Retreat', category: 'Health', views: 987, rating: 4.9 },
    { id: 4, name: 'Tech Repair Pro', category: 'Services', views: 856, rating: 4.6 },
    { id: 5, name: 'Pasta Paradise', category: 'Dining', views: 742, rating: 4.8 },
  ];

  // Distributors in location
  const locationDistributors = [
    { id: 1, name: 'Downtown Network', businesses: 45, members: 2500, status: 'Active' },
    { id: 2, name: 'Westside Community', businesses: 32, members: 1800, status: 'Active' },
    { id: 3, name: 'Urban Connect', businesses: 28, members: 1500, status: 'Active' },
    { id: 4, name: 'Local Partners LLC', businesses: 24, members: 1200, status: 'Active' },
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'New business', description: 'Urban Cuts Barbershop joined', date: '2 hours ago' },
    { id: 2, action: 'Milestone reached', description: 'Surpassed 10,000 active users', date: '1 day ago' },
    { id: 3, action: 'New distributor', description: 'Local Partners LLC added', date: '2 days ago' },
    { id: 4, action: 'Growth spike', description: '15% increase in deal redemptions', date: '3 days ago' },
    { id: 5, action: 'Business milestone', description: 'Reached 800 active businesses', date: '5 days ago' },
  ];

  const tabs = ['overview', 'businesses', 'analytics', 'distributors', 'activity'];

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
                <h1 className="text-xl sm:text-2xl truncate">{location.city}, {location.state}</h1>
                <p className="text-sm text-muted-foreground">{location.country} • Added {location.addedDate}</p>
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
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="distributors">Distributors</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalBusinesses.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Businesses</p>
                  <p className="text-xs text-green-600 mt-1">{stats.activeBusinesses} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Users</p>
                  <p className="text-xs text-green-600 mt-1">{stats.activeUsers.toLocaleString()} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-gray-500" />
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
                  <p className="text-2xl">{stats.monthlyGrowth}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly Growth</p>
                  <p className="text-xs text-green-600 mt-1">Trending up</p>
                </CardContent>
              </Card>
            </div>

            {/* Location Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                  <CardDescription>Geographic and demographic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{locationDetails.fullName}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Population</p>
                      <p className="text-sm text-muted-foreground">{locationDetails.population.toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Market Penetration</p>
                      <p className="text-sm text-muted-foreground">{locationDetails.marketPenetration}%</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Average Income</p>
                      <p className="text-sm text-muted-foreground">${locationDetails.averageIncome.toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Distribution Partners</p>
                      <p className="text-sm text-muted-foreground">{stats.distributors} active</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={location.status === 'Active' ? 'default' : 'secondary'}>
                        {location.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Business Growth</span>
                      <span className="text-sm font-medium text-green-600">+{stats.monthlyGrowth}%</span>
                    </div>
                    <Progress value={stats.monthlyGrowth} className="h-2" />
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">User Engagement</span>
                      <span className="text-sm font-medium text-green-600">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Deal Redemption Rate</span>
                      <span className="text-sm font-medium text-green-600">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Views</span>
                    <span className="text-sm font-medium">{stats.viewsThisMonth.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Added to Platform</span>
                    <span className="text-sm text-muted-foreground">{location.addedDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Business Category Distribution</CardTitle>
                <CardDescription>Breakdown by industry category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: category.color }} />
                      <span className="text-xs text-muted-foreground">{category.name}: {category.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Businesses */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Businesses</CardTitle>
                <CardDescription>Highest engagement in this location</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  {topBusinesses.map((business) => (
                    <div key={business.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{business.name}</p>
                          <p className="text-xs text-muted-foreground">{business.category}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Views</p>
                          <p className="font-medium">{business.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Rating</p>
                          <p className="font-medium">{business.rating} ⭐</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topBusinesses.map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.category}</TableCell>
                          <TableCell>{business.views.toLocaleString()}</TableCell>
                          <TableCell>{business.rating} ⭐</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Growth Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Businesses and users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="businesses" stroke="#000" strokeWidth={2} name="Businesses" />
                      <Line yAxisId="right" type="monotone" dataKey="users" stroke="#6b7280" strokeWidth={2} name="Users" />
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
                    <span className="text-xs text-muted-foreground">Users</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deal Activity</CardTitle>
                <CardDescription>Weekly deal redemptions</CardDescription>
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

            {/* Performance Summary */}
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
                  <p className="text-2xl">{stats.activeBusinesses}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Businesses</p>
                  <Progress value={92} className="mt-2 h-1" />
                  <p className="text-xs text-muted-foreground mt-2">92% of total</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Users</p>
                  <Progress value={78} className="mt-2 h-1" />
                  <p className="text-xs text-muted-foreground mt-2">78% engagement</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Distributors Tab */}
          <TabsContent value="distributors" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Distribution Partners</CardTitle>
                    <CardDescription>Active partners in this location</CardDescription>
                  </div>
                  <Badge variant="secondary">{stats.distributors} Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  {locationDistributors.map((dist) => (
                    <div key={dist.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{dist.name}</p>
                          <Badge variant="default" className="text-xs mt-1">{dist.status}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Businesses</p>
                          <p className="font-medium">{dist.businesses}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Members</p>
                          <p className="font-medium">{dist.members.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partner Name</TableHead>
                        <TableHead>Businesses</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {locationDistributors.map((dist) => (
                        <TableRow key={dist.id}>
                          <TableCell className="font-medium">{dist.name}</TableCell>
                          <TableCell>{dist.businesses}</TableCell>
                          <TableCell>{dist.members.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="default">{dist.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Distributor Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">{stats.distributors}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Distributors</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">{locationDistributors.reduce((sum, d) => sum + d.businesses, 0)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Businesses via Partners</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-2xl">{locationDistributors.reduce((sum, d) => sum + d.members, 0).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Members via Partners</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and milestones</CardDescription>
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
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">52</p>
                  <p className="text-xs text-muted-foreground mt-1">Businesses Added</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">1,234</p>
                  <p className="text-xs text-muted-foreground mt-1">New Users</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-2xl">340</p>
                  <p className="text-xs text-muted-foreground mt-1">Deal Redemptions</p>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
