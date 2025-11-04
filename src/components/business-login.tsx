import { useState } from 'react';
import { ArrowLeft, Building2, Key, Mail, User, Phone, MapPin, Eye, EyeOff, ChevronRight, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import logoImage from 'figma:asset/dd3bfa837dfa92a5643677141b8779a2931011b6.png';

interface BusinessLoginProps {
  onBack: () => void;
  onLogin: () => void;
  defaultTab?: 'login' | 'signup';
}

export function BusinessLogin({ onBack, onLogin, defaultTab = 'login' }: BusinessLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    listingType: 'free' as 'free' | 'paid',
    category: '',
    website: '',
    offerTitle: '',
    offerDetails: '',
    couponCode: '',
    serviceArea: '',
    logo: null as File | null,
    listingDuration: '30' as '30' | '90' | 'annual',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleSignupNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Skip step 4 (payment) if free listing
    if (signupStep === 3 && signupData.listingType === 'free') {
      handleSignupSubmit(e);
    } else {
      setSignupStep(signupStep + 1);
    }
  };

  const handleSignupPrev = () => {
    setSignupStep(signupStep - 1);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the account then log in
    onLogin();
  };

  const updateSignupData = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand/Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTAtOHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDJ2LTJoLTJ2Mmgyem0tNCAydi0yaC0ydjJoMnptLTQgMHYtMmgtMnYyaDJ6bS00IDB2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptLTQgMHYtMmgtMnYyaDJ6bS00IDB2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptLTQgMHYtMmgtMnYyaDJ6bS00IDB2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnptLTQgMHYtMmgtMnYyaDJ6bS00IDB2LTJoLTJ2Mmgyem0tNCAwdi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 hover:opacity-80 transition-opacity mb-16">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="space-y-6 max-w-md">
            <h1 className="text-5xl leading-tight">
              Reach Local Customers.
            </h1>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Back Button */}
          <button 
            onClick={onBack} 
            className="lg:hidden flex items-center gap-2 mb-8 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <img src={logoImage} alt="Preferred Deals" className="h-10 hidden lg:block" />
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create Your Listing</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-2">
                <h2>Welcome Back!</h2>
                <p className="text-muted-foreground">
                  Log in to manage your business listing and deals.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="pl-10 pr-10 h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button type="button" className="text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full h-12 text-base bg-black hover:bg-gray-800">
                  Log In
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Distribution partner? {' '}
                <button onClick={onBack} className="text-primary hover:underline">
                  Partner login
                </button>
              </p>
            </TabsContent>

            {/* Sign Up Tab - Multi-Step Form */}
            <TabsContent value="signup" className="space-y-6">
              {/* Step 1: Contact Info */}
              {signupStep === 1 && (
                <>
                  <div className="space-y-2 text-center">
                    <h2>Fill Out The Info Below To Get Started</h2>
                  </div>

                  <form onSubmit={handleSignupNext} className="space-y-6">
                    <h3>Contact Info</h3>

                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input
                        id="full-name"
                        type="text"
                        placeholder="John Smith"
                        value={signupData.fullName}
                        onChange={(e) => updateSignupData('fullName', e.target.value)}
                        required
                        className="h-12 bg-gray-50 border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input
                        id="business-name"
                        type="text"
                        placeholder="Your Business Name"
                        value={signupData.businessName}
                        onChange={(e) => updateSignupData('businessName', e.target.value)}
                        required
                        className="h-12 bg-gray-50 border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={signupData.phone}
                        onChange={(e) => updateSignupData('phone', e.target.value)}
                        required
                        className="h-12 bg-white border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@business.com"
                        value={signupData.email}
                        onChange={(e) => updateSignupData('email', e.target.value)}
                        required
                        className="h-12 bg-gray-50 border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>

                    <Button type="submit" className="w-full h-14 text-base bg-black hover:bg-gray-800">
                      NEXT <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </>
              )}

              {/* Step 2: Listing Info */}
              {signupStep === 2 && (
                <>
                  <div className="space-y-2 text-center">
                    <h2>Listing Info</h2>
                  </div>

                  <form onSubmit={handleSignupNext} className="space-y-6">
                    <div className="space-y-3">
                      <Label>Listing Type *</Label>
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => updateSignupData('listingType', 'free')}
                          className={`w-full p-5 border-2 rounded-lg transition-all flex items-center justify-between ${
                            signupData.listingType === 'free'
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-semibold mb-1">Free Listing</div>
                            <div className={`text-sm ${signupData.listingType === 'free' ? 'text-gray-200' : 'text-muted-foreground'}`}>Basic directory listing</div>
                          </div>
                          <div className={`text-3xl ${signupData.listingType === 'free' ? 'text-white' : 'text-black'}`}>$0</div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => updateSignupData('listingType', 'paid')}
                          className={`w-full p-5 border-2 rounded-lg transition-all flex items-center justify-between ${
                            signupData.listingType === 'paid'
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-semibold mb-1">Featured Listing</div>
                            <div className={`text-sm ${signupData.listingType === 'paid' ? 'text-gray-200' : 'text-muted-foreground'}`}>Add deals & promotions</div>
                          </div>
                          <div className={`text-xl ${signupData.listingType === 'paid' ? 'text-white' : 'text-black'}`}>From $49</div>
                        </button>
                      </div>
                    </div>

                    {/* Duration Options - Only show for paid listings */}
                    {signupData.listingType === 'paid' && (
                      <div className="space-y-3">
                        <Label>Listing Duration *</Label>
                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={() => updateSignupData('listingDuration', '30')}
                            className={`w-full p-5 border-2 rounded-lg transition-all flex items-center justify-between ${
                              signupData.listingDuration === '30'
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className={`text-lg ${signupData.listingDuration === '30' ? 'text-white' : 'text-black'}`}>1 Month</div>
                            <div className={`text-2xl ${signupData.listingDuration === '30' ? 'text-white' : 'text-black'}`}>$49</div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => updateSignupData('listingDuration', '90')}
                            className={`w-full p-5 border-2 rounded-lg transition-all flex items-center justify-between relative ${
                              signupData.listingDuration === '90'
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="absolute -top-3 right-4">
                              <span className="text-xs px-3 py-1 bg-green-500 text-white rounded-full">Best Value</span>
                            </div>
                            <div className={`text-lg ${signupData.listingDuration === '90' ? 'text-white' : 'text-black'}`}>3 Months</div>
                            <div className={`text-2xl ${signupData.listingDuration === '90' ? 'text-white' : 'text-black'}`}>$99</div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => updateSignupData('listingDuration', 'annual')}
                            className={`w-full p-5 border-2 rounded-lg transition-all flex items-center justify-between ${
                              signupData.listingDuration === 'annual'
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className={`text-lg ${signupData.listingDuration === 'annual' ? 'text-white' : 'text-black'}`}>12 Months</div>
                            <div className={`text-2xl ${signupData.listingDuration === 'annual' ? 'text-white' : 'text-black'}`}>$299</div>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="category">Business Category *</Label>
                      <Select value={signupData.category} onValueChange={(value) => updateSignupData('category', value)} required>
                        <SelectTrigger className="h-12 bg-white border-0 border-b-2 border-gray-200 rounded-none focus:ring-0 focus:border-black">
                          <SelectValue placeholder="Choose A Category For Your Listing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurants">Restaurants & Cafes</SelectItem>
                          <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                          <SelectItem value="beauty">Beauty & Spa</SelectItem>
                          <SelectItem value="retail">Retail & Shopping</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="home">Home Services</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website Or Landing Page</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="Web URL goes here"
                        value={signupData.website}
                        onChange={(e) => updateSignupData('website', e.target.value)}
                        className="h-12 bg-white border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>

                    {/* Only show offer fields for paid listings */}
                    {signupData.listingType === 'paid' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="offer-title">Offer Title *</Label>
                          <Input
                            id="offer-title"
                            type="text"
                            placeholder="20% off all services"
                            value={signupData.offerTitle}
                            onChange={(e) => updateSignupData('offerTitle', e.target.value)}
                            required
                            className="h-12 bg-white border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="offer-details">Offer Details</Label>
                          <Textarea
                            id="offer-details"
                            placeholder="(details about what's included or any restrictions)"
                            value={signupData.offerDetails}
                            onChange={(e) => updateSignupData('offerDetails', e.target.value)}
                            className="min-h-24 bg-white border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="coupon">Offer Coupon Code (Optional)</Label>
                          <Input
                            id="coupon"
                            type="text"
                            placeholder="Coupon For Users To Redeem"
                            value={signupData.couponCode}
                            onChange={(e) => updateSignupData('couponCode', e.target.value)}
                            className="h-12 bg-white border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        onClick={handleSignupPrev}
                        variant="outline"
                        className="flex-1 h-14 text-base border-2 border-black hover:bg-gray-100"
                      >
                        <ChevronRight className="mr-2 w-5 h-5 rotate-180" /> PREV
                      </Button>
                      <Button type="submit" className="flex-1 h-14 text-base bg-black hover:bg-gray-800">
                        NEXT <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 3: Service Area & Logo */}
              {signupStep === 3 && (
                <>
                  <div className="space-y-2 text-center">
                    <h2>Listing Info</h2>
                  </div>

                  <form onSubmit={handleSignupNext} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="service-area">Target Service Area</Label>
                      <Input
                        id="service-area"
                        type="text"
                        placeholder="City or ZIP code"
                        value={signupData.serviceArea}
                        onChange={(e) => updateSignupData('serviceArea', e.target.value)}
                        className="h-12 bg-white border-0 border-b-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo Upload Or Image (Optional)</Label>
                      <div className="border-2 border-gray-200 rounded-lg p-12 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                        <label htmlFor="logo" className="cursor-pointer flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400" />
                          <input
                            id="logo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                setSignupData(prev => ({ ...prev, logo: e.target.files![0] }));
                              }
                            }}
                          />
                        </label>
                      </div>
                      {signupData.logo && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {signupData.logo.name}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        onClick={handleSignupPrev}
                        variant="outline"
                        className="flex-1 h-14 text-base border-2 border-black hover:bg-gray-100"
                      >
                        <ChevronRight className="mr-2 w-5 h-5 rotate-180" /> PREV
                      </Button>
                      <Button type="submit" className="flex-1 h-14 text-base bg-black hover:bg-gray-800">
                        {signupData.listingType === 'free' ? 'CREATE LISTING' : 'NEXT'} <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 4: Payment (Only for paid listings) */}
              {signupStep === 4 && (
                <>
                  <div className="space-y-2 text-center">
                    <h2>Payment</h2>
                  </div>

                  <form onSubmit={handleSignupSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Label>Choose A Listing Duration *</Label>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="duration"
                              value="30"
                              checked={signupData.listingDuration === '30'}
                              onChange={(e) => updateSignupData('listingDuration', e.target.value)}
                              className="w-5 h-5"
                            />
                            <span className="text-lg">1 Month Listing</span>
                          </div>
                          <span className="text-2xl">$49</span>
                        </label>

                        <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="duration"
                              value="90"
                              checked={signupData.listingDuration === '90'}
                              onChange={(e) => updateSignupData('listingDuration', e.target.value)}
                              className="w-5 h-5"
                            />
                            <span className="text-lg">3 Months Listing</span>
                          </div>
                          <span className="text-2xl">$99</span>
                        </label>

                        <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-gray-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="duration"
                              value="annual"
                              checked={signupData.listingDuration === 'annual'}
                              onChange={(e) => updateSignupData('listingDuration', e.target.value)}
                              className="w-5 h-5"
                            />
                            <span className="text-lg">12 Months Listing</span>
                          </div>
                          <span className="text-2xl">$299</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded text-sm font-semibold">
                        TEST MODE
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="flex items-center gap-2 p-4 border-2 border-blue-500 rounded-lg bg-blue-50"
                        >
                          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <div className="w-4 h-3 bg-white rounded-sm"></div>
                          </div>
                          <span className="text-blue-600 font-semibold">Card</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300"
                        >
                          <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-xs">G</span>
                          </div>
                          <span className="text-muted-foreground">Google Pay</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card number</Label>
                        <div className="relative">
                          <Input
                            id="card-number"
                            type="text"
                            placeholder="1234 1234 1234 1234"
                            className="h-12 pr-32"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Discover_Card_logo.svg" alt="Discover" className="h-6" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM / YY"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">Security code</Label>
                          <Input
                            id="cvc"
                            type="text"
                            placeholder="CVC"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select defaultValue="us">
                            <SelectTrigger id="country" className="h-12">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP code</Label>
                          <Input
                            id="zip"
                            type="text"
                            placeholder="12345"
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                      *100% secure & safe payments*
                    </p>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        onClick={handleSignupPrev}
                        variant="outline"
                        className="flex-1 h-14 text-base border-2 border-black hover:bg-gray-100"
                      >
                        <ChevronRight className="mr-2 w-5 h-5 rotate-180" /> PREV
                      </Button>
                      <Button type="submit" className="flex-1 h-14 text-base bg-black hover:bg-gray-800">
                        SUBMIT PAYMENT
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}