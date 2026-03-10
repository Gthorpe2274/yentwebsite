import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import HomeSection from "@/components/website/HomeSection";
import ServicesSection from "@/components/website/ServicesSection";
import AboutSection from "@/components/website/AboutSection";
import BlogSection from "@/components/website/BlogSection";
import ContactSection from "@/components/website/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <HomeSection />
        <ServicesSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </div>
      <Footer />
      {/* Hidden admin link */}
      <div className="text-center py-2 bg-slate-50 border-t border-slate-200">
        <a
          href="/admin/blog"
          className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          Admin
        </a>
      </div>
    </main>
  );
}
