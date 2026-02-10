import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, PawPrint, ChefHat, ArrowRight, Star } from 'lucide-react';
import { Listing, VibeType } from '@/data/mockData';

interface ListingCardProps {
  listing: Listing;
}

const vibeConfig: Record<VibeType, { label: string; emoji: string; bgColor: string; textColor: string; borderColor: string }> = {
<<<<<<< HEAD
  chill: { label: 'Chill', emoji: '✨', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-500', borderColor: 'border-emerald-500/20' },
  academic: { label: 'Academic', emoji: '📚', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', borderColor: 'border-blue-500/20' },
  party: { label: 'Party', emoji: '🎉', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500', borderColor: 'border-amber-500/20' },
=======
  chill: { 
    label: 'Chill', 
    emoji: '✨', 
    bgColor: 'bg-emerald-500 dark:bg-emerald-600', 
    textColor: 'text-white dark:text-white', 
    borderColor: 'border-emerald-500 dark:border-emerald-600' 
  },
  academic: { 
    label: 'Academic', 
    emoji: '📚', 
    bgColor: 'bg-blue-500 dark:bg-blue-600', 
    textColor: 'text-white dark:text-white', 
    borderColor: 'border-blue-500 dark:border-blue-600' 
  },
  party: { 
    label: 'Party', 
    emoji: '🎉', 
    bgColor: 'bg-orange-500 dark:bg-orange-600', 
    textColor: 'text-white dark:text-white', 
    borderColor: 'border-orange-500 dark:border-orange-600' 
  },
>>>>>>> 934061e (updated project)
};

export const ListingCard = ({ listing }: ListingCardProps) => {
  const vibe = vibeConfig[listing.vibe];

  return (
<<<<<<< HEAD
    <Link to={`/listing/${listing.id}`} className="group block h-full">
      <div className="relative h-full flex flex-col bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
=======
    <Link to={`/listing/${listing.id}`} className="group block h-full w-full">
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
>>>>>>> 934061e (updated project)
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
<<<<<<< HEAD
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
=======
        <div className="p-5 space-y-4 flex-1 flex flex-col">
          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{listing.rent.toLocaleString()}</span>
              <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">/month</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-900/30 dark:to-purple-900/30 border border-cyan-100 dark:border-cyan-800">
              <Users className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Double</span>
>>>>>>> 934061e (updated project)
            </div>
          </div>

          {/* Features */}
<<<<<<< HEAD
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
=======
          <div className="flex flex-wrap gap-2 flex-1">
            <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span className="font-medium text-gray-600 dark:text-gray-300">{listing.highlights.curfew === 'No Curfew' ? 'No Curfew' : listing.highlights.curfew}</span>
            </div>
            {listing.highlights.guests && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <Users className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">Guests</span>
              </div>
            )}
            {listing.highlights.pets && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <PawPrint className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">Pets</span>
              </div>
            )}
            {listing.highlights.cooking && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <ChefHat className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">Cooking</span>
>>>>>>> 934061e (updated project)
              </div>
            )}
          </div>

<<<<<<< HEAD
          {/* CTA Button - pushed to bottom */}
          <div className="mt-auto pt-4">
            <Button className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-xl h-12 font-semibold group/btn transition-all duration-300">
              View Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
=======
          {/* CTA Button */}
          <Button className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-xl h-12 font-semibold group/btn transition-all duration-300 mt-auto">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
>>>>>>> 934061e (updated project)
        </div>
      </div>
    </Link>
  );
};
