import { ArrowLeft, Heart, TrendingUp, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
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

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-6 text-center">Our Goal</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Preferred Deals is building the world's first NFC-Powered Word Of Mouth Deal Network—where 
                  real recommendations from trusted community members meet the convenience of modern technology.
                </p>
                <p>
                  We're revolutionizing how people discover and share local businesses by combining the authenticity 
                  of personal referrals with the seamless experience of NFC technology. Simply tap, discover, and 
                  support the businesses your community loves.
                </p>
                <p>
                  Our vision is to make every positive business experience instantly shareable, creating an organic 
                  network of trusted recommendations that helps great local businesses thrive through genuine 
                  word-of-mouth at scale.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us Section */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
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
      </div>
    </div>
  );
}