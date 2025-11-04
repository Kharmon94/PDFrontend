import { useState, useEffect } from 'react';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { apiService } from '../services/api';
import { Business } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SavedDealsProps {
  onViewListing: (businessId: string) => void;
  onBack?: () => void;
}

export function SavedDeals({
  onViewListing,
  onBack,
}: SavedDealsProps) {
  const [savedBusinesses, setSavedBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchSavedDeals();
  }, []);

  const fetchSavedDeals = async () => {
    try {
      const deals = await apiService.getSavedDeals();
      setSavedBusinesses(deals);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load saved deals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (businessId: number, businessName: string) => {
    setRemovingIds(prev => new Set(prev).add(businessId));
    try {
      await apiService.toggleSavedDeal(String(businessId));
      setSavedBusinesses(prev => prev.filter(b => b.id !== businessId));
    toast.success(`Removed ${businessName} from saved deals`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove deal');
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(businessId);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (savedBusinesses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <h1 className="mb-8">Saved Deals</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="mb-2">No Saved Deals Yet</h2>
            <p className="text-muted-foreground mb-4">
              Start exploring businesses and save deals you're interested in!
            </p>
            <Button onClick={onBack || (() => window.history.back())}>
              Browse Directory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}
      <div className="mb-8">
        <h1 className="mb-2">Saved Deals</h1>
        <p className="text-muted-foreground">
          {savedBusinesses.length} {savedBusinesses.length === 1 ? 'deal' : 'deals'} saved
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBusinesses.map((business) => (
          <Card 
            key={business.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div 
              onClick={() => onViewListing(String(business.id))}
              className="relative"
            >
              <ImageWithFallback
                src={business.image || ''}
                  alt={business.name}
                className="w-full h-48 object-cover"
                />
              {business.has_deals && business.deal && (
                <Badge className="absolute top-2 left-2 bg-destructive hover:bg-destructive/90">
                  Deal Active
                </Badge>
              )}
                    </div>

            <CardContent className="p-4">
              <div className="mb-3">
                <h3 
                  className="font-semibold mb-1 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => onViewListing(String(business.id))}
                >
                  {business.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {business.category}
                </Badge>
                  </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {business.description}
              </p>

              {business.has_deals && business.deal && (
                <div className="mb-4 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                  <p className="text-destructive font-medium line-clamp-2">{business.deal}</p>
                    </div>
                  )}

              <div className="flex gap-2">
                  <Button
                    variant="outline"
                  className="flex-1"
                  onClick={() => onViewListing(String(business.id))}
                  >
                    View Details
                  </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemove(business.id, business.name)}
                  disabled={removingIds.has(business.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
