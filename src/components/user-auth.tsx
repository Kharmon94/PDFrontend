import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { apiService } from '../services/api';
import { User } from '../types';

interface UserAuthProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
  businessLoginTab?: 'login' | 'signup';
  setBusinessLoginTab?: (tab: 'login' | 'signup') => void;
}

export function UserAuth({ onLogin, onCancel, businessLoginTab, setBusinessLoginTab }: UserAuthProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiService.login(loginEmail, loginPassword);
      toast.success(response.message || 'Successfully logged in!');
      onLogin(response.user);
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiService.signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        user_type: 'user'
      });
      toast.success(response.message || 'Account created successfully!');
      onLogin(response.user);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your saved deals</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <Card>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl">Login to Your Account</CardTitle>
                <CardDescription>
                  Access your saved deals and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="submit" className="flex-1 h-11" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel} className="h-11" disabled={isLoading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-0">
            <Card>
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl">Create an Account</CardTitle>
                <CardDescription>
                  Save your favorite deals and businesses
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="submit" className="flex-1 h-11" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel} className="h-11" disabled={isLoading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
