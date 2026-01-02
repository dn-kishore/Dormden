import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ImageCarousel } from '@/components/ImageCarousel';
import { RoommateCompatibility } from '@/components/RoommateCompatibility';
import { ReviewsList } from '@/components/ReviewsList';
import { WardenBot } from '@/components/WardenBot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Wifi,
  Car,
  Dumbbell,
  ChefHat,
  Zap,
  ShieldCheck,
  Clock,
  Users,
  PawPrint,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Check,
  X,
  Loader2,
} from 'lucide-react';
import { Listing, VibeType } from '@/data/mockData';

const API_URL = 'http://localhost:3001/api';

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  'High-Speed WiFi': Wifi,
  Parking: Car,
  Gym: Dumbbell,
  Kitchen: ChefHat,
  'Power Backup': Zap,
  CCTV: ShieldCheck,
  Laundry: Clock,
  'Study Room': Clock,
  Library: Clock,
  Mess: ChefHat,
  Garden: Clock,
  Rooftop: Clock,
  'Game Room': Clock,
  'Co-working Space': Clock,
  Cafeteria: ChefHat,
  'Shuttle Service': Car,
  'Study Hall': Clock,
  Counseling: Users,
  'Medical Support': ShieldCheck,
};

const vibeConfig: Record<VibeType, { label: string; emoji: string; variant: 'chill' | 'academic' | 'party'; color: string }> = {
  chill: { label: 'Chill / Independence', emoji: '🟢', variant: 'chill', color: 'from-vibe-chill to-vibe-chill/60' },
  academic: { label: 'Academic / Quiet', emoji: '🔵', variant: 'academic', color: 'from-vibe-academic to-vibe-academic/60' },
  party: { label: 'Party / High Energy', emoji: '🔴', variant: 'party', color: 'from-vibe-party to-vibe-party/60' },
};

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/listings/${id}`);
        const data = await res.json();
        if (data.success) {
          setListing({ ...data.data, id: data.data._id || data.data.id });
        } else {
          setError('Listing not found');
        }
      } catch (err) {
        setError('Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Property Not Found'}</h1>
          <Link to="/search">
            <Button variant="hero">
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const vibe = vibeConfig[listing.vibe];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      
      <Navbar />

      <div className="container mx-auto px-4 pt-28 relative z-10">
        {/* Enhanced Back Button */}
        <Link 
          to="/search" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/30 text-muted-foreground hover:text-foreground hover:shadow-md transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to listings</span>
        </Link>

        {/* Image Carousel */}
        <div className="animate-fade-in">
          <ImageCarousel images={listing.images || [listing.image]} name={listing.name} />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 mt-10">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Header */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">{listing.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground text-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{listing.location}, {listing.city}</span>
                  </div>
                </div>
                <Badge variant={vibe.variant} className="text-base px-5 py-2.5 shadow-lg">
                  {vibe.emoji} {vibe.label}
                </Badge>
              </div>
            </div>

            {/* Enhanced Room Types & Pricing */}
            <div className="glass rounded-3xl p-8 shadow-lg border border-border/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Room Types & Pricing
              </h2>
              <div className="space-y-4">
                {listing.roomTypes?.map((room, index) => (
                  <div
                    key={index}
                    className={`relative group ${
                      room.available ? '' : 'opacity-60'
                    }`}
                  >
                    <div className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                      room.available 
                        ? 'bg-gradient-to-r from-muted/50 to-muted hover:shadow-md' 
                        : 'bg-muted/30'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-semibold text-lg">{room.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gradient">₹{room.price.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-1">/month</span>
                        </div>
                        {room.available ? (
                          <Badge variant="chill" className="ml-2 shadow-sm">✓ Available</Badge>
                        ) : (
                          <Badge variant="secondary" className="ml-2">Full</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Amenities */}
            <div className="glass rounded-3xl p-8 shadow-lg border border-border/30 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities?.map((amenity, index) => {
                  const Icon = amenityIcons[amenity] || Sparkles;
                  return (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl glass border border-border/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Quick Highlights */}
            <div className="glass rounded-3xl p-8 shadow-lg border border-border/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold mb-6">Quick Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-border/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Curfew</p>
                    <p className="font-semibold text-lg">{listing.highlights?.curfew || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-border/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Guests</p>
                    <p className="font-semibold text-lg flex items-center gap-2">
                      {listing.highlights?.guests ? (
                        <><Check className="w-5 h-5 text-vibe-chill" /> Allowed</>
                      ) : (
                        <><X className="w-5 h-5 text-vibe-party" /> Not Allowed</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-border/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <PawPrint className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pets</p>
                    <p className="font-semibold text-lg flex items-center gap-2">
                      {listing.highlights?.pets ? (
                        <><Check className="w-5 h-5 text-vibe-chill" /> Allowed</>
                      ) : (
                        <><X className="w-5 h-5 text-vibe-party" /> Not Allowed</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-border/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-vibe-chill/10 flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-vibe-chill" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Self Cooking</p>
                    <p className="font-semibold text-lg flex items-center gap-2">
                      {listing.highlights?.cooking ? (
                        <><Check className="w-5 h-5 text-vibe-chill" /> Allowed</>
                      ) : (
                        <><X className="w-5 h-5 text-vibe-party" /> Not Allowed</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Vibe Analysis */}
            {listing.vibeAnalysis && (
              <div className={`relative overflow-hidden bg-gradient-to-br ${vibe.color} rounded-3xl p-8 text-primary-foreground shadow-xl animate-fade-in`} style={{ animationDelay: '0.5s' }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Community Vibe</h2>
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-lg px-5 py-2 mb-5 shadow-lg">
                    {listing.vibeAnalysis.badge}
                  </Badge>
                  <p className="text-white/95 leading-relaxed text-lg">
                    {listing.vibeAnalysis.description}
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Hidden Costs */}
            {listing.hiddenCosts && listing.hiddenCosts.length > 0 && (
              <div className="relative overflow-hidden glass border-2 border-warning/30 rounded-3xl p-8 shadow-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="absolute top-0 left-0 w-32 h-32 bg-warning/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-warning" />
                    </div>
                    <h2 className="text-2xl font-bold text-warning">Hidden Cost Detector</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    Our AI detected the following potential additional charges:
                  </p>
                  <ul className="space-y-3">
                    {listing.hiddenCosts.map((cost, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
                        <span className="text-warning font-bold text-xl shrink-0">⚠️</span>
                        <span className="text-foreground font-medium">{cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Reviews */}
            {listing.reviews && listing.reviews.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <h2 className="text-2xl font-bold mb-6">Reviews & Community</h2>
                <ReviewsList reviews={listing.reviews} />
              </div>
            )}
          </div>

          {/* Right Column - Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Book Now Card */}
            <div className="glass rounded-3xl p-8 shadow-xl border border-border/30 sticky top-28 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-center mb-8">
                <div className="mb-2">
                  <span className="text-5xl font-extrabold text-gradient">₹{listing.rent.toLocaleString()}</span>
                </div>
                <span className="text-muted-foreground text-lg">/month</span>
                <p className="text-sm text-muted-foreground mt-2 px-4 py-1.5 rounded-lg bg-muted/50 inline-block">
                  Double Sharing
                </p>
              </div>
              <div className="space-y-3">
                <Button variant="hero" size="lg" className="w-full text-base shadow-lg hover:shadow-xl">
                  📅 Book a Visit
                </Button>
                <Button variant="heroOutline" size="lg" className="w-full text-base">
                  📞 Contact Owner
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-border/30">
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-vibe-chill" />
                    <span>Free cancellation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-vibe-chill" />
                    <span>No booking fee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Roommate Compatibility */}
            {listing.roommates && listing.roommates.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <RoommateCompatibility roommates={listing.roommates} />
              </div>
            )}
          </div>
        </div>
      </div>

      <WardenBot propertyId={id} propertyName={listing.name} />
    </div>
  );
};

export default ListingDetails;
