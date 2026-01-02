import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
}

export const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
          'fixed lg:sticky top-20 lg:top-28 right-0 lg:right-auto h-[calc(100vh-5rem)] lg:h-auto w-80 lg:w-72 bg-white lg:bg-transparent p-6 lg:p-0 z-50 lg:z-auto transition-transform duration-300 lg:transform-none overflow-y-auto shadow-2xl lg:shadow-none border-l lg:border-0 border-gray-200',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="lg:sticky lg:top-28 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              <Filter className="w-5 h-5 text-cyan-500" />
              Filters
            </h3>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-900">
                  Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-500 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            {filterOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-start space-x-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-50 transition-all duration-300"
                onClick={() => handleToggle(option.key)}
              >
                <Checkbox
                  id={option.key}
                  checked={filters[option.key]}
                  onCheckedChange={() => handleToggle(option.key)}
                  className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 border-gray-300 mt-0.5"
                />
                <Label
                  htmlFor={option.key}
                  className="flex items-start gap-2.5 cursor-pointer text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed"
                >
                  <option.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors shrink-0 mt-0.5" />
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl border border-cyan-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Pro tip</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Use multiple filters to find your perfect match!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
