"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  MessageCircle, 
  BarChart3, 
  Zap, 
  Smartphone, 
  ArrowRight, 
  Check,
  Star,
  Accessibility
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "chatbot",
    icon: MessageCircle,
    title: "AI Chatbot Solutions",
    subtitle: "24/7 Intelligent Customer Engagement",
    description: "Transform visitor interactions into conversions with our advanced AI chatbot technology. Provide instant support, qualify leads, and deliver personalized experiences around the clock.",
    features: [
      "Natural language processing",
      "Multi-language support",
      "Seamless human handoff",
      "CRM integration",
      "Analytics dashboard",
      "Custom training",
    ],
    image: "/images/chatbot-service.jpg",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "AI Web Analytics",
    subtitle: "Deep Insights That Drive Decisions",
    description: "Transform raw data into actionable strategies with our AI-powered analytics platform. Uncover hidden patterns, predict trends, and make data-driven decisions with confidence.",
    features: [
      "Real-time data processing",
      "Predictive analytics",
      "Custom dashboards",
      "A/B testing tools",
      "Conversion tracking",
      "ROI measurement",
    ],
    image: "/images/analytics-service.png",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "automation",
    icon: Zap,
    title: "Marketing Automation",
    subtitle: "Streamline Your Marketing Workflow",
    description: "Scale your marketing efforts with intelligent automation. From email campaigns to social media scheduling, we help you reach the right audience at the right time.",
    features: [
      "Email automation",
      "Social media scheduling",
      "Lead scoring",
      "Customer journey mapping",
      "Personalization engine",
      "Multi-channel campaigns",
    ],
    image: "/images/automation-service.png",
    color: "from-orange-500 to-amber-600",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Commerce",
    subtitle: "Reach Customers Everywhere",
    description: "Create seamless mobile shopping experiences that convert. Our mobile commerce solutions help you capture the growing mobile-first audience.",
    features: [
      "Mobile-optimized storefronts",
      "One-click checkout",
      "Push notifications",
      "Mobile payments",
      "App integration",
      "Performance optimization",
    ],
    image: "/images/mobile-commerce.png",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "ada",
    icon: Accessibility,
    title: "ADA Compliance Services",
    subtitle: "U.S. Web Accessibility Standards",
    description: "Ensure your website meets Americans with Disabilities Act (ADA) requirements and WCAG guidelines. Protect your business from legal risks while making your digital presence accessible to all users.",
    features: [
      "WCAG 2.1 compliance audit",
      "Screen reader compatibility",
      "Keyboard navigation testing",
      "Color contrast analysis",
      "Remediation guidance",
      "Ongoing compliance monitoring",
    ],
    image: "/images/ada-compliance.png",
    color: "from-blue-600 to-indigo-700",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for small businesses getting started",
    features: [
      "1 AI Chatbot",
      "Basic Analytics",
      "Email Support",
      "5,000 Monthly Conversations",
      "Standard Integration",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$1,299",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "3 AI Chatbots",
      "Advanced Analytics",
      "Priority Support",
      "50,000 Monthly Conversations",
      "Custom Integration",
      "Marketing Automation",
      "A/B Testing",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale operations",
    features: [
      "Unlimited Chatbots",
      "Full Analytics Suite",
      "24/7 Dedicated Support",
      "Unlimited Conversations",
      "Custom Development",
      "Full Automation Platform",
      "White-label Options",
      "SLA Guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function ServicesSection() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="bg-sky-100 text-sky-700 mb-4">Our Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            AI-Powered Digital Marketing Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive services designed to transform your digital presence and drive measurable results
          </p>
        </div>

        {/* Services Detail */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={`absolute -bottom-4 ${index % 2 === 1 ? "-left-4" : "-right-4"} bg-white rounded-xl shadow-xl p-4 hidden md:block`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} bg-opacity-10 text-sm font-medium text-slate-900 mb-4`}
                  style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                >
                  <service.icon className="h-4 w-4" />
                  {service.subtitle}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleNavClick("#contact")}
                  className={`bg-gradient-to-r ${service.color} text-white hover:opacity-90 px-6`}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Transparent Pricing for Every Business
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular
                    ? "border-2 border-sky-500 shadow-xl scale-105"
                    : "border border-slate-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star className="h-3 w-3" /> POPULAR
                  </div>
                )}
                <CardHeader className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleNavClick("#contact")}
                    className={`w-full ${
                      plan.popular
                        ? "bg-sky-500 hover:bg-sky-600 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
