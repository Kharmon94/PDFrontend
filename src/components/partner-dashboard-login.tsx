import { useState } from 'react';
import { ArrowLeft, Handshake, Key, Mail, User, Phone, MapPin, Eye, EyeOff, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import logoImage from 'figma:asset/dd3bfa837dfa92a5643677141b8779a2931011b6.png';

interface PartnerDashboardLoginProps {
  onBack: () => void;
  onDistributionLogin: () => void;
  defaultTab?: 'login' | 'signup';
}

export function PartnerDashboardLogin({ onBack, onDistributionLogin, defaultTab = 'login' }: PartnerDashboardLoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDistributionLogin();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the account then log in
    onDistributionLogin();
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
              Connect Your Community.
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
          {/* Removed mobile logo */}

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Become a Partner</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-2">
                <h2>Welcome Back!</h2>
                <p className="text-muted-foreground">
                  Log in to access your distribution partner dashboard.
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
                  Log In to Dashboard
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Business partner? {' '}
                <button onClick={onBack} className="text-primary hover:underline">
                  Business login
                </button>
              </p>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-6">
              <div className="space-y-2">
                <h2>Become a Partner</h2>
                <p className="text-muted-foreground">
                  Apply to become a distribution partner and bring Preferred Deals to your community.
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-org">Organization Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-org"
                      type="text"
                      placeholder="Your organization name"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-name">Your Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Full name"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@organization.com"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-location">Community/Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-location"
                      type="text"
                      placeholder="City, State or Region"
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-description">Tell us about your community</Label>
                  <Textarea
                    id="signup-description"
                    placeholder="Describe your organization and how you plan to use Preferred Deals..."
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="rounded mt-1" />
                  <label className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <button type="button" className="text-primary hover:underline">
                      Partner Terms
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-primary hover:underline">
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <Button type="submit" className="w-full h-12 text-base bg-black hover:bg-gray-800">
                  Submit Application
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Your application will be reviewed within 2-3 business days.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}