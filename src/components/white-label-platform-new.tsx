import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Eye, Settings, Globe, Building2, Users, TrendingUp, BarChart3, MapPin, Search, MoreVertical, Edit, Trash2, Mail, Phone, ExternalLink, ChevronLeft, ChevronRight, Map, Package, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { WhiteLabelCustomization } from './white-label-customization';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface WhiteLabelPlatformProps {
  onBack: () => void;
  partnerName: string;
}

export function WhiteLabelPlatform({ onBack, partnerName }: WhiteLabelPlatformProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [approvalDialogMode, setApprovalDialogMode] = useState<'approve' | 'reject' | 'view' | null>(null);
  const [domainSettingsOpen, setDomainSettingsOpen] = useState(false);
  const [settingsTabIndex, setSettingsTabIndex] = useState(0);
  const [settingsCarouselApi, setSettingsCarouselApi] = useState<any>();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [menuType, setMenuType] = useState<'header' | 'footer'>('header');
  const [enableCommunityAccounts, setEnableCommunityAccounts] = useState(true);
  const [enableSaveDeals, setEnableSaveDeals] = useState(true);
  const [enableMessages, setEnableMessages] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<typeof platformLocations[0] | null>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, name: 'Restaurant', count: 15 },
    { id: 2, name: 'Retail', count: 12 },
    { id: 3, name: 'Services', count: 8 },
    { id: 4, name: 'Healthcare', count: 5 },
    { id: 5, name: 'Technology', count: 2 },
  ]);

  // Menu items state
  const [headerMenuItems, setHeaderMenuItems] = useState([
    { id: 1, label: 'Home', url: '/', order: 1 },
    { id: 2, label: 'All Listings', url: '/listings', order: 2 },
    { id: 3, label: 'Featured', url: '/featured', order: 3 },
    { id: 4, label: 'About', url: '/about', order: 4 },
  ]);

  const [footerMenuItems, setFooterMenuItems] = useState([
    { id: 1, label: 'About Us', url: '/about', order: 1 },
    { id: 2, label: 'Contact', url: '/contact', order: 2 },
    { id: 3, label: 'Privacy Policy', url: '/privacy', order: 3 },
    { id: 4, label: 'Terms of Service', url: '/terms', order: 4 },
  ]);

  // Platform locations data
  const platformLocations = [
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

  // Settings tab configuration
  const settingsTabs = [
    { value: 'domain', label: 'Domain' },
    { value: 'branding', label: 'Branding' },
    { value: 'customization', label: 'Customization' },
    { value: 'settings', label: 'Settings' },
  ];

  // Sync carousel with tab index
  useEffect(() => {
    if (!settingsCarouselApi) {
      return;
    }

    settingsCarouselApi.on('select', () => {
      setSettingsTabIndex(settingsCarouselApi.selectedScrollSnap());
    });
  }, [settingsCarouselApi]);

  // Mock partner data
  const partnerData = {
    name: partnerName || 'Community Connect',
    domain: 'community-connect.preferreddeals.com',
    customDomain: '',
    status: 'Active',
    memberSince: 'Jan 2025',
    totalBusinesses: 42,
    pendingApprovals: 5,
    activeDeals: 87,
    communityMembers: 1250,
    logo: '',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
  };

  const pendingBusinesses = [
    {
      id: 1,
      name: 'Local Coffee House',
      owner: 'Sarah Johnson',
      email: 'sarah@localcoffee.com',
      phone: '(555) 123-4567',
      category: 'Dining',
      address: '123 Main St, Downtown',
      description: 'Artisanal coffee and fresh pastries in the heart of downtown.',
      submittedDate: 'Oct 28, 2025',
      requestedPlan: 'Premium',
      deal: '20% off all drinks',
    },
    {
      id: 2,
      name: 'Fitness First Gym',
      owner: 'Mike Williams',
      email: 'mike@fitnessfirst.com',
      phone: '(555) 234-5678',
      category: 'Health & Wellness',
      address: '456 Oak Ave, Suite 200',
      description: 'State-of-the-art fitness facility with personal training.',
      submittedDate: 'Oct 27, 2025',
      requestedPlan: 'Premium',
      deal: 'Free first month membership',
    },
    {
      id: 3,
      name: 'Bella Beauty Salon',
      owner: 'Emma Davis',
      email: 'emma@bellasalon.com',
      phone: '(555) 345-6789',
      category: 'Beauty & Self Care',
      address: '789 Elm St',
      description: 'Full-service salon offering cuts, color, and styling.',
      submittedDate: 'Oct 26, 2025',
      requestedPlan: 'Premium',
      deal: '15% off all services',
    },
  ];

  const approvedBusinesses = [
    { id: 1, name: 'Pizza Paradise', owner: 'Tony Romano', category: 'Dining', status: 'Active', plan: 'Premium', approvedDate: 'Oct 15, 2025' },
    { id: 2, name: 'Yoga Studio', owner: 'Lisa Chen', category: 'Health & Wellness', status: 'Active', plan: 'Premium', approvedDate: 'Oct 12, 2025' },
    { id: 3, name: 'Car Wash Pro', owner: 'David Lee', category: 'Services', status: 'Active', plan: 'Premium', approvedDate: 'Oct 10, 2025' },
  ];

  const handleApprovalAction = (business: any, mode: 'approve' | 'reject' | 'view') => {
    setSelectedBusiness(business);
    setApprovalDialogMode(mode);
  };

  const handleCloseDialog = () => {
    setSelectedBusiness(null);
    setApprovalDialogMode(null);
  };

  const handleApproveBusiness = () => {
    // Handle approval logic
    handleCloseDialog();
    toast.success('Business approved successfully!');
  };

  const handleRejectBusiness = () => {
    // Handle rejection logic
    handleCloseDialog();
    toast.error('Business application rejected.');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
            <div>
              <h1 className="mb-2">White-Label Platform</h1>
              <p className="text-muted-foreground">Manage your community directory</p>
            </div>
            <Button onClick={() => setDomainSettingsOpen(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Platform Settings
            </Button>
          </div>

          {/* Platform Info Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-400">Your Platform URL</p>
                  </div>
                  <p className="text-white font-medium">{partnerData.domain}</p>
                  {partnerData.customDomain && (
                    <p className="text-sm text-gray-400 mt-1">{partnerData.customDomain}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-400">Total Businesses</p>
                  </div>
                  <p className="text-2xl text-white">{partnerData.totalBusinesses}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-400">Community Members</p>
                  </div>
                  <p className="text-2xl text-white">{partnerData.communityMembers}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-400">Active Deals</p>
                  </div>
                  <p className="text-2xl text-white">{partnerData.activeDeals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals Alert */}
        {partnerData.pendingApprovals > 0 && (
          <Card className="mb-6 border-orange-300 bg-orange-50">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-orange-600" />
                <span className="text-sm">{partnerData.pendingApprovals} businesses awaiting your approval</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('pending')}>
                Review Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Slider Navigation */}
          <div className="space-y-3 sm:space-y-4">
            {/* Tab Name with Arrows */}
            <div className="relative text-center">
              <h2 className="text-xl sm:text-2xl capitalize flex items-center justify-center gap-2">
                {activeTab === 'overview' ? 'Overview' :
                 activeTab === 'pending' ? (
                  <>
                    Pending
                    {partnerData.pendingApprovals > 0 && (
                      <Badge variant="destructive" className="text-xs">{partnerData.pendingApprovals}</Badge>
                    )}
                  </>
                 ) :
                 activeTab === 'approved' ? 'Approved' :
                 activeTab === 'locations' ? 'Locations' :
                 'Analytics'}
              </h2>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  const tabs = ['overview', 'pending', 'approved', 'locations', 'analytics'];
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
                  const tabs = ['overview', 'pending', 'approved', 'locations', 'analytics'];
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
              {['overview', 'pending', 'approved', 'locations', 'analytics'].map((tab) => (
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

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Building2 className="w-8 h-8 text-gray-900" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Businesses</p>
                  <p className="text-3xl">{partnerData.totalBusinesses}</p>
                  <p className="text-sm text-muted-foreground mt-2">+8 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-700" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Active Deals</p>
                  <p className="text-3xl">{partnerData.activeDeals}</p>
                  <p className="text-sm text-muted-foreground mt-2">Across all businesses</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-gray-700" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Community Members</p>
                  <p className="text-3xl">{partnerData.communityMembers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">+12% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Building2 className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Approval</p>
                  <p className="text-3xl">{partnerData.pendingApprovals}</p>
                  <Button 
                    size="sm" 
                    className="mt-2 w-full" 
                    variant="outline"
                    onClick={() => setActiveTab('pending')}
                  >
                    Review
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Business Applications</CardTitle>
                <CardDescription>Latest submissions from local businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingBusinesses.slice(0, 3).map((business) => (
                    <div key={business.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{business.name}</p>
                        <p className="text-xs text-muted-foreground">{business.category} • {business.submittedDate}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleApprovalAction(business, 'view')}>
                        Review
                      </Button>
                    </div>
                  ))}</div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Approvals Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Pending Business Approvals</CardTitle>
                    <CardDescription>Review and approve businesses for your community directory</CardDescription>
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
                <div className="space-y-4">
                  {pendingBusinesses.map((business) => (
                    <Card key={business.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <h3>{business.name}</h3>
                                <Badge>{business.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">{business.description}</p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>{business.address}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span>{business.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{business.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Owner Information</p>
                              <p className="text-sm">{business.owner}</p>
                              <p className="text-sm text-muted-foreground">Submitted {business.submittedDate}</p>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2">Requested Plan</p>
                              <Badge variant="secondary">{business.requestedPlan}</Badge>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2">Initial Deal Offer</p>
                              <p className="text-sm">{business.deal}</p>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button 
                                className="flex-1" 
                                onClick={() => handleApprovalAction(business, 'approve')}
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleApprovalAction(business, 'reject')}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approved Businesses Tab */}
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Approved Businesses</CardTitle>
                    <CardDescription>Manage businesses in your community directory</CardDescription>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input placeholder="Search businesses..." className="w-full sm:w-64" />
                    <Button variant="outline" size="icon">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {approvedBusinesses.map((business) => (
                    <div key={business.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{business.name}</p>
                          <p className="text-xs text-muted-foreground">{business.owner}</p>
                          <p className="text-xs text-muted-foreground mt-1">{business.category}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
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
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{business.plan}</Badge>
                          <Badge variant="default" className="text-xs">{business.status}</Badge>
                        </div>
                        <span className="text-muted-foreground">{business.approvedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Approved</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedBusinesses.map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.owner}</TableCell>
                          <TableCell>{business.category}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{business.plan}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{business.status}</Badge>
                          </TableCell>
                          <TableCell>{business.approvedDate}</TableCell>
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
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Location Performance</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Track business activity by city</CardDescription>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                      type="text"
                      placeholder="Search locations..."
                      className="w-full sm:w-64"
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
                          <p className="text-xl sm:text-2xl">{platformLocations.length}</p>
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
                          <p className="text-xl sm:text-2xl">{platformLocations.reduce((sum, loc) => sum + loc.businesses, 0)}</p>
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
                          <p className="text-xl sm:text-2xl">{platformLocations.reduce((sum, loc) => sum + loc.activeDeals, 0)}</p>
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
                          <p className="text-xl sm:text-2xl">${platformLocations.reduce((sum, loc) => sum + loc.totalRevenue, 0)}</p>
                        </div>
                        <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Locations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {platformLocations.map((location) => (
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

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>Key metrics for your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Businesses</span>
                    <span className="font-semibold">{partnerData.totalBusinesses}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Deals</span>
                    <span className="font-semibold">{partnerData.activeDeals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Community Members</span>
                    <span className="font-semibold">{partnerData.communityMembers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Approval Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Businesses by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dining</span>
                    <span className="font-semibold">15 (35%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Health & Wellness</span>
                    <span className="font-semibold">12 (29%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Services</span>
                    <span className="font-semibold">8 (19%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Beauty & Self Care</span>
                    <span className="font-semibold">7 (17%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Approval/Rejection Dialog */}
      <Dialog open={approvalDialogMode !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {approvalDialogMode === 'approve' && 'Approve Business'}
              {approvalDialogMode === 'reject' && 'Reject Business Application'}
              {approvalDialogMode === 'view' && 'Business Application Details'}
            </DialogTitle>
            <DialogDescription>
              {approvalDialogMode === 'approve' && 'Approve this business to add it to your community directory'}
              {approvalDialogMode === 'reject' && 'Provide a reason for rejecting this application'}
              {approvalDialogMode === 'view' && 'Review business application details'}
            </DialogDescription>
          </DialogHeader>

          {selectedBusiness && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div>
                  <p className="text-sm font-medium">Business Name</p>
                  <p className="text-sm text-muted-foreground">{selectedBusiness.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Owner</p>
                  <p className="text-sm text-muted-foreground">{selectedBusiness.owner}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <Badge variant="secondary">{selectedBusiness.category}</Badge>
                </div>
              </div>

              {approvalDialogMode === 'approve' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    This business will be added to your community directory and will be visible to all members.
                  </p>
                </div>
              )}

              {approvalDialogMode === 'reject' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                    <Textarea 
                      id="rejection-reason"
                      placeholder="Please provide a reason for rejecting this application..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm">
                      The business owner will be notified of your decision and the reason provided.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCloseDialog} className="w-full sm:w-auto">
              Cancel
            </Button>
            {approvalDialogMode === 'approve' && (
              <Button onClick={handleApproveBusiness} className="w-full sm:w-auto">
                <Check className="w-4 h-4 mr-2" />
                Approve Business
              </Button>
            )}
            {approvalDialogMode === 'reject' && (
              <Button variant="destructive" onClick={handleRejectBusiness} className="w-full sm:w-auto">
                <X className="w-4 h-4 mr-2" />
                Reject Application
              </Button>
            )}
            {approvalDialogMode === 'view' && (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="outline" onClick={() => setApprovalDialogMode('reject')} className="w-full sm:w-auto">
                  Reject
                </Button>
                <Button onClick={() => setApprovalDialogMode('approve')} className="w-full sm:w-auto">
                  Approve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Platform Settings Dialog with Carousel */}
      <Dialog open={domainSettingsOpen} onOpenChange={setDomainSettingsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Platform Settings</DialogTitle>
            <DialogDescription>
              Configure your white-label platform settings, branding, and custom domain
            </DialogDescription>
          </DialogHeader>

          {/* Tab Name Indicator - Mobile (moved to top) */}
          <div className="sm:hidden text-center pt-2 pb-1 relative">
            <p className="text-sm font-medium">{settingsTabs[settingsTabIndex]?.label}</p>
            
            {/* Navigation Arrows - Mobile Only, positioned at tab name level */}
            <button
              onClick={() => settingsCarouselApi?.scrollPrev()}
              disabled={settingsTabIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => settingsCarouselApi?.scrollNext()}
              disabled={settingsTabIndex === settingsTabs.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carousel Indicators - Mobile (moved to top) */}
          <div className="flex sm:hidden justify-center gap-2 pb-3">
            {settingsTabs.map((tab, index) => (
              <button
                key={tab.value}
                onClick={() => {
                  setSettingsTabIndex(index);
                  settingsCarouselApi?.scrollTo(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === settingsTabIndex 
                    ? 'w-8 bg-black' 
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to ${tab.label}`}
              />
            ))}
          </div>

          {/* Tab Navigation - Desktop */}
          <div className="hidden sm:flex gap-2 border-b">
            {settingsTabs.map((tab, index) => (
              <button
                key={tab.value}
                onClick={() => {
                  setSettingsTabIndex(index);
                  settingsCarouselApi?.scrollTo(index);
                }}
                className={`px-4 py-2 text-sm transition-colors ${
                  settingsTabIndex === index
                    ? 'border-b-2 border-black font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel for Tab Content */}
          <div className="flex-1 overflow-hidden relative min-h-0">
            <Carousel 
              setApi={setSettingsCarouselApi}
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {/* Domain Tab */}
                <CarouselItem>
                  <div className="space-y-4 pt-4 max-h-[55vh] overflow-y-auto pr-2">
                    <div>
                      <Label>Default Subdomain</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input value={partnerData.domain} disabled />
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your default subdomain on the PREFERRED DEALS platform
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label>Custom Domain</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Use your own domain name (e.g., deals.yourcommunity.com)
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="custom-domain">Your Custom Domain</Label>
                          <Input 
                            id="custom-domain"
                            placeholder="deals.yourcommunity.com" 
                            className="mt-2"
                          />
                        </div>

                        <Card className="bg-blue-50 border-blue-200">
                          <CardContent className="p-4">
                            <h4 className="text-sm font-medium mb-2">DNS Configuration Required</h4>
                            <div className="space-y-2 text-xs">
                              <p>Add the following DNS records to your domain:</p>
                              <div className="bg-white p-3 rounded border font-mono">
                                <p>Type: CNAME</p>
                                <p>Name: deals (or your subdomain)</p>
                                <p>Value: cname.preferreddeals.com</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    {/* Bottom padding for scroll clearance */}
                    <div className="pb-4"></div>
                  </div>
                </CarouselItem>

                {/* Branding Tab */}
                <CarouselItem>
                  <div className="space-y-4 pt-4 max-h-[55vh] overflow-y-auto pr-2">
                    <div>
                      <Label>Platform Name</Label>
                      <Input defaultValue={partnerData.name} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        This will appear as your platform's title
                      </p>
                    </div>

                    <div>
                      <Label>Logo URL</Label>
                      <Input placeholder="https://your-logo-url.com/logo.png" className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the URL of your logo image
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Primary Color</Label>
                        <div className="flex gap-2 mt-2">
                          <Input 
                            type="color" 
                            defaultValue={partnerData.primaryColor}
                            className="w-20 h-10"
                          />
                          <Input 
                            defaultValue={partnerData.primaryColor}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Secondary Color</Label>
                        <div className="flex gap-2 mt-2">
                          <Input 
                            type="color" 
                            defaultValue={partnerData.secondaryColor}
                            className="w-20 h-10"
                          />
                          <Input 
                            defaultValue={partnerData.secondaryColor}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Welcome Message</Label>
                      <Textarea 
                        placeholder="Welcome to our community deals platform..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                    {/* Bottom padding for scroll clearance */}
                    <div className="pb-4"></div>
                  </div>
                </CarouselItem>

                {/* Customization Tab */}
                <CarouselItem>
                  <div className="pt-4 max-h-[55vh] overflow-y-auto pr-2">
                    <WhiteLabelCustomization
                      categories={categories}
                      headerMenuItems={headerMenuItems}
                      footerMenuItems={footerMenuItems}
                      onUpdateCategories={setCategories}
                      onUpdateHeaderMenu={setHeaderMenuItems}
                      onUpdateFooterMenu={setFooterMenuItems}
                      enableCommunityAccounts={enableCommunityAccounts}
                      enableSaveDeals={enableSaveDeals}
                      enableMessages={enableMessages}
                      onToggleCommunityAccounts={setEnableCommunityAccounts}
                      onToggleSaveDeals={setEnableSaveDeals}
                      onToggleMessages={setEnableMessages}
                    />
                    {/* Bottom padding for scroll clearance */}
                    <div className="pb-4"></div>
                  </div>
                </CarouselItem>

                {/* Settings Tab */}
                <CarouselItem>
                  <div className="space-y-4 pt-4 max-h-[55vh] overflow-y-auto pr-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <Label>Auto-Approve Businesses</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Automatically approve new business listings
                        </p>
                      </div>
                      <Switch className="self-start" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <Label>Require Email Verification</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Users must verify email before accessing deals
                        </p>
                      </div>
                      <Switch defaultChecked className="self-start" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <Label>Allow Business Registrations</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Let businesses register directly on your platform
                        </p>
                      </div>
                      <Switch defaultChecked className="self-start" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <Label>Show PREFERRED DEALS Branding</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Display "Powered by PREFERRED DEALS" footer
                        </p>
                      </div>
                      <Switch defaultChecked className="self-start" />
                    </div>
                    {/* Bottom padding for scroll clearance */}
                    <div className="pb-4"></div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              
              {/* Navigation Arrows - Mobile Only, aligned with tab name */}
              <CarouselPrevious className="sm:hidden left-2 -top-12 bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-30" />
              <CarouselNext className="sm:hidden right-2 -top-12 bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-30" />
            </Carousel>
          </div>

          {/* Mobile Swipe Instruction - Moved above buttons */}
          <div className="sm:hidden text-center text-sm text-gray-500 mt-2">
            Swipe left or right to navigate between tabs
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDomainSettingsOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={() => {
              setDomainSettingsOpen(false);
              toast.success('Settings saved successfully!');
            }} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Details Dialog */}
      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" aria-describedby="location-details-description">
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
            <DialogDescription id="location-details-description">
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