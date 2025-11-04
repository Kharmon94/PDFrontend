import { ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface ListYourBusinessProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function ListYourBusiness({ onBack, onGetStarted }: ListYourBusinessProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24 sm:py-32 bg-[rgba(0,0,0,0)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6 text-white">Your Business in Front of More Customers</h1>
          <h2 className="mb-8 text-white">Without Paying for Ads</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Hyperlocal Audience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Exclusive Exposure</span>
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
            GET STARTED
          </Button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center mb-12">How It Works</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">1</span>
                    Step 1: Submit Your Deal
                  </h3>
                  <p className="text-muted-foreground">
                    Share your promotion along with your business name, contact info, website or landing page, and any coupon code you'd like featured. All listings are reviewed and vetted by our team before publishing.
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
                    Step 2: We Add It to the Directory
                  </h3>
                  <p className="text-muted-foreground">
                    Once reviewed your offer is added to the Preferred Deals directory, which is displayed on NFC stands in local apartments, gyms, office buildings, and community spaces.
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
                    Step 3: Locals Tap to Browse
                  </h3>
                  <p className="text-muted-foreground">
                    When someone taps the NFC stand, it opens the Preferred Deals directory homepage. Community members can then browse all active offers and discover your business.
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
                    Step 4: You Get Real Customers
                  </h3>
                  <p className="text-muted-foreground">
                    People can click through to your website, redeem your offer, or visit in person.
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-10">
          <Button size="lg" onClick={onGetStarted}>
            GET STARTED
          </Button>
        </div>
      </div>

      {/* Why Advertise With Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Why Advertise With Us</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Local Reach */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Local Reach</h3>
                    <p className="text-muted-foreground">
                      We help businesses get exposure right where their customers live, work, and hang out, all without buying digital ads or hiring an agency.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Visibility */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Real-World Visibility</h3>
                    <p className="text-muted-foreground">
                      Each NFC stand features our Preferred Deals directory, a curated list of local offers community members can browse by simply tapping their phone. Your business appears directly in this directory.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instant Engagement */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Instant Engagement</h3>
                    <p className="text-muted-foreground">
                      Your listing features your business details, website or landing page, and any coupon codes, making it easy for people to learn more or redeem your offer instantly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hands-Off Setup */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2">Hands-Off Setup</h3>
                    <p className="text-muted-foreground">
                      Submit your offer, and we handle everything: directory listing, NFC placement, and performance tracking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" onClick={onGetStarted}>
              GET STARTED
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Basic Listing Section */}
          <div className="mb-16">
            <h2 className="text-center mb-6">Basic Listing</h2>
            <p className="text-center text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
              Get your business listed on Preferred Deals for free. Perfect for establishing your online presence.
            </p>
            
            <Card className="max-w-2xl mx-auto border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="mb-2">Basic Listing</CardTitle>
                <div className="text-4xl font-bold mb-2">FREE</div>
                <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  ALWAYS FREE
                </div>
                <CardDescription>Get your business listed with essential information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Business Profile with Name & Description</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Contact Information (Phone, Email, Address)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Website Link</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Business Hours</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Category Placement</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground italic">
                    Note: Basic listings do not include the ability to add exclusive deals or promotions. Upgrade to a Featured Listing to unlock deal management.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button size="lg" onClick={onGetStarted}>
                CREATE FREE LISTING
              </Button>
            </div>
          </div>

          {/* Featured Listing Pricing */}
          <h2 className="text-center mb-6">Featured Listing Pricing</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Upgrade to a Featured Listing to add exclusive deals and promotions that appear on our NFC stands.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {/* 30 Day Listing */}
            <Card className="border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="mb-2">30 Day Listing</CardTitle>
                <div className="text-4xl font-bold mb-2">$49</div>
                <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  TRY US OUT
                </div>
                <CardDescription>Perfect for short-term or seasonal promotions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">1 Month of Exposure</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Business Profile Listing</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Deal Management</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">NFC Stand Placement</p>
                </div>
              </CardContent>
            </Card>

            {/* 90 Day Listing */}
            <Card className="border-2 border-primary relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="mb-2">90 Day Listing</CardTitle>
                <div className="text-4xl font-bold mb-2">$99</div>
                <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  1 MONTH FREE
                </div>
                <CardDescription>Ideal for consistent exposure over several months</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">3 Months of Exposure</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Business Profile Listing</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Unlimited Deal Updates</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">NFC Stand Placement</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Priority Support</p>
                </div>
              </CardContent>
            </Card>

            {/* Annual Listing */}
            <Card className="border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="mb-2">Annual Listing</CardTitle>
                <div className="text-4xl font-bold mb-2">$299</div>
                <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  6 MONTHS FREE
                </div>
                <CardDescription>Best overall value for lasting local visibility and brand awareness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Full Year of Exposure</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Featured Business Profile</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Unlimited Deal Updates</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Premium NFC Placement</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Premium Support</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Analytics Dashboard</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" onClick={onGetStarted}>
              GET STARTED
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Where can people find the stands?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our NFC stands are placed in high-traffic community spots — apartment lobbies, gyms, coworking spaces, and other local venues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                When someone taps the stand, what happens?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Each tap opens the Preferred Deals directory homepage, where residents and visitors can browse local offers and discover your business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Do I need to design anything?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No design work needed. Just send your offer and details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How long does my deal stay live?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You choose the duration. Most listings run 30–90 days and can be renewed anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is there a contract or long-term commitment?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No contracts. You only pay per listing period and can renew whenever you like.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}