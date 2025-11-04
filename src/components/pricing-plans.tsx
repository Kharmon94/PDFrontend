import { ArrowLeft, Check, Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PricingPlansProps {
  onBack: () => void;
  onSelectPlan?: (plan: string) => void;
}

export function PricingPlans({ onBack, onSelectPlan }: PricingPlansProps) {
  const plans = [
    {
      name: '1 Month',
      icon: Star,
      description: 'Premium listing for one month',
      price: 49,
      duration: '1 month',
      monthlyEquivalent: 49,
      features: [
        'Featured business badge',
        'Priority in search results',
        'Unlimited photos',
        'Post unlimited deals',
        'Basic analytics dashboard',
        'Social media links',
        'Email support',
        'Enhanced visibility',
      ],
      cta: 'Get Started',
      popular: false,
      savings: null,
    },
    {
      name: '3 Months',
      icon: TrendingUp,
      description: 'Premium listing for three months',
      price: 99,
      duration: '3 months',
      monthlyEquivalent: 33,
      features: [
        'Everything in 1 Month',
        'Save $48 compared to monthly',
        'Extended premium visibility',
        'Quarterly performance reports',
        'Priority customer support',
        'Featured placement longer',
        'Better ROI on marketing',
        'Consistent brand presence',
      ],
      cta: 'Best Value',
      popular: true,
      savings: '$48',
    },
    {
      name: '1 Year',
      icon: Zap,
      description: 'Premium listing for twelve months',
      price: 299,
      duration: '12 months',
      monthlyEquivalent: 24.92,
      features: [
        'Everything in 3 Months',
        'Save $289 compared to monthly',
        'Maximum annual exposure',
        'Top placement in category',
        'Advanced analytics & insights',
        'Featured on homepage',
        'Custom business profile URL',
        'Dedicated account support',
        'Annual performance review',
      ],
      cta: 'Maximum Savings',
      popular: false,
      savings: '$289',
    },
  ];

  const enterprise = {
    title: 'Enterprise & Multi-Location',
    description: 'Custom solutions for large businesses and franchise chains',
    features: [
      'Multi-location management',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'Advanced reporting',
      'Volume discounts available',
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
          <h1 className="mb-4">Premium Listing Packages</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get maximum visibility for your business with our premium listings
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-sm">Save up to 49% with annual plan</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? 'border-2 border-black shadow-xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-black text-white">Best Value</Badge>
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
                      <span className="text-5xl font-bold">${plan.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {plan.duration} of premium listing
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      ${plan.monthlyEquivalent.toFixed(2)}/month
                    </p>
                    {plan.savings && (
                      <Badge variant="secondary" className="mt-2">
                        Save {plan.savings}
                      </Badge>
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
                <h3 className="text-white mb-4">Multiple locations or custom needs?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Our enterprise plans are tailored to your specific needs. Contact our sales team 
                  to discuss multi-location packages, volume discounts, and dedicated support.
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
                <h3 className="mb-2">Can I extend my premium listing?</h3>
                <p className="text-sm text-gray-600">
                  Yes! You can extend or upgrade your premium listing at any time. We'll apply any remaining time toward your new package.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="mb-2">What's included in premium listings?</h3>
                <p className="text-sm text-gray-600">
                  All premium listings include featured placement, unlimited deals, analytics, and priority support for the duration of your package.
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
