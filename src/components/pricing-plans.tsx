import { ArrowLeft, Check, Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useState } from 'react';

interface PricingPlansProps {
  onBack: () => void;
  onSelectPlan?: (plan: string) => void;
}

export function PricingPlans({ onBack, onSelectPlan }: PricingPlansProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Basic',
      icon: Star,
      description: 'Perfect for small businesses just getting started',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        'Basic business listing',
        'Contact information display',
        'Business hours',
        'Up to 3 photos',
        'Customer reviews',
        'Search visibility',
      ],
      limitations: [
        'No featured placement',
        'No analytics',
        'No deal posting',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      icon: TrendingUp,
      description: 'Great for growing businesses seeking more visibility',
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        'Everything in Basic',
        'Featured business badge',
        'Unlimited photos',
        'Post unlimited deals',
        'Basic analytics dashboard',
        'Priority in search results',
        'Social media links',
        'Email support',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Premium',
      icon: Zap,
      description: 'Maximum exposure and advanced features for established businesses',
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        'Everything in Professional',
        'Top placement in category',
        'Advanced analytics & insights',
        'Featured on homepage',
        'Custom business profile URL',
        'Priority customer support',
        'Monthly performance reports',
        'Remove competitor ads',
        'API access',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: false,
    },
  ];

  const enterprise = {
    title: 'Enterprise',
    description: 'Custom solutions for large businesses and chains',
    features: [
      'Multi-location management',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'Advanced reporting',
      'Custom contract terms',
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3">
            <Label htmlFor="billing-toggle" className={!isAnnual ? '' : 'text-gray-500'}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className={isAnnual ? '' : 'text-gray-500'}>
              Annual
            </Label>
            <Badge variant="secondary" className="ml-2">Save up to 20%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const monthlyEquivalent = isAnnual ? (plan.annualPrice / 12).toFixed(0) : plan.monthlyPrice;

            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? 'border-2 border-black shadow-xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-black text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl">${monthlyEquivalent}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    {isAnnual && price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually at ${price}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full mb-6"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => onSelectPlan?.(plan.name)}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex gap-3">
                        <Check className="w-5 h-5 text-gray-900 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enterprise Section */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-white mb-4">{enterprise.title}</h2>
                <p className="text-gray-300 mb-6">{enterprise.description}</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {enterprise.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" variant="secondary">
                  Contact Sales
                </Button>
              </div>
              <div className="bg-white/10 rounded-lg p-8 backdrop-blur">
                <h3 className="text-white mb-4">Need a custom solution?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Our enterprise plans are tailored to your specific needs. Contact our sales team 
                  to discuss volume discounts, custom features, and dedicated support.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">📧 enterprise@preferreddeals.com</p>
                  <p className="text-gray-300">📞 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="mb-2">Can I change plans later?</h3>
                <p className="text-sm text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any charges.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="mb-2">Is there a free trial?</h3>
                <p className="text-sm text-gray-600">
                  Professional and Premium plans include a 14-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-gray-600">
                  We accept all major credit cards, PayPal, and ACH transfers for annual plans.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="mb-2">Can I cancel anytime?</h3>
                <p className="text-sm text-gray-600">
                  Yes, you can cancel your subscription at any time. Your access continues until the end of 
                  your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
