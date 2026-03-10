"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  BarChart3, 
  Zap, 
  Smartphone, 
  ArrowRight, 
  Play,
  CheckCircle,
  Users,
  Globe,
  Clock,
  TrendingUp,
  Accessibility
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    description: "24/7 intelligent customer engagement that transforms visitor interactions into conversions.",
    color: "from-sky-500 to-blue-600",
    href: "#services"
  },
  {
    icon: BarChart3,
    title: "AI Web Analytics",
    description: "Deep insights that drive decisions. Transform raw data into actionable strategies.",
    color: "from-purple-500 to-violet-600",
    href: "#services"
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    description: "Streamline your marketing workflow with intelligent automation that scales.",
    color: "from-orange-500 to-amber-600",
    href: "#services"
  },
  {
    icon: Smartphone,
    title: "Mobile Commerce",
    description: "Reach customers everywhere with seamless mobile shopping experiences.",
    color: "from-emerald-500 to-teal-600",
    href: "#services"
  },
  {
    icon: Accessibility,
    title: "ADA Compliance",
    description: "Ensure your website meets U.S. accessibility standards and avoid legal risks.",
    color: "from-blue-600 to-indigo-700",
    href: "#services"
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Clients Served", icon: Users },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: TrendingUp },
  { value: 10, suffix: "M+", label: "Conversations Powered", icon: MessageCircle },
  { value: 24, suffix: "/7", label: "Support Available", icon: Clock },
];

const features = [
  "Advanced AI Technology",
  "Data-Driven Strategies",
  "Dedicated Support Team",
  "Proven ROI Results",
];

export default function HomeSection() {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate counters
          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-red-600/10 text-red-400 border-red-600/20 mb-6 px-4 py-2">
                AI-Powered Marketing Solutions
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Business with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                  AI-Powered Marketing
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Y Enterprises delivers cutting-edge digital marketing solutions powered by artificial intelligence. 
                Drive growth, increase engagement, and maximize ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => handleNavClick("#contact")}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Content - Decorative */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Floating Cards */}
                <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">AI Chatbot Active</p>
                      <p className="text-sky-300 text-sm">1.2k conversations today</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 left-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">+340% ROI</p>
                      <p className="text-emerald-300 text-sm">This quarter</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 right-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">500+ Clients</p>
                      <p className="text-purple-300 text-sm">Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-slate-50 py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {["TechCorp", "InnovateCo", "FutureTech", "DataDrive", "CloudBase"].map((company) => (
              <div key={company} className="text-2xl font-bold text-slate-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-sky-100 text-sky-700 mb-4">Our Solutions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              AI-Powered Marketing Solutions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions designed for the modern business landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => (
              <a
                key={service.title}
                href={service.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(service.href); }}
                className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center text-red-600 font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='%230ea5e9' fill-opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                  <stat.icon className="h-8 w-8 text-sky-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counters[index]}{stat.suffix}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/team.png"
                  alt="Our Team"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">500+ Projects</p>
                    <p className="text-slate-500 text-sm">Successfully Delivered</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Badge className="bg-red-100 text-red-700 mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                The Partner You Need for Digital Success
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We combine cutting-edge AI technology with deep marketing expertise to deliver 
                results that matter. Our team works as an extension of yours, ensuring seamless 
                integration and maximum impact.
              </p>
              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleNavClick("#about")}
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8"
              >
                Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-20 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a free consultation and discover how AI can revolutionize your business.
          </p>
          <Button
            onClick={() => handleNavClick("#contact")}
            size="lg"
            className="bg-white text-red-600 hover:bg-white/90 px-10 py-6 text-lg font-semibold shadow-xl"
          >
            Schedule Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
