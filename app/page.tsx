"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────── */

const PHONE = "(732) 806-5656";
const PHONE_HREF = "tel:7328065656";
const EMAIL = "Office@emgeeexteriors.com";
const ADDRESS = "1522 Laguna Ln, Lakewood, NJ 08701";
const LICENSE = "13VH07668500";
const GOOGLE_MAPS =
  "https://www.google.com/maps/search/?api=1&query=Emgee+Contracting+Lakewood+NJ";

const NAV_LINKS = [
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Roofs Completed" },
  { value: "4.8", label: "Google Rating" },
  { value: "10 Yr", label: "Warranty" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Free Inspection",
    desc: "We thoroughly inspect your roof, document any issues, and give you an honest assessment — no pressure, no obligation.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Detailed Estimate",
    desc: "Receive a transparent, line-by-line estimate with material options, timelines, and no hidden fees.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Expert Installation",
    desc: "Our experienced crew handles every detail — from tear-off to final shingle — with precision and care.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a1.5 1.5 0 01-.56-2.04l3.56-5.93A1.5 1.5 0 0110.6 3.5h2.8a1.5 1.5 0 011.28.64l3.56 5.93a1.5 1.5 0 01-.56 2.04l-5.1 3.06a1.5 1.5 0 01-1.56 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.17V21" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Final Walkthrough",
    desc: "We walk you through the completed work, answer every question, and don't leave until you're 100% satisfied.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const SERVICES = [
  {
    title: "Roof Replacement",
    desc: "Complete tear-off and new installation with premium architectural shingles, backed by manufacturer warranties.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Roof Repairs",
    desc: "From minor leaks to storm damage, we diagnose and fix issues fast to protect your home and prevent costly damage.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a1.5 1.5 0 01-.56-2.04l3.56-5.93A1.5 1.5 0 0110.6 3.5h2.8a1.5 1.5 0 011.28.64l3.56 5.93a1.5 1.5 0 01-.56 2.04l-5.1 3.06a1.5 1.5 0 01-1.56 0zM12 15.17V21" />
      </svg>
    ),
  },
  {
    title: "Siding",
    desc: "Vinyl, fiber cement, and wood siding installation that transforms your home's curb appeal and insulation.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
  },
  {
    title: "Gutters",
    desc: "Seamless gutter installation, repairs, and leaf guard systems to channel water safely away from your foundation.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Skylights",
    desc: "Brighten your home with professional skylight installation, repairs, and flashing to ensure a leak-free seal.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Emergency Service",
    desc: "Storm damage? Sudden leak? We offer rapid-response emergency repairs to protect your home when it matters most.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
];

const GALLERY_ITEMS = [
  { src: "/gallery-1.png", label: "Complete Roof Replacement" },
  { src: "/gallery-2.png", label: "Siding Installation" },
  { src: "/gallery-3.png", label: "Gutter System" },
  { src: "/gallery-4.png", label: "Roof Repair" },
];

const TESTIMONIALS = [
  {
    name: "Michael R.",
    location: "Lakewood, NJ",
    text: "Emgee replaced our entire roof in two days. The crew was professional, cleaned up everything, and the final result looks incredible. Highly recommend.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    location: "Toms River, NJ",
    text: "After the storm took out half our shingles, Emgee was there the next morning. They handled the insurance paperwork and had us watertight by end of day. True professionals.",
    rating: 5,
  },
  {
    name: "David L.",
    location: "Jackson, NJ",
    text: "Got three quotes for our roof. Emgee was the most detailed and transparent. No hidden fees, great communication throughout, and the quality of work speaks for itself.",
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: "How long does a roof replacement take?",
    a: "Most residential roof replacements are completed in 1-3 days, depending on the size of your home and complexity of the roof. We'll give you an exact timeline during your free estimate.",
  },
  {
    q: "What roofing materials do you use?",
    a: "We work with premium architectural shingles from top manufacturers like GAF, CertainTeed, and Owens Corning. We also install metal roofing, flat roofing (TPO/EPDM), and slate. We'll recommend the best option for your home and budget.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes, we offer flexible financing options to help make your roofing project affordable. We can discuss payment plans during your free consultation.",
  },
  {
    q: "What's included in a free inspection?",
    a: "Our free inspection includes a complete roof assessment, photo documentation of any issues, a written condition report, and a no-obligation estimate for any recommended work. We'll walk you through everything we find.",
  },
  {
    q: "How long is your warranty?",
    a: "We provide a 10-year workmanship warranty on all roof installations, in addition to manufacturer material warranties of 25-50 years depending on the product. Your investment is fully protected.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Absolutely. Emgee Contracting is fully licensed (NJ HIC #${LICENSE}) and carries comprehensive general liability and workers' compensation insurance. We're happy to provide documentation upon request.`,
  },
  {
    q: "Do you handle insurance claims?",
    a: "Yes, we work directly with all major insurance companies. We'll document the damage, help you file your claim, and coordinate with your adjuster to make the process as smooth as possible.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Lakewood, Toms River, Jackson, Brick, Howell, Freehold, and surrounding Ocean and Monmouth County communities. Contact us to confirm coverage in your area.",
  },
];

/* ─────────────────────────────────────────────
   STAR RATING COMPONENT
   ───────────────────────────────────────────── */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? "text-accent" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mark document as JS-loaded for animation system
  useEffect(() => {
    document.documentElement.classList.add("js-loaded");
  }, []);

  // IntersectionObserver for all fade-up elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll detection for nav background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollTo = (href: string) => {
    setMobileMenu(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ═══════════════ NAV (dark-solid) ═══════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary-dark/95 backdrop-blur-md shadow-lg"
            : "bg-primary-dark"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Emgee Contracting"
                width={160}
                height={45}
                className="h-9 sm:h-11 w-auto brightness-0 invert"
                priority
              />
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={PHONE_HREF}
                className="ml-3 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {PHONE}
              </a>
            </div>

            {/* Mobile: phone + hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-dark text-white font-semibold px-3 py-2 rounded-lg text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call
              </a>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileMenu ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              mobileMenu ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-3 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO SPLIT ═══════════════ */}
      <section className="relative pt-16 sm:pt-20 bg-light min-h-[600px] lg:min-h-[700px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 sm:py-16 lg:py-24">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-dark font-semibold px-4 py-1.5 rounded-full text-sm mb-6 fade-up">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8 Stars on Google
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-text tracking-tight fade-up">
                Your Roof.
                <br />
                <span className="text-primary">Our Reputation.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-text-light leading-relaxed max-w-xl fade-up">
                Lakewood&apos;s trusted roofing contractor since 2013. From free inspections to expert installations, we protect what matters most — your home.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 fade-up">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Get Free Estimate
                </a>
                <button
                  onClick={() => scrollTo("#process")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 text-primary font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
                >
                  See Our Process
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-text-light fade-up">
                {["Licensed & Insured", "Free Inspections", "10-Year Warranty"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="order-1 lg:order-2 relative fade-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                <Image
                  src="/hero.png"
                  alt="Beautiful completed roof by Emgee Contracting"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">Trusted Since</p>
                  <p className="text-2xl font-extrabold text-primary">2013</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STAT BAR ═══════════════ */}
      <section className="bg-primary py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center stagger-children">
            {STATS.map((stat) => (
              <div key={stat.label} className="fade-up">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm sm:text-base text-white/70 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS TIMELINE ═══════════════ */}
      <section id="process" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 fade-up">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text fade-up">
              A Roof Job Done{" "}
              <span className="text-primary">Right</span>
            </h2>
            <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto fade-up">
              From first call to final walkthrough, here&apos;s exactly what to expect when you work with Emgee.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative bg-light rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group fade-up"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-6 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.num}
                </div>
                {/* Connector line (desktop) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
                )}
                <div className="text-primary mb-4 mt-2 group-hover:text-accent transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES GRID ═══════════════ */}
      <section id="services" className="py-16 sm:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 fade-up">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text fade-up">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto fade-up">
              Comprehensive exterior solutions for your home, delivered with craftsmanship and care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 fade-up"
              >
                {/* Accent top bar */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
                <div className="p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {svc.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-text">{svc.title}</h3>
                  <p className="mt-2 text-text-light leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl fade-up">
              <Image
                src="/about.png"
                alt="Emgee Contracting roofing crew at work"
                width={650}
                height={450}
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover"
              />
            </div>
            <div>
              <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 fade-up">
                About Emgee
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text fade-up">
                Building Trust, <span className="text-primary">One Roof</span> at a Time
              </h2>
              <p className="mt-6 text-text-light text-lg leading-relaxed fade-up">
                Since 2013, Emgee Contracting has been the name Lakewood homeowners
                trust for roofing, siding, and exterior work. We started as a small
                crew with big standards — and that hasn&apos;t changed.
              </p>
              <p className="mt-4 text-text-light text-lg leading-relaxed fade-up">
                Every project gets the same treatment: honest estimates, quality
                materials, skilled craftsmanship, and a final walkthrough to make
                sure you&apos;re completely satisfied. We don&apos;t cut corners
                because your home deserves better.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 fade-up">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-accent">10+</p>
                  <p className="text-text-light text-sm mt-1">Years in Business</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-accent">500+</p>
                  <p className="text-text-light text-sm mt-1">Roofs Completed</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-accent">4.8</p>
                  <p className="text-text-light text-sm mt-1">Star Rating</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 bg-light rounded-xl p-4 fade-up">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p className="text-sm text-text-light">
                  <span className="font-semibold text-text">NJ HIC# {LICENSE}</span> — Fully licensed and insured in the State of New Jersey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="gallery" className="py-16 sm:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 fade-up">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text fade-up">
              Project <span className="text-primary">Gallery</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 stagger-children">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="gallery-item aspect-[4/3] relative fade-up">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="gallery-label absolute bottom-4 left-4 z-10 text-white font-semibold text-lg">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="reviews" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 fade-up">
              What Our Clients Say
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text fade-up">
              Real <span className="text-primary">Reviews</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-light rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 fade-up"
              >
                <Stars count={t.rating} />
                <p className="mt-4 text-text-light leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-text">{t.name}</p>
                    <p className="text-sm text-text-light">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ACCORDION (SIGNATURE) ═══════════════ */}
      <section id="faq" className="py-16 sm:py-24 bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-3 fade-up">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text fade-up">
              Got <span className="text-primary">Questions?</span>
            </h2>
            <p className="mt-4 text-lg text-text-light fade-up">
              We&apos;ve got answers. Here are the most common things homeowners ask us.
            </p>
          </div>

          <div className="space-y-3 stagger-children">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors fade-up"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-text pr-4 group-hover:text-primary transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFaq === i
                        ? "bg-primary text-white rotate-45"
                        : "bg-light text-primary"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`faq-answer px-6 ${
                    openFaq === i ? "open pb-5" : ""
                  }`}
                >
                  <p className="text-text-light leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section id="contact" className="relative py-16 sm:py-24 bg-primary overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight fade-up">
            Ready to Protect Your Home?
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto fade-up">
            Get a free, no-obligation roof inspection and detailed estimate. One call is all it takes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 fade-up">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-200 shadow-xl shadow-black/20 hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-5 rounded-xl text-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email Us
            </a>
          </div>
          <p className="mt-6 text-white/60 text-sm fade-up">
            Mon-Thu 7am-6pm &bull; Fri 7am-1pm &bull; Sun by appointment
          </p>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-primary-dark py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Image
                src="/logo.png"
                alt="Emgee Contracting"
                width={160}
                height={45}
                className="h-10 w-auto brightness-0 invert mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed">
                Lakewood&apos;s trusted roofing contractor. Quality craftsmanship, honest pricing, and a commitment to protecting your home.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 5).map((svc) => (
                  <li key={svc.title} className="text-white/60 text-sm">
                    {svc.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={GOOGLE_MAPS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-white/60 hover:text-accent transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {ADDRESS}
                  </a>
                </li>
                <li className="text-white/40 text-xs pt-1">
                  Mon-Thu 7am-6pm &bull; Fri 7am-1pm
                  <br />
                  Sun by appointment
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Emgee Contracting. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Website by{" "}
              <a
                href="https://maivenai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                Maiven
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
