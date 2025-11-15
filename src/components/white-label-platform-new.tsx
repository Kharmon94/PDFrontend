import { useState } from 'react';
import { ArrowLeft, Check, X, Eye, Settings, Globe, Building2, Users, TrendingUp, BarChart3, MapPin, Search, MoreVertical, Edit, Trash2, Mail, Phone, ExternalLink, ChevronLeft, ChevronRight, Map, Package, DollarSign, Store, Plus, CheckCircle, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { BusinessDetailWhiteLabel } from './business-detail-whitelabel';
import { LocationDetailWhiteLabel } from './location-detail-whitelabel';

interface WhiteLabelPlatformProps {
  onBack: () => void;
  partnerName: string;
  onNavigate?: (page: string) => void;
}

export function WhiteLabelPlatform({ onBack, partnerName, onNavigate }: WhiteLabelPlatformProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [approvalDialogMode, setApprovalDialogMode] = useState<'approve' | 'reject' | 'view' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof platformLocations[0] | null>(null);
  const [selectedBusinessDetail, setSelectedBusinessDetail] = useState<any>(null);
  
  // Marketplace state
  const [marketplaceSearchTerm, setMarketplaceSearchTerm] = useState('');
  const [marketplaceCategory, setMarketplaceCategory] = useState('all');
  const [selectedMarketplaceBusiness, setSelectedMarketplaceBusiness] = useState<typeof mockMarketplaceBusinesses[0] | null>(null);
  const [businessDetailOpen, setBusinessDetailOpen] = useState(false);



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

  // Mock marketplace businesses (premium businesses that opted in)
  const [mockMarketplaceBusinesses, setMockMarketplaceBusinesses] = useState([
    {
      id: '1',
      name: 'Bella Vista Restaurant',
      category: 'Restaurant',
      description: 'Authentic Italian cuisine with a modern twist. Family-owned since 1985.',
      city: 'New York, NY',
      rating: 4.8,
      reviewCount: 127,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      isPremium: true,
      isAdded: false,
    },
    {
      id: '2',
      name: 'Tech Solutions Pro',
      category: 'Technology',
      description: 'Professional IT services and computer repair for businesses and individuals.',
      city: 'Los Angeles, CA',
      rating: 4.9,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      isPremium: true,
      isAdded: false,
    },
    {
      id: '3',
      name: 'Sparkle Clean Services',
      category: 'Services',
      description: 'Professional residential and commercial cleaning services.',
      city: 'Austin, TX',
      rating: 4.9,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
      isPremium: true,
      isAdded: false,
    },
    {
      id: '4',
      name: 'Precision Auto Care',
      category: 'Services',
      description: 'Full-service auto repair and maintenance with certified mechanics.',
      city: 'Los Angeles, CA',
      rating: 4.8,
      reviewCount: 167,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
      isPremium: true,
      isAdded: true,
    },
    {
      id: '5',
      name: 'Green Leaf Wellness',
      category: 'Healthcare',
      description: 'Holistic health center offering yoga, massage therapy, and wellness programs.',
      city: 'Houston, TX',
      rating: 4.7,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      isPremium: true,
      isAdded: false,
    },
    {
      id: '6',
      name: 'Fresh Market Grocers',
      category: 'Retail',
      description: 'Local organic produce and specialty foods from regional farmers.',
      city: 'New York, NY',
      rating: 4.7,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
      isPremium: true,
      isAdded: false,
    },
  ]);

  const handleAddBusiness = (businessId: string) => {
    setMockMarketplaceBusinesses(prev =>
      prev.map(b => b.id === businessId ? { ...b, isAdded: true } : b)
    );
    toast.success('Business added to your directory!');
  };

  const handleRemoveBusiness = (businessId: string) => {
    setMockMarketplaceBusinesses(prev =>
      prev.map(b => b.id === businessId ? { ...b, isAdded: false } : b)
    );
    toast.success('Business removed from your directory.');
  };

  const filteredMarketplaceBusinesses = mockMarketplaceBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(marketplaceSearchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(marketplaceSearchTerm.toLowerCase());
    const matchesCategory = marketplaceCategory === 'all' || business.category === marketplaceCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleViewBusinessDetail = (business: any) => {
    setSelectedBusinessDetail(business);
  };

  const handleEditBusiness = (business: any) => {
    toast.info(`Editing ${business.name} - functionality coming soon`);
  };

  const handleRemoveApprovedBusiness = (business: any) => {
    if (confirm(`Are you sure you want to remove ${business.name} from your platform?`)) {
      toast.success(`${business.name} has been removed from your platform`);
      // In a real app, this would remove from the list
    }
  };

  // Show location detail view if a location is selected
  if (selectedLocation) {
    return (
      <LocationDetailWhiteLabel
        location={selectedLocation}
        onBack={() => setSelectedLocation(null)}
      />
    );
  }

  // Show business detail view if a business is selected
  if (selectedBusinessDetail) {
    return (
      <BusinessDetailWhiteLabel
        business={selectedBusinessDetail}
        onBack={() => setSelectedBusinessDetail(null)}
      />
    );
  }

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
            <Button onClick={() => onNavigate?.('white-label-settings')}>
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
              <h2 className="text-xl sm:text-2xl capitalize flex items-center justify-center gap-2 font-bold">
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
                 activeTab === 'marketplace' ? 'Marketplace' :
                 activeTab === 'locations' ? 'Locations' :
                 'Analytics'}
              </h2>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  const tabs = ['overview', 'pending', 'approved', 'marketplace', 'locations', 'analytics'];
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
                  const tabs = ['overview', 'pending', 'approved', 'marketplace', 'locations', 'analytics'];
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
              {['overview', 'pending', 'approved', 'marketplace', 'locations', 'analytics'].map((tab) => (
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
                        <div 
                          className="min-w-0 flex-1 cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => handleViewBusinessDetail(business)}
                        >
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
                            <DropdownMenuItem onClick={() => handleViewBusinessDetail(business)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditBusiness(business)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveApprovedBusiness(business)}>
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
                        <TableRow 
                          key={business.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewBusinessDetail(business)}
                        >
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
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewBusinessDetail(business)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditBusiness(business)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveApprovedBusiness(business)}>
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

          {/* Marketplace Tab */}
          <TabsContent value="marketplace">
            <Card className="border-2 border-gray-900 bg-gradient-to-br from-gray-50 to-white mb-6">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 sm:p-3 bg-gray-900 rounded-lg flex-shrink-0">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base sm:text-lg">Business Marketplace</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Discover premium businesses ready to join your white-label directory
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs sm:text-sm">
                    <span className="font-medium">NFC Powered Word Of Mouth Deal Network:</span> These premium businesses have opted in to be featured in white-label directories like yours. Add them to increase your directory value and help them gain more exposure!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search businesses..."
                      value={marketplaceSearchTerm}
                      onChange={(e) => setMarketplaceSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={marketplaceCategory} onValueChange={setMarketplaceCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Restaurant">Restaurant</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {filteredMarketplaceBusinesses.length} businesses available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {filteredMarketplaceBusinesses.filter(b => b.isAdded).length} added to your directory
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Business Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMarketplaceBusinesses.map((business) => (
                <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="relative h-48 bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedMarketplaceBusiness(business);
                      setBusinessDetailOpen(true);
                    }}
                  >
                    <img 
                      src={business.image} 
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className="bg-black text-white">Premium</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold line-clamp-1">{business.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {business.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{business.rating}</span>
                          <span className="text-gray-400">({business.reviewCount})</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {business.description}
                      </p>
                      <p className="text-xs text-gray-500">{business.city}</p>
                    </div>
                    
                    {business.isAdded ? (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleRemoveBusiness(business.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Added to Directory
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => handleAddBusiness(business.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Directory
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMarketplaceBusinesses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Store className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">No businesses found</p>
                  <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}
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
        <DialogContent className="sm:max-w-[600px]" aria-describedby="approval-action-description">
          <DialogHeader>
            <DialogTitle>
              {approvalDialogMode === 'approve' && 'Approve Business'}
              {approvalDialogMode === 'reject' && 'Reject Business Application'}
              {approvalDialogMode === 'view' && 'Business Application Details'}
            </DialogTitle>
            <DialogDescription id="approval-action-description">
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

      {/* Marketplace Business Detail Dialog */}
      <Dialog open={businessDetailOpen} onOpenChange={setBusinessDetailOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" aria-describedby="marketplace-business-description">
          <DialogHeader>
            <DialogTitle>Business Details</DialogTitle>
            <DialogDescription id="marketplace-business-description">
              Learn more about this business before adding to your directory
            </DialogDescription>
          </DialogHeader>

          {selectedMarketplaceBusiness && (
            <div className="space-y-4">
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={selectedMarketplaceBusiness.image} 
                  alt={selectedMarketplaceBusiness.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-black text-white">
                  Premium
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedMarketplaceBusiness.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{selectedMarketplaceBusiness.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedMarketplaceBusiness.rating}</span>
                    <span className="text-sm text-gray-500">({selectedMarketplaceBusiness.reviewCount} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{selectedMarketplaceBusiness.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedMarketplaceBusiness.city}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Premium Business:</span> This business has opted into the marketplace and is ready to be added to your white-label directory at no additional cost.
                </p>
              </div>

              {selectedMarketplaceBusiness.isAdded ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-900">
                      This business has been added to your directory
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBusinessDetailOpen(false)}>
              Close
            </Button>
            {selectedMarketplaceBusiness && (
              selectedMarketplaceBusiness.isAdded ? (
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleRemoveBusiness(selectedMarketplaceBusiness.id);
                    setBusinessDetailOpen(false);
                  }}
                >
                  Remove from Directory
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    handleAddBusiness(selectedMarketplaceBusiness.id);
                    setBusinessDetailOpen(false);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Directory
                </Button>
              )
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}