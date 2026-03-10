"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Lightbulb, 
  Shield, 
  Target, 
  Users,
  Award,
  Calendar,
  MapPin
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead of the curve.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparency and honesty guide every interaction. We build trust through consistent, ethical practices.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue perfection in every project, ensuring our solutions exceed expectations and deliver real results.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We see ourselves as an extension of your team, working collaboratively to achieve shared goals.",
    color: "from-purple-500 to-violet-600",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "15+ years in digital marketing and AI technology",
    image: "/images/team-1.png",
  },
  {
    name: "Michael Roberts",
    role: "CTO",
    bio: "Former Google engineer, AI specialist",
    image: "/images/team-2.png",
  },
  {
    name: "Emily Zhang",
    role: "Head of Marketing",
    bio: "Expert in growth marketing strategies",
    image: "/images/team-3.png",
  },
  {
    name: "David Kim",
    role: "Lead Data Scientist",
    bio: "PhD in Machine Learning from MIT",
    image: "/images/team-4.png",
  },
];

const timeline = [
  { year: "2018", title: "Founded", description: "Y Enterprises was born with a vision to revolutionize digital marketing" },
  { year: "2019", title: "First AI Product", description: "Launched our flagship AI Chatbot solution" },
  { year: "2021", title: "Global Expansion", description: "Opened offices in Europe and Asia" },
  { year: "2023", title: "500+ Clients", description: "Reached milestone of serving 500+ businesses worldwide" },
  { year: "2024", title: "Industry Leader", description: "Recognized as a leader in AI-powered marketing solutions" },
];

const stats = [
  { value: "6+", label: "Years in Business", icon: Calendar },
  { value: "50+", label: "Team Members", icon: Users },
  { value: "25+", label: "Countries Served", icon: MapPin },
  { value: "15+", label: "Industry Awards", icon: Award },
];

export default function AboutSection() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="bg-red-100 text-red-700 mb-4">About Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Driving Digital Transformation Since 2018
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We&apos;re passionate about helping businesses leverage AI technology to achieve unprecedented growth
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/office.png"
                alt="Y Enterprises Office"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white rounded-xl shadow-xl p-6 hidden md:block">
              <p className="text-3xl font-bold">6+</p>
              <p className="text-slate-300 text-sm">Years of Excellence</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded in 2018, Y Enterprises emerged from a simple observation: businesses were struggling 
              to keep up with the rapid pace of digital transformation. We saw an opportunity to bridge 
              this gap using artificial intelligence.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              What started as a small team of passionate technologists has grown into a global force 
              of digital marketing experts, data scientists, and AI specialists united by a common mission.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Today, we serve over 500 clients across 25 countries, helping them navigate the complex 
              digital landscape with innovative AI-powered solutions that deliver measurable results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => handleNavClick("#services")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleNavClick("#contact")}
                variant="outline"
                className="border-slate-300"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-12">Our Journey</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 hidden md:block" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 inline-block ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                      <span className="text-red-600 font-bold text-lg">{item.year}</span>
                      <h4 className="text-slate-900 font-semibold mt-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-4 h-4 bg-red-600 rounded-full z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Core Values</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Meet Our Leadership</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The visionaries driving innovation at Y Enterprises
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="border-0 shadow-sm hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">{member.name}</h4>
                  <p className="text-red-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
                  <stat.icon className="h-7 w-7 text-sky-400" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
