import { useState } from 'react';
import { Heart, Eye, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DashboardSwitcher } from './dashboard-switcher';
import { AdminDashboard } from './admin-dashboard';
import { PartnerDashboard } from './partner-dashboard';
import { DistributionPartnerDashboard } from './distribution-partner-dashboard';

interface UserDashboardProps {
  userType: 'user' | 'partner' | 'distribution' | 'admin';
  userName: string;
  savedDeals: string[];
  onNavigate: (page: string) => void;
  onDashboardTypeChange?: (type: 'user' | 'partner' | 'distribution' | 'admin') => void;
}

export function UserDashboard({ userType, userName, savedDeals, onNavigate, onDashboardTypeChange }: UserDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Regular User Dashboard
  if (userType === 'user') {
    const recentActivity = [
      { action: 'Saved deal', business: 'Fresh Bistro', date: '2 hours ago' },
      { action: 'Viewed listing', business: 'Wellness Spa', date: '1 day ago' },
      { action: 'Saved deal', business: 'Tech Repair Pro', date: '3 days ago' },
    ];

    const recommendations = [
      { name: 'Bella Salon', category: 'Beauty', deal: '20% off first visit', distance: '0.5 mi' },
      { name: 'FitLife Gym', category: 'Health', deal: 'Free trial week', distance: '1.2 mi' },
      { name: 'Pasta Paradise', category: 'Dining', deal: 'Buy 1 Get 1 Free', distance: '0.8 mi' },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {onDashboardTypeChange && (
          <DashboardSwitcher currentType={userType} onTypeChange={onDashboardTypeChange} />
        )}

        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your saved deals</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Saved Deals</p>
                  <p className="text-3xl">{savedDeals.length}</p>
                </div>
                <Heart className="w-8 h-8 text-gray-900" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Deals Expiring Soon</p>
                  <p className="text-3xl">3</p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Businesses Viewed</p>
                  <p className="text-3xl">24</p>
                </div>
                <Eye className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="mb-1">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.business}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('saved-deals')}>
                View All Saved Deals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div className="flex-1">
                      <p className="mb-1">{rec.name}</p>
                      <p className="text-sm text-muted-foreground">{rec.deal}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{rec.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {rec.distance}
                        </span>
                      </div>
                    </div>
                    <Button size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Distribution Partner Dashboard
  if (userType === 'distribution') {
    return (
      <>
        {onDashboardTypeChange && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <DashboardSwitcher currentType={userType} onTypeChange={onDashboardTypeChange} />
          </div>
        )}
        <DistributionPartnerDashboard userName={userName} />
      </>
    );
  }

  // Admin Dashboard
  if (userType === 'admin') {
    return (
      <>
        {onDashboardTypeChange && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <DashboardSwitcher currentType={userType} onTypeChange={onDashboardTypeChange} />
          </div>
        )}
        <AdminDashboard userName={userName} />
      </>
    );
  }

  // Business Partner Dashboard
  if (userType === 'partner') {
    return (
      <>
        {onDashboardTypeChange && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <DashboardSwitcher currentType={userType} onTypeChange={onDashboardTypeChange} />
          </div>
        )}
        <PartnerDashboard userName={userName} onNavigate={onNavigate} />
      </>
    );
  }

  // Default return (shouldn't reach here)
  return null;
}
