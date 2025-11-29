import { useState, useEffect } from 'react';
import { Package, Users, DollarSign, BarChart3, Settings, TrendingUp, AlertCircle, CheckCircle, Clock, Search, Filter, MoreVertical, Eye, Edit, Trash2, Mail, Calendar, Heart, X, MapPin, Phone, Globe, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiService } from '../services/api';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface AdminDashboardProps {
  userName: string;
  onLogout?: () => void;
}

export function AdminDashboard({ userName, onLogout }: AdminDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [userDialogMode, setUserDialogMode] = useState<'view' | 'edit' | 'suspend' | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBusiness, setSelectedBusiness] = useState<any | null>(null);
  const [businessDialogMode, setBusinessDialogMode] = useState<'view' | 'edit' | 'delete' | null>(null);
  const [selectedApproval, setSelectedApproval] = useState<any | null>(null);
  const [approvalDialogMode, setApprovalDialogMode] = useState<'view' | 'approve' | 'reject' | null>(null);
  const [selectedDistributor, setSelectedDistributor] = useState<any | null>(null);
  const [distributorDialogMode, setDistributorDialogMode] = useState<'view' | 'edit' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [locationDialogMode, setLocationDialogMode] = useState<'view' | 'edit' | 'delete' | null>(null);
  const [platformSettingsOpen, setPlatformSettingsOpen] = useState(false);
  
  // API Data
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [userPage, setUserPage] = useState(1);
  const [businessPage, setBusinessPage] = useState(1);
  const [userPagination, setUserPagination] = useState<any>(null);
  const [businessPagination, setBusinessPagination] = useState<any>(null);
  
  // Derived data - ensure arrays are valid
  const recentBusinesses = Array.isArray(businesses) ? businesses.slice(0, 10) : [];
  const recentUsers = Array.isArray(users) ? users.slice(0, 10) : [];

  // Fetch platform stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await apiService.getAdminStats();
        // Transform snake_case to camelCase for consistency
        const transformedStats = stats ? {
          total_businesses: stats.total_businesses || stats.totalBusinesses || 0,
          total_users: stats.total_users || stats.totalUsers || 0,
          featured_businesses: stats.featured_businesses || stats.featuredBusinesses || 0,
          businesses_with_deals: stats.businesses_with_deals || stats.businessesWithDeals || 0,
          total_partners: stats.total_partners || stats.totalPartners || 0,
          recent_signups: stats.recent_signups || stats.recentSignups || 0,
          pendingApprovals: stats.pending_approvals || stats.pendingApprovals || 0
        } : {};
        setPlatformStats(transformedStats);
      } catch (error: any) {
        console.error('Failed to load admin stats:', error);
        toast.error(error.message || 'Failed to load stats');
        // Set empty stats so the component can still render
        setPlatformStats({
          total_businesses: 0,
          total_users: 0,
          featured_businesses: 0,
          businesses_with_deals: 0,
          total_partners: 0,
          recent_signups: 0,
          pendingApprovals: 0
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch users when tab changes or search changes
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, searchTerm, userPage]);

  // Fetch businesses when tab changes or search changes
  useEffect(() => {
    if (activeTab === 'businesses') {
      fetchBusinesses();
    }
  }, [activeTab, searchTerm, businessPage]);

  // Fetch locations when tab changes
  useEffect(() => {
    if (activeTab === 'locations') {
      fetchLocations();
    }
  }, [activeTab]);

  // Fetch distributors when tab changes
  useEffect(() => {
    if (activeTab === 'distributors') {
      fetchDistributors();
    }
  }, [activeTab]);

  const fetchDistributors = async () => {
    setIsLoadingDistributors(true);
    try {
      const response = await apiService.getAdminDistributors();
      setActiveDistributors(Array.isArray(response.distributors) ? response.distributors : []);
    } catch (error: any) {
      console.error('Failed to load distributors:', error);
      toast.error(error.message || 'Failed to load distributors');
      setActiveDistributors([]);
    } finally {
      setIsLoadingDistributors(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await apiService.getAdminUsers({
        page: userPage,
        per_page: 10,
        search: searchTerm || undefined
      });
      setUsers(response.users);
      setUserPagination(response.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchBusinesses = async () => {
    setIsLoadingBusinesses(true);
    try {
      const response = await apiService.getAdminBusinesses({
        page: businessPage,
        per_page: 10,
        search: searchTerm || undefined
      });
      setBusinesses(response.businesses);
      setBusinessPagination(response.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load businesses');
    } finally {
      setIsLoadingBusinesses(false);
    }
  };

  const handleToggleFeatured = async (businessId: string | number) => {
    try {
      const result = await apiService.toggleBusinessFeatured(String(businessId));
      toast.success(result.message);
      fetchBusinesses(); // Refresh list
    } catch (error: any) {
      toast.error(error.message || 'Failed to update business');
    }
  };

  const handleDeleteUser = async (userId: string | number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const result = await apiService.deleteUser(String(userId));
      toast.success(result.message);
      fetchUsers(); // Refresh list
      setSelectedUser(null);
      setUserDialogMode(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const handleDeleteBusiness = async (businessId: string | number) => {
    if (!confirm('Are you sure you want to delete this business?')) return;
    
    try {
      const result = await apiService.deleteBusinessAsAdmin(String(businessId));
      toast.success(result.message);
      fetchBusinesses(); // Refresh list
      setSelectedBusiness(null);
      setBusinessDialogMode(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete business');
    }
  };

  // Legacy mock data for features not yet in backend (approvals, distributors)
  const pendingApprovals: any[] = [];
  const distributors: any[] = [];
  const [activeDistributors, setActiveDistributors] = useState<any[]>([]);
  const [isLoadingDistributors, setIsLoadingDistributors] = useState(false);

  // Helper function to parse address and extract city/state
  const parseAddress = (address: string): { city: string; state: string } | null => {
    if (!address) return null;
    
    // Common address formats:
    // "123 Street Name, City, State ZIP"
    // "City, State"
    // "City, ST"
    const parts = address.split(',').map(p => p.trim());
    
    if (parts.length >= 2) {
      // Assume last part might be state, second to last might be city
      const lastPart = parts[parts.length - 1];
      const secondLastPart = parts[parts.length - 2];
      
      // Check if last part looks like a state (2-3 letters or full state name)
      const stateMatch = lastPart.match(/^([A-Z]{2,3})(?:\s+\d{5})?$/i);
      if (stateMatch) {
        return {
          city: secondLastPart || 'Unknown',
          state: stateMatch[1].toUpperCase()
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
    
    // If we can't parse, return null
    return null;
  };

  // Fetch and derive locations from businesses
  const fetchLocations = async () => {
    setIsLoadingLocations(true);
    try {
      // Use admin businesses endpoint to get all businesses with pagination
      // Fetch first page with larger page size to get more businesses at once
      const response = await apiService.getAdminBusinesses({
        page: 1,
        per_page: 100 // Get up to 100 businesses for location aggregation
      });
      
      // Handle admin businesses response which has businesses array and pagination
      const allBusinesses = (response && Array.isArray(response.businesses)) 
        ? response.businesses 
        : Array.isArray(response)
          ? response
          : [];
      
      // Group businesses by location (city, state)
      // Safely create Map - ensure Map constructor is available
      let locationMap: Map<string, { city: string; state: string; businesses: any[] }>;
      try {
        locationMap = new Map();
      } catch (e) {
        console.error('Error creating Map:', e);
        // Fallback to plain object if Map is not available
        setLocations([]);
        setIsLoadingLocations(false);
        return;
      }
      
      if (Array.isArray(allBusinesses) && allBusinesses.length > 0) {
        allBusinesses.forEach((business: any) => {
          if (!business || typeof business !== 'object') return;
          
          const parsed = parseAddress(business.address || '');
          if (!parsed) return;
          
          const key = `${parsed.city}, ${parsed.state}`;
          if (!locationMap.has(key)) {
            locationMap.set(key, {
              city: parsed.city || 'Unknown',
              state: parsed.state || 'Unknown',
              businesses: []
            });
          }
          const locationData = locationMap.get(key);
          if (locationData && Array.isArray(locationData.businesses)) {
            locationData.businesses.push(business);
          }
        });
      }
      
      // Convert map to location objects with statistics
      // Safely convert Map to array
      let locationEntries: Array<[string, { city: string; state: string; businesses: any[] }]>;
      try {
        locationEntries = Array.from(locationMap.entries());
      } catch (e) {
        console.error('Error converting Map to array:', e);
        locationEntries = [];
      }
      
      const locationData = locationEntries.map(([key, data], index) => {
        const locationBusinesses = Array.isArray(data.businesses) ? data.businesses : [];
        const businessesWithDeals = locationBusinesses.filter((b: any) => b && (b.has_deals || b.hasDeals));
        
        // Calculate monthly growth (placeholder - would need historical data)
        // For now, use a random growth rate based on number of businesses
        const monthlyGrowth = Math.round((locationBusinesses.length * 2.5) % 20 + 5);
        
        // Get unique user IDs for this location - safely handle the Set construction
        const userIds: (string | number)[] = locationBusinesses
          .map((b: any) => {
            if (!b || typeof b !== 'object') return null;
            const id = b.user?.id || b.user_id;
            return id != null ? id : null;
          })
          .filter((id: any): id is string | number => {
            return id != null && (typeof id === 'string' || typeof id === 'number');
          });
        
        // Safely create Set - ensure Set constructor is available
        let uniqueUserIds: Set<string | number>;
        try {
          uniqueUserIds = new Set(userIds);
        } catch (e) {
          console.error('Error creating Set:', e, 'userIds:', userIds);
          uniqueUserIds = new Set([]);
        }
        
        return {
          id: index + 1,
          city: data.city || 'Unknown',
          state: data.state || 'Unknown',
          totalBusinesses: Number(locationBusinesses.length) || 0,
          activeDeals: Number(businessesWithDeals.length) || 0,
          monthlyGrowth: Number(monthlyGrowth) || 0,
          totalUsers: Number(uniqueUserIds.size) || 0,
          status: 'Active' as const,
          totalRevenue: 0 // Placeholder
        };
      }).sort((a, b) => {
        // Sort by city name
        return (a.city || '').localeCompare(b.city || '');
      });
      
      // Ensure locationData is always an array
      const validLocationData = Array.isArray(locationData) ? locationData : [];
      
      console.log('Locations data:', {
        totalBusinesses: allBusinesses.length,
        locationsFound: validLocationData.length,
        locations: validLocationData
      });
      
      setLocations(validLocationData);
    } catch (error: any) {
      console.error('Failed to load locations:', error);
      toast.error(error.message || 'Failed to load locations');
      setLocations([]);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleUserAction = (user: any, mode: 'view' | 'edit' | 'suspend') => {
    setSelectedUser(user);
    setUserDialogMode(mode);
  };

  const handleCloseUserDialog = () => {
    setSelectedUser(null);
    setUserDialogMode(null);
  };

  const handleSaveUser = () => {
    // Handle save logic here
    handleCloseUserDialog();
  };

  const handleSuspendUser = async () => {
    if (!selectedUser) return;
    if (!confirm('Are you sure you want to suspend this user?')) return;
    
    try {
      const result = await apiService.suspendUser(String(selectedUser.id));
      toast.success(result.message);
      fetchUsers(); // Refresh list
      handleCloseUserDialog();
    } catch (error: any) {
      toast.error(error.message || 'Failed to suspend user');
    }
  };

  const handleApprovalAction = (item: any, mode: 'view' | 'approve' | 'reject') => {
    setSelectedApproval(item);
    setApprovalDialogMode(mode);
  };

  const handleCloseApprovalDialog = () => {
    setSelectedApproval(null);
    setApprovalDialogMode(null);
  };

  const handleApproveItem = async () => {
    if (!selectedApproval || !selectedApproval.id) {
      toast.error('Invalid approval item');
      return;
    }
    if (!confirm(`Are you sure you want to approve this ${selectedApproval.type?.toLowerCase() || 'item'}?`)) return;
    
    try {
      // For now, assuming approvals are businesses - update when other types are added
      if (selectedApproval.type === 'Business' || !selectedApproval.type) {
        const result = await apiService.approveBusiness(String(selectedApproval.id));
        toast.success(result.message);
        // Refresh businesses list
        if (activeTab === 'businesses') {
          fetchBusinesses();
        }
      }
      handleCloseApprovalDialog();
      // Refresh stats to update pending approvals count
      const stats = await apiService.getAdminStats();
      setPlatformStats(stats);
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve item');
    }
  };

  const handleRejectItem = async () => {
    if (!selectedApproval || !selectedApproval.id) {
      toast.error('Invalid approval item');
      return;
    }
    if (!confirm(`Are you sure you want to reject this ${selectedApproval.type?.toLowerCase() || 'item'}?`)) return;
    
    try {
      // For now, assuming approvals are businesses - update when other types are added
      if (selectedApproval.type === 'Business' || !selectedApproval.type) {
        const result = await apiService.rejectBusiness(String(selectedApproval.id));
        toast.success(result.message);
        // Refresh businesses list
        if (activeTab === 'businesses') {
          fetchBusinesses();
        }
      }
      handleCloseApprovalDialog();
      // Refresh stats to update pending approvals count
      const stats = await apiService.getAdminStats();
      setPlatformStats(stats);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject item');
    }
  };

  const handleDistributorAction = (distributor: any, mode: 'view' | 'edit') => {
    setSelectedDistributor(distributor);
    setDistributorDialogMode(mode);
  };

  const handleCloseDistributorDialog = () => {
    setSelectedDistributor(null);
    setDistributorDialogMode(null);
  };

  const handleSaveDistributor = () => {
    // Handle save logic here
    handleCloseDistributorDialog();
  };

  const handleBusinessAction = (business: typeof recentBusinesses[0], mode: 'view' | 'edit' | 'delete') => {
    setSelectedBusiness(business);
    setBusinessDialogMode(mode);
  };

  const handleCloseBusinessDialog = () => {
    setSelectedBusiness(null);
    setBusinessDialogMode(null);
  };

  const handleSaveBusiness = () => {
    // Handle save logic here
    handleCloseBusinessDialog();
  };

  const handleLocationAction = (location: any, mode: 'view' | 'edit' | 'delete') => {
    setSelectedLocation(location);
    setLocationDialogMode(mode);
  };

  const handleCloseLocationDialog = () => {
    setSelectedLocation(null);
    setLocationDialogMode(null);
  };

  const handleSaveLocation = () => {
    // Handle save logic here
    handleCloseLocationDialog();
  };

  const handleDeleteLocation = async () => {
    if (!selectedLocation) return;
    if (!confirm('Are you sure you want to delete this location?')) return;
    
    try {
      // TODO: Implement location deletion API when available
      // const result = await apiService.deleteLocation(String(selectedLocation.id));
      toast.success('Location deletion not yet implemented');
      handleCloseLocationDialog();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete location');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Platform overview and management</p>
        </div>
        <Button variant="outline" onClick={() => setPlatformSettingsOpen(true)} className="w-full sm:w-auto">
          <Settings className="w-4 h-4 mr-2" />
          Platform Settings
        </Button>
      </div>

      {/* Alert for pending approvals */}
      {platformStats && platformStats.pendingApprovals > 0 && (
        <Card className="mb-4 sm:mb-6 border-orange-300 bg-orange-50">
          <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{platformStats.pendingApprovals} items require your attention</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('approvals')} className="w-full sm:w-auto">Review Now</Button>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        {/* Slider Navigation */}
        <div className="space-y-3 sm:space-y-4">
          {/* Tab Name with Arrows */}
          <div className="relative text-center">
            <h2 className="text-xl sm:text-2xl capitalize">{activeTab === 'approvals' ? 'Approvals' : activeTab}</h2>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const tabs = ['overview', 'businesses', 'users', 'locations', 'distributors', 'approvals'];
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
                const tabs = ['overview', 'businesses', 'users', 'locations', 'distributors', 'approvals'];
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
            {['overview', 'businesses', 'users', 'locations', 'distributors', 'approvals'].map((tab) => (
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
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Businesses</p>
                <p className="text-2xl sm:text-3xl">{platformStats?.total_businesses?.toLocaleString() || '0'}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-2xl sm:text-3xl">{platformStats?.total_users?.toLocaleString() || '0'}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Featured Businesses</p>
                <p className="text-2xl sm:text-3xl">{platformStats?.featured_businesses?.toLocaleString() || '0'}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Currently featured</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Businesses with Deals</p>
                <p className="text-2xl sm:text-3xl">{platformStats?.businesses_with_deals?.toLocaleString() || '0'}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Partners</p>
                <p className="text-2xl sm:text-3xl">{platformStats?.total_partners?.toLocaleString() || '0'}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Business partners</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Recent Signups</p>
                <p className="text-2xl sm:text-3xl">{platformStats?.recent_signups?.toLocaleString() || '0'}</p>
                <Button size="sm" className="mt-2 w-full text-xs sm:text-sm" variant="outline" onClick={() => setActiveTab('approvals')}>Review</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Recent Businesses</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Latest business registrations</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  {(Array.isArray(recentBusinesses) ? recentBusinesses.slice(0, 4) : []).map((business) => (
                    <div key={business.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm truncate">{business.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{business.owner}</p>
                      </div>
                      <Badge variant={business.status === 'Active' ? 'default' : 'secondary'} className="text-xs ml-2 flex-shrink-0">
                        {business.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Pending Approvals</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Items requiring review</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  {(Array.isArray(pendingApprovals) ? pendingApprovals : []).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.type} - {item.date}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setActiveTab('approvals')} className="text-xs flex-shrink-0">Review</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="businesses">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg">Business Management</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Manage all business listings</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input placeholder="Search businesses..." className="w-full sm:w-64 text-sm" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {isLoadingBusinesses ? (
                  <div className="text-center py-8 text-muted-foreground">Loading businesses...</div>
                ) : businesses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No businesses found</div>
                ) : (
                  (Array.isArray(businesses) ? businesses : []).map((business) => (
                  <div key={business.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{business.name}</p>
                        <p className="text-xs text-muted-foreground">{business.user?.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{business.category}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleBusinessAction(business, 'view')}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFeatured(business.id)}>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            {business.featured ? 'Unfeature' : 'Feature'} Business
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBusinessAction(business, 'edit')}>
                            <Edit className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteBusiness(business.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                      {business.featured && <Badge variant="default" className="text-xs">Featured</Badge>}
                      {business.has_deals && <Badge variant="secondary" className="text-xs">Has Deals</Badge>}
                      <Badge variant="outline" className="text-xs">{business.category}</Badge>
                    </div>
                  </div>
                ))
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Business Name</TableHead>
                      <TableHead className="text-xs sm:text-sm">Owner</TableHead>
                      <TableHead className="text-xs sm:text-sm">Category</TableHead>
                      <TableHead className="text-xs sm:text-sm">Plan</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      <TableHead className="text-xs sm:text-sm">Joined</TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(Array.isArray(recentBusinesses) ? recentBusinesses : []).map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="text-xs sm:text-sm">{business.name}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{business.owner}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{business.category}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant={business.plan === 'Featured' ? 'default' : 'secondary'} className="text-xs">
                            {business.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant={business.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                            {business.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{business.joined}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleBusinessAction(business, 'view')}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBusinessAction(business, 'edit')}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleBusinessAction(business, 'delete')}>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg">User Management</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Manage platform users</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input placeholder="Search users..." className="w-full sm:w-64 text-sm" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {isLoadingUsers ? (
                  <div className="text-center py-8 text-muted-foreground">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No users found</div>
                ) : (
                  users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction(user, 'view')}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction(user, 'edit')}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleUserAction(user, 'suspend')}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-xs">{user.status}</Badge>
                        <span className="text-muted-foreground">{user.savedDeals} deals saved</span>
                      </div>
                      <span className="text-muted-foreground">{user.joined}</span>
                    </div>
                  </div>
                ))
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Name</TableHead>
                      <TableHead className="text-xs sm:text-sm">Email</TableHead>
                      <TableHead className="text-xs sm:text-sm">Type</TableHead>
                      <TableHead className="text-xs sm:text-sm">Businesses</TableHead>
                      <TableHead className="text-xs sm:text-sm">Saved Deals</TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingUsers ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No users found</TableCell>
                      </TableRow>
                    ) : (
                      (Array.isArray(users) ? users : []).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-xs sm:text-sm">{user.name}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{user.email}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant="outline">{user.user_type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{user.businesses_count || 0}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{user.saved_deals_count || 0}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant="default" className="text-xs">{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUserAction(user, 'view')}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUserAction(user, 'edit')}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                    )}
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
                  <CardTitle className="text-base sm:text-lg">Location Management</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Manage cities and view location-based statistics</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input placeholder="Search locations..." className="w-full sm:w-64 text-sm" />
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
                        <p className="text-xl sm:text-2xl">{Array.isArray(locations) ? locations.length : 0}</p>
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
                        <p className="text-xl sm:text-2xl">{(() => {
                          const total = Array.isArray(locations) ? locations.reduce((sum, loc) => sum + (Number(loc?.totalBusinesses) || 0), 0) : 0;
                          return typeof total === 'number' && !isNaN(total) ? total.toLocaleString() : '0';
                        })()}</p>
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
                        <p className="text-xl sm:text-2xl">{(() => {
                          const total = Array.isArray(locations) ? locations.reduce((sum, loc) => sum + (Number(loc?.activeDeals) || 0), 0) : 0;
                          return typeof total === 'number' && !isNaN(total) ? total.toLocaleString() : '0';
                        })()}</p>
                      </div>
                      <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Users</p>
                        <p className="text-xl sm:text-2xl">{(() => {
                          const total = Array.isArray(locations) ? locations.reduce((sum, loc) => sum + (Number(loc?.totalUsers) || 0), 0) : 0;
                          return typeof total === 'number' && !isNaN(total) ? total.toLocaleString() : '0';
                        })()}</p>
                      </div>
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Loading State */}
              {isLoadingLocations ? (
                <div className="text-center py-12">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
                    <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
                  </div>
                </div>
              ) : (!Array.isArray(locations) || locations.length === 0) ? (
                <div className="text-center py-12">
                  <Map className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Locations Found</h3>
                  <p className="text-muted-foreground">No businesses with valid addresses found.</p>
                </div>
              ) : (
                <>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {(Array.isArray(locations) ? locations : []).map((location) => (
                  <div key={location.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium truncate">{location.city}, {location.state}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">{location.monthlyGrowth}% growth</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleLocationAction(location, 'view')}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLocationAction(location, 'edit')}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleLocationAction(location, 'delete')}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Businesses</p>
                        <p className="font-medium">{(location.totalBusinesses ?? 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Deals</p>
                        <p className="font-medium">{(location.activeDeals ?? 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Users</p>
                        <p className="font-medium">{(location.totalUsers ?? 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">City</TableHead>
                      <TableHead className="text-xs sm:text-sm">State</TableHead>
                      <TableHead className="text-xs sm:text-sm">Businesses</TableHead>
                      <TableHead className="text-xs sm:text-sm">Active Deals</TableHead>
                      <TableHead className="text-xs sm:text-sm">Users</TableHead>
                      <TableHead className="text-xs sm:text-sm">Growth</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingLocations ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : (!Array.isArray(locations) || locations.length === 0) ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No locations found</TableCell>
                      </TableRow>
                    ) : (
                      (Array.isArray(locations) ? locations : []).map((location) => (
                      <TableRow key={location.id}>
                        <TableCell className="text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{location.city}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{location.state}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{(location.totalBusinesses ?? 0).toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{(location.activeDeals ?? 0).toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{(location.totalUsers ?? 0).toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">{location.monthlyGrowth}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant="default" className="text-xs">{location.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleLocationAction(location, 'view')}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLocationAction(location, 'edit')}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleLocationAction(location, 'delete')}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                    )}
                  </TableBody>
                </Table>
              </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distributors" className="space-y-4 sm:space-y-6">
          {/* Pending Applications */}
          {pendingApprovals.filter(item => item.type === 'Distributor').length > 0 && (
            <Card className="border-orange-300 bg-orange-50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Pending Applications</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Distributor applications awaiting approval</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {(Array.isArray(pendingApprovals) ? pendingApprovals.filter(item => item.type === 'Distributor') : []).map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border bg-white rounded-lg hover:bg-muted/50 transition-colors gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge className="text-xs bg-orange-600">Pending</Badge>
                          <p className="text-sm sm:text-base font-medium">{item.name}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Requested by {item.requestedBy} on {item.date}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <Button size="sm" variant="outline" onClick={() => handleApprovalAction(item, 'view')} className="flex-1 sm:flex-none text-xs">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button size="sm" onClick={() => handleApprovalAction(item, 'approve')} className="flex-1 sm:flex-none text-xs">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Approve</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Distributors */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-base sm:text-lg">Active Distribution Partners</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Manage active distributor accounts and platforms</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input placeholder="Search distributors..." className="w-full sm:w-64 text-sm" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {isLoadingDistributors ? (
                <div className="text-center py-8 text-muted-foreground">Loading distributors...</div>
              ) : activeDistributors.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No distributors found</div>
              ) : (
                <div className="space-y-4">
                  {(Array.isArray(activeDistributors) ? activeDistributors : []).map((distributor) => (
                  <Card key={distributor.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Main Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{distributor.name}</h3>
                                <Badge variant="default" className="text-xs">{distributor.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{distributor.contactPerson}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDistributorAction(distributor, 'view')}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Full Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDistributorAction(distributor, 'edit')}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Globe className="w-4 h-4 mr-2" />
                                  View Platform
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">{distributor.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span>{distributor.phone}</span>
                            </div>
                          </div>

                          {/* White-Label Platform Info */}
                          <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">White-Label Platform</span>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subdomain:</span>
                                <span className="font-medium">{distributor.subdomain}</span>
                              </div>
                              {distributor.customDomain && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Custom Domain:</span>
                                  <span className="font-medium">{distributor.customDomain}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Primary Color:</span>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded border" 
                                    style={{ backgroundColor: distributor.primaryColor }}
                                  />
                                  <span className="font-medium">{distributor.primaryColor}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 lg:w-64">
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Businesses</p>
                            <p className="text-xl font-semibold">{distributor.totalBusinesses}</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Pending</p>
                            <p className="text-xl font-semibold">{distributor.pendingApprovals}</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Active Deals</p>
                            <p className="text-xl font-semibold">{distributor.activeDeals}</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Members</p>
                            <p className="text-xl font-semibold">{distributor.communityMembers || 0}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Pending Approvals</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Review and approve pending items</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => handleApprovalAction(item, 'view')}>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge className="text-xs">{item.type}</Badge>
                        <p className="text-sm sm:text-base">{item.name}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Requested by {item.requestedBy || item.business} on {item.date}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <Button size="sm" variant="outline" onClick={() => handleApprovalAction(item, 'view')} className="flex-1 sm:flex-none text-xs">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleApprovalAction(item, 'approve')} className="flex-1 sm:flex-none text-xs">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Approve</span>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleApprovalAction(item, 'reject')} className="flex-1 sm:flex-none text-xs">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Reject</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Details/Edit/Suspend Dialog */}
      <Dialog open={userDialogMode !== null} onOpenChange={(open) => !open && handleCloseUserDialog()}>
        <DialogContent className="sm:max-w-[600px]" aria-describedby="user-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {userDialogMode === 'view' && 'User Profile'}
              {userDialogMode === 'edit' && 'Edit User'}
              {userDialogMode === 'suspend' && 'Suspend User'}
            </DialogTitle>
            <DialogDescription id="user-dialog-description">
              {userDialogMode === 'view' && 'View detailed user information'}
              {userDialogMode === 'edit' && 'Update user account details'}
              {userDialogMode === 'suspend' && 'Are you sure you want to suspend this user?'}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {userDialogMode === 'suspend' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm">
                      Suspending <span className="font-semibold">{selectedUser.name}</span> will prevent them from accessing their account and saved deals. This action can be reversed later.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedUser.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* User Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      {userDialogMode === 'edit' ? (
                        <Input defaultValue={selectedUser.name} />
                      ) : (
                        <p className="text-sm font-semibold">{selectedUser.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <Badge variant="default">{selectedUser.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    {userDialogMode === 'edit' ? (
                      <Input type="email" defaultValue={selectedUser.email} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedUser.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Joined Date</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedUser.joined}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Saved Deals</label>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedUser.savedDeals} deals</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details Section */}
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-3">Activity Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Saved Deals</span>
                        <span className="font-medium">{selectedUser.savedDeals}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Account Status</span>
                        <span className="font-medium">{selectedUser.status}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Member Since</span>
                        <span className="font-medium">{selectedUser.joined}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseUserDialog}>
              {userDialogMode === 'suspend' ? 'Cancel' : 'Close'}
            </Button>
            {userDialogMode === 'edit' && (
              <Button onClick={handleSaveUser}>Save Changes</Button>
            )}
            {userDialogMode === 'suspend' && selectedUser && (
              <Button variant="destructive" onClick={handleSuspendUser}>
                Suspend User
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Details/Approve/Reject Dialog */}
      <Dialog open={approvalDialogMode !== null} onOpenChange={(open) => !open && handleCloseApprovalDialog()}>
        <DialogContent className="sm:max-w-[700px]" aria-describedby="approval-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {approvalDialogMode === 'view' && 'Approval Details'}
              {approvalDialogMode === 'approve' && 'Approve Request'}
              {approvalDialogMode === 'reject' && 'Reject Request'}
            </DialogTitle>
            <DialogDescription id="approval-dialog-description">
              {approvalDialogMode === 'view' && 'Review the details of this pending approval'}
              {approvalDialogMode === 'approve' && 'Confirm approval of this request'}
              {approvalDialogMode === 'reject' && 'Provide a reason for rejecting this request'}
            </DialogDescription>
          </DialogHeader>

          {selectedApproval && (
            <div className="space-y-4">
              {/* Common Info */}
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Badge>{selectedApproval.type}</Badge>
                  <h3 className="font-semibold">{selectedApproval.name}</h3>
                </div>
                
                {selectedApproval.type === 'Business' && (
                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium">Owner</p>
                        <p className="text-sm text-muted-foreground">{selectedApproval.requestedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-sm text-muted-foreground">{selectedApproval.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{selectedApproval.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApproval.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApproval.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApproval.phone}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Requested Plan</p>
                      <Badge variant="secondary">{selectedApproval.requestedPlan}</Badge>
                    </div>
                  </div>
                )}

                {selectedApproval.type === 'Distributor' && (
                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium">Contact Person</p>
                        <p className="text-sm text-muted-foreground">{selectedApproval.requestedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Organization</p>
                        <p className="text-sm text-muted-foreground">{selectedApproval.organization}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{selectedApproval.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApproval.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApproval.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApproval.phone}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedApproval.type === 'Deal' && (
                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium">Business</p>
                        <p className="text-sm text-muted-foreground">{selectedApproval.business}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-sm text-muted-foreground">{selectedApproval.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Deal Description</p>
                      <p className="text-sm text-muted-foreground">{selectedApproval.dealDescription}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Valid Until</p>
                      <p className="text-sm text-muted-foreground">{selectedApproval.validUntil}</p>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">Submitted on {selectedApproval.date}</p>
                </div>
              </div>

              {approvalDialogMode === 'approve' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    This {selectedApproval.type.toLowerCase()} will be approved and activated on the platform.
                  </p>
                </div>
              )}

              {approvalDialogMode === 'reject' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                    <Textarea 
                      id="rejection-reason"
                      placeholder="Please provide a reason for rejecting this request..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm">
                      The requester will be notified of your decision and the reason provided.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseApprovalDialog}>
              Cancel
            </Button>
            {approvalDialogMode === 'approve' && selectedApproval && (
              <Button onClick={handleApproveItem}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            )}
            {approvalDialogMode === 'reject' && selectedApproval && (
              <Button variant="destructive" onClick={handleRejectItem}>
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            )}
            {approvalDialogMode === 'view' && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setApprovalDialogMode('reject')}>
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={() => setApprovalDialogMode('approve')}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Distributor Details/Edit Dialog */}
      <Dialog open={distributorDialogMode !== null} onOpenChange={(open) => !open && handleCloseDistributorDialog()}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto" aria-describedby="distributor-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {distributorDialogMode === 'view' && 'Distributor Details'}
              {distributorDialogMode === 'edit' && 'Edit Distributor'}
            </DialogTitle>
            <DialogDescription id="distributor-dialog-description">
              {distributorDialogMode === 'view' && 'View detailed distributor and white-label platform information'}
              {distributorDialogMode === 'edit' && 'Update distributor account and platform settings'}
            </DialogDescription>
          </DialogHeader>

          {selectedDistributor && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="platform">Platform</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {/* Distributor Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Organization Name</Label>
                      {distributorDialogMode === 'edit' ? (
                        <Input defaultValue={selectedDistributor.name} />
                      ) : (
                        <p className="text-sm font-semibold">{selectedDistributor.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Status</Label>
                      <Badge variant="default">{selectedDistributor.status || 'Pending'}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Contact Person</Label>
                      {distributorDialogMode === 'edit' ? (
                        <Input defaultValue={selectedDistributor.contactPerson || selectedDistributor.requestedBy} />
                      ) : (
                        <p className="text-sm">{selectedDistributor.contactPerson || selectedDistributor.requestedBy}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Member Since</Label>
                      <p className="text-sm">{selectedDistributor.memberSince || selectedDistributor.date}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    {distributorDialogMode === 'edit' ? (
                      <Input type="email" defaultValue={selectedDistributor.email} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedDistributor.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Phone</Label>
                    {distributorDialogMode === 'edit' ? (
                      <Input defaultValue={selectedDistributor.phone} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedDistributor.phone}</p>
                      </div>
                    )}
                  </div>

                  {selectedDistributor.description && (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Description</Label>
                      <p className="text-sm text-muted-foreground">{selectedDistributor.description}</p>
                    </div>
                  )}

                  {selectedDistributor.address && (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Address</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedDistributor.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="platform" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5" />
                      <h4 className="font-semibold">White-Label Platform Settings</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Subdomain</Label>
                        {distributorDialogMode === 'edit' ? (
                          <Input defaultValue={selectedDistributor.subdomain} className="mt-1" />
                        ) : (
                          <p className="text-sm font-medium mt-1">{selectedDistributor.subdomain || 'Not configured'}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm text-muted-foreground">Custom Domain</Label>
                        {distributorDialogMode === 'edit' ? (
                          <Input defaultValue={selectedDistributor.customDomain} placeholder="Optional" className="mt-1" />
                        ) : (
                          <p className="text-sm font-medium mt-1">{selectedDistributor.customDomain || 'Not configured'}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Primary Color</Label>
                          {distributorDialogMode === 'edit' ? (
                            <div className="flex gap-2 mt-1">
                              <Input defaultValue={selectedDistributor.primaryColor} className="flex-1" />
                              <div 
                                className="w-10 h-10 rounded border" 
                                style={{ backgroundColor: selectedDistributor.primaryColor }}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-1">
                              <div 
                                className="w-6 h-6 rounded border" 
                                style={{ backgroundColor: selectedDistributor.primaryColor }}
                              />
                              <p className="text-sm font-medium">{selectedDistributor.primaryColor || 'Not set'}</p>
                            </div>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm text-muted-foreground">Secondary Color</Label>
                          {distributorDialogMode === 'edit' ? (
                            <div className="flex gap-2 mt-1">
                              <Input defaultValue={selectedDistributor.secondaryColor} className="flex-1" />
                              <div 
                                className="w-10 h-10 rounded border" 
                                style={{ backgroundColor: selectedDistributor.secondaryColor }}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-1">
                              <div 
                                className="w-6 h-6 rounded border" 
                                style={{ backgroundColor: selectedDistributor.secondaryColor }}
                              />
                              <p className="text-sm font-medium">{selectedDistributor.secondaryColor || 'Not set'}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedDistributor.subdomain && distributorDialogMode === 'view' && (
                        <div className="pt-3 border-t">
                          <Button variant="outline" size="sm" className="w-full">
                            <Globe className="w-4 h-4 mr-2" />
                            Visit Platform
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Businesses</p>
                          <p className="text-2xl font-semibold">{selectedDistributor.totalBusinesses || 0}</p>
                        </div>
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pending Approvals</p>
                          <p className="text-2xl font-semibold">{selectedDistributor.pendingApprovals || 0}</p>
                        </div>
                        <Clock className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Deals</p>
                          <p className="text-2xl font-semibold">{selectedDistributor.activeDeals || 0}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Community Members</p>
                          <p className="text-2xl font-semibold">{selectedDistributor?.communityMembers || 0}</p>
                        </div>
                        <Users className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Approval Rate</span>
                      <span className="font-medium">
                        {selectedDistributor.totalBusinesses 
                          ? Math.round((selectedDistributor.totalBusinesses / (selectedDistributor.totalBusinesses + selectedDistributor.pendingApprovals)) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deals per Business</span>
                      <span className="font-medium">
                        {selectedDistributor.totalBusinesses 
                          ? (selectedDistributor.activeDeals / selectedDistributor.totalBusinesses).toFixed(1)
                          : 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Members per Business</span>
                      <span className="font-medium">
                        {selectedDistributor.totalBusinesses 
                          ? Math.round((selectedDistributor?.communityMembers || 0) / (selectedDistributor?.totalBusinesses || 1))
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDistributorDialog}>
              Close
            </Button>
            {distributorDialogMode === 'edit' && (
              <Button onClick={handleSaveDistributor}>Save Changes</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Business Details/Edit/Delete Dialog */}
      <Dialog open={businessDialogMode !== null} onOpenChange={(open) => !open && handleCloseBusinessDialog()}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" aria-describedby="business-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {businessDialogMode === 'view' && 'Business Details'}
              {businessDialogMode === 'edit' && 'Edit Business'}
              {businessDialogMode === 'delete' && 'Delete Business'}
            </DialogTitle>
            <DialogDescription id="business-dialog-description">
              {businessDialogMode === 'view' && 'View detailed business information'}
              {businessDialogMode === 'edit' && 'Update business information and settings'}
              {businessDialogMode === 'delete' && 'Are you sure you want to delete this business? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>

          {selectedBusiness && businessDialogMode !== 'delete' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Business Name</Label>
                  {businessDialogMode === 'edit' ? (
                    <Input defaultValue={selectedBusiness.name} />
                  ) : (
                    <p className="text-sm font-semibold">{selectedBusiness.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Owner</Label>
                  {businessDialogMode === 'edit' ? (
                    <Input defaultValue={selectedBusiness.owner} />
                  ) : (
                    <p className="text-sm font-semibold">{selectedBusiness.owner}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Category</Label>
                  {businessDialogMode === 'edit' ? (
                    <Select defaultValue={selectedBusiness.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Dining">Dining</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm">{selectedBusiness.category}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Plan</Label>
                  {businessDialogMode === 'edit' ? (
                    <Select defaultValue={selectedBusiness.plan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Featured">Featured</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={selectedBusiness.plan === 'Featured' ? 'default' : 'secondary'}>
                      {selectedBusiness.plan}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  {businessDialogMode === 'edit' ? (
                    <Select defaultValue={selectedBusiness.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={selectedBusiness.status === 'Active' ? 'default' : 'secondary'}>
                      {selectedBusiness.status}
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Joined</Label>
                  <p className="text-sm">{selectedBusiness.joined}</p>
                </div>
              </div>

              {businessDialogMode === 'view' && (
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-medium">#{selectedBusiness.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="font-medium">{selectedBusiness.joined}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedBusiness && businessDialogMode === 'delete' && (
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm">
                  You are about to delete <span className="font-semibold">{selectedBusiness.name}</span>. 
                  This will remove all associated deals, analytics, and customer data.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Business Details:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Owner: {selectedBusiness.owner}</li>
                  <li>Category: {selectedBusiness.category}</li>
                  <li>Plan: {selectedBusiness.plan}</li>
                  <li>Status: {selectedBusiness.status}</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseBusinessDialog}>
              Cancel
            </Button>
            {businessDialogMode === 'edit' && (
              <Button onClick={handleSaveBusiness}>Save Changes</Button>
            )}
            {businessDialogMode === 'delete' && selectedBusiness && (
              <Button variant="destructive" onClick={() => handleDeleteBusiness(selectedBusiness.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Business
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Details/Edit/Delete Dialog */}
      <Dialog open={locationDialogMode !== null} onOpenChange={(open) => !open && handleCloseLocationDialog()}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto" aria-describedby="location-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {locationDialogMode === 'view' && 'Location Details'}
              {locationDialogMode === 'edit' && 'Edit Location'}
              {locationDialogMode === 'delete' && 'Delete Location'}
            </DialogTitle>
            <DialogDescription id="location-dialog-description">
              {locationDialogMode === 'view' && 'View detailed location statistics and information'}
              {locationDialogMode === 'edit' && 'Update location information and settings'}
              {locationDialogMode === 'delete' && 'Are you sure you want to delete this location? All associated data will be preserved but ungrouped.'}
            </DialogDescription>
          </DialogHeader>

          {selectedLocation && locationDialogMode !== 'delete' && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">City</Label>
                  {locationDialogMode === 'edit' ? (
                    <Input defaultValue={selectedLocation.city} />
                  ) : (
                    <p className="text-sm font-semibold">{selectedLocation.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">State</Label>
                  {locationDialogMode === 'edit' ? (
                    <Input defaultValue={selectedLocation.state} />
                  ) : (
                    <p className="text-sm font-semibold">{selectedLocation.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Country</Label>
                  {locationDialogMode === 'edit' ? (
                    <Input defaultValue={selectedLocation.country} />
                  ) : (
                    <p className="text-sm">{selectedLocation.country}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  {locationDialogMode === 'edit' ? (
                    <Select defaultValue={selectedLocation.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="default">{selectedLocation.status}</Badge>
                  )}
                </div>
              </div>

              {/* Statistics */}
              {locationDialogMode === 'view' && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold">Location Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Businesses</p>
                            <p className="text-2xl font-semibold">{(selectedLocation.totalBusinesses ?? 0).toLocaleString()}</p>
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
                            <p className="text-2xl font-semibold">{(selectedLocation.activeDeals ?? 0).toLocaleString()}</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-semibold">{(selectedLocation.totalUsers ?? 0).toLocaleString()}</p>
                          </div>
                          <Users className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Distributors</p>
                            <p className="text-2xl font-semibold">{selectedLocation.distributors}</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-semibold mb-3">Performance Metrics</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Growth</span>
                        <span className="font-medium text-green-600">+{selectedLocation.monthlyGrowth}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Deals per Business</span>
                        <span className="font-medium">
                          {(selectedLocation.activeDeals / selectedLocation.totalBusinesses).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Users per Business</span>
                        <span className="font-medium">
                          {Math.round(selectedLocation.totalUsers / selectedLocation.totalBusinesses)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Added Date</span>
                        <span className="font-medium">{selectedLocation.addedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedLocation && locationDialogMode === 'delete' && (
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm">
                  You are about to delete <span className="font-semibold">{selectedLocation.city}, {selectedLocation.state}</span>. 
                  Businesses and data will be preserved but will no longer be grouped under this location.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Location Impact:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>{selectedLocation.totalBusinesses.toLocaleString()} businesses will be ungrouped</li>
                  <li>{selectedLocation.activeDeals.toLocaleString()} active deals affected</li>
                  <li>{selectedLocation.totalUsers.toLocaleString()} users in this area</li>
                  <li>{selectedLocation.distributors} distribution partners operating here</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseLocationDialog}>
              Cancel
            </Button>
            {locationDialogMode === 'edit' && (
              <Button onClick={handleSaveLocation}>Save Changes</Button>
            )}
            {locationDialogMode === 'delete' && selectedLocation && (
              <Button variant="destructive" onClick={handleDeleteLocation}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Location
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Platform Settings Dialog */}
      <Dialog open={platformSettingsOpen} onOpenChange={setPlatformSettingsOpen}>
        <DialogContent className="sm:max-w-[700px]" aria-describedby="platform-settings-description">
          <DialogHeader>
            <DialogTitle>Platform Settings</DialogTitle>
            <DialogDescription id="platform-settings-description">
              Configure global platform settings and policies
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="PREFERRED DEALS" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@preferreddeals.com" className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Temporarily disable platform access for maintenance
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow New Business Registrations</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable businesses to register on the platform
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="policies" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Approve Businesses</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Automatically approve new business listings
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Email Verification</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Users must verify email before accessing deals
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Cookie Consent</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Show cookie consent popup to users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label htmlFor="min-deal-duration">Minimum Deal Duration (days)</Label>
                  <Input id="min-deal-duration" type="number" defaultValue="7" className="mt-2" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
                  <Input id="api-rate-limit" type="number" defaultValue="100" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="max-upload-size">Max Upload Size (MB)</Label>
                  <Input id="max-upload-size" type="number" defaultValue="5" className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Analytics</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Track platform usage and performance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable detailed error logging
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPlatformSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setPlatformSettingsOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}