import { useState } from 'react';
import { Store, Plus, Eye, Edit, TrendingUp, Phone, Mail, MapPin, Clock, Star, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PartnerDashboardProps {
  userName: string;
  onNavigate: (page: string) => void;
}

export function PartnerDashboard({ userName, onNavigate }: PartnerDashboardProps) {
  const myBusinesses = [
    { 
      id: '1', 
      name: 'Fresh Bistro Downtown', 
      category: 'Restaurant', 
      status: 'Active',
      plan: 'Premium',
      views: 1234,
      clicks: 342,
      deals: 3,
      rating: 4.8
    },
    { 
      id: '2', 
      name: 'Fresh Bistro Uptown', 
      category: 'Restaurant', 
      status: 'Active',
      plan: 'Basic',
      views: 856,
      clicks: 189,
      deals: 2,
      rating: 4.6
    },
  ];

  const viewsData = [
    { date: 'Mon', views: 145 },
    { date: 'Tue', views: 168 },
    { date: 'Wed', views: 192 },
    { date: 'Thu', views: 176 },
    { date: 'Fri', views: 234 },
    { date: 'Sat', views: 312 },
    { date: 'Sun', views: 287 },
  ];

  const clicksData = [
    { date: 'Mon', clicks: 32 },
    { date: 'Tue', clicks: 41 },
    { date: 'Wed', clicks: 38 },
    { date: 'Thu', clicks: 45 },
    { date: 'Fri', clicks: 62 },
    { date: 'Sat', clicks: 78 },
    { date: 'Sun', clicks: 65 },
  ];

  const totalStats = myBusinesses.reduce((acc, business) => ({
    views: acc.views + business.views,
    clicks: acc.clicks + business.clicks,
    deals: acc.deals + business.deals,
  }), { views: 0, clicks: 0, deals: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mb-2">My Business Listings</h1>
          <p className="text-muted-foreground">Manage your business presence and track performance</p>
        </div>
        <Button onClick={() => onNavigate('become-partner')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Business
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Store className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Businesses</p>
            <p className="text-3xl">{myBusinesses.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Views</p>
            <p className="text-3xl">{totalStats.views.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
            <p className="text-3xl">{totalStats.clicks}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Active Deals</p>
            <p className="text-3xl">{totalStats.deals}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-6">
          <div className="grid gap-6">
            {myBusinesses.map((business) => (
              <Card key={business.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{business.name}</CardTitle>
                        <Badge variant={business.plan === 'Premium' ? 'default' : 'secondary'}>
                          {business.plan}
                        </Badge>
                        <Badge variant="outline">{business.status}</Badge>
                      </div>
                      <CardDescription>{business.category}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="text-lg">{business.views.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Clicks</p>
                        <p className="text-lg">{business.clicks}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active Deals</p>
                        <p className="text-lg">{business.deals}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="text-lg">{business.rating}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Plus className="w-6 h-6" />
                  Create New Deal
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Edit className="w-6 h-6" />
                  Update Hours
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Total profile views for the past week</CardDescription>
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
                <CardDescription>Contact clicks for the past week</CardDescription>
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

          {/* Performance by Listing */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Listing</CardTitle>
              <CardDescription>Compare your business listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell>{business.name}</TableCell>
                      <TableCell>{business.views.toLocaleString()}</TableCell>
                      <TableCell>{business.clicks}</TableCell>
                      <TableCell>{((business.clicks / business.views) * 100).toFixed(1)}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
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
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Deals</CardTitle>
                  <CardDescription>Create and manage your promotional offers</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Deal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active deals. Create your first deal to attract more customers!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
