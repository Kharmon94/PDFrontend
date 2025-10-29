import { useState, useEffect } from 'react';
import { Search, Star, Tag, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BusinessCard } from './business-card';
import { apiService } from '../services/api';
import { toast } from 'sonner@2.0.3';

interface DirectoryPageProps {
  onViewListing: (businessId: string) => void;
  initialCategory?: string;
}

export function DirectoryPage({ onViewListing, initialCategory }: DirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Update selected category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory === 'featured') {
      setActiveTab('featured');
      setSelectedCategory(null);
    } else if (initialCategory) {
      setSelectedCategory(initialCategory);
      setActiveTab('all');
    }
  }, [initialCategory]);

  // Load businesses from API
  useEffect(() => {
    loadBusinesses();
  }, [searchQuery, selectedCategory, activeTab]);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const params: any = {};
      
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
      if (activeTab === 'featured') params.featured = true;
      if (activeTab === 'deals') params.deals = true;
      
      const data = await apiService.getBusinesses(params);
      setBusinesses(data);
    } catch (error) {
      toast.error('Failed to load businesses');
      console.error('Error loading businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    'Restaurant',
    'Retail',
    'Services',
    'Healthcare',
    'Technology',
    'Entertainment',
  ];

  const filteredBusinesses = businesses;
  const featuredBusinesses = businesses.filter((b) => b.featured);
  const dealsBusinesses = businesses.filter((b) => b.has_deals);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-[rgb(0,0,0)]">Discover Local Businesses</h1>
        <p className="text-muted-foreground">
          Browse through our curated directory of trusted local businesses
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs for Featured, Deals, All */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            All Businesses
          </TabsTrigger>
          <TabsTrigger value="featured" className="gap-2">
            <Star className="w-4 h-4" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="deals" className="gap-2">
            <Tag className="w-4 h-4" />
            Deals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading businesses...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} onClick={() => onViewListing(business.id)} />
              ))}
            </div>
          )}
          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No businesses found matching your criteria
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading featured businesses...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} onClick={() => onViewListing(business.id)} />
              ))}
            </div>
          )}
          {!loading && featuredBusinesses.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No featured businesses available
            </div>
          )}
        </TabsContent>

        <TabsContent value="deals">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading deals...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealsBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} onClick={() => onViewListing(business.id)} />
              ))}
            </div>
          )}
          {!loading && dealsBusinesses.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No deals available at the moment
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}