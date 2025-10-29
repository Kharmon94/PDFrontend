import { Heart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  hasDeals: boolean;
  deal?: string;
}

interface SavedDealsProps {
  savedDealIds: string[];
  businesses: Business[];
  onRemoveDeal: (businessId: string) => void;
  onViewListing: (businessId: string) => void;
}

export function SavedDeals({
  savedDealIds,
  businesses,
  onRemoveDeal,
  onViewListing,
}: SavedDealsProps) {
  const savedBusinesses = businesses.filter(b => savedDealIds.includes(b.id));

  const handleRemove = (businessId: string, businessName: string) => {
    onRemoveDeal(businessId);
    toast.success(`Removed ${businessName} from saved deals`);
  };

  if (savedBusinesses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mb-8">Saved Deals</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="mb-2">No Saved Deals Yet</h2>
            <p className="text-gray-600 mb-4">
              Start exploring businesses and save deals you're interested in!
            </p>
            <Button onClick={() => window.history.back()}>
              Browse Directory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Saved Deals</h1>
        <p className="text-gray-600">
          You have {savedBusinesses.length} saved {savedBusinesses.length === 1 ? 'deal' : 'deals'}
        </p>
      </div>

      <div className="space-y-4">
        {savedBusinesses.map(business => (
          <Card key={business.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="mb-1">{business.name}</h3>
                      <p className="text-sm text-gray-500">{business.category}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(business.id, business.name)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                  {business.hasDeals && business.deal && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                      <p className="text-sm text-red-700">{business.deal}</p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewListing(business.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
