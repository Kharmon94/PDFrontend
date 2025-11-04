import { useState } from 'react';
import { CheckCircle, ChevronRight, Gift, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';

interface DistributionPartnerProps {
  onGetStarted: () => void;
}

export function DistributionPartner({ onGetStarted }: DistributionPartnerProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 49;
  const annualPrice = 499;
  const annualMonthlyEquivalent = annualPrice / 12;
  const savings = (monthlyPrice * 12) - annualPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6 text-white">Boost Community Satisfaction with Local Perks</h1>
          <h2 className="mb-8 text-white">Exclusive Local Offers For Your Members</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Local Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Exclusive Offerings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Win-Win Partnerships</span>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-white text-black hover:bg-gray-100"
          >
            GET STARTED FREE
          </Button>
        </div>
      </div>

      {/* Free Partnership Highlight */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="border-2 border-black">
          <CardContent className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 p-3 sm:p-4 bg-black text-white rounded-lg">
                <Gift className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-2">
                  <h2 className="m-0">Free Partnership Program</h2>
                  <Badge className="bg-green-600 w-fit">Always Free</Badge>
                </div>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Join the NFC-Powered Word Of Mouth Deal Network at no cost and receive complimentary Preferred Deals branded NFC stands for your community
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">Free Preferred Deals NFC stands</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">Access to full business directory</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">Member access to exclusive deals</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">No setup fees</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">No monthly costs</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">Unlimited stand placements</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">How It Works</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">1</span>
                      Step 1: Join the Network
                    </h3>
                    <p className="text-muted-foreground">
                      Sign up as a Preferred Deals distribution partner - completely free with no hidden costs.
                    </p>
                  </div>
                  <ChevronRight className="text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">2</span>
                      Step 2: Receive Your Free NFC Stands
                    </h3>
                    <p className="text-muted-foreground">
                      We'll provide as many Preferred Deals branded NFC stands as you want for placement in lobbies, common areas, or shared spaces.
                    </p>
                  </div>
                  <ChevronRight className="text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">3</span>
                      Step 3: Members Tap to Discover
                    </h3>
                    <p className="text-muted-foreground">
                      Members tap their phone on any stand to open the Preferred Deals directory and explore exclusive local offers.
                    </p>
                  </div>
                  <ChevronRight className="text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">4</span>
                      Step 4: Enjoy the Benefits
                    </h3>
                    <p className="text-muted-foreground">
                      Happier members, stronger community engagement, and a network that feels more connected to local businesses - all at no cost.
                    </p>
                  </div>
                  <ChevronRight className="text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" onClick={onGetStarted}>
              GET STARTED FREE
            </Button>
          </div>
        </div>
      </div>

      {/* Why Partner With Us Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Why Partner With Us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Enhance the Member Experience */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Enhance the Member Experience</h3>
                    <p className="text-muted-foreground">
                      Preferred Deals connects your members to exclusive local discounts and experiences. From dining and fitness to entertainment and services. Members simply tap an NFC stand to browse offers made for the community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unlimited NFC Stands */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Free Unlimited NFC Stands</h3>
                    <p className="text-muted-foreground">
                      We'll provide as many NFC stands as you want for lobbies, common areas, or anywhere members gather. The more stands you have, the more visible the perks become - all completely free.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* No Work for Your Staff */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">No Work for Your Staff</h3>
                    <p className="text-muted-foreground">
                      Your team doesn't manage deals, ads, or apps. We handle setup, design, and updates. Just choose where to place the stands.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Drive Engagement */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Drive Engagement and Loyalty</h3>
                    <p className="text-muted-foreground">
                      When members feel connected to local businesses and enjoy extra value, they stay more engaged with your community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* White Label Directory Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-6">Upgrade to White Label Directory</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Take your partnership to the next level with a private, branded version of Preferred Deals made exclusively for your members.
          </p>

          {/* Pricing Toggle */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm">
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
            </div>
            {isAnnual && (
              <Badge variant="secondary" className="mt-3">
                Save 2 Months
              </Badge>
            )}
          </div>

          {/* Premium Plan Card */}
          <Card className="max-w-2xl mx-auto border-2 border-gray-900 mb-12">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-black text-white rounded-lg">
                  <Star className="w-6 h-6" />
                </div>
              </div>
              <CardTitle className="text-2xl mb-2">White Label Directory</CardTitle>
              <CardDescription>
                Your own branded platform with complete control
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
                      Save ${savings} compared to monthly
                    </Badge>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold">${monthlyPrice}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Custom Subdomain</p>
                    <p className="text-sm text-muted-foreground">Example: yourcommunity.preferred.deals</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Community Branding</p>
                    <p className="text-sm text-muted-foreground">Add your logo and name to the directory homepage</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Custom Branded NFC Stands</p>
                    <p className="text-sm text-muted-foreground">Professionally designed with your organization's branding</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Deal Control Dashboard</p>
                    <p className="text-sm text-muted-foreground">Approve, reject, or invite local businesses</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Analytics & Insights</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Priority Support</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Dedicated Account Manager</span>
                </div>
              </div>

              <Button className="w-full bg-black" onClick={onGetStarted}>
                Upgrade to White Label
              </Button>
            </CardContent>
          </Card>

          {/* Add-On Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="mb-6">Available Add-On</h3>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="mb-2">Custom NFC Keychains</h3>
                    <p className="text-muted-foreground">
                      Give members a portable, branded way to access your directory. Perfect for welcome gifts, membership perks, or community events. Each keychain links directly to your community's directory page.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is there a cost to become a Preferred Deals partner?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. It's completely free for communities to join and receive Preferred Deals branded NFC stands. The free partnership includes unlimited stands, access to the full directory, and no hidden fees. You only pay if you want to upgrade to the White Label Directory for a custom branded experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What's the difference between free and White Label?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The free partnership gives you Preferred Deals branded NFC stands and access to the main directory. White Label adds your own branding, custom subdomain, deal approval controls, and dedicated support - perfect for communities wanting a fully branded experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What kind of offers will members see?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                All offers come from verified local businesses. Most common are restaurants, gyms, salons, pet care. All curated to provide genuine value to members.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Do the stands require power or Wi-Fi?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No the stand does not require any power. The user must have an internet connection to access the directory. NFC stands are fully wireless and maintenance-free. Members just tap their phone to access the directory.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Can we approve which deals appear in our community?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. With the White Label Directory upgrade, your team can review and approve deals before they appear to members.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
