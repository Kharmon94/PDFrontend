import { ArrowLeft, Target, Users, Award, Heart, TrendingUp, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect local businesses with their communities, fostering growth and building lasting relationships through accessible, reliable deals and services.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of local communities. Every business we partner with contributes to the vibrant tapestry of neighborhood commerce.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'We carefully vet every business partner to ensure you discover only the best local services and deals in your area.',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Local Businesses' },
    { value: '50,000+', label: 'Active Users' },
    { value: '100+', label: 'Cities Covered' },
    { value: '98%', label: 'Customer Satisfaction' },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'Michael Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Emily Rodriguez', role: 'Head of Partnerships', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    { name: 'David Kim', role: 'Head of Marketing', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="mb-4">About Preferred Deals</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to strengthen local communities by connecting people with the businesses 
            they love and helping local enterprises thrive in the digital age.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-4">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2020, Preferred Deals was born from a simple observation: local businesses needed 
                    better ways to connect with their communities, and consumers wanted easier access to quality 
                    local services and deals.
                  </p>
                  <p>
                    What started as a small directory in a single city has grown into a thriving platform serving 
                    thousands of businesses and hundreds of thousands of users across the country.
                  </p>
                  <p>
                    Today, we're proud to be the bridge between local commerce and community engagement, helping 
                    businesses grow while giving consumers access to the best their neighborhoods have to offer.
                  </p>
                </div>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Icon className="w-6 h-6 text-gray-900" />
                      </div>
                      <h3>{value.title}</h3>
                    </div>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <Card className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-8 lg:p-12">
            <h2 className="text-center mb-8">Why Choose Preferred Deals?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <Heart className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Trusted by Thousands</h3>
                  <p className="text-sm text-gray-600">
                    Join a community of satisfied users who rely on us for discovering local businesses.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Verified Businesses</h3>
                  <p className="text-sm text-gray-600">
                    Every business is carefully vetted to ensure quality and reliability.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <TrendingUp className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Exclusive Deals</h3>
                  <p className="text-sm text-gray-600">
                    Access special offers and promotions you won't find anywhere else.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-gray-900 to-black text-white">
          <CardContent className="p-8 lg:p-12 text-center">
            <h2 className="text-white mb-4">Ready to Join Us?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you're a business looking to grow or a user seeking the best local deals, 
              we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Browse Directory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
