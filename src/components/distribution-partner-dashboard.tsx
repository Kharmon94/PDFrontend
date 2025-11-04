import { WhiteLabelPlatform } from './white-label-platform-new';
import { useState } from 'react';
import { Users, Award, DollarSign, TrendingUp, Copy, CheckCircle, Share2, Gift, Globe, ArrowRight, MapPin, Package, BarChart3, Eye, Search, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

interface DistributionPartnerDashboardProps {
  userName: string;
}

export function DistributionPartnerDashboard({ userName }: DistributionPartnerDashboardProps) {
  const [showWhiteLabel, setShowWhiteLabel] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<typeof partnerLocations[0] | null>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const stats = {
    totalReferrals: 45,
    activeBusinesses: 32,
    monthlyCommission: 1250,
    conversionRate: 71,
    lifetimeEarnings: 8450,
    pendingCommission: 425,
  };

  const partnerLocations = [
    {
      id: 1,
      city: 'New York',
      state: 'NY',
      businesses: 18,
      activeDeals: 42,
      monthlyGrowth: 12.5,
      totalRevenue: 450,
      status: 'Active',
    },
    {
      id: 2,
      city: 'Brooklyn',
      state: 'NY',
      businesses: 10,
      activeDeals: 25,
      monthlyGrowth: 8.3,
      totalRevenue: 280,
      status: 'Active',
    },
    {
      id: 3,
      city: 'Queens',
      state: 'NY',
      businesses: 4,
      activeDeals: 9,
      monthlyGrowth: 15.2,
      totalRevenue: 120,
      status: 'Active',
    },
  ];

  if (showWhiteLabel) {
    return <WhiteLabelPlatform onBack={() => setShowWhiteLabel(false)} partnerName={userName} />;
  }

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

  const copyReferralLink = async () => {
    const referralLink = 'https://preferreddeals.com/signup?ref=DIST12345';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referralLink);
        toast.success('Referral link copied to clipboard!');
      } else {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success('Referral link copied to clipboard!');
        } catch (err) {
          toast.error('Failed to copy referral link');
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      toast.error('Failed to copy referral link');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2">Distribution Partner Dashboard</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Track your referrals and earnings, {userName}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Referrals</p>
            <p className="text-2xl sm:text-3xl">{stats.totalReferrals}</p>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Active Businesses</p>
            <p className="text-2xl sm:text-3xl">{stats.activeBusinesses}</p>
            <p className="text-xs text-muted-foreground mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">This Month</p>
            <p className="text-2xl sm:text-3xl">${stats.monthlyCommission.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Commission earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Conversion Rate</p>
            <p className="text-2xl sm:text-3xl">{stats.conversionRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Referrals to active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        {/* Slider Navigation */}
        <div className="space-y-3 sm:space-y-4">
          {/* Tab Name with Arrows */}
          <div className="relative text-center">
            <h2 className="text-xl sm:text-2xl capitalize">{activeTab}</h2>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const tabs = ['overview', 'referrals', 'locations', 'earnings'];
                const currentIndex = tabs.indexOf(activeTab);
                const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
                setActiveTab(tabs[prevIndex]);
              }}
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 size-8 sm:size-10 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-900 flex items-center justify-center shadow-sm transition-all"
              aria-label="Previous section"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={() => {
                const tabs = ['overview', 'referrals', 'locations', 'earnings'];
                const currentIndex = tabs.indexOf(activeTab);
                const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
                setActiveTab(tabs[nextIndex]);
              }}
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 size-8 sm:size-10 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-900 flex items-center justify-center shadow-sm transition-all"
              aria-label="Next section"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Carousel Indicators (Dots) */}
          <div className="flex justify-center gap-2">
            {['overview', 'referrals', 'locations', 'earnings'].map((tab) => (
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
        </div>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          {/* White-Label Platform Card */}
          <Card className="border-2 border-gray-900 bg-gradient-to-br from-gray-50 to-white">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 sm:p-3 bg-gray-900 rounded-lg flex-shrink-0">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg">Your White-Label Platform</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Manage your community directory with your own branding</CardDescription>
                  </div>
                </div>
                <Badge className="bg-gray-900 self-start sm:self-auto text-xs">Premium</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-white rounded-lg border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Your Platform URL</p>
                  <p className="text-xs sm:text-sm font-medium break-all">community-connect.preferreddeals.com</p>
                </div>
                <div className="p-3 sm:p-4 bg-white rounded-lg border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Pending Approvals</p>
                  <p className="text-xl sm:text-2xl">5</p>
                </div>
                <div className="p-3 sm:p-4 bg-white rounded-lg border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Businesses</p>
                  <p className="text-xl sm:text-2xl">42</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => setShowWhiteLabel(true)}>
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm">Manage Platform</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="text-sm">Share Platform Link</span>
                </Button>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm">
                  <span className="font-medium">New!</span> Manage business approvals, customize branding, and set up your custom domain all in one place.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Referral Link Card */}
          <Card className="border-2">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Your Referral Link</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Share this link with potential business partners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value="https://preferreddeals.com/signup?ref=DIST12345"
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-xs sm:text-sm"
                />
                <Button onClick={copyReferralLink} className="sm:flex-shrink-0">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1 text-xs sm:text-sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on Social Media
                </Button>
                <Button variant="outline" className="flex-1 text-xs sm:text-sm">
                  <Gift className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Earnings Summary */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Earnings Summary</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your commission breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Progress to next payout</span>
                    <span>${stats.monthlyCommission} / $2,000</span>
                  </div>
                  <Progress value={62.5} />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Earned</p>
                    <p className="text-xl sm:text-2xl">${stats.lifetimeEarnings.toLocaleString()}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Pending</p>
                    <p className="text-xl sm:text-2xl">${stats.pendingCommission}</p>
                  </div>
                </div>
                <Button className="w-full text-sm">Request Payout</Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Recent Referrals</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your latest business referrals</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  {recentReferrals.slice(0, 4).map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm truncate">{referral.business}</p>
                        <p className="text-xs text-muted-foreground">{referral.joinDate}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                          {referral.status}
                        </Badge>
                        <span className="text-xs sm:text-sm">${referral.commission}</span>
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
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">All Referrals</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Complete list of your business referrals</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{referral.business}</p>
                        <p className="text-xs text-muted-foreground">{referral.owner}</p>
                      </div>
                      <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'} className="text-xs flex-shrink-0">
                        {referral.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant={referral.plan === 'Featured' ? 'default' : 'secondary'} className="text-xs">
                          {referral.plan}
                        </Badge>
                        <span className="text-muted-foreground">{referral.joinDate}</span>
                      </div>
                      <span className="font-medium">${referral.commission}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Business Name</TableHead>
                      <TableHead className="text-xs sm:text-sm">Owner</TableHead>
                      <TableHead className="text-xs sm:text-sm">Plan</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      <TableHead className="text-xs sm:text-sm">Join Date</TableHead>
                      <TableHead className="text-xs sm:text-sm">Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="text-xs sm:text-sm">{referral.business}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{referral.owner}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant={referral.plan === 'Featured' ? 'default' : 'secondary'} className="text-xs">
                            {referral.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                            {referral.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{referral.joinDate}</TableCell>
                        <TableCell className="text-xs sm:text-sm">${referral.commission}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg">Location Performance</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Track business activity by city</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    className="px-3 py-2 border rounded-md text-sm w-full sm:w-64"
                  />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {/* Location Stats Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <Card className="border-2">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Cities</p>
                        <p className="text-xl sm:text-2xl">{partnerLocations.length}</p>
                      </div>
                      <Map className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Businesses</p>
                        <p className="text-xl sm:text-2xl">{partnerLocations.reduce((sum, loc) => sum + loc.businesses, 0)}</p>
                      </div>
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Active Deals</p>
                        <p className="text-xl sm:text-2xl">{partnerLocations.reduce((sum, loc) => sum + loc.activeDeals, 0)}</p>
                      </div>
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                        <p className="text-xl sm:text-2xl">${partnerLocations.reduce((sum, loc) => sum + loc.totalRevenue, 0)}</p>
                      </div>
                      <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Locations Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partnerLocations.map((location) => (
                  <Card key={location.id} className="border-2 hover:border-gray-900 transition-colors cursor-pointer" onClick={() => {
                    setSelectedLocation(location);
                    setLocationDialogOpen(true);
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-gray-700" />
                          <div>
                            <h3 className="font-semibold">{location.city}</h3>
                            <p className="text-xs text-muted-foreground">{location.state}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="text-xs">{location.status}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Businesses</span>
                          <span className="font-medium">{location.businesses}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Deals</span>
                          <span className="font-medium">{location.activeDeals}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Growth</span>
                          <span className="font-medium text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {location.monthlyGrowth}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-medium">${location.totalRevenue}</span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                        <Eye className="w-3 h-3 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Earnings History</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Monthly earnings breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Month</TableHead>
                      <TableHead className="text-xs sm:text-sm">Referrals</TableHead>
                      <TableHead className="text-xs sm:text-sm">Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyBreakdown.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="text-xs sm:text-sm">{month.month}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{month.referrals}</TableCell>
                        <TableCell className="text-xs sm:text-sm">${month.earnings.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Commission Structure</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Earn more with premium referrals</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm sm:text-base">Basic Plan</span>
                      <Badge variant="secondary" className="text-xs">$30/referral</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Standard business listing</p>
                  </div>
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm sm:text-base">Premium Plan</span>
                      <Badge variant="default" className="text-xs">$50/referral</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Enhanced visibility and features</p>
                  </div>
                  <div className="p-3 sm:p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm sm:text-base">Featured Plan</span>
                      <Badge className="bg-black text-white text-xs">$75/referral</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Top placement and maximum exposure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Location Details Dialog */}
      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
            <DialogDescription>
              Detailed statistics and performance for this location
            </DialogDescription>
          </DialogHeader>

          {selectedLocation && (
            <div className="space-y-6">
              {/* Location Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedLocation.city}</h3>
                    <p className="text-sm text-muted-foreground">{selectedLocation.state}</p>
                  </div>
                </div>
                <Badge variant="default">{selectedLocation.status}</Badge>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Businesses</p>
                        <p className="text-2xl font-semibold">{selectedLocation.businesses}</p>
                      </div>
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Deals</p>
                        <p className="text-2xl font-semibold">{selectedLocation.activeDeals}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-2xl font-semibold">${selectedLocation.totalRevenue}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Growth</p>
                        <p className="text-2xl font-semibold text-green-600">+{selectedLocation.monthlyGrowth}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="p-4 bg-muted rounded-lg">
                <h5 className="font-semibold mb-3">Performance Metrics</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deals per Business</span>
                    <span className="font-medium">
                      {(selectedLocation.activeDeals / selectedLocation.businesses).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue per Business</span>
                    <span className="font-medium">
                      ${(selectedLocation.totalRevenue / selectedLocation.businesses).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Growth Rate</span>
                    <span className="font-medium text-green-600">+{selectedLocation.monthlyGrowth}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setLocationDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}