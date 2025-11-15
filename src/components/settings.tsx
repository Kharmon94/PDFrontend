import { useState, useEffect } from 'react';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, CreditCard, Trash2, MapPin, Plus, Edit, Save, X, Upload } from 'lucide-react';
import { apiService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface Location {
  id: number;
  city: string;
  state: string;
  businesses: number;
  activeDeals: number;
  monthlyGrowth: number;
  totalRevenue: number;
  status: 'Active' | 'Inactive';
}

interface SettingsProps {
  onBack: () => void;
  userName: string;
  userEmail: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  hasWhiteLabel?: boolean;
  userType?: 'regular' | 'business' | 'distribution';
}

export function Settings({ onBack, userName, userEmail, isDarkMode, onToggleTheme, hasWhiteLabel = false, userType = 'regular' }: SettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({ name: userName, email: userEmail });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [deletePassword, setDeletePassword] = useState('');
  
  // Location management state
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      city: 'New York',
      state: 'NY',
      businesses: 18,
      activeDeals: 42,
      monthlyGrowth: 12.5,
      totalRevenue: 450,
      status: 'Active',
    },
    {
      id: 2,
      city: 'Brooklyn',
      state: 'NY',
      businesses: 10,
      activeDeals: 25,
      monthlyGrowth: 8.3,
      totalRevenue: 280,
      status: 'Active',
    },
    {
      id: 3,
      city: 'Queens',
      state: 'NY',
      businesses: 4,
      activeDeals: 9,
      monthlyGrowth: 15.2,
      totalRevenue: 120,
      status: 'Active',
    },
  ]);
  
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [locationForm, setLocationForm] = useState({
    city: '',
    state: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const handleAddLocation = () => {
    setEditingLocation(null);
    setLocationForm({ city: '', state: '', status: 'Active' });
    setLocationDialogOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setLocationForm({
      city: location.city,
      state: location.state,
      status: location.status,
    });
    setLocationDialogOpen(true);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const response = await apiService.updateUserProfile({
        name: profileData.name,
        email: profileData.email,
        avatar: avatarFile || undefined
      });
      toast.success(response.message || 'Profile updated successfully');
      setIsEditing(false);
      
      // Clear avatar file selection
      setAvatarFile(null);
      if (response.user?.avatar_url) {
        setUserAvatar(response.user.avatar_url);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Load user profile with avatar on mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await apiService.getUserProfile();
        if (response.user?.avatar_url) {
          setUserAvatar(response.user.avatar_url);
        }
      } catch (error) {
        // Silent fail - avatar is optional
      }
    };
    loadUserProfile();
  }, []);

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSaving(true);
    try {
      const response = await apiService.updatePassword(passwordData.current, passwordData.new);
      toast.success(response.message || 'Password updated successfully');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password to confirm');
      return;
    }
    
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setIsSaving(true);
    try {
      await apiService.deleteAccount(deletePassword);
      toast.success('Account deleted successfully');
      apiService.logout();
      window.location.href = '/';
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveLocation = () => {
    if (!locationForm.city || !locationForm.state) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingLocation) {
      // Update existing location
      setLocations(locations.map(loc => 
        loc.id === editingLocation.id 
          ? { ...loc, ...locationForm }
          : loc
      ));
      toast.success('Location updated successfully');
    } else {
      // Add new location
      const newLocation: Location = {
        id: Math.max(...locations.map(l => l.id), 0) + 1,
        city: locationForm.city,
        state: locationForm.state,
        businesses: 0,
        activeDeals: 0,
        monthlyGrowth: 0,
        totalRevenue: 0,
        status: locationForm.status,
      };
      setLocations([...locations, newLocation]);
      toast.success('Location added successfully');
    }
    
    setLocationDialogOpen(false);
    setEditingLocation(null);
    setLocationForm({ city: '', state: '', status: 'Active' });
  };

  const handleDeleteLocation = (locationId: number) => {
    const location = locations.find(l => l.id === locationId);
    if (location && location.businesses > 0) {
      toast.error('Cannot delete location with active businesses');
      return;
    }
    
    setLocations(locations.filter(loc => loc.id !== locationId));
    toast.success('Location deleted successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className={`grid w-full ${hasWhiteLabel && userType === 'distribution' ? 'grid-cols-5' : 'grid-cols-2 lg:grid-cols-4'}`}>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            {hasWhiteLabel && userType === 'distribution' && (
              <TabsTrigger value="locations">
                <MapPin className="w-4 h-4 mr-2" />
                Locations
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar Upload */}
                <div className="space-y-2">
                  <Label>Profile Avatar</Label>
                  <div className="flex gap-4 items-start">
                    {(avatarPreview || userAvatar) && (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2">
                        <img
                          src={avatarPreview || userAvatar || ''}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                        {avatarPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setAvatarFile(null);
                              setAvatarPreview(null);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <p className="text-xs text-gray-600">Click to upload avatar</p>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                  />
                </div>
                <Button onClick={handleChangePassword} disabled={isSaving}>
                  {isSaving ? 'Updating...' : 'Update Password'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Deal Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new deals near you</p>
                  </div>
                  <Switch checked={dealAlerts} onCheckedChange={setDealAlerts} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Newsletter</Label>
                    <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                  </div>
                  <Switch checked={newsletter} onCheckedChange={setNewsletter} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're active</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share data with partners for better deals</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter your password to confirm"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      disabled={!deletePassword || isSaving}
                    >
                      {isSaving ? 'Deleting...' : 'Delete Account'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {hasWhiteLabel && userType === 'distribution' && (
            <TabsContent value="locations" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Location Management
                      </CardTitle>
                      <CardDescription>Manage your service locations and coverage areas</CardDescription>
                    </div>
                    <Button onClick={handleAddLocation}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {locations.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="mb-2">No locations yet</h3>
                      <p className="text-muted-foreground mb-4">Add your first service location to get started</p>
                      <Button onClick={handleAddLocation}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Location
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {locations.map((location) => (
                        <Card key={location.id} className="border-2">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-700" />
                                <div>
                                  <h3>{location.city}, {location.state}</h3>
                                  <Badge variant={location.status === 'Active' ? 'default' : 'secondary'} className="mt-1 text-xs">
                                    {location.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditLocation(location)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteLocation(location.id)}
                                  disabled={location.businesses > 0}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Businesses</p>
                                <p className="text-xl">{location.businesses}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Active Deals</p>
                                <p className="text-xl">{location.activeDeals}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Monthly Growth</p>
                                <p className="text-sm text-green-600">{location.monthlyGrowth}%</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Revenue</p>
                                <p className="text-sm">${location.totalRevenue}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                <CardHeader>
                  <CardTitle>💡 Location Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                      <span>Start with locations where you have the strongest network and connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                      <span>You can only delete locations that have no active businesses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                      <span>Track performance by location to identify your most successful markets</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Add/Edit Location Dialog */}
      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogContent aria-describedby="location-dialog-description">
          <DialogHeader>
            <DialogTitle>
              {editingLocation ? 'Edit Location' : 'Add New Location'}
            </DialogTitle>
            <DialogDescription id="location-dialog-description">
              {editingLocation 
                ? 'Update the details for this location' 
                : 'Add a new service location to your coverage area'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="e.g., Brooklyn"
                value={locationForm.city}
                onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select
                value={locationForm.state}
                onValueChange={(value) => setLocationForm({ ...locationForm, state: value })}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AL">Alabama</SelectItem>
                  <SelectItem value="AK">Alaska</SelectItem>
                  <SelectItem value="AZ">Arizona</SelectItem>
                  <SelectItem value="AR">Arkansas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="CO">Colorado</SelectItem>
                  <SelectItem value="CT">Connecticut</SelectItem>
                  <SelectItem value="DE">Delaware</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="GA">Georgia</SelectItem>
                  <SelectItem value="HI">Hawaii</SelectItem>
                  <SelectItem value="ID">Idaho</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="IN">Indiana</SelectItem>
                  <SelectItem value="IA">Iowa</SelectItem>
                  <SelectItem value="KS">Kansas</SelectItem>
                  <SelectItem value="KY">Kentucky</SelectItem>
                  <SelectItem value="LA">Louisiana</SelectItem>
                  <SelectItem value="ME">Maine</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="MA">Massachusetts</SelectItem>
                  <SelectItem value="MI">Michigan</SelectItem>
                  <SelectItem value="MN">Minnesota</SelectItem>
                  <SelectItem value="MS">Mississippi</SelectItem>
                  <SelectItem value="MO">Missouri</SelectItem>
                  <SelectItem value="MT">Montana</SelectItem>
                  <SelectItem value="NE">Nebraska</SelectItem>
                  <SelectItem value="NV">Nevada</SelectItem>
                  <SelectItem value="NH">New Hampshire</SelectItem>
                  <SelectItem value="NJ">New Jersey</SelectItem>
                  <SelectItem value="NM">New Mexico</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="NC">North Carolina</SelectItem>
                  <SelectItem value="ND">North Dakota</SelectItem>
                  <SelectItem value="OH">Ohio</SelectItem>
                  <SelectItem value="OK">Oklahoma</SelectItem>
                  <SelectItem value="OR">Oregon</SelectItem>
                  <SelectItem value="PA">Pennsylvania</SelectItem>
                  <SelectItem value="RI">Rhode Island</SelectItem>
                  <SelectItem value="SC">South Carolina</SelectItem>
                  <SelectItem value="SD">South Dakota</SelectItem>
                  <SelectItem value="TN">Tennessee</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="UT">Utah</SelectItem>
                  <SelectItem value="VT">Vermont</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="WA">Washington</SelectItem>
                  <SelectItem value="WV">West Virginia</SelectItem>
                  <SelectItem value="WI">Wisconsin</SelectItem>
                  <SelectItem value="WY">Wyoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={locationForm.status}
                onValueChange={(value: 'Active' | 'Inactive') => setLocationForm({ ...locationForm, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setLocationDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveLocation}>
              <Save className="w-4 h-4 mr-2" />
              {editingLocation ? 'Update' : 'Add'} Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
