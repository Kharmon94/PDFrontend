import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Eye, Settings, Globe, Building2, Users, TrendingUp, BarChart3, MapPin, Search, MoreVertical, Edit, Trash2, Mail, Phone, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { WhiteLabelCustomization } from './white-label-customization';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface WhiteLabelPlatformProps {
  onBack: () => void;
  partnerName: string;
}

export function WhiteLabelPlatform({ onBack, partnerName }: WhiteLabelPlatformProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [approvalDialogMode, setApprovalDialogMode] = useState<'approve' | 'reject' | 'view' | null>(null);
  const [domainSettingsOpen, setDomainSettingsOpen] = useState(false);
  const [settingsTabIndex, setSettingsTabIndex] = useState(0);
  const [settingsCarouselApi, setSettingsCarouselApi] = useState<any>();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  // Footer menu items
  const [footerMenuItems, setFooterMenuItems] = useState([
    { id: 1, label: 'About Us', url: '/about', order: 1 },
    { id: 2, label: 'Contact', url: '/contact', order: 2 },
    { id: 3, label: 'Privacy Policy', url: '/privacy', order: 3 },
    { id: 4, label: 'Terms of Service', url: '/terms', order: 4 },
  ]);

  // Settings tab configuration
  const settingsTabs = [
    { value: 'domain', label: 'Domain' },
    { value: 'branding', label: 'Branding' },
    { value: 'customization', label: 'Customization' },
    { value: 'settings', label: 'Settings' },
  ];

  // Sync carousel with tab index
  useEffect(() => {
    if (!settingsCarouselApi) {
      return;
    }

    settingsCarouselApi.on('select', () => {
      setSettingsTabIndex(settingsCarouselApi.selectedScrollSnap());
    });
  }, [settingsCarouselApi]);

  // Mock partner data
  const partnerData = {
    domain: 'preferreddeals.com',
    name: 'Preferred Deals',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
  };

  // Mock categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food & Drink', enabled: true },
    { id: 2, name: 'Retail', enabled: true },
    { id: 3, name: 'Entertainment', enabled: false },
    { id: 4, name: 'Health & Wellness', enabled: true },
    { id: 5, name: 'Travel', enabled: false },
    { id: 6, name: 'Automotive', enabled: true },
    { id: 7, name: 'Home & Garden', enabled: true },
    { id: 8, name: 'Beauty', enabled: false },
    { id: 9, name: 'Sports', enabled: true },
    { id: 10, name: 'Education', enabled: false },
  ]);

  // Mock header menu items
  const [headerMenuItems, setHeaderMenuItems] = useState([
    { id: 1, label: 'Home', url: '/', order: 1 },
    { id: 2, label: 'Deals', url: '/deals', order: 2 },
    { id: 3, label: 'Businesses', url: '/businesses', order: 3 },
    { id: 4, label: 'About Us', url: '/about', order: 4 },
    { id: 5, label: 'Contact', url: '/contact', order: 5 },
  ]);

  // Mock settings
  const [enableCommunityAccounts, setEnableCommunityAccounts] = useState(true);
  const [enableSaveDeals, setEnableSaveDeals] = useState(true);
  const [enableMessages, setEnableMessages] = useState(true);

  {/* Domain Settings Dialog */}
  <Dialog open={domainSettingsOpen} onOpenChange={setDomainSettingsOpen}>
    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>Platform Settings</DialogTitle>
        <DialogDescription>
          Configure your white-label platform settings, branding, and custom domain
        </DialogDescription>
      </DialogHeader>

      {/* Mobile Swipe Instruction */}
      <div className="sm:hidden flex items-center justify-center gap-2 py-2 bg-blue-50 border border-blue-200 rounded-lg">
        <ChevronLeft className="w-4 h-4 text-blue-600 animate-pulse" />
        <p className="text-xs text-blue-600">Swipe left or right to navigate settings</p>
        <ChevronRight className="w-4 h-4 text-blue-600 animate-pulse" />
      </div>

      {/* Tab Navigation - Desktop */}
      <div className="hidden sm:flex gap-2 border-b">
        {settingsTabs.map((tab, index) => (
          <button
            key={tab.value}
            onClick={() => {
              setSettingsTabIndex(index);
              settingsCarouselApi?.scrollTo(index);
            }}
            className={`px-4 py-2 text-sm transition-colors ${
              settingsTabIndex === index
                ? 'border-b-2 border-black font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Carousel for Tab Content */}
      <div className="flex-1 overflow-hidden">
        <Carousel 
          setApi={setSettingsCarouselApi}
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full">
            {/* Domain Tab */}
            <CarouselItem>
              <div className="space-y-4 pt-4 max-h-[50vh] overflow-y-auto pr-2">
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

                <div className="border-t pt-4">
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
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Branding Tab */}
            <CarouselItem>
              <div className="space-y-4 pt-4 max-h-[50vh] overflow-y-auto pr-2">
                <div>
                  <Label>Platform Name</Label>
                  <Input defaultValue={partnerData.name} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    This will appear as your platform's title
                  </p>
                </div>

                <div>
                  <Label>Logo URL</Label>
                  <Input placeholder="https://your-logo-url.com/logo.png" className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the URL of your logo image
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Color</Label>
                    <div className="flex gap-2 mt-2">
                      <Input 
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
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2 mt-2">
                      <Input 
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
                  <Label>Welcome Message</Label>
                  <Textarea 
                    placeholder="Welcome to our community deals platform..."
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            </CarouselItem>

            {/* Customization Tab */}
            <CarouselItem>
              <div className="pt-4 max-h-[50vh] overflow-y-auto pr-2">
                <WhiteLabelCustomization
                  categories={categories}
                  headerMenuItems={headerMenuItems}
                  footerMenuItems={footerMenuItems}
                  onUpdateCategories={setCategories}
                  onUpdateHeaderMenu={setHeaderMenuItems}
                  onUpdateFooterMenu={setFooterMenuItems}
                  enableCommunityAccounts={enableCommunityAccounts}
                  enableSaveDeals={enableSaveDeals}
                  enableMessages={enableMessages}
                  onToggleCommunityAccounts={setEnableCommunityAccounts}
                  onToggleSaveDeals={setEnableSaveDeals}
                  onToggleMessages={setEnableMessages}
                />
              </div>
            </CarouselItem>

            {/* Settings Tab */}
            <CarouselItem>
              <div className="space-y-4 pt-4 max-h-[50vh] overflow-y-auto pr-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <Label>Auto-Approve Businesses</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Automatically approve new business listings
                    </p>
                  </div>
                  <Switch className="self-start" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <Label>Require Email Verification</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Users must verify email before accessing deals
                    </p>
                  </div>
                  <Switch defaultChecked className="self-start" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <Label>Allow Business Registrations</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Let businesses register directly on your platform
                    </p>
                  </div>
                  <Switch defaultChecked className="self-start" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <Label>Show PREFERRED DEALS Branding</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Display "Powered by PREFERRED DEALS" footer
                    </p>
                  </div>
                  <Switch defaultChecked className="self-start" />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          
          {/* Desktop Navigation Arrows */}
          <CarouselPrevious className="hidden sm:flex -left-12" />
          <CarouselNext className="hidden sm:flex -right-12" />
        </Carousel>
      </div>

      {/* Carousel Indicators - Mobile */}
      <div className="flex sm:hidden justify-center gap-2 py-3">
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
                : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to ${tab.label}`}
          />
        ))}
      </div>

      {/* Tab Name Indicator - Mobile */}
      <div className="sm:hidden text-center pb-2">
        <p className="text-sm font-medium">{settingsTabs[settingsTabIndex]?.label}</p>
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={() => setDomainSettingsOpen(false)} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button onClick={() => {
          setDomainSettingsOpen(false);
          toast.success('Settings saved successfully!');
        }} className="w-full sm:w-auto">
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}