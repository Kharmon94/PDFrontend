import { useState, useEffect } from 'react';
import { Users, Award, DollarSign, TrendingUp, Copy, CheckCircle, Share2, Gift, Globe, ArrowRight, MapPin, Package, BarChart3, Eye, Search, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { apiService } from '../services/api';
import { Business } from '../types';

interface DistributionPartnerDashboardProps {
  userName: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

interface LocationData {
  id: number;
  city: string;
  state: string;
  businesses: number;
  activeDeals: number;
  monthlyGrowth: number;
  totalRevenue: number;
  status: 'Active' | 'Inactive';
}

interface ReferralData {
  id: string | number;
  business: string;
  owner: string;
  status: 'Active' | 'Pending' | 'Rejected';
  commission: number;
  joinDate: string;
  plan: 'Basic' | 'Premium' | 'Featured';
}

export function DistributionPartnerDashboard({ userName, onNavigate, onLogout }: DistributionPartnerDashboardProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for API data
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeBusinesses: 0,
    conversionRate: 0,
    totalViews: 0,
    totalClicks: 0,
    featuredBusinesses: 0,
    activeDeals: 0,
  });
  
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [whiteLabel, setWhiteLabel] = useState<any>(null);
  const [partnerLocations, setPartnerLocations] = useState<LocationData[]>([]);
  const [recentReferrals, setRecentReferrals] = useState<ReferralData[]>([]);
  const [monthlyBreakdown, setMonthlyBreakdown] = useState<Array<{ month: string; referrals: number; earnings: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Helper function to parse address and extract city/state (same as admin dashboard)
  const parseAddress = (address: string): { city: string; state: string } | null => {
    if (!address) return null;
    const parts = address.split(',').map(p => p.trim());
    
    if (parts.length >= 2) {
      const lastPart = parts[parts.length - 1].trim();
      const secondLastPart = parts[parts.length - 2].trim();
      
      // Check if last part looks like "State ZIP" (e.g., "NY 12345")
      const stateWithZipMatch = lastPart.match(/^([A-Z]{2})\s+(\d{5})$/i);
      if (stateWithZipMatch) {
        return {
          city: secondLastPart || 'Unknown',
          state: stateWithZipMatch[1].toUpperCase()
        };
      }
      
      // Check if last part is just a state abbreviation (2 letters)
      const stateAbbrMatch = lastPart.match(/^([A-Z]{2})$/i);
      if (stateAbbrMatch) {
        return {
          city: secondLastPart || 'Unknown',
          state: stateAbbrMatch[1].toUpperCase()
        };
      }
      
      // Try to extract state from last part that might have ZIP at the end
      const stateAtEndMatch = lastPart.match(/([A-Z]{2})(?:\s+\d{5})?$/i);
      if (stateAtEndMatch && parts.length >= 2) {
        return {
          city: secondLastPart || 'Unknown',
          state: stateAtEndMatch[1].toUpperCase()
        };
      }
      
      // Try full state name
      const stateNames = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 
        'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
      
      if (stateNames.some(state => lastPart.toLowerCase().includes(state.toLowerCase()))) {
        return {
          city: secondLastPart || 'Unknown',
          state: lastPart
        };
      }
      
      // Fallback: use last two parts as city and state
      return {
        city: secondLastPart || parts[0] || 'Unknown',
        state: lastPart || 'Unknown'
      };
    }
    
    return null;
  };
  
  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch dashboard stats
        const dashboardStats = await apiService.getDistributionDashboard();
        
        // Fetch businesses
        const businessesData = await apiService.getDistributionBusinesses();
        setBusinesses(Array.isArray(businessesData) ? businessesData : []);
        
        // Fetch white label
        try {
          const whiteLabelData = await apiService.getWhiteLabel();
          setWhiteLabel(whiteLabelData);
        } catch (error) {
          console.error('Failed to load white label:', error);
        }
        
        // Calculate stats from businesses
        const totalBusinesses = Array.isArray(businessesData) ? businessesData.length : 0;
        const activeBusinesses = businessesData.filter((b: Business) => (b.approval_status || 'approved') === 'approved').length;
        const pendingBusinesses = businessesData.filter((b: Business) => b.approval_status === 'pending').length;
        const activeDeals = businessesData.filter((b: Business) => b.has_deals || b.hasDeals || false).length;
        const conversionRate = totalBusinesses > 0 ? Math.round((activeBusinesses / totalBusinesses) * 100) : 0;
        
        setStats({
          totalReferrals: totalBusinesses,
          activeBusinesses: activeBusinesses,
          conversionRate: conversionRate,
          totalViews: dashboardStats.total_views || 0,
          totalClicks: dashboardStats.total_clicks || 0,
          featuredBusinesses: dashboardStats.featured_businesses || 0,
          activeDeals: dashboardStats.active_deals || 0,
        });
        
        // Transform businesses into referrals
        const referrals: ReferralData[] = businessesData.map((business: Business) => {
          const plan = business.featured ? 'Featured' : (business.has_deals || business.hasDeals ? 'Premium' : 'Basic');
          const status = (business.approval_status || 'approved') === 'approved' ? 'Active' : 
                        business.approval_status === 'pending' ? 'Pending' : 'Rejected';
          
          return {
            id: business.id,
            business: business.name,
            owner: business.user?.name || 'Unknown',
            status: status as 'Active' | 'Pending' | 'Rejected',
            commission: 0, // No commission tracking in backend yet
            joinDate: new Date(business.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            plan: plan as 'Basic' | 'Premium' | 'Featured',
          };
        });
        setRecentReferrals(referrals.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()));
        
        // Calculate locations from businesses
        const locationMap: Record<string, { city: string; state: string; businesses: Business[] }> = {};
        businessesData.forEach((business: Business) => {
          const parsed = parseAddress(business.address || '');
          if (!parsed) return;
          
          const key = `${parsed.city}, ${parsed.state}`;
          if (!locationMap[key]) {
            locationMap[key] = {
              city: parsed.city,
              state: parsed.state,
              businesses: []
            };
          }
          locationMap[key].businesses.push(business);
        });
        
        const locations: LocationData[] = Object.entries(locationMap).map(([key, data], index) => {
          const locationBusinesses = data.businesses;
          const businessesWithDeals = locationBusinesses.filter(b => b.has_deals || b.hasDeals);
          
          return {
            id: index + 1,
            city: data.city,
            state: data.state,
            businesses: locationBusinesses.length,
            activeDeals: businessesWithDeals.length,
            monthlyGrowth: 0, // No historical data tracking in backend yet
            totalRevenue: 0, // No revenue tracking in backend yet
            status: 'Active' as const,
          };
        }).sort((a, b) => a.city.localeCompare(b.city));
        
        setPartnerLocations(locations);
        
        // Calculate monthly breakdown from business creation dates
        const monthlyStats: Record<string, { referrals: number; earnings: number }> = {};
        
        businessesData.forEach((business: Business) => {
          const createdDate = new Date(business.created_at || Date.now());
          const monthKey = createdDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          
          if (!monthlyStats[monthKey]) {
            monthlyStats[monthKey] = { referrals: 0, earnings: 0 };
          }
          
          monthlyStats[monthKey].referrals++;
          // No earnings calculation - no commission tracking in backend yet
          monthlyStats[monthKey].earnings = 0;
        });
        
        // Sort by month and get last 4 months
        const breakdown = Object.entries(monthlyStats)
          .map(([month, data]) => ({
            month: month,
            referrals: data.referrals,
            earnings: 0, // No commission tracking in backend yet
          }))
          .sort((a, b) => {
            const dateA = new Date(a.month + ' 1, ' + new Date().getFullYear());
            const dateB = new Date(b.month + ' 1, ' + new Date().getFullYear());
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 4);
        
        setMonthlyBreakdown(breakdown);
        
      } catch (error: any) {
        console.error('Failed to load dashboard data:', error);
        toast.error(error.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const copyReferralLink = async () => {
    const subdomain = whiteLabel?.subdomain || 'network';
    const referralLink = `https://${subdomain}.preferreddeals.com/signup`;
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2">Distribution Partner Dashboard</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Manage your network and track performance, {userName}</p>
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
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Views</p>
            <p className="text-2xl sm:text-3xl">{stats.totalViews.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">All businesses</p>
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
                  <p className="text-xs sm:text-sm font-medium break-all">
                    {whiteLabel?.customDomain || (whiteLabel?.subdomain ? `${whiteLabel.subdomain}.preferreddeals.com` : 'Not configured')}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-white rounded-lg border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Pending Approvals</p>
                  <p className="text-xl sm:text-2xl">{businesses.filter(b => (b.approval_status || '') === 'pending').length}</p>
                </div>
                <div className="p-3 sm:p-4 bg-white rounded-lg border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Businesses</p>
                  <p className="text-xl sm:text-2xl">{stats.totalReferrals}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => onNavigate?.('white-label-settings')}>
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
                  value={whiteLabel?.subdomain ? `https://${whiteLabel.subdomain}.preferreddeals.com/signup` : 'https://preferreddeals.com/signup'}
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
            {/* Analytics Summary */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Analytics Summary</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Views</p>
                    <p className="text-xl sm:text-2xl">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Clicks</p>
                    <p className="text-xl sm:text-2xl">{stats.totalClicks.toLocaleString()}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Featured Businesses</p>
                    <p className="text-xl sm:text-2xl">{stats.featuredBusinesses}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Active Deals</p>
                    <p className="text-xl sm:text-2xl">{stats.activeDeals}</p>
                  </div>
                </div>
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
                        <span className="text-xs sm:text-sm">{referral.plan}</span>
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
              <CardTitle>💡 Grow Your Network</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Focus on businesses that would benefit from premium features for better visibility</span>
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
                      <Badge variant={referral.plan === 'Featured' ? 'default' : 'secondary'} className="text-xs">
                        {referral.plan}
                      </Badge>
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
                        <p className="text-xs text-muted-foreground">Active Deals</p>
                        <p className="text-xl sm:text-2xl">{partnerLocations.reduce((sum, loc) => sum + loc.activeDeals, 0)}</p>
                      </div>
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
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
                <CardTitle className="text-base sm:text-lg">Referral History</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Monthly business referrals breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 overflow-x-auto">
                {monthlyBreakdown.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No referral history available</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Month</TableHead>
                        <TableHead className="text-xs sm:text-sm">Referrals</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyBreakdown.map((month) => (
                        <TableRow key={month.month}>
                          <TableCell className="text-xs sm:text-sm">{month.month}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{month.referrals}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
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

              </div>

              {/* Performance Metrics */}
              <div className="p-4 bg-muted rounded-lg">
                <h5 className="font-semibold mb-3">Performance Metrics</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deals per Business</span>
                    <span className="font-medium">
                      {selectedLocation.businesses > 0 ? (selectedLocation.activeDeals / selectedLocation.businesses).toFixed(1) : '0.0'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Businesses</span>
                    <span className="font-medium">{selectedLocation.businesses}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Businesses with Deals</span>
                    <span className="font-medium">{selectedLocation.activeDeals}</span>
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