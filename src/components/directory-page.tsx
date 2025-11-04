import { useState, useEffect } from 'react';
import { Star, Tag, TrendingUp, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SearchAutocomplete } from './ui/search-autocomplete';
import { BusinessCard } from './business-card';
import { apiService } from '../services/api';
import { Business } from '../types';
import { toast } from 'sonner@2.0.3';

interface DirectoryPageProps {
  onViewListing: (businessId: string) => void;
  initialCategory?: string;
  initialLocation?: string;
}

export function DirectoryPage({ onViewListing, initialCategory, initialLocation }: DirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation || 'all');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch businesses from API
  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiService.getBusinesses({
          search: searchQuery || undefined,
          category: (selectedCategory && selectedCategory !== 'All') ? selectedCategory : undefined,
          featured: activeTab === 'featured' ? true : undefined,
          deals: activeTab === 'deals' ? true : undefined
        });
        setBusinesses(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load businesses');
        toast.error('Failed to load businesses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchQuery, selectedCategory, activeTab]);

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

  // Update selected location when initialLocation prop changes
  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  const categories = [
    'All',
    'Restaurant',
    'Retail',
    'Services',
    'Healthcare',
    'Technology',
    'Entertainment',
  ];

  // Get unique cities from businesses (extract from address field)
  const cities = Array.from(
    new Set(
      businesses
        .map(b => {
          // Extract city from address (assuming format like "123 Street, City, State ZIP")
          const parts = b.address.split(',');
          return parts.length > 1 ? parts[1].trim() : null;
        })
        .filter((city): city is string => Boolean(city))
    )
  ).sort();

  // Filter businesses by location if needed (already filtered by API for search/category/featured/deals)
  const filteredBusinesses = selectedLocation === 'all' 
    ? businesses 
    : businesses.filter((business) => {
        const businessCity = business.address.split(',')[1]?.trim();
        return businessCity === selectedLocation;
      });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4">All Listings</h1>
      </div>

      {/* Search Bar with Location Filter */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search businesses, deals, locations..."
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-64">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <SelectValue placeholder="All Locations" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedLocation !== 'all' && (
          <div className="mt-3">
            <Badge variant="secondary" className="gap-1">
              <MapPin className="w-3 h-3" />
              {selectedLocation}
              <button
                onClick={() => setSelectedLocation('all')}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          </div>
        )}
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} onClick={() => onViewListing(String(business.id))} />
                ))}
              </div>
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No businesses found matching your criteria
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="featured">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} onClick={() => onViewListing(String(business.id))} />
                ))}
              </div>
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No featured businesses available
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="deals">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} onClick={() => onViewListing(String(business.id))} />
                ))}
              </div>
              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No deals available at the moment
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}