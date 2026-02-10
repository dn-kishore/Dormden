<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Building2, Shield, Users, Star, ArrowRight, MapPin, Sparkles, Check, Heart, Clock, Award, Quote, Play, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { listings } from '@/data/mockData';
import { useState } from 'react';
import React from 'react';

const Index = () => {
  const featuredListings = listings.slice(0, 3);
  const [searchInput, setSearchInput] = useState('');
=======
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Building2, Shield, Users, Star, ArrowRight, MapPin, Sparkles, Check, Heart, Clock, Award, Quote, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { listings } from '@/data/mockData';
import { useState, useEffect } from 'react';
import React from 'react';

// Typewriter effect hook
const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

// Floating Orb Component
const FloatingOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <div 
    className={`absolute rounded-full blur-3xl opacity-30 animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const Index = () => {
  const featuredListings = listings.slice(0, 3);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  
  const typewriterWords = ['perfect PG', 'dream hostel', 'ideal roommates', 'student home'];
  const animatedText = useTypewriter(typewriterWords, 120, 80, 2500);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    } else {
      navigate('/search');
    }
  };
>>>>>>> 934061e (updated project)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

<<<<<<< HEAD
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen bg-background flex items-center pt-16 relative overflow-hidden">
        {/* Background Pattern - Dots Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl w-full relative z-10">
          <div className="relative">
            <div className="lg:w-2/3">
              {/* Small Badge */}
              <p className="text-sm font-normal tracking-widest text-muted-foreground uppercase animate-fade-in-up">
                Trusted by 10,000+ Students Across India
              </p>
              
              {/* Large Headline with Gradient */}
              <h1 className="mt-6 text-4xl font-normal text-foreground sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                  Find your perfect
                </span>
                <br />
                student home
              </h1>
              
              {/* Description */}
              <p className="max-w-lg mt-4 text-xl font-normal text-muted-foreground sm:mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Match with PGs that fit your lifestyle, budget, and vibe. Powered by AI. Verified by real students.
              </p>
              
              {/* CTA Button with Gradient Border */}
              <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link 
                  to="/search" 
                  className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-foreground bg-background border border-transparent rounded-full"
                >
                  Start Exploring PGs
                </Link>
              </div>
              
              {/* Stats with Gradient Icon */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="inline-flex items-center pt-6 mt-8 border-t border-border sm:pt-10 sm:mt-14">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" 
                      stroke="url(#gradient-stats)" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <defs>
                      <linearGradient id="gradient-stats" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="ml-2 text-base font-normal text-foreground">
                    500+ verified PGs added this month
                  </span>
                </div>
              </div>
            </div>
            
            {/* 3D Illustration on Right Side */}
            <div className="mt-8 md:absolute md:mt-0 md:top-1/2 md:-translate-y-1/2 lg:top-1/2 lg:-translate-y-1/2 md:right-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img 
                className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl" 
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png" 
                alt="3D Illustration" 
              />
=======
      {/* Hero Section - Full Screen with Space/Stars Background */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden bg-gray-900 dark:bg-[#0a0a0f]">
        {/* Starfield Background */}
        <div className="absolute inset-0 dark:block hidden">
          {/* Base dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d0d1f] to-[#0a0a0f]" />
          
          {/* Stars layer 1 - Small stars */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                              radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
                              radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
                              radial-gradient(1px 1px at 90px 40px, white, transparent),
                              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
                              radial-gradient(1px 1px at 160px 120px, white, transparent)`,
            backgroundSize: '200px 200px'
          }} />
          
          {/* Stars layer 2 - Medium stars */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(1.5px 1.5px at 150px 150px, white, transparent),
                              radial-gradient(1.5px 1.5px at 200px 220px, rgba(255,255,255,0.9), transparent),
                              radial-gradient(1.5px 1.5px at 100px 280px, white, transparent),
                              radial-gradient(1.5px 1.5px at 300px 100px, rgba(255,255,255,0.8), transparent),
                              radial-gradient(1.5px 1.5px at 250px 350px, white, transparent)`,
            backgroundSize: '400px 400px'
          }} />
          
          {/* Stars layer 3 - Larger twinkling stars */}
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `radial-gradient(2px 2px at 75px 75px, #fff, transparent),
                              radial-gradient(2px 2px at 175px 275px, #fff, transparent),
                              radial-gradient(2px 2px at 275px 175px, #fff, transparent),
                              radial-gradient(2px 2px at 375px 75px, #fff, transparent),
                              radial-gradient(2px 2px at 475px 275px, #fff, transparent)`,
            backgroundSize: '500px 350px',
            animationDuration: '3s'
          }} />
          
          {/* Nebula/Galaxy effects */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '12s' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px]" />
          
          {/* Shooting stars */}
          <div className="absolute top-20 left-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45 animate-shooting-star opacity-0" style={{ animationDelay: '2s' }} />
          <div className="absolute top-40 right-1/3 w-24 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45 animate-shooting-star opacity-0" style={{ animationDelay: '5s' }} />
          <div className="absolute top-60 left-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent rotate-45 animate-shooting-star opacity-0" style={{ animationDelay: '8s' }} />
        </div>
        
        {/* Animated floating orbs for extra depth */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingOrb className="w-[400px] h-[400px] bg-purple-600/10 -top-20 -left-20" delay={0} />
          <FloatingOrb className="w-[300px] h-[300px] bg-cyan-500/10 top-1/3 -right-20" delay={2} />
          <FloatingOrb className="w-[250px] h-[250px] bg-pink-500/10 bottom-20 left-1/4" delay={4} />
        </div>
        
        {/* Additional twinkling stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-4xl w-full relative z-10">
          {/* Centered Content */}
          <div className="text-center">
            {/* Subtle Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-sm text-gray-400">Trusted by 10,000+ students across India</span>
            </div>
            
            {/* Clean Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.15] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-white">Find your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {animatedText}
              </span>
              <span className="text-cyan-400 animate-pulse">|</span>
            </h1>
            
            {/* Subtitle */}
            <p className="max-w-xl mx-auto mt-6 text-base sm:text-lg text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              AI-powered matching to find PGs that fit your lifestyle, budget, and vibe. Verified by real students.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative max-w-xl mx-auto">
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-full overflow-hidden hover:border-white/20 transition-colors focus-within:border-cyan-500/50 focus-within:bg-white/[0.05]">
                  <div className="pl-5 text-gray-500">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by city, area, or PG name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
                  />
                  <button
                    type="submit"
                    className="m-1.5 px-6 py-2.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
            
            {/* Popular Searches */}
            <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm text-gray-500">Popular:</span>
                {['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSearchInput(city);
                      navigate(`/search?q=${encodeURIComponent(city)}`);
                    }}
                    className="px-3 py-1 text-sm text-gray-400 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 mt-14 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { value: '500+', label: 'Verified PGs' },
                { value: '10K+', label: 'Students' },
                { value: '4.9', label: 'Rating' },
                { value: '50+', label: 'Cities' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Social Proof - Avatars */}
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-[#0a0a0f] object-cover"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">from 2,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-white/30 rounded-full" />
>>>>>>> 934061e (updated project)
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
<<<<<<< HEAD
      <section className="py-16 md:py-20 border-y border-border/30 bg-card relative overflow-hidden">
        {/* Subtle gradient overlay - works in both light and dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 dark:from-cyan-500/10 dark:via-transparent dark:to-purple-500/10" />
        
=======
      <section className="py-16 md:py-20 border-y border-border bg-muted relative overflow-hidden">
>>>>>>> 934061e (updated project)
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: '500+', label: 'Verified PGs', icon: Building2 },
              { value: '10K+', label: 'Happy Students', icon: Users },
              { value: '4.9/5', label: 'Average Rating', icon: Star },
              { value: '50+', label: 'Cities', icon: MapPin },
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-6 hover:scale-105 transition-transform duration-300">
<<<<<<< HEAD
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-br from-foreground to-gray-600 bg-clip-text text-transparent">{stat.value}</div>
=======
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-7 h-7 text-cyan-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-foreground">{stat.value}</div>
>>>>>>> 934061e (updated project)
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<<<<<<< HEAD
      <section className="py-24 md:py-32 bg-gradient-to-b from-card to-muted">
=======
      <section className="py-24 md:py-32 bg-background">
>>>>>>> 934061e (updated project)
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
<<<<<<< HEAD
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
=======
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
>>>>>>> 934061e (updated project)
                How it works
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Finding your perfect PG is easier than ever. Just three simple steps.
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  step: '01',
                  title: 'Search & Filter',
                  description: 'Tell us what you\'re looking for. Location, budget, amenities, and vibe preferences.',
                  icon: Search,
                },
                {
                  step: '02',
                  title: 'AI Matching',
                  description: 'Our AI analyzes thousands of reviews and matches you with PGs that fit your lifestyle.',
                  icon: Sparkles,
                },
                {
                  step: '03',
                  title: 'Book & Move In',
                  description: 'Schedule visits, chat with owners, and book your perfect PG. All in one place.',
                  icon: Check,
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
                  )}
                  
                  <div className="relative">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0">
<<<<<<< HEAD
                        <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-premium">
=======
                        <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
>>>>>>> 934061e (updated project)
                          <item.icon className="w-7 h-7" />
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Step {item.step}</div>
<<<<<<< HEAD
                        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
=======
                        <h3 className="text-2xl font-semibold mb-3 text-foreground">{item.title}</h3>
>>>>>>> 934061e (updated project)
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Grid Layout */}
<<<<<<< HEAD
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-card" />
        
        {/* Background Image */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&q=80&fit=crop&auto=format" 
            alt="" 
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            loading="lazy"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
=======
      <section className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
>>>>>>> 934061e (updated project)
                Why DormDen?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                We go beyond basic listings to help you find a place that truly feels like home.
              </p>
            </div>

            {/* Feature Grid - Simplified */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: 'AI Vibe Matching',
                  description: 'Our AI analyzes thousands of reviews to match you with PGs that fit your personality and lifestyle.',
                  badge: 'Smart',
                },
                {
                  icon: Shield,
                  title: 'Hidden Cost Detector',
                  description: 'No surprises. We expose all hidden charges like electricity and WiFi fees upfront.',
                  badge: 'Transparent',
                },
                {
                  icon: Users,
                  title: 'Roommate Compatibility',
                  description: 'Check if you\'ll vibe with your future roommates before you move in.',
                  badge: 'Social',
                },
                {
                  icon: Clock,
                  title: 'Instant Booking',
                  description: 'Schedule visits and book your PG in minutes. No paperwork hassles.',
                  badge: 'Fast',
                },
                {
                  icon: Award,
                  title: 'Verified Reviews',
                  description: 'Every review is from real residents. No fake reviews, just honest feedback.',
                  badge: 'Trusted',
                },
                {
                  icon: Heart,
                  title: '24/7 Support',
                  description: 'Get help anytime with our AI chatbot and dedicated support team.',
                  badge: 'Always On',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
<<<<<<< HEAD
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full text-xs font-semibold text-blue-700">{feature.badge}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
=======
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-cyan-700 dark:text-cyan-400">{feature.badge}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
>>>>>>> 934061e (updated project)
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
<<<<<<< HEAD
      <section className="py-24 md:py-32 bg-gradient-to-b from-muted to-card">
=======
      <section className="py-24 md:py-32 bg-background">
>>>>>>> 934061e (updated project)
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
<<<<<<< HEAD
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
=======
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
>>>>>>> 934061e (updated project)
                Loved by students
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                See what students are saying about their DormDen experience.
              </p>
            </div>

            {/* Testimonials Grid - Simplified */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Priya Sharma',
                  role: 'Engineering Student',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                  quote: 'Found my perfect PG in just 2 days! The AI matching really works. Love my roommates and the vibe here.',
                  rating: 5,
                },
                {
                  name: 'Rahul Verma',
                  role: 'MBA Student',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
                  quote: 'No hidden costs, verified reviews, and great support. DormDen made my PG search stress-free.',
                  rating: 5,
                },
                {
                  name: 'Ananya Patel',
                  role: 'Design Student',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
                  quote: 'The roommate compatibility feature is a game-changer. I knew I\'d love my roommates before moving in!',
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
<<<<<<< HEAD
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
=======
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-muted-foreground/30 mb-4" />
>>>>>>> 934061e (updated project)
                  <p className="text-foreground leading-relaxed mb-6 font-medium">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
<<<<<<< HEAD
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
=======
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
>>>>>>> 934061e (updated project)
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - What Makes Us Different */}
<<<<<<< HEAD
      <section className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Not just another listing site
              </h2>
              <p className="text-lg text-muted-foreground">
=======
      <section className="py-24 md:py-32 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-950/30 dark:to-purple-950/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Header - Enhanced */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-cyan-200 dark:border-cyan-800 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-700 dark:text-cyan-400">Why Choose DormDen</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                Not just another listing site
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
>>>>>>> 934061e (updated project)
                See how DormDen is different from traditional PG search platforms
              </p>
            </div>

<<<<<<< HEAD
            {/* Comparison Table - Clean */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
              <div className="grid grid-cols-3 gap-px bg-border">
                {/* Header */}
                <div className="bg-card p-6">
                  <div className="text-sm font-medium text-muted-foreground">Feature</div>
                </div>
                <div className="bg-card p-6 text-center">
                  <div className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">DormDen</div>
                </div>
                <div className="bg-card p-6 text-center">
                  <div className="text-sm font-medium text-muted-foreground">Others</div>
=======
            {/* Comparison Table - Enhanced */}
            <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border">
              <div className="grid grid-cols-3 gap-px bg-border">
                {/* Header */}
                <div className="bg-card p-8">
                  <div className="text-lg font-bold text-foreground">Feature</div>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-8 text-center">
                  <div className="text-lg font-bold text-white">DormDen</div>
                </div>
                <div className="bg-card p-8 text-center">
                  <div className="text-lg font-bold text-foreground">Others</div>
>>>>>>> 934061e (updated project)
                </div>

                {/* Rows */}
                {[
                  { feature: 'AI Vibe Matching', dormden: true, others: false },
                  { feature: 'Hidden Cost Detection', dormden: true, others: false },
                  { feature: 'Roommate Compatibility', dormden: true, others: false },
                  { feature: 'Verified Reviews', dormden: true, others: 'Sometimes' },
                  { feature: 'Instant Booking', dormden: true, others: false },
                  { feature: '24/7 Support', dormden: true, others: 'Limited' },
                ].map((row, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-card p-6">
<<<<<<< HEAD
                      <div className="text-sm font-medium">{row.feature}</div>
                    </div>
                    <div className="bg-card p-6 flex items-center justify-center">
                      {row.dormden === true ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.dormden}</span>
=======
                      <div className="text-base font-semibold text-foreground">{row.feature}</div>
                    </div>
                    <div className="bg-card p-6 flex items-center justify-center">
                      {row.dormden === true ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <span className="text-base text-muted-foreground">{row.dormden}</span>
>>>>>>> 934061e (updated project)
                      )}
                    </div>
                    <div className="bg-card p-6 flex items-center justify-center">
                      {row.others === true ? (
<<<<<<< HEAD
                        <Check className="w-5 h-5 text-success" />
                      ) : row.others === false ? (
                        <X className="w-5 h-5 text-muted-foreground/30" />
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.others}</span>
=======
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      ) : row.others === false ? (
                        <X className="w-6 h-6 text-red-400" />
                      ) : (
                        <span className="text-base text-muted-foreground">{row.others}</span>
>>>>>>> 934061e (updated project)
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
<<<<<<< HEAD
=======
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <Link to="/search">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 px-8 py-4 text-lg rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  Experience the Difference
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
>>>>>>> 934061e (updated project)
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Featured Listings - Clean Cards */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
                  Featured PGs
                </h2>
                <p className="text-lg text-muted-foreground">
                  Handpicked accommodations loved by students
                </p>
              </div>
              <Link to="/search" className="hidden md:block">
                <Button variant="heroOutline" size="lg">
                  View all
                  <ArrowRight className="w-4 h-4" />
=======
      {/* Featured Listings - Simple */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header - Simplified */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-foreground">
                  Popular PGs
                </h2>
                <p className="text-lg text-muted-foreground">
                  Discover top-rated accommodations
                </p>
              </div>
              <Link to="/search" className="hidden md:block">
                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                  View all
                  <ArrowRight className="w-4 h-4 ml-2" />
>>>>>>> 934061e (updated project)
                </Button>
              </Link>
            </div>

            {/* Listings Grid - Clean */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Link
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className="group block"
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 right-4">
<<<<<<< HEAD
                        <div className={`bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${
                          listing.vibe === 'chill' ? 'text-green-700' : 
                          listing.vibe === 'academic' ? 'text-blue-700' : 
                          'text-orange-700'
                        }`}>
                          {listing.vibe === 'chill' ? 'Chill' : listing.vibe === 'academic' ? 'Academic' : 'Party'}
=======
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg text-white ${
                          listing.vibe === 'chill' ? 'bg-emerald-500' : 
                          listing.vibe === 'academic' ? 'bg-blue-500' : 
                          'bg-orange-500'
                        }`}>
                          {listing.vibe === 'chill' ? '✨ Chill' : listing.vibe === 'academic' ? '📚 Academic' : '🎉 Party'}
>>>>>>> 934061e (updated project)
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
<<<<<<< HEAD
                          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{listing.name}</h3>
=======
                          <h3 className="text-lg font-semibold mb-1 line-clamp-1 text-foreground">{listing.name}</h3>
>>>>>>> 934061e (updated project)
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="line-clamp-1">{listing.location}, {listing.city}</span>
                          </div>
                        </div>
                      </div>
<<<<<<< HEAD
                      <div className="flex items-end justify-between pt-4 border-t border-border/30">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
=======
                      <div className="flex items-end justify-between pt-4 border-t border-border">
                        <div>
                          <div className="text-2xl font-bold text-foreground">
>>>>>>> 934061e (updated project)
                            ₹{listing.rent.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">per month</div>
                        </div>
<<<<<<< HEAD
                        <div className="flex items-center gap-1 bg-white/95 border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-semibold">4.8</span>
=======
                        <div className="flex items-center gap-1 bg-muted border border-border px-3 py-1.5 rounded-full shadow-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-foreground">4.8</span>
>>>>>>> 934061e (updated project)
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-8 text-center md:hidden">
              <Link to="/search">
<<<<<<< HEAD
                <Button variant="heroOutline" size="lg" className="w-full">
                  View all PGs
                  <ArrowRight className="w-4 h-4" />
=======
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  View all PGs
                  <ArrowRight className="w-4 h-4 ml-2" />
>>>>>>> 934061e (updated project)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with Animated Quotes */}
<<<<<<< HEAD
      <section className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden">
        {/* Animated Quotes Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
          <div className="animate-quote-scroll whitespace-nowrap text-4xl md:text-6xl font-light text-foreground/20">
=======
      <section className="py-24 md:py-32 bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
        {/* Animated Quotes Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
          <div className="animate-quote-scroll whitespace-nowrap text-4xl md:text-6xl font-light text-white/20">
>>>>>>> 934061e (updated project)
            <span className="mx-8">Every step counts.</span>
            <span className="mx-8">Finding beauty along the way.</span>
            <span className="mx-8">Almost home.</span>
            <span className="mx-8">The journey is part of the view.</span>
            <span className="mx-8">Moving forward, gently.</span>
            <span className="mx-8">Every step counts.</span>
            <span className="mx-8">Finding beauty along the way.</span>
          </div>
        </div>
        
        {/* Background Pattern - Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Inspirational Quote */}
            <p className="text-lg text-cyan-400 font-medium animate-fade-in-up">
              ✨ "Where you're going matters."
            </p>
            
<<<<<<< HEAD
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground drop-shadow-2xl">
=======
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl">
>>>>>>> 934061e (updated project)
              Ready to find your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                perfect PG?
              </span>
            </h2>
<<<<<<< HEAD
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who found their ideal living space through DormDen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/search">
                <Button variant="default" size="xl" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 shadow-xl hover:scale-105 transition-transform font-semibold">
=======
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of students who found their ideal living space through DormDen.
            </p>
            <div className="flex items-center justify-center pt-4">
              <Link to="/search">
                <Button variant="default" size="xl" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:scale-105 transition-transform font-semibold">
>>>>>>> 934061e (updated project)
                  Get started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
<<<<<<< HEAD
              <Link to="/search">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-border text-foreground hover:bg-muted hover:scale-105 transition-transform font-semibold">
                  Learn more
                </Button>
              </Link>
            </div>
            
            {/* Additional Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
=======
            </div>
            
            {/* Additional Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-gray-400">
>>>>>>> 934061e (updated project)
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Instant access</span>
              </div>
            </div>
            
            {/* Bottom Quote */}
<<<<<<< HEAD
            <p className="text-sm text-muted-foreground pt-8 italic">
=======
            <p className="text-sm text-gray-500 pt-8 italic">
>>>>>>> 934061e (updated project)
              "Every ending carries the softness of a new beginning."
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Modern Dark Design */}
<<<<<<< HEAD
      <footer className="py-20 bg-background border-t border-border">
=======
      <footer className="py-20 bg-black border-t border-gray-800">
>>>>>>> 934061e (updated project)
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
<<<<<<< HEAD
                  <span className="text-2xl font-bold text-foreground">DormDen</span>
                </div>
                <p className="text-muted-foreground mb-6 max-w-md text-lg leading-relaxed">
                  Find your perfect student accommodation with AI-powered matching. Trusted by thousands of students across India.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300">
=======
                  <span className="text-2xl font-bold text-white">DormDen</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md text-lg leading-relaxed">
                  Find your perfect student accommodation with AI-powered matching. Trusted by thousands of students across India.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white transition-all duration-300">
>>>>>>> 934061e (updated project)
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
<<<<<<< HEAD
                <h3 className="text-foreground font-bold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">Browse PGs</Link></li>
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">How it Works</Link></li>
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">About Us</Link></li>
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">Contact</Link></li>
=======
                <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">Browse PGs</Link></li>
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">How it Works</Link></li>
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">About Us</Link></li>
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">Contact</Link></li>
>>>>>>> 934061e (updated project)
                </ul>
              </div>

              {/* Support */}
              <div>
<<<<<<< HEAD
                <h3 className="text-foreground font-bold text-lg mb-6">Support</h3>
                <ul className="space-y-4">
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">Help Center</Link></li>
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">Privacy Policy</Link></li>
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">Terms of Service</Link></li>
                  <li><Link to="/search" className="text-muted-foreground hover:text-cyan-400 transition-colors text-base">FAQs</Link></li>
=======
                <h3 className="text-white font-bold text-lg mb-6">Support</h3>
                <ul className="space-y-4">
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">Help Center</Link></li>
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">Privacy Policy</Link></li>
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">Terms of Service</Link></li>
                  <li><Link to="/search" className="text-gray-400 hover:text-cyan-400 transition-colors text-base">FAQs</Link></li>
>>>>>>> 934061e (updated project)
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
<<<<<<< HEAD
            <div className="pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-muted-foreground text-base">
                  © 2024 DormDen. All rights reserved.
                </p>
                <div className="flex items-center gap-8">
                  <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors text-base">Privacy</Link>
                  <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors text-base">Terms</Link>
                  <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors text-base">Cookies</Link>
=======
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-gray-500 text-base">
                  © 2024 DormDen. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <Link to="/search" className="text-gray-500 hover:text-white transition-colors text-base">Privacy</Link>
                    <Link to="/search" className="text-gray-500 hover:text-white transition-colors text-base">Terms</Link>
                    <Link to="/search" className="text-gray-500 hover:text-white transition-colors text-base">Cookies</Link>
                  </div>
                  <div className="hidden md:block w-px h-4 bg-gray-700" />
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Built by</span>
                    <span className="text-gray-400">Kranthi</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">Kishore</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">Sampath</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">Manoj</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">Geetham</span>
                  </div>
>>>>>>> 934061e (updated project)
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
