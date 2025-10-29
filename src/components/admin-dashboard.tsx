import { useState } from 'react';
import { Package, Users, DollarSign, BarChart3, Settings, TrendingUp, AlertCircle, CheckCircle, Clock, Search, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface AdminDashboardProps {
  userName: string;
}

export function AdminDashboard({ userName }: AdminDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [searchTerm, setSearchTerm] = useState('');

  const platformStats = {
    totalBusinesses: 5247,
    totalUsers: 52431,
    monthlyRevenue: 45280,
    activeDeals: 1823,
    pendingApprovals: 28,
    activeDistributors: 156,
  };

  const recentBusinesses = [
    { id: 1, name: 'Urban Cuts Barbershop', owner: 'John Smith', category: 'Services', status: 'Active', joined: 'Oct 20, 2025', plan: 'Premium' },
    { id: 2, name: 'Fresh Market Grocery', owner: 'Maria Garcia', category: 'Retail', status: 'Pending', joined: 'Oct 19, 2025', plan: 'Basic' },
    { id: 3, name: 'Wellness Spa & Retreat', owner: 'Sarah Johnson', category: 'Health', status: 'Active', joined: 'Oct 18, 2025', plan: 'Featured' },
    { id: 4, name: 'Tech Repair Pro', owner: 'Mike Chen', category: 'Services', status: 'Active', joined: 'Oct 17, 2025', plan: 'Premium' },
  ];

  const recentUsers = [
    { id: 1, name: 'Alex Thompson', email: 'alex@email.com', joined: 'Oct 20, 2025', savedDeals: 12, status: 'Active' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', joined: 'Oct 19, 2025', savedDeals: 5, status: 'Active' },
    { id: 3, name: 'David Brown', email: 'david@email.com', joined: 'Oct 18, 2025', savedDeals: 8, status: 'Active' },
    { id: 4, name: 'Sophie Martinez', email: 'sophie@email.com', joined: 'Oct 17, 2025', savedDeals: 15, status: 'Active' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Business', name: 'Fresh Market Grocery', requestedBy: 'Maria Garcia', date: 'Oct 19, 2025' },
    { id: 2, type: 'Distributor', name: 'Community Connect LLC', requestedBy: 'James Wilson', date: 'Oct 18, 2025' },
    { id: 3, type: 'Deal', name: '50% off Weekend Special', business: 'Pasta Paradise', date: 'Oct 18, 2025' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Platform Settings
        </Button>
      </div>

      {/* Alert for pending approvals */}
      {platformStats.pendingApprovals > 0 && (
        <Card className="mb-6 border-orange-300 bg-orange-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span className="text-sm">{platformStats.pendingApprovals} items require your attention</span>
            </div>
            <Button variant="outline" size="sm">Review Now</Button>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="distributors">Distributors</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-8 h-8 text-gray-900" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total Businesses</p>
                <p className="text-3xl">{platformStats.totalBusinesses.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">+12% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-gray-700" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">+8% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-gray-900" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
                <p className="text-3xl">${platformStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">+15% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-700" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Active Deals</p>
                <p className="text-3xl">{platformStats.activeDeals.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">+5% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-700" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Active Distributors</p>
                <p className="text-3xl">{platformStats.activeDistributors}</p>
                <p className="text-sm text-muted-foreground mt-2">+18% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Pending Approvals</p>
                <p className="text-3xl">{platformStats.pendingApprovals}</p>
                <Button size="sm" className="mt-2 w-full" variant="outline">Review</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Businesses</CardTitle>
                <CardDescription>Latest business registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBusinesses.slice(0, 4).map((business) => (
                    <div key={business.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">{business.name}</p>
                        <p className="text-xs text-muted-foreground">{business.owner}</p>
                      </div>
                      <Badge variant={business.status === 'Active' ? 'default' : 'secondary'}>
                        {business.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.type} - {item.date}</p>
                      </div>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="businesses">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Business Management</CardTitle>
                  <CardDescription>Manage all business listings</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input placeholder="Search businesses..." className="w-full sm:w-64" />
                  <Button variant="outline" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell>{business.name}</TableCell>
                      <TableCell>{business.owner}</TableCell>
                      <TableCell>{business.category}</TableCell>
                      <TableCell>
                        <Badge variant={business.plan === 'Featured' ? 'default' : 'secondary'}>
                          {business.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={business.status === 'Active' ? 'default' : 'secondary'}>
                          {business.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{business.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage platform users</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input placeholder="Search users..." className="w-full sm:w-64" />
                  <Button variant="outline" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Saved Deals</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>{user.savedDeals}</TableCell>
                      <TableCell>
                        <Badge variant="default">{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distributors">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Partners</CardTitle>
              <CardDescription>Manage distribution partner accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Distribution partner management interface...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Review and approve pending items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge>{item.type}</Badge>
                        <p>{item.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Requested by {item.requestedBy || item.business} on {item.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
