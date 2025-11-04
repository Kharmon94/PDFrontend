import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BusinessCard } from './business-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { useEffect, useState } from 'react';
import { SearchAutocomplete } from './ui/search-autocomplete';
import { apiService } from '../services/api';
import { Business } from '../types';

type Page = 'home' | 'directory' | 'list-your-business' | 'distribution-partner';

interface HomePageProps {
  onNavigate: (page: Page, category?: string, location?: string) => void;
  onViewListing: (businessId: string) => void;
}

export function HomePage({ onNavigate, onViewListing }: HomePageProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch featured businesses on mount
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await apiService.getBusinesses({ featured: true });
        setBusinesses(data);
      } catch (error) {
        console.error('Failed to load featured businesses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBusinesses();
  }, []);
  
  // Get unique categories from businesses
  const categories = Array.from(new Set(businesses.map(b => b.category)));
  
  // Cities matching the admin dashboard locations
  const cities = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Miami, FL',
    'Austin, TX',
  ];

  // Get all featured businesses for a category
  const getFeaturedBusinessesForCategory = (category: string) => {
    return businesses.filter(b => b.category === category && b.featured);
  };

  // Filter categories to only show those with featured businesses
  const categoriesWithFeatured = categories.filter(category => 
    getFeaturedBusinessesForCategory(category).length > 0
  );

  const handleViewCategory = (category: string) => {
    onNavigate('directory', category);
  };

  const handleSelectCity = (city: string) => {
    // Navigate to directory with location filter
    onNavigate('directory', undefined, city);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to directory
    // In a real app, this would search with the query
    onNavigate('directory');
  };

  // Auto-play carousel
  useEffect(() => {
    if (!api) {
      return;
    }

    // Update current slide when carousel changes
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 8000); // Rotate every 8 seconds

    return () => {
      clearInterval(intervalId);
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-3 sm:mb-4">
            Discover Local Businesses & Exclusive Deals
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Your community's trusted business directory with verified listings and special offers
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <SearchAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={(suggestion) => {
                setSearchQuery(suggestion.name);
                onNavigate('directory', suggestion.category);
              }}
              placeholder="Search for businesses, services, or deals..."
              className="w-full"
            />
          </form>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="mb-2">Featured Listings</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Discover top-rated businesses in your area</p>
          </div>
          
          {/* Category Name with Arrows - Mobile Only */}
          <div className="md:hidden text-center mb-3 relative">
            <h3 className="text-xl text-[18px]">{categoriesWithFeatured[current]}</h3>
            
            {/* Navigation Arrows - Mobile */}
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 flex items-center justify-center shadow-sm"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 flex items-center justify-center shadow-sm"
              aria-label="Next category"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carousel Indicators - Mobile Only (moved to top) */}
          <div className="flex md:hidden justify-center gap-2 mb-6">
            {categoriesWithFeatured.map((category, index) => (
              <button
                key={category}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current 
                    ? 'w-8 bg-black' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${category}`}
              />
            ))}
          </div>
          
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {categoriesWithFeatured.map((category) => {
                const featuredBusinesses = getFeaturedBusinessesForCategory(category);
                
                return (
                  <CarouselItem key={category}>
                    <div className="space-y-4 sm:space-y-6">
                      {/* Category Header - Desktop Only */}
                      <div className="hidden md:flex items-center justify-between">
                        <div>
                          <h2 className="mb-1">{category}</h2>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            Featured listings in {category}
                          </p>
                        </div>
                        
                        {/* Carousel Indicators - Desktop (aligned with heading) */}
                        <div className="flex gap-2">
                          {categoriesWithFeatured.map((cat, index) => (
                            <button
                              key={cat}
                              onClick={() => api?.scrollTo(index)}
                              className={`h-2 rounded-full transition-all ${
                                index === current 
                                  ? 'w-8 bg-black' 
                                  : 'w-2 bg-gray-300 hover:bg-gray-400'
                              }`}
                              aria-label={`Go to ${cat}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Featured Business Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {featuredBusinesses.map((business) => (
                          <BusinessCard
                            key={business.id}
                            business={business}
                            onClick={() => onViewListing(String(business.id))}
                          />
                        ))}
                      </div>

                      {/* View All Button - Below Cards */}
                      <div className="flex justify-center pt-2">
                        <Button
                          variant="outline"
                          onClick={() => handleViewCategory(category)}
                          className="flex items-center justify-center gap-2 w-full md:w-auto text-sm sm:text-base"
                        >
                          View All {category}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Browse by City Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <h2 className="mb-2">Browse by City</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Find businesses in your area</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleSelectCity(city)}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-md transition-all group"
              >
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
                <span className="text-sm">{city}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}