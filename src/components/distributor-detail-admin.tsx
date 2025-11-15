import { useState } from 'react';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Globe, Calendar, DollarSign, TrendingUp, Users, Eye, Package, BarChart3, Edit, Trash2, CheckCircle, Clock, Star, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface DistributorDetailAdminProps {
  distributor: any;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPlatformSettings?: () => void;
}

export function DistributorDetailAdmin({ distributor, onBack, onEdit, onDelete, onPlatformSettings }: DistributorDetailAdminProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed distributor data
  const distributorDetails = {
    ...distributor,
    email: 'contact@' + distributor.name.toLowerCase().replace(/\s+/g, '') + '.com',
    phone: '(555) 234-5678',
    address: '789 Partnership Ave, Suite 100',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    website: 'www.' + distributor.name.toLowerCase().replace(/\s+/g, '') + '.com',
    description: 'A leading distribution partner connecting local businesses with community members through word-of-mouth marketing.',
    subdomain: distributor.name.toLowerCase().replace(/\s+/g, '') + '.preferreddeals.com',
    contactPerson: distributor.contact,
    memberCount: distributor.members || 5000,
    customBranding: true,
    subscriptionStartDate: distributor.joinedDate || 'Mar 15, 2025',
    nextBillingDate: 'Dec 15, 2025',
  };

  // Analytics data
  const stats = {
    totalBusinesses: 42,
    activeBusinesses: 38,
    totalUsers: distributorDetails.memberCount,
    activeDeals: 156,
    totalRevenue: 2100,
    monthlyRevenue: 350,
    averageRating: 4.9,
    viewsThisMonth: 12450,
    dealRedemptions: 234,
    growthRate: 18.5,
  };

  // Charts data
  const businessGrowthData = [
    { name: 'Jan', businesses: 15 },
    { name: 'Feb', businesses: 22 },
    { name: 'Mar', businesses: 28 },
    { name: 'Apr', businesses: 32 },
    { name: 'May', businesses: 38 },
    { name: 'Jun', businesses: 42 },
  ];

  const userEngagementData = [
    { name: 'Mon', users: 420 },
    { name: 'Tue', users: 380 },
    { name: 'Wed', users: 520 },
    { name: 'Thu', users: 460 },
    { name: 'Fri', users: 680 },
    { name: 'Sat', users: 590 },
    { name: 'Sun', users: 350 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 250 },
    { name: 'Feb', revenue: 280 },
    { name: 'Mar', revenue: 310 },
    { name: 'Apr', revenue: 320 },
    { name: 'May', revenue: 340 },
    { name: 'Jun', revenue: 350 },
  ];

  // Top businesses
  const topBusinesses = [
    { id: 1, name: 'Urban Cuts Barbershop', category: 'Services', views: 1247, redemptions: 45 },
    { id: 2, name: 'Fresh Market Grocery', category: 'Retail', views: 1156, redemptions: 38 },
    { id: 3, name: 'Wellness Spa & Retreat', category: 'Health', views: 987, redemptions: 32 },
    { id: 4, name: 'Tech Repair Pro', category: 'Services', views: 856, redemptions: 28 },
    { id: 5, name: 'Pasta Paradise', category: 'Dining', views: 742, redemptions: 24 },
  ];

  // Payment history
  const paymentHistory = [
    {
      id: 1,
      date: 'Nov 1, 2025',
      amount: 350,
      businesses: 42,
      status: 'Paid',
      method: 'ACH Transfer',
    },
    {
      id: 2,
      date: 'Oct 1, 2025',
      amount: 340,
      businesses: 40,
      status: 'Paid',
      method: 'ACH Transfer',
    },
    {
      id: 3,
      date: 'Sep 1, 2025',
      amount: 320,
      businesses: 38,
      status: 'Paid',
      method: 'ACH Transfer',
    },
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Business approved', description: 'Approved "Urban Cuts Barbershop"', date: '2 hours ago' },
    { id: 2, action: 'Branding updated', description: 'Updated custom color scheme', date: '1 day ago' },
    { id: 3, action: 'New business', description: 'Fresh Market Grocery joined', date: '2 days ago' },
    { id: 4, action: 'Member milestone', description: 'Reached 5,000 members', date: '3 days ago' },
    { id: 5, action: 'Payment received', description: 'Monthly commission payment processed', date: '5 days ago' },
  ];

  const tabs = ['overview', 'businesses', 'analytics', 'billing', 'activity'];

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
                <h1 className="text-xl sm:text-2xl truncate">{distributor.name}</h1>
                <p className="text-sm text-muted-foreground">Distribution Partner • {distributorDetails.contactPerson}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto flex-wrap">
              {onPlatformSettings && (
                <Button variant="outline" onClick={onPlatformSettings} className="flex-1 sm:flex-initial">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              )}
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
                    <Package className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalBusinesses}</p>
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
                  <p className="text-xs text-muted-foreground mt-1">Total Members</p>
                  <p className="text-xs text-green-600 mt-1">+{stats.growthRate}% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.activeDeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Deals</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.dealRedemptions} redemptions</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">${stats.monthlyRevenue}</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly Revenue</p>
                  <p className="text-xs text-muted-foreground mt-1">${stats.totalRevenue} total</p>
                </CardContent>
              </Card>
            </div>

            {/* Partner Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Partner Information</CardTitle>
                  <CardDescription>Contact and organization details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Organization</p>
                      <p className="text-sm text-muted-foreground">{distributorDetails.name}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-sm text-muted-foreground">{distributorDetails.contactPerson}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {distributorDetails.address}<br />
                        {distributorDetails.city}, {distributorDetails.state} {distributorDetails.zip}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{distributorDetails.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{distributorDetails.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Website</p>
                      <p className="text-sm text-muted-foreground">{distributorDetails.website}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Details</CardTitle>
                  <CardDescription>White-label and subscription info</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subdomain</span>
                    <span className="text-sm text-muted-foreground">{distributorDetails.subdomain}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Custom Branding</span>
                    <Badge variant={distributorDetails.customBranding ? 'default' : 'secondary'}>
                      {distributorDetails.customBranding ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant={distributor.status === 'Active' ? 'default' : 'secondary'}>
                      {distributor.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member Count</span>
                    <span className="text-sm font-medium">{distributorDetails.memberCount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Joined</span>
                    <span className="text-sm text-muted-foreground">{distributorDetails.subscriptionStartDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Billing</span>
                    <span className="text-sm text-muted-foreground">{distributorDetails.nextBillingDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Organization description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{distributorDetails.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Performing Businesses</CardTitle>
                    <CardDescription>Highest engagement businesses under this distributor</CardDescription>
                  </div>
                  <Badge variant="secondary">{stats.totalBusinesses} Total</Badge>
                </div>
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
                          <p className="text-muted-foreground text-xs">Redemptions</p>
                          <p className="font-medium">{business.redemptions}</p>
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
                        <TableHead>Redemptions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topBusinesses.map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.category}</TableCell>
                          <TableCell>{business.views.toLocaleString()}</TableCell>
                          <TableCell>{business.redemptions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Business Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">{stats.totalBusinesses}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Businesses</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.activeBusinesses}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Businesses</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">{stats.activeDeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Deals</p>
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
                  <p className="text-2xl">{stats.viewsThisMonth.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly Views</p>
                  <Progress value={stats.growthRate} className="mt-2 h-1" />
                  <p className="text-xs text-green-600 mt-2">+{stats.growthRate}% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Members</p>
                  <Progress value={stats.growthRate} className="mt-2 h-1" />
                  <p className="text-xs text-green-600 mt-2">+{stats.growthRate}% growth</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
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
                <CardTitle>Business Growth</CardTitle>
                <CardDescription>Number of businesses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={businessGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="businesses" stroke="#000" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Weekly active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userEngagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#000" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Commission payments and invoices</CardDescription>
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
                        <p>{payment.businesses} businesses</p>
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
                        <TableHead>Businesses</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="font-medium">${payment.amount}</TableCell>
                          <TableCell>{payment.businesses}</TableCell>
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

            {/* Revenue Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                  <CardDescription>Commission earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Revenue</span>
                    <span className="text-sm font-medium">${stats.monthlyRevenue}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="text-sm font-medium">${stats.totalRevenue}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Businesses</span>
                    <span className="text-sm font-medium">{stats.activeBusinesses}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Payment</span>
                    <span className="text-sm text-muted-foreground">{distributorDetails.nextBillingDate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partnership Status</CardTitle>
                  <CardDescription>Current standing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <span className="text-sm text-muted-foreground">{distributorDetails.subscriptionStartDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Method</span>
                    <span className="text-sm text-muted-foreground">ACH Transfer</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Commission Rate</span>
                    <span className="text-sm font-medium">$50 per business/month</span>
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
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">8</p>
                  <p className="text-xs text-muted-foreground mt-1">Businesses Added</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">5</p>
                  <p className="text-xs text-muted-foreground mt-1">Platform Updates</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl">3</p>
                  <p className="text-xs text-muted-foreground mt-1">Payments Received</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 90 days</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
