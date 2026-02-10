import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
import { Clock, Users, PawPrint, ChefHat, Volume2, PartyPopper, X, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Filters {
  noCurfew: boolean;
  guestsAllowed: boolean;
  petFriendly: boolean;
  selfCooking: boolean;
  quietVibe: boolean;
  partyVibe: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
=======
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Clock, Users, PawPrint, ChefHat, Volume2, PartyPopper, X, Filter, 
  Sparkles, Building2, MapPin, Utensils, Shield, Wifi, Car, Dumbbell,
  Camera, Star, Home, Calendar, UserCheck, Coffee, Moon, Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AdvancedFilters {
  // Basic Filters
  accommodationType: string[];
  occupancy: string[];
  genderAllowed: string;
  roomType: string[];
  rentRange: [number, number];
  depositRange: [number, number];
  availability: string;
  availabilityDate: string;

  // Food & Lifestyle
  foodType: string[];
  mealsIncluded: string[];
  alcoholAllowed: boolean | null;
  smokingAllowed: boolean | null;

  // Amenities
  amenities: string[];

  // Safety & Trust
  safety: string[];

  // Ratings & Reviews
  minimumRating: number;
  noiseLevel: string;
  cleanliness: string;
  foodQuality: string;
}

interface FilterSidebarProps {
  filters: AdvancedFilters;
  onFilterChange: (filters: AdvancedFilters) => void;
>>>>>>> 934061e (updated project)
}

export const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD

  const filterOptions = [
    { key: 'noCurfew' as const, label: 'No Curfew', icon: Clock },
    { key: 'guestsAllowed' as const, label: 'Allows Overnight Guests', icon: Users },
    { key: 'petFriendly' as const, label: 'Pet Friendly', icon: PawPrint },
    { key: 'selfCooking' as const, label: 'Self-Cooking Allowed', icon: ChefHat },
    { key: 'quietVibe' as const, label: 'Quiet / Academic Vibe', icon: Volume2 },
    { key: 'partyVibe' as const, label: 'Party / Social Vibe', icon: PartyPopper },
  ];

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleToggle = (key: keyof Filters) => {
    onFilterChange({ ...filters, [key]: !filters[key] });
  };

  const clearFilters = () => {
    onFilterChange({
      noCurfew: false,
      guestsAllowed: false,
      petFriendly: false,
      selfCooking: false,
      quietVibe: false,
      partyVibe: false,
    });
  };

=======
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const updateFilter = (key: keyof AdvancedFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof AdvancedFilters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    console.log('Clearing all filters...');
    const newFilters = {
      // Basic Filters
      accommodationType: [],
      occupancy: [],
      genderAllowed: 'any',
      roomType: [],
      rentRange: [0, 50000] as [number, number],
      depositRange: [0, 100000] as [number, number],
      availability: 'immediate',
      availabilityDate: '',

      // Food & Lifestyle
      foodType: [],
      mealsIncluded: [],
      alcoholAllowed: null as boolean | null,
      smokingAllowed: null as boolean | null,

      // Amenities
      amenities: [],

      // Safety & Trust
      safety: [],

      // Ratings & Reviews
      minimumRating: 0,
      noiseLevel: 'any',
      cleanliness: 'any',
      foodQuality: 'any',
    };
    console.log('New filters:', newFilters);
    onFilterChange(newFilters);
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'rentRange' && Array.isArray(value)) {
      return value[0] > 0 || value[1] < 50000;
    }
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value !== null;
    if (typeof value === 'string') {
      return value !== '' && value !== 'any' && value !== 'immediate' && value !== 'none' && value !== '1-month' && value !== 'moderate';
    }
    if (typeof value === 'number') {
      if (key === 'minimumRating') return value > 0;
      return false;
    }
    return false;
  }).length;

  const FilterSection = ({ title, icon: Icon, children, sectionKey }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    sectionKey: string;
  }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      <button
        onClick={() => setActiveSection(activeSection === sectionKey ? null : sectionKey)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
        <div className={`transform transition-transform ${activeSection === sectionKey ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {activeSection === sectionKey && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

>>>>>>> 934061e (updated project)
  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        className="lg:hidden fixed bottom-24 right-6 z-40 shadow-2xl rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90"
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="w-5 h-5" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="ml-2 w-6 h-6 rounded-full bg-white text-cyan-500 text-xs font-bold flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
<<<<<<< HEAD
          'fixed lg:sticky top-20 lg:top-28 right-0 lg:right-auto h-[calc(100vh-5rem)] lg:h-auto w-80 lg:w-72 bg-background lg:bg-transparent p-6 lg:p-0 z-50 lg:z-auto transition-transform duration-300 lg:transform-none overflow-y-auto shadow-2xl lg:shadow-none border-l lg:border-0 border-border',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="lg:sticky lg:top-28 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Filter className="w-5 h-5 text-cyan-500" />
              Filters
            </h3>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">
                  Clear all
=======
          'fixed lg:sticky top-20 lg:top-28 right-0 lg:right-auto h-[calc(100vh-5rem)] lg:h-auto w-96 lg:w-80 bg-gray-50 dark:bg-gray-900 lg:bg-transparent dark:lg:bg-transparent p-6 lg:p-0 z-50 lg:z-auto transition-transform duration-300 lg:transform-none overflow-y-auto shadow-2xl lg:shadow-none border-l lg:border-0 border-gray-200 dark:border-gray-700',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="lg:sticky lg:top-28 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Filter className="w-5 h-5 text-cyan-500" />
              Advanced Filters
            </h3>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    console.log('Clear all button clicked');
                    clearAllFilters();
                  }} 
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Clear all ({activeFiltersCount})
>>>>>>> 934061e (updated project)
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
<<<<<<< HEAD
                className="lg:hidden text-muted-foreground hover:text-foreground"
=======
                className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
>>>>>>> 934061e (updated project)
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

<<<<<<< HEAD
          <div className="space-y-4 bg-card p-5 rounded-2xl border border-border shadow-sm">
            {filterOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-start space-x-3 cursor-pointer group p-2 rounded-xl hover:bg-muted transition-all duration-300"
                onClick={() => handleToggle(option.key)}
              >
                <Checkbox
                  id={option.key}
                  checked={filters[option.key]}
                  onCheckedChange={() => handleToggle(option.key)}
                  className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 border-border mt-0.5"
                />
                <Label
                  htmlFor={option.key}
                  className="flex items-start gap-2.5 cursor-pointer text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed"
                >
                  <option.icon className="w-5 h-5 text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0 mt-0.5" />
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Pro tip</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use multiple filters to find your perfect match!
                </p>
              </div>
            </div>
          </div>
=======
          {/* 1️⃣ Basic Filters */}
          <FilterSection title="Basic Filters" icon={Building2} sectionKey="basic">
            {/* Accommodation Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Accommodation Type</Label>
              <div className="space-y-2">
                {['PG (Male)', 'PG (Female)', 'Co-Living', 'Hostel'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.accommodationType.includes(type)}
                      onCheckedChange={() => toggleArrayFilter('accommodationType', type)}
                    />
                    <Label htmlFor={type} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupancy */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Occupancy</Label>
              <div className="space-y-2">
                {['Single', 'Double', 'Triple+'].map((occ) => (
                  <div key={occ} className="flex items-center space-x-2">
                    <Checkbox
                      id={occ}
                      checked={filters.occupancy.includes(occ)}
                      onCheckedChange={() => toggleArrayFilter('occupancy', occ)}
                    />
                    <Label htmlFor={occ} className="text-sm">{occ}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Allowed */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender Allowed</Label>
              <RadioGroup value={filters.genderAllowed} onValueChange={(value) => updateFilter('genderAllowed', value)}>
                {['Male', 'Female', 'Any'].map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <RadioGroupItem value={gender.toLowerCase()} id={gender} />
                    <Label htmlFor={gender} className="text-sm">{gender}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Rent Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rent Range: ₹{filters.rentRange[0].toLocaleString()} - ₹{filters.rentRange[1].toLocaleString()}
              </Label>
              <div className="px-2">
                <Slider
                  value={filters.rentRange}
                  onValueChange={(value) => {
                    console.log('Rent range changed:', value);
                    updateFilter('rentRange', value as [number, number]);
                  }}
                  max={50000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>₹0</span>
                <span>₹50,000</span>
              </div>
            </div>
          </FilterSection>

          {/* 2️⃣ Food & Lifestyle */}
          <FilterSection title="Food & Lifestyle" icon={Utensils} sectionKey="food">
            <div className="space-y-4">
              {/* Food Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Food Type</Label>
                <div className="space-y-2">
                  {['Veg', 'Non-Veg', 'Both'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.foodType.includes(type)}
                        onCheckedChange={() => toggleArrayFilter('foodType', type)}
                      />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals Included */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Meals Included</Label>
                <div className="space-y-2">
                  {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                    <div key={meal} className="flex items-center space-x-2">
                      <Checkbox
                        id={meal}
                        checked={filters.mealsIncluded.includes(meal)}
                        onCheckedChange={() => toggleArrayFilter('mealsIncluded', meal)}
                      />
                      <Label htmlFor={meal} className="text-sm">{meal}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Alcohol Allowed</Label>
                  <Select value={filters.alcoholAllowed?.toString() || 'null'} onValueChange={(value) => updateFilter('alcoholAllowed', value === 'null' ? null : value === 'true')}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Any</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Smoking Allowed</Label>
                  <Select value={filters.smokingAllowed?.toString() || 'null'} onValueChange={(value) => updateFilter('smokingAllowed', value === 'null' ? null : value === 'true')}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Any</SelectItem>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </FilterSection>

          {/* 3️⃣ Amenities */}
          <FilterSection title="Amenities" icon={Wifi} sectionKey="amenities">
            <div className="grid grid-cols-2 gap-2">
              {[
                'Wi-Fi', 'Power Backup', 'AC', 'Washing Machine', 
                'Housekeeping', 'Parking', 'Gym', 'Study Room', 'Lift'
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => toggleArrayFilter('amenities', amenity)}
                  />
                  <Label htmlFor={amenity} className="text-xs">{amenity}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* 4️⃣ Safety & Trust */}
          <FilterSection title="Safety & Trust" icon={Camera} sectionKey="safety">
            <div className="space-y-2">
              {['CCTV', 'Warden On-Site', 'Security Guard', 'Biometric Access'].map((safety) => (
                <div key={safety} className="flex items-center space-x-2">
                  <Checkbox
                    id={safety}
                    checked={filters.safety.includes(safety)}
                    onCheckedChange={() => toggleArrayFilter('safety', safety)}
                  />
                  <Label htmlFor={safety} className="text-sm">{safety}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* 5️⃣ Ratings & Reviews */}
          <FilterSection title="Ratings & Reviews" icon={Star} sectionKey="ratings">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minimum Rating: {filters.minimumRating}⭐
                </Label>
                <Slider
                  value={[filters.minimumRating]}
                  onValueChange={(value) => updateFilter('minimumRating', value[0])}
                  max={5}
                  min={0}
                  step={0.5}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Noise Level</Label>
                <Select value={filters.noiseLevel} onValueChange={(value) => updateFilter('noiseLevel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="quiet">Quiet</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="lively">Lively</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FilterSection>
>>>>>>> 934061e (updated project)
        </div>
      </div>
    </>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 934061e (updated project)
