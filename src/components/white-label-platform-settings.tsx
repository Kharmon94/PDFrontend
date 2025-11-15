import { useState } from 'react';
import { ArrowLeft, Globe, ExternalLink, Upload, Trash2, Plus, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { WhiteLabelCustomization } from './white-label-customization';

interface WhiteLabelPlatformSettingsProps {
  onBack: () => void;
  partnerName: string;
}

export function WhiteLabelPlatformSettings({ onBack, partnerName }: WhiteLabelPlatformSettingsProps) {
  const [activeTab, setActiveTab] = useState('domain');
  const [settingsCarouselApi, setSettingsCarouselApi] = useState<any>();
  const [settingsTabIndex, setSettingsTabIndex] = useState(0);
  const [enableCommunityAccounts, setEnableCommunityAccounts] = useState(true);
  const [enableSaveDeals, setEnableSaveDeals] = useState(true);
  const [enableMessages, setEnableMessages] = useState(true);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [menuType, setMenuType] = useState<'header' | 'footer'>('header');
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [newLocationCity, setNewLocationCity] = useState('');
  const [newLocationState, setNewLocationState] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuUrl, setNewMenuUrl] = useState('');

  // Mock partner data
  const partnerData = {
    name: partnerName || 'Community Connect',
    domain: 'community-connect.preferreddeals.com',
    customDomain: '',
    logo: '',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
  };

  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, name: 'Restaurant', count: 15 },
    { id: 2, name: 'Retail', count: 12 },
    { id: 3, name: 'Services', count: 8 },
    { id: 4, name: 'Healthcare', count: 5 },
    { id: 5, name: 'Technology', count: 2 },
  ]);

  // Menu items state
  const [headerMenuItems, setHeaderMenuItems] = useState([
    { id: 1, label: 'Home', url: '/', order: 1 },
    { id: 2, label: 'All Listings', url: '/listings', order: 2 },
    { id: 3, label: 'Featured', url: '/featured', order: 3 },
    { id: 4, label: 'About', url: '/about', order: 4 },
  ]);

  const [footerMenuItems, setFooterMenuItems] = useState([
    { id: 1, label: 'About Us', url: '/about', order: 1 },
    { id: 2, label: 'Contact', url: '/contact', order: 2 },
    { id: 3, label: 'Privacy Policy', url: '/privacy', order: 3 },
    { id: 4, label: 'Terms of Service', url: '/terms', order: 4 },
  ]);

  // Locations state
  const [locations, setLocations] = useState([
    { id: 1, city: 'New York', state: 'NY', businesses: 45 },
    { id: 2, city: 'Los Angeles', state: 'CA', businesses: 32 },
    { id: 3, city: 'Chicago', state: 'IL', businesses: 28 },
  ]);

  const settingsTabs = [
    { value: 'domain', label: 'Domain' },
    { value: 'branding', label: 'Branding' },
    { value: 'customization', label: 'Customization' },
    { value: 'settings', label: 'Settings' },
  ];

  const handleSaveSettings = () => {
    toast.success('Platform settings saved successfully!');
  };

  const handleAddLocation = () => {
    if (!newLocationCity.trim() || !newLocationState.trim()) {
      toast.error('Please enter both city and state');
      return;
    }

    const newLocation = {
      id: locations.length + 1,
      city: newLocationCity.trim(),
      state: newLocationState.trim().toUpperCase(),
      businesses: 0,
    };

    setLocations([...locations, newLocation]);
    setNewLocationCity('');
    setNewLocationState('');
    setLocationDialogOpen(false);
    toast.success(`${newLocationCity}, ${newLocationState} added successfully!`);
  };

  const handleRemoveLocation = (id: number) => {
    const location = locations.find(loc => loc.id === id);
    if (location) {
      setLocations(locations.filter(loc => loc.id !== id));
      toast.success(`${location.city}, ${location.state} removed`);
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName.trim(),
      count: 0,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setCategoryDialogOpen(false);
    toast.success(`${newCategoryName} category added successfully!`);
  };

  const handleRemoveCategory = (id: number) => {
    const category = categories.find(cat => cat.id === id);
    if (category) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success(`${category.name} category removed`);
    }
  };

  const handleAddMenuItem = () => {
    if (!newMenuLabel.trim() || !newMenuUrl.trim()) {
      toast.error('Please enter both label and URL');
      return;
    }

    const targetMenuItems = menuType === 'header' ? headerMenuItems : footerMenuItems;
    const setTargetMenuItems = menuType === 'header' ? setHeaderMenuItems : setFooterMenuItems;

    const newMenuItem = {
      id: targetMenuItems.length + 1,
      label: newMenuLabel.trim(),
      url: newMenuUrl.trim(),
      order: targetMenuItems.length + 1,
    };

    setTargetMenuItems([...targetMenuItems, newMenuItem]);
    setNewMenuLabel('');
    setNewMenuUrl('');
    setMenuDialogOpen(false);
    toast.success(`${newMenuLabel} menu item added successfully!`);
  };

  const handleRemoveMenuItem = (id: number, type: 'header' | 'footer') => {
    if (type === 'header') {
      const item = headerMenuItems.find(item => item.id === id);
      if (item) {
        setHeaderMenuItems(headerMenuItems.filter(item => item.id !== id));
        toast.success(`${item.label} removed from header menu`);
      }
    } else {
      const item = footerMenuItems.find(item => item.id === id);
      if (item) {
        setFooterMenuItems(footerMenuItems.filter(item => item.id !== id));
        toast.success(`${item.label} removed from footer menu`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to White-Label Platform
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Platform Settings</h1>
          <p className="text-muted-foreground">Configure your white-label platform settings, branding, and customization</p>
        </div>

        {/* Platform Info Card */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-400">Your Platform URL</p>
                </div>
                <p className="text-white font-medium">{partnerData.domain}</p>
                {partnerData.customDomain && (
                  <p className="text-sm text-gray-400 mt-1">{partnerData.customDomain}</p>
                )}
              </div>
              <Button onClick={handleSaveSettings} className="bg-white text-black hover:bg-gray-100">
                Save All Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs - Desktop */}
        <div className="hidden sm:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100">
              {settingsTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Domain Tab */}
            <TabsContent value="domain" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Domain Configuration</CardTitle>
                  <CardDescription>Manage your platform's domain and custom domain settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Default Subdomain</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input value={partnerData.domain} disabled />
                      <Button variant="outline" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your default subdomain on the PREFERRED DEALS platform
                    </p>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Label>Custom Domain</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Use your own domain name (e.g., deals.yourcommunity.com)
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="custom-domain">Your Custom Domain</Label>
                        <Input 
                          id="custom-domain"
                          placeholder="deals.yourcommunity.com" 
                          className="mt-2"
                        />
                      </div>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <h4 className="text-sm font-medium mb-2">DNS Configuration Required</h4>
                          <div className="space-y-2 text-xs">
                            <p>Add the following DNS records to your domain:</p>
                            <div className="bg-white p-3 rounded border font-mono">
                              <p>Type: CNAME</p>
                              <p>Name: deals (or your subdomain)</p>
                              <p>Value: cname.preferreddeals.com</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Button className="w-full">Verify Domain</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Branding</CardTitle>
                  <CardDescription>Customize your platform's visual identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Platform Name</Label>
                    <Input defaultValue={partnerData.name} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      This will appear as your platform's title
                    </p>
                  </div>

                  <div>
                    <Label>Platform Logo</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center">
                      {partnerData.logo ? (
                        <div className="space-y-3">
                          <img src={partnerData.logo} alt="Logo" className="h-16 mx-auto" />
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Logo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                          <div>
                            <p className="text-sm">Upload your logo</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                          </div>
                          <Button variant="outline" size="sm">Choose File</Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          id="primary-color"
                          type="color" 
                          defaultValue={partnerData.primaryColor}
                          className="w-20 h-10"
                        />
                        <Input 
                          defaultValue={partnerData.primaryColor}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          id="secondary-color"
                          type="color" 
                          defaultValue={partnerData.secondaryColor}
                          className="w-20 h-10"
                        />
                        <Input 
                          defaultValue={partnerData.secondaryColor}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tagline">Platform Tagline</Label>
                    <Input 
                      id="tagline"
                      placeholder="Your community's trusted deal directory" 
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      A short description of your platform
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea
                      id="welcome-message"
                      placeholder="Welcome to our community directory..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customization Tab */}
            <TabsContent value="customization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Customization</CardTitle>
                  <CardDescription>Configure categories, menus, and platform features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Categories */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Label>Business Categories</Label>
                        <p className="text-xs text-muted-foreground">Manage categories for your directory</p>
                      </div>
                      <Button size="sm" onClick={() => setCategoryDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                      </Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-3">
                          <div>
                            <p className="text-sm font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">{category.count} businesses</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Header Menu */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Label>Header Menu Items</Label>
                        <p className="text-xs text-muted-foreground">Configure navigation menu</p>
                      </div>
                      <Button size="sm" onClick={() => {
                        setMenuType('header');
                        setMenuDialogOpen(true);
                      }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      {headerMenuItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.url}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveMenuItem(item.id, 'header')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Menu */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Label>Footer Menu Items</Label>
                        <p className="text-xs text-muted-foreground">Configure footer links</p>
                      </div>
                      <Button size="sm" onClick={() => {
                        setMenuType('footer');
                        setMenuDialogOpen(true);
                      }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      {footerMenuItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.url}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveMenuItem(item.id, 'footer')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Label>Platform Locations</Label>
                        <p className="text-xs text-muted-foreground">Manage cities/locations for your directory</p>
                      </div>
                      <Button size="sm" onClick={() => setLocationDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Location
                      </Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      {locations.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No locations added yet</p>
                          <p className="text-xs">Add locations to organize your directory by city</p>
                        </div>
                      ) : (
                        locations.map((location) => (
                          <div key={location.id} className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium">{location.city}, {location.state}</p>
                                <p className="text-xs text-muted-foreground">{location.businesses} businesses</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveLocation(location.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure general settings and features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label>Community User Accounts</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Allow community members to create accounts and save deals
                        </p>
                      </div>
                      <Switch 
                        checked={enableCommunityAccounts}
                        onCheckedChange={setEnableCommunityAccounts}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label>Save Deals Feature</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Let users save and bookmark deals for later
                        </p>
                      </div>
                      <Switch 
                        checked={enableSaveDeals}
                        onCheckedChange={setEnableSaveDeals}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label>Business Messaging</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Enable direct messaging between users and businesses
                        </p>
                      </div>
                      <Switch 
                        checked={enableMessages}
                        onCheckedChange={setEnableMessages}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Label>SEO Settings</Label>
                    <div className="space-y-3 mt-3">
                      <div>
                        <Label htmlFor="meta-title" className="text-sm">Meta Title</Label>
                        <Input 
                          id="meta-title"
                          placeholder="Community Directory - Find Local Deals" 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta-description" className="text-sm">Meta Description</Label>
                        <Textarea
                          id="meta-description"
                          placeholder="Discover exclusive deals from local businesses in your community..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Label>Contact Information</Label>
                    <div className="grid sm:grid-cols-2 gap-3 mt-3">
                      <div>
                        <Label htmlFor="contact-email" className="text-sm">Support Email</Label>
                        <Input 
                          id="contact-email"
                          type="email"
                          placeholder="support@yourcommunity.com" 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-phone" className="text-sm">Support Phone</Label>
                        <Input 
                          id="contact-phone"
                          type="tel"
                          placeholder="(555) 123-4567" 
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Carousel View */}
        <div className="sm:hidden">
          <div className="space-y-4">
            {/* Tab Name with Arrows */}
            <div className="relative text-center">
              <h2 className="text-xl capitalize flex items-center justify-center gap-2">
                {settingsTabs[settingsTabIndex]?.label}
              </h2>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  const prevIndex = settingsTabIndex === 0 ? settingsTabs.length - 1 : settingsTabIndex - 1;
                  setSettingsTabIndex(prevIndex);
                  settingsCarouselApi?.scrollTo(prevIndex);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-900 flex items-center justify-center shadow-sm transition-all"
                aria-label="Previous tab"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  const nextIndex = settingsTabIndex === settingsTabs.length - 1 ? 0 : settingsTabIndex + 1;
                  setSettingsTabIndex(nextIndex);
                  settingsCarouselApi?.scrollTo(nextIndex);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-900 flex items-center justify-center shadow-sm transition-all"
                aria-label="Next tab"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2">
              {settingsTabs.map((tab, index) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setSettingsTabIndex(index);
                    settingsCarouselApi?.scrollTo(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === settingsTabIndex 
                      ? 'w-8 bg-black' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to ${tab.label}`}
                />
              ))}
            </div>

            {/* Carousel */}
            <Carousel 
              setApi={setSettingsCarouselApi}
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent>
                {/* Domain Slide */}
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Domain Configuration</CardTitle>
                      <CardDescription>Manage your platform's domain settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label>Default Subdomain</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Input value={partnerData.domain} disabled className="text-sm" />
                          <Button variant="outline" size="icon">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your default subdomain
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <Label>Custom Domain</Label>
                          <Switch />
                        </div>

                        <div className="space-y-3">
                          <Input 
                            placeholder="deals.yourcommunity.com"
                            className="text-sm"
                          />

                          <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-3">
                              <h4 className="text-xs font-medium mb-2">DNS Setup</h4>
                              <div className="bg-white p-2 rounded border font-mono text-xs">
                                <p>Type: CNAME</p>
                                <p>Value: cname.preferreddeals.com</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Button size="sm" className="w-full">Verify Domain</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Branding Slide */}
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Branding</CardTitle>
                      <CardDescription>Customize your visual identity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Platform Name</Label>
                        <Input defaultValue={partnerData.name} className="mt-2 text-sm" />
                      </div>

                      <div>
                        <Label>Logo</Label>
                        <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                          <p className="text-xs mb-2">Upload logo</p>
                          <Button variant="outline" size="sm">Choose File</Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label>Primary Color</Label>
                          <div className="flex gap-2 mt-2">
                            <Input 
                              type="color" 
                              defaultValue={partnerData.primaryColor}
                              className="w-16 h-10"
                            />
                            <Input 
                              defaultValue={partnerData.primaryColor}
                              className="flex-1 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Secondary Color</Label>
                          <div className="flex gap-2 mt-2">
                            <Input 
                              type="color" 
                              defaultValue={partnerData.secondaryColor}
                              className="w-16 h-10"
                            />
                            <Input 
                              defaultValue={partnerData.secondaryColor}
                              className="flex-1 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Customization Slide */}
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Customization</CardTitle>
                      <CardDescription>Configure categories and menus</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Categories</Label>
                          <Button size="sm" variant="outline" onClick={() => setCategoryDialogOpen(true)}>
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="border rounded-lg divide-y text-sm">
                          {categories.slice(0, 3).map((category) => (
                            <div key={category.id} className="flex items-center justify-between p-2">
                              <span>{category.name}</span>
                              <span className="text-xs text-muted-foreground">{category.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Header Menu</Label>
                          <Button size="sm" variant="outline" onClick={() => {
                            setMenuType('header');
                            setMenuDialogOpen(true);
                          }}>
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="border rounded-lg divide-y text-sm">
                          {headerMenuItems.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2">
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Locations</Label>
                          <Button size="sm" variant="outline" onClick={() => setLocationDialogOpen(true)}>
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="border rounded-lg divide-y text-sm">
                          {locations.slice(0, 3).map((location) => (
                            <div key={location.id} className="flex items-center justify-between p-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span>{location.city}, {location.state}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{location.businesses}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                {/* Settings Slide */}
                <CarouselItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Settings</CardTitle>
                      <CardDescription>Configure features and options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <Label className="text-sm">User Accounts</Label>
                          <p className="text-xs text-muted-foreground">Allow member accounts</p>
                        </div>
                        <Switch 
                          checked={enableCommunityAccounts}
                          onCheckedChange={setEnableCommunityAccounts}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <Label className="text-sm">Save Deals</Label>
                          <p className="text-xs text-muted-foreground">Bookmark deals</p>
                        </div>
                        <Switch 
                          checked={enableSaveDeals}
                          onCheckedChange={setEnableSaveDeals}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <Label className="text-sm">Messaging</Label>
                          <p className="text-xs text-muted-foreground">Direct messages</p>
                        </div>
                        <Switch 
                          checked={enableMessages}
                          onCheckedChange={setEnableMessages}
                        />
                      </div>

                      <div className="border-t pt-3 space-y-2">
                        <Label className="text-sm">Contact Email</Label>
                        <Input 
                          type="email"
                          placeholder="support@yourcommunity.com"
                          className="text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Save Button at Bottom */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings} size="lg">
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Add Location Dialog */}
      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Add a new city/location to your white-label directory
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location-city">City</Label>
              <Input
                id="location-city"
                placeholder="e.g., San Francisco"
                value={newLocationCity}
                onChange={(e) => setNewLocationCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-state">State</Label>
              <Input
                id="location-state"
                placeholder="e.g., CA"
                value={newLocationState}
                onChange={(e) => setNewLocationState(e.target.value)}
                maxLength={2}
              />
              <p className="text-xs text-muted-foreground">Use 2-letter state code (e.g., NY, CA, TX)</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLocationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLocation}>
              Add Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Add a new business category to your directory
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                placeholder="e.g., Restaurant, Retail, Services"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>
              Add Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Menu Item Dialog */}
      <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {menuType === 'header' ? 'Header' : 'Footer'} Menu Item</DialogTitle>
            <DialogDescription>
              Add a new menu item to your {menuType} navigation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="menu-label">Menu Label</Label>
              <Input
                id="menu-label"
                placeholder="e.g., About Us, Contact"
                value={newMenuLabel}
                onChange={(e) => setNewMenuLabel(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-url">URL</Label>
              <Input
                id="menu-url"
                placeholder="e.g., /about, /contact"
                value={newMenuUrl}
                onChange={(e) => setNewMenuUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Use relative URLs (e.g., /about) or full URLs</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setMenuDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMenuItem}>
              Add Menu Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
