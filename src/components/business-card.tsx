import { MapPin, Phone, Star, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  onClick?: () => void;
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  // Extract city from address for display
  const city = business.address.split(',')[1]?.trim() || '';
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="relative">
        <ImageWithFallback
          src={business.image || ''}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        {business.featured && (
          <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        {business.has_deals && business.deal && (
          <Badge className="absolute top-2 left-2 bg-destructive hover:bg-destructive/90">
            <Tag className="w-3 h-3 mr-1" />
            Deal
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="mb-1">{business.name}</h3>
            <Badge variant="secondary">{business.category}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">{business.rating}</span>
            <span className="text-xs text-muted-foreground">({business.review_count})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{business.description}</p>
        
        {business.has_deals && business.deal && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2">
            <p className="text-sm text-destructive">{business.deal}</p>
          </div>
        )}
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <div>{business.address}</div>
              {city && <div className="text-xs">{city}</div>}
            </div>
          </div>
          {business.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
