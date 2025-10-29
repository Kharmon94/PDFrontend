import { ArrowLeft, Search, HelpCircle, MessageCircle, Mail, Phone, Book } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';

interface HelpCenterProps {
  onBack: () => void;
}

export function HelpCenter({ onBack }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = {
    general: [
      {
        question: 'What is Preferred Deals?',
        answer: 'Preferred Deals is a local business directory platform that connects consumers with quality businesses in their area. We help you discover deals, services, and trusted local establishments.',
      },
      {
        question: 'Is it free to use?',
        answer: 'Yes! Creating an account and browsing businesses is completely free for users. You can save deals, write reviews, and access exclusive promotions at no cost.',
      },
      {
        question: 'How do I save my favorite deals?',
        answer: 'First, create a free account or log in. Then, click the heart icon on any business listing or deal to save it. You can view all your saved deals in your account dashboard.',
      },
      {
        question: 'How do I contact a business?',
        answer: 'Each business listing includes contact information such as phone number, email, and website. Simply click on a business to view their full details and contact options.',
      },
    ],
    business: [
      {
        question: 'How do I list my business?',
        answer: 'Click on "Become a Partner" in the footer, fill out the registration form with your business details, and submit. Our team will review your application and activate your listing within 24-48 hours.',
      },
      {
        question: 'What are the pricing plans for businesses?',
        answer: 'We offer three tiers: Basic (free with limited features), Professional ($49/month with enhanced visibility), and Premium ($99/month with priority placement and analytics). Visit our Pricing page for detailed information.',
      },
      {
        question: 'Can I edit my business information?',
        answer: 'Yes! Log in to your business dashboard where you can update your business details, hours, photos, deals, and more at any time.',
      },
      {
        question: 'How do analytics work?',
        answer: 'Professional and Premium plans include analytics showing profile views, deal clicks, contact requests, and user engagement. Access these insights from your business dashboard.',
      },
    ],
    distribution: [
      {
        question: 'What is a Distribution Partner?',
        answer: 'Distribution Partners help us expand our reach by promoting Preferred Deals in their communities. This could be through local events, community centers, churches, or other organizations.',
      },
      {
        question: 'How do I become a Distribution Partner?',
        answer: 'Fill out the Distribution Partner application form in the footer. Tell us about your organization and community reach. We\'ll review your application and contact you with next steps.',
      },
      {
        question: 'What are the benefits?',
        answer: 'Distribution Partners receive promotional materials, commission on new business sign-ups from their network, and help strengthen their local business community.',
      },
      {
        question: 'Is there a fee to join?',
        answer: 'No, becoming a Distribution Partner is completely free. We provide all marketing materials and support at no cost.',
      },
    ],
    technical: [
      {
        question: 'Which browsers are supported?',
        answer: 'Preferred Deals works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.',
      },
      {
        question: 'Is there a mobile app?',
        answer: 'Currently, we offer a mobile-responsive website that works great on all devices. A dedicated mobile app is in development and coming soon!',
      },
      {
        question: 'I forgot my password. What do I do?',
        answer: 'Click on the "Login" button and then select "Forgot Password". Enter your email address and we\'ll send you instructions to reset your password.',
      },
      {
        question: 'How do I delete my account?',
        answer: 'Contact our support team at support@preferreddeals.com to request account deletion. We\'ll process your request within 48 hours.',
      },
    ],
  };

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@preferreddeals.com',
      action: 'Send Email',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Mon-Fri, 9AM-6PM EST',
      contact: '(555) 123-4567',
      action: 'Call Now',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      action: 'Start Chat',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <HelpCircle className="w-12 h-12 text-gray-900" />
            </div>
          </div>
          <h1 className="mb-4">How Can We Help You?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Quick Help Topics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Book className="w-8 h-8 text-gray-900 mx-auto mb-3" />
              <h3 className="mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600">
                Learn the basics of using Preferred Deals
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <HelpCircle className="w-8 h-8 text-gray-900 mx-auto mb-3" />
              <h3 className="mb-2">Account Help</h3>
              <p className="text-sm text-gray-600">
                Manage your account settings and preferences
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-gray-900 mx-auto mb-3" />
              <h3 className="mb-2">Business Help</h3>
              <p className="text-sm text-gray-600">
                Resources for business partners
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find quick answers to the most common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="business">For Business</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              {Object.entries(faqs).map(([category, questions]) => (
                <TabsContent key={category} value={category}>
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {contactOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.title} className="text-center p-6 border rounded-lg hover:border-gray-900 transition-colors">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Icon className="w-6 h-6 text-gray-900" />
                      </div>
                    </div>
                    <h3 className="mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                    <p className="text-sm mb-4">{option.contact}</p>
                    <Button variant="outline" className="w-full">
                      {option.action}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
