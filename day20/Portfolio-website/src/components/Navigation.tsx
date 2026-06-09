import { useState, useEffect } from "react";
import { Menu, X, Bot, FileText, Send, Sparkles } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Core", id: "hero" },
    { label: "Bio", id: "about" },
    { label: "Timeline", id: "experience" },
    { label: "Works", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlit script
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-white/5 py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand Signature */}
          <div className="flex items-center gap-2">
            <span
              onClick={() => handleNavClick("hero")}
              className="text-base font-display font-medium tracking-widest text-white cursor-pointer select-none"
            >
              DIVY SHAH <span className="text-secondary opacity-60">//</span> PORTFOLIO
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 cursor-pointer ${
                    activeSection === item.id
                      ? "text-secondary font-semibold"
                      : "text-outline hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary" />
                  )}
                </button>
              ))}
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <button
                onClick={() => handleNavClick("contact")}
                className="text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 py-2 px-4 rounded-xl bg-primary-container text-white shrink-0 hover:bg-indigo-600 transition-colors shadow-lg cursor-pointer"
              >
                Contact
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 px-2 text-outline hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full absolute top-full left-0 bg-background/95 backdrop-blur-lg border-b border-white/8 py-4 px-6 flex flex-col gap-4 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs font-mono tracking-widest uppercase text-left py-2.5 border-b border-white/5 cursor-pointer ${
                activeSection === item.id ? "text-secondary font-bold" : "text-outline"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("contact")}
            className="w-full text-xs font-mono text-center py-3 bg-primary-container rounded-xl text-white font-semibold cursor-pointer shadow-lg mt-2"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
