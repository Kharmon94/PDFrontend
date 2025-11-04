import { useState } from 'react';
import { Building2, Image, MapPin, Phone, Mail, FileText, ArrowLeft, Check, Star, Sparkles, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

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
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate creating a business listing
    const businessId = `biz-${Date.now()}`;
    
    toast('Success! Your business listing has been created.', {
      description: 'You can now manage your listing from the dashboard.',
    });
    
    onSignupComplete(businessId);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const monthlyPrice = 49;
  const annualPrice = monthlyPrice * 10; // 10 months price for 12 months
  const annualMonthlyEquivalent = annualPrice / 12;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      )}
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full mb-4">
          <Gift className="w-4 h-4" />
          <span className="text-sm">Join FREE & Get Branded NFC Stands</span>
        </div>
        <h1 className="mb-4">Become a Partner</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join the NFC-Powered Word Of Mouth Deal Network and connect with thousands of local customers. 
          Start for free and receive complimentary Preferred Deals branded NFC stands for your business.
        </p>
      </div>

      {/* Free Plan Highlight */}
      <Card className="mb-12 border-2 border-black">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 p-4 bg-black text-white rounded-lg">
              <Gift className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="m-0">Free Partner Program</h2>
                <Badge className="bg-green-600">Always Free</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Get started at no cost and receive branded NFC stands to showcase your business
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic business listing</span>
                </div>
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Free Preferred Deals NFC stands</span>
                </div>
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 5 photos</span>
                </div>
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Post deals & offers</span>
                </div>
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Contact information display</span>
                </div>
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic analytics</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Plans Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="mb-4">Upgrade to Premium</h2>
          <p className="text-muted-foreground mb-6">
            Get featured placement, unlimited photos, and advanced analytics
          </p>
          
          {/* Pricing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-gray-100 rounded-lg">
            <span className={`text-sm transition-colors ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-black"
            />
            <span className={`text-sm transition-colors ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save 2 Months
              </Badge>
            )}
          </div>
        </div>

        {/* Premium Plan Card */}
        <Card className="max-w-2xl mx-auto border-2 border-gray-200">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-black text-white rounded-lg">
                <Star className="w-6 h-6" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-2">Premium Listing</CardTitle>
            <CardDescription>
              Maximum visibility and advanced features for your business
            </CardDescription>
            
            {/* Pricing Display */}
            <div className="mt-6">
              {isAnnual ? (
                <>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">${annualPrice}</span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Equivalent to ${annualMonthlyEquivalent.toFixed(2)}/month
                  </p>
                  <Badge variant="secondary" className="mt-3">
                    Save ${monthlyPrice * 2} compared to monthly
                  </Badge>
                </>
              ) : (
                <>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">${monthlyPrice}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Billed monthly
                  </p>
                </>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Everything in Free Plan</p>
                  <p className="text-sm text-muted-foreground">Plus all premium features below</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Featured business badge</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Priority in search results</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Unlimited photos & media</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Post unlimited deals</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Advanced analytics dashboard</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Social media integration</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Priority customer support</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Featured on homepage</span>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span>Enhanced NFC stand options available</span>
              </div>
            </div>

            <Button className="w-full bg-black">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sign Up Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Your Business Listing</CardTitle>
          <CardDescription>
            Fill out the form below to get started for free
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
              Create Free Business Listing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
