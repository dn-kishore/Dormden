import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, PawPrint, ChefHat, ArrowRight, Star } from 'lucide-react';
import { Listing, VibeType } from '@/data/mockData';

interface ListingCardProps {
  listing: Listing;
}

const vibeConfig: Record<VibeType, { label: string; emoji: string; bgColor: string; textColor: string; borderColor: string }> = {
  chill: { label: 'Chill', emoji: '✨', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-500', borderColor: 'border-emerald-500/20' },
  academic: { label: 'Academic', emoji: '📚', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', borderColor: 'border-blue-500/20' },
  party: { label: 'Party', emoji: '🎉', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500', borderColor: 'border-amber-500/20' },
};

export const ListingCard = ({ listing }: ListingCardProps) => {
  const vibe = vibeConfig[listing.vibe];

  return (
    <Link to={`/listing/${listing.id}`} className="group block h-full">
      <div className="relative h-full flex flex-col bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Vibe Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`${vibe.bgColor} ${vibe.textColor} ${vibe.borderColor} border backdrop-blur-sm font-semibold px-3 py-1.5 shadow-lg`}>
              {vibe.emoji} {vibe.label}
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-gray-800">4.8</span>
            </div>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-200 transition-colors">
              {listing.name}
            </h3>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="line-clamp-1">{listing.location}, {listing.city}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">₹{listing.rent.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm font-medium">/month</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <Users className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-semibold text-foreground">Double</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-4 min-h-[72px]">
            <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-muted border border-border h-fit">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span className="font-medium text-muted-foreground">{listing.highlights.curfew === 'No Curfew' ? 'No Curfew' : listing.highlights.curfew}</span>
            </div>
            {listing.highlights.guests && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-muted border border-border h-fit">
                <Users className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-medium text-muted-foreground">Guests</span>
              </div>
            )}
            {listing.highlights.pets && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-muted border border-border h-fit">
                <PawPrint className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-medium text-muted-foreground">Pets</span>
              </div>
            )}
            {listing.highlights.cooking && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-muted border border-border h-fit">
                <ChefHat className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-medium text-muted-foreground">Cooking</span>
              </div>
            )}
          </div>

          {/* CTA Button - pushed to bottom */}
          <div className="mt-auto pt-4">
            <Button className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-xl h-12 font-semibold group/btn transition-all duration-300">
              View Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
