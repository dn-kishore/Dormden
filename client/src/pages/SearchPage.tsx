import { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { ListingCard } from '@/components/ListingCard';
import { FilterSidebar, Filters } from '@/components/FilterSidebar';
import { WardenBot } from '@/components/WardenBot';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X, Sparkles, Building2, Loader2 } from 'lucide-react';
import { Listing } from '@/data/mockData';

const API_URL = 'http://localhost:3001/api';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<Filters>({
    noCurfew: false,
    guestsAllowed: false,
    petFriendly: false,
    selfCooking: false,
    quietVibe: false,
    partyVibe: false,
  });

  // Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/listings`);
        const data = await res.json();
        if (data.success) {
          // Map _id to id for compatibility
          const mappedListings = data.data.map((l: any) => ({
            ...l,
            id: l._id || l.id,
          }));
          setListings(mappedListings);
        } else {
          setError('Failed to fetch listings');
        }
      } catch (err) {
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          listing.name.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query) ||
          listing.city.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (filters.noCurfew && listing.highlights.curfew !== 'No Curfew') return false;
      if (filters.guestsAllowed && !listing.highlights.guests) return false;
      if (filters.petFriendly && !listing.highlights.pets) return false;
      if (filters.selfCooking && !listing.highlights.cooking) return false;
      if (filters.quietVibe && listing.vibe !== 'academic') return false;
      if (filters.partyVibe && listing.vibe !== 'party') return false;

      return true;
    });
  }, [searchQuery, filters, listings]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      noCurfew: false,
      guestsAllowed: false,
      petFriendly: false,
      selfCooking: false,
      quietVibe: false,
      partyVibe: false,
    });
  };

  const removeFilter = (key: keyof Filters) => {
    setFilters({ ...filters, [key]: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-40">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navbar />

      {/* Hero Header Section */}
      <div className="relative pt-24 md:pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-muted-foreground">
                {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'} available
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Find Your Perfect{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                  PG
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-lg" />
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover comfortable living spaces that match your lifestyle and budget
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center bg-card rounded-2xl border border-border/80 shadow-xl overflow-hidden">
                <div className="flex items-center justify-center w-14 h-14 shrink-0">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by name, location, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-14 border-0 bg-transparent text-foreground text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 mr-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
                <div className="h-8 w-px bg-border mx-2" />
                <button className="flex items-center gap-2 px-5 py-2 mr-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:opacity-90 transition-opacity">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
            {error}. Make sure the server is running at {API_URL}
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Active filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.noCurfew && (
                <Badge className="bg-card text-foreground border border-border shadow-sm hover:bg-muted cursor-pointer group pl-3 pr-2 py-1.5" onClick={() => removeFilter('noCurfew')}>
                  🕐 No Curfew
                  <X className="w-3 h-3 ml-1.5 text-muted-foreground group-hover:text-foreground" />
                </Badge>
              )}
              {filters.guestsAllowed && (
                <Badge className="bg-card text-foreground border border-border shadow-sm hover:bg-muted cursor-pointer group pl-3 pr-2 py-1.5" onClick={() => removeFilter('guestsAllowed')}>
                  👥 Guests Allowed
                  <X className="w-3 h-3 ml-1.5 text-muted-foreground group-hover:text-foreground" />
                </Badge>
              )}
              {filters.petFriendly && (
                <Badge className="bg-card text-foreground border border-border shadow-sm hover:bg-muted cursor-pointer group pl-3 pr-2 py-1.5" onClick={() => removeFilter('petFriendly')}>
                  🐾 Pet Friendly
                  <X className="w-3 h-3 ml-1.5 text-muted-foreground group-hover:text-foreground" />
                </Badge>
              )}
              {filters.selfCooking && (
                <Badge className="bg-card text-foreground border border-border shadow-sm hover:bg-muted cursor-pointer group pl-3 pr-2 py-1.5" onClick={() => removeFilter('selfCooking')}>
                  🍳 Self Cooking
                  <X className="w-3 h-3 ml-1.5 text-muted-foreground group-hover:text-foreground" />
                </Badge>
              )}
              {filters.quietVibe && (
                <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm hover:bg-blue-500/20 cursor-pointer group pl-3 pr-2 py-1.5" onClick={() => removeFilter('quietVibe')}>
                  📚 Quiet Vibe
                  <X className="w-3 h-3 ml-1.5 text-blue-400 group-hover:text-blue-500" />
                </Badge>
              )}
              {filters.partyVibe && (
                <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-sm hover:bg-orange-500/20 cursor-pointer group pl-3 pr-2 py-1.5" onClick={() => removeFilter('partyVibe')}>
                  🎉 Party Vibe
                  <X className="w-3 h-3 ml-1.5 text-orange-400 group-hover:text-orange-500" />
                </Badge>
              )}
            </div>
            <button
              onClick={clearAllFilters}
              className="ml-auto text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Listings Grid */}
          <div className="flex-1 min-w-0">
            {filteredListings.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{filteredListings.length}</span> results
                  </p>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing, index) => (
                    <div
                      key={listing.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ListingCard listing={listing} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl" />
                  <div className="relative w-full h-full rounded-3xl bg-muted border border-border flex items-center justify-center">
                    <Building2 className="w-14 h-14 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No PGs Found</h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  We couldn't find any properties matching your criteria. Try adjusting your filters.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 px-8 py-6 text-base rounded-xl shadow-lg shadow-cyan-500/25"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>
      </div>

      <WardenBot />
    </div>
  );
};

export default SearchPage;
