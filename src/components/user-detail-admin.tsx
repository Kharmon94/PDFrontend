import { useState } from 'react';
import { ArrowLeft, User, Mail, Calendar, Heart, Eye, MapPin, Edit, Trash2, CheckCircle, Clock, Tag, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface UserDetailAdminProps {
  user: any;
  onBack: () => void;
  onEdit: () => void;
  onSuspend: () => void;
}

export function UserDetailAdmin({ user, onBack, onEdit, onSuspend }: UserDetailAdminProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock detailed user data
  const userDetails = {
    ...user,
    phone: '(555) 789-0123',
    address: '456 User Street, Apt 3B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    lastLogin: 'Nov 9, 2025 at 2:30 PM',
    accountCreated: user.joined,
    accountType: 'Standard',
    emailVerified: true,
    phoneVerified: false,
    twoFactorEnabled: false,
    preferredCategories: ['Dining', 'Services', 'Health'],
    deviceInfo: 'iPhone 15 Pro - iOS 17.1',
    referralCode: 'USR' + user.id + 'REF',
    referredUsers: 3,
  };

  // Analytics data
  const stats = {
    savedDeals: user.savedDeals,
    redeemedDeals: Math.floor(user.savedDeals * 0.65),
    totalViews: Math.floor(user.savedDeals * 12.5),
    favoriteBusinesses: 8,
    averageSessionTime: '8m 32s',
    totalSessions: 47,
    engagementScore: 72,
    lifetimeValue: Math.floor(user.savedDeals * 3.2),
  };

  // Activity charts data
  const activityData = [
    { name: 'Mon', views: 8, saves: 2 },
    { name: 'Tue', views: 12, saves: 3 },
    { name: 'Wed', views: 6, saves: 1 },
    { name: 'Thu', views: 15, saves: 4 },
    { name: 'Fri', views: 18, saves: 5 },
    { name: 'Sat', views: 22, saves: 6 },
    { name: 'Sun', views: 14, saves: 3 },
  ];

  const engagementTrendData = [
    { name: 'Week 1', engagement: 45 },
    { name: 'Week 2', engagement: 52 },
    { name: 'Week 3', engagement: 48 },
    { name: 'Week 4', engagement: 58 },
    { name: 'Week 5', engagement: 65 },
    { name: 'Week 6', engagement: 72 },
  ];

  // Saved deals
  const savedDeals = [
    { 
      id: 1, 
      business: 'Urban Cuts Barbershop', 
      deal: '20% Off All Services',
      category: 'Services',
      savedDate: 'Nov 8, 2025',
      redeemed: true,
      redemptionDate: 'Nov 9, 2025'
    },
    { 
      id: 2, 
      business: 'Fresh Market Grocery', 
      deal: 'Buy One Get One Free',
      category: 'Retail',
      savedDate: 'Nov 7, 2025',
      redeemed: false,
      redemptionDate: null
    },
    { 
      id: 3, 
      business: 'Wellness Spa & Retreat', 
      deal: '30% Off First Visit',
      category: 'Health',
      savedDate: 'Nov 6, 2025',
      redeemed: true,
      redemptionDate: 'Nov 7, 2025'
    },
    { 
      id: 4, 
      business: 'Pasta Paradise', 
      deal: 'Free Dessert with Entree',
      category: 'Dining',
      savedDate: 'Nov 5, 2025',
      redeemed: true,
      redemptionDate: 'Nov 5, 2025'
    },
  ];

  // Favorite businesses
  const favoriteBusinesses = [
    { id: 1, name: 'Urban Cuts Barbershop', category: 'Services', visits: 5 },
    { id: 2, name: 'Pasta Paradise', category: 'Dining', visits: 4 },
    { id: 3, name: 'Wellness Spa & Retreat', category: 'Health', visits: 3 },
    { id: 4, name: 'Fresh Market Grocery', category: 'Retail', visits: 7 },
    { id: 5, name: 'Tech Repair Pro', category: 'Services', visits: 2 },
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Deal redeemed', description: 'Redeemed "20% Off" at Urban Cuts', date: '2 hours ago' },
    { id: 2, action: 'Deal saved', description: 'Saved "Buy One Get One" at Fresh Market', date: '1 day ago' },
    { id: 3, action: 'Business viewed', description: 'Viewed Wellness Spa & Retreat', date: '1 day ago' },
    { id: 4, action: 'Deal redeemed', description: 'Redeemed "30% Off" at Wellness Spa', date: '2 days ago' },
    { id: 5, action: 'Login', description: 'Logged in from iPhone 15 Pro', date: '2 days ago' },
    { id: 6, action: 'Deal saved', description: 'Saved "Free Dessert" at Pasta Paradise', date: '4 days ago' },
    { id: 7, action: 'Deal redeemed', description: 'Redeemed "Free Dessert" at Pasta Paradise', date: '4 days ago' },
  ];

  const tabs = ['overview', 'deals', 'activity', 'security'];

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
                <h1 className="text-xl sm:text-2xl truncate">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.email} • Joined {user.joined}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={onEdit} className="flex-1 sm:flex-initial">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={onSuspend} className="flex-1 sm:flex-initial text-destructive hover:text-destructive">
                <Shield className="w-4 h-4 mr-2" />
                Suspend
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

          <TabsList className="hidden sm:grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.savedDeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Saved Deals</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.redeemedDeals} redeemed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.totalViews}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Views</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.totalSessions} sessions</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Tag className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.favoriteBusinesses}</p>
                  <p className="text-xs text-muted-foreground mt-1">Favorite Businesses</p>
                  <p className="text-xs text-muted-foreground mt-1">Most visited</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-2xl">{stats.engagementScore}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Engagement Score</p>
                  <p className="text-xs text-green-600 mt-1">Above average</p>
                </CardContent>
              </Card>
            </div>

            {/* User Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Personal and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-muted-foreground">{userDetails.name}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{userDetails.email}</p>
                        {userDetails.emailVerified && (
                          <Badge variant="default" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {userDetails.city}, {userDetails.state} {userDetails.zip}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">{userDetails.accountCreated}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Last Login</p>
                      <p className="text-sm text-muted-foreground">{userDetails.lastLogin}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Metrics</CardTitle>
                  <CardDescription>Activity and engagement statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Engagement Score</span>
                      <span className="text-sm font-medium text-green-600">{stats.engagementScore}%</span>
                    </div>
                    <Progress value={stats.engagementScore} className="h-2" />
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Deal Redemption Rate</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Sessions</span>
                    <span className="text-sm font-medium">{stats.totalSessions}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Session Time</span>
                    <span className="text-sm font-medium">{stats.averageSessionTime}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lifetime Value</span>
                    <span className="text-sm font-medium">${stats.lifetimeValue}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Referral Code</span>
                    <span className="text-sm text-muted-foreground">{userDetails.referralCode}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Referred Users</span>
                    <span className="text-sm font-medium">{userDetails.referredUsers}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preferences and Favorites */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Categories</CardTitle>
                  <CardDescription>Interests and category preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.preferredCategories.map((category: string, index: number) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Information</CardTitle>
                  <CardDescription>Last used device</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{userDetails.deviceInfo}</p>
                </CardContent>
              </Card>
            </div>

            {/* Activity Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trend</CardTitle>
                <CardDescription>Weekly engagement score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="engagement" stroke="#000" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-6">
            {/* Saved Deals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Deals</CardTitle>
                    <CardDescription>User's saved and redeemed deals</CardDescription>
                  </div>
                  <Badge variant="secondary">{stats.savedDeals} Total</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  {savedDeals.map((deal) => (
                    <div key={deal.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{deal.deal}</p>
                          <p className="text-xs text-muted-foreground">{deal.business}</p>
                          <Badge variant="outline" className="text-xs mt-1">{deal.category}</Badge>
                        </div>
                        <Badge variant={deal.redeemed ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                          {deal.redeemed ? 'Redeemed' : 'Saved'}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Saved: {deal.savedDate}</p>
                        {deal.redeemed && <p>Redeemed: {deal.redemptionDate}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deal</TableHead>
                        <TableHead>Business</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Saved Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {savedDeals.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell className="font-medium">{deal.deal}</TableCell>
                          <TableCell>{deal.business}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">{deal.category}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{deal.savedDate}</TableCell>
                          <TableCell>
                            <Badge variant={deal.redeemed ? 'default' : 'secondary'} className="text-xs">
                              {deal.redeemed ? 'Redeemed' : 'Saved'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Businesses */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite Businesses</CardTitle>
                <CardDescription>Most frequently visited businesses</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  {favoriteBusinesses.map((business) => (
                    <div key={business.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{business.name}</p>
                          <p className="text-xs text-muted-foreground">{business.category}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-medium">{business.visits}</p>
                          <p className="text-xs text-muted-foreground">visits</p>
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
                        <TableHead>Total Visits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {favoriteBusinesses.map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.category}</TableCell>
                          <TableCell>{business.visits}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Deal Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">{stats.savedDeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Saved</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl">{stats.redeemedDeals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Redeemed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Tag className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">{stats.favoriteBusinesses}</p>
                  <p className="text-xs text-muted-foreground mt-1">Favorite Businesses</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            {/* Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Views and saves over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#6b7280" name="Views" />
                      <Bar dataKey="saves" fill="#000" name="Saves" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded" />
                    <span className="text-xs text-muted-foreground">Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded" />
                    <span className="text-xs text-muted-foreground">Saves</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and interactions</CardDescription>
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
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl">95</p>
                  <p className="text-xs text-muted-foreground mt-1">Business Views</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl">24</p>
                  <p className="text-xs text-muted-foreground mt-1">Deals Saved</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl">8</p>
                  <p className="text-xs text-muted-foreground mt-1">Deals Redeemed</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Security settings and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Email Verification</p>
                      <p className="text-xs text-muted-foreground">{userDetails.email}</p>
                    </div>
                  </div>
                  <Badge variant={userDetails.emailVerified ? 'default' : 'secondary'}>
                    {userDetails.emailVerified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Additional security layer</p>
                    </div>
                  </div>
                  <Badge variant={userDetails.twoFactorEnabled ? 'default' : 'secondary'}>
                    {userDetails.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Last Login</p>
                      <p className="text-xs text-muted-foreground">{userDetails.lastLogin}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Account Type</p>
                      <p className="text-xs text-muted-foreground">{userDetails.accountType}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{userDetails.accountType}</Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Account Status</p>
                      <p className="text-xs text-muted-foreground">Current account state</p>
                    </div>
                  </div>
                  <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Security Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Security Actions</CardTitle>
                <CardDescription>Administrative security controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Password Reset Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Force Logout from All Devices
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Shield className="w-4 h-4 mr-2" />
                  Suspend Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
