import { useState } from 'react';
import { Users, Award, DollarSign, TrendingUp, Copy, CheckCircle, Share2, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface DistributionPartnerDashboardProps {
  userName: string;
}

export function DistributionPartnerDashboard({ userName }: DistributionPartnerDashboardProps) {
  const stats = {
    totalReferrals: 45,
    activeBusinesses: 32,
    monthlyCommission: 1250,
    conversionRate: 71,
    lifetimeEarnings: 8450,
    pendingCommission: 425,
  };

  const recentReferrals = [
    { id: 1, business: 'Green Leaf Cafe', owner: 'Sarah Chen', status: 'Active', commission: 50, joinDate: 'Oct 20, 2025', plan: 'Premium' },
    { id: 2, business: 'Peak Fitness', owner: 'Mike Johnson', status: 'Pending', commission: 75, joinDate: 'Oct 18, 2025', plan: 'Featured' },
    { id: 3, business: 'Style Studio', owner: 'Emma Davis', status: 'Active', commission: 50, joinDate: 'Oct 15, 2025', plan: 'Premium' },
    { id: 4, business: 'Tech Repair Hub', owner: 'James Wilson', status: 'Active', commission: 30, joinDate: 'Oct 12, 2025', plan: 'Basic' },
  ];

  const monthlyBreakdown = [
    { month: 'July', referrals: 8, earnings: 420 },
    { month: 'August', referrals: 12, earnings: 680 },
    { month: 'September', referrals: 10, earnings: 550 },
    { month: 'October', referrals: 15, earnings: 825 },
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://preferreddeals.com/signup?ref=DIST12345');
    toast.success('Referral link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Distribution Partner Dashboard</h1>
        <p className="text-muted-foreground">Track your referrals and earnings, {userName}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
            <p className="text-3xl">{stats.totalReferrals}</p>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-gray-700" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Active Businesses</p>
            <p className="text-3xl">{stats.activeBusinesses}</p>
            <p className="text-xs text-muted-foreground mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">This Month</p>
            <p className="text-3xl">${stats.monthlyCommission.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Commission earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-gray-700" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
            <p className="text-3xl">{stats.conversionRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Referrals to active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Referral Link Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>Share this link with potential business partners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://preferreddeals.com/signup?ref=DIST12345"
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
                />
                <Button onClick={copyReferralLink}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on Social Media
                </Button>
                <Button variant="outline" className="flex-1">
                  <Gift className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
                <CardDescription>Your commission breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to next payout</span>
                    <span>${stats.monthlyCommission} / $2,000</span>
                  </div>
                  <Progress value={62.5} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
                    <p className="text-2xl">${stats.lifetimeEarnings.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Pending</p>
                    <p className="text-2xl">${stats.pendingCommission}</p>
                  </div>
                </div>
                <Button className="w-full">Request Payout</Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Referrals</CardTitle>
                <CardDescription>Your latest business referrals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReferrals.slice(0, 4).map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">{referral.business}</p>
                        <p className="text-xs text-muted-foreground">{referral.joinDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                        <span className="text-sm">${referral.commission}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle>💡 Maximize Your Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Focus on businesses that would benefit from premium features for higher commissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Follow up with pending referrals to improve conversion rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Share success stories from your active referrals to build trust</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>All Referrals</CardTitle>
              <CardDescription>Complete list of your business referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReferrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>{referral.business}</TableCell>
                      <TableCell>{referral.owner}</TableCell>
                      <TableCell>
                        <Badge variant={referral.plan === 'Featured' ? 'default' : 'secondary'}>
                          {referral.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{referral.joinDate}</TableCell>
                      <TableCell>${referral.commission}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Monthly earnings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead>Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyBreakdown.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell>{month.month}</TableCell>
                        <TableCell>{month.referrals}</TableCell>
                        <TableCell>${month.earnings.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commission Structure</CardTitle>
                <CardDescription>Earn more with premium referrals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Basic Plan</span>
                      <Badge variant="secondary">$30/referral</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Standard business listing</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Premium Plan</span>
                      <Badge variant="default">$50/referral</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Enhanced visibility and features</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span>Featured Plan</span>
                      <Badge className="bg-black text-white">$75/referral</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Top placement and maximum exposure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Materials</CardTitle>
                <CardDescription>Download resources to help promote</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Download Logo Pack
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Brochures
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Social Media Graphics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Email Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support & Training</CardTitle>
                <CardDescription>Resources to help you succeed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Partner Training Videos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Best Practices Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  FAQs & Knowledge Base
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
