import { useState } from 'react';
import { Building2, Image, MapPin, Phone, Mail, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { apiService } from '../services/api';

interface BecomePartnerProps {
  onSignupComplete: (businessId: string) => void;
  onBack?: () => void;
}

export function BecomePartner({ onSignupComplete, onBack }: BecomePartnerProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    imageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const businessData = {
        name: formData.businessName,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        image_url: formData.imageUrl,
        rating: 0,
        review_count: 0,
        featured: false,
        has_deals: false,
        hours: {},
        amenities: [],
        gallery: []
      };
      
      const response = await apiService.createBusiness(businessData);
      
      toast.success('Success! Your business listing has been created.', {
        description: 'You can now manage your listing from the dashboard.',
      });
      
      onSignupComplete(response.id);
    } catch (error) {
      toast.error('Failed to create business listing');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      )}
      <div className="mb-8">
        <h1 className="mb-2">Become a Partner</h1>
        <p className="text-muted-foreground">
          Join our directory and connect with thousands of local customers
        </p>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Increased Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get discovered by customers actively searching for your services
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track views, clicks, and engagement with detailed analytics
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Featured Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upgrade to featured status and appear at the top of search results
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sign Up Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Your Business Listing</CardTitle>
          <CardDescription>
            Fill out the form below to create your business profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <Textarea
                  id="description"
                  placeholder="Describe your business..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="pl-10 min-h-24"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="address"
                  placeholder="123 Main St, City, State ZIP"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@business.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://www.yourbusiness.com"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Business Image URL</Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[rgb(0,0,0)]">
              Create Business Listing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
