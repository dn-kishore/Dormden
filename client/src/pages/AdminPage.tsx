<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState, useRef, useEffect } from 'react';
>>>>>>> 934061e (updated project)
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
<<<<<<< HEAD
import { Plus, Trash2, Building2, Save, Loader2, CheckCircle, X } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

=======
import { Plus, Trash2, Building2, Save, Loader2, CheckCircle, X, Upload, Sparkles } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

// Popular Indian cities for autocomplete - All AP cities + Major cities from other states
const INDIAN_CITIES = [
  // Major Metro Cities (All India)
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
  
  // Karnataka Cities (Top 5)
  'Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum',
  
  // Tamil Nadu Cities (Top 5)
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  
  // Kerala Cities (Top 5)
  'Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam',
  
  // Telangana Cities (Top 5)
  'Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar',
  
  // Maharashtra Cities (Top 5)
  'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad',
  
  // Gujarat Cities (Top 5)
  'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar',
  
  // Rajasthan Cities (Top 5)
  'Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Bikaner',
  
  // Uttar Pradesh Cities (Top 5)
  'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad',
  
  // West Bengal Cities (Top 5)
  'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri',
  
  // Other Major Cities (Top 4-5 each)
  'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', // Madhya Pradesh
  'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', // Bihar
  'Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', // Punjab
  'Dehradun', 'Haridwar', 'Roorkee', 'Nainital', // Uttarakhand
  'Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', // Odisha
  'Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', // Assam
  'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', // Jharkhand
  'Raipur', 'Bhilai', 'Bilaspur', 'Korba', // Chhattisgarh
  
  // ANDHRA PRADESH - ALL CITIES (Complete List)
  // Major Cities
  'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Kakinada', 'Tirupati',
  'Anantapur', 'Kadapa', 'Eluru', 'Ongole', 'Nandyal', 'Machilipatnam', 'Adoni', 'Tenali', 'Chittoor', 'Hindupur',
  'Proddatur', 'Bhimavaram', 'Madanapalle', 'Guntakal', 'Dharmavaram', 'Gudivada', 'Narasaraopet', 'Tadipatri',
  'Mangalagiri', 'Chilakaluripet', 'Yemmiganur', 'Kadiri', 'Chirala', 'Anakapalle', 'Kavali', 'Palacole',
  
  // West Godavari District Cities
  'Tadepalligudem', 'Bhimavaram', 'Eluru', 'Narasapuram', 'Tanuku', 'Palakollu', 'Akividu', 'Nidadavole',
  'Kovvur', 'Polavaram', 'Jangareddygudem', 'Chintalapudi', 'Kamavarapukota', 'Pentapadu', 'Undrajavaram',
  'Dwaraka Tirumala', 'Veeravasaram', 'Attili', 'Ganapavaram', 'Iragavaram', 'Peravali', 'Penugonda',
  
  // East Godavari District Cities  
  'Kakinada', 'Rajahmundry', 'Amalapuram', 'Peddapuram', 'Tuni', 'Ramachandrapuram', 'Mandapeta', 'Razole',
  'Samalkota', 'Pithapuram', 'Prathipadu', 'Korukonda', 'Alamuru', 'Uppada', 'Yanam', 'Kotananduru',
  'Gollaprolu', 'Thallarevu', 'Sakhinetipalli', 'Gangavaram', 'Kothapeta', 'Ravulapalem', 'Addateegala',
  
  // Krishna District Cities
  'Machilipatnam', 'Gudivada', 'Vijayawada', 'Tenali', 'Repalle', 'Bapatla', 'Chirala', 'Ponnur',
  'Pedana', 'Avanigadda', 'Nagayalanka', 'Bantumilli', 'Vuyyuru', 'Hanuman Junction', 'Mylavaram',
  
  // Guntur District Cities
  'Guntur', 'Narasaraopet', 'Chilakaluripet', 'Mangalagiri', 'Sattenapalli', 'Vinukonda', 'Bapatla',
  'Piduguralla', 'Macherla', 'Gurazala', 'Repalle', 'Tenali', 'Ponnur', 'Amaravati',
  
  // Prakasam District Cities
  'Ongole', 'Chirala', 'Kandukur', 'Markapur', 'Addanki', 'Podili', 'Giddalur', 'Kanigiri',
  
  // Nellore District Cities
  'Nellore', 'Gudur', 'Kavali', 'Atmakur', 'Venkatagiri', 'Sullurpeta', 'Buchireddipalem',
  
  // Chittoor District Cities
  'Chittoor', 'Tirupati', 'Madanapalle', 'Hindupur', 'Srikalahasti', 'Puttur', 'Palamaner', 'Nagari',
  
  // Anantapur District Cities
  'Anantapur', 'Hindupur', 'Guntakal', 'Dharmavaram', 'Tadpatri', 'Kadiri', 'Kalyanadurgam', 'Rayadurg',
  
  // Kurnool District Cities
  'Kurnool', 'Nandyal', 'Adoni', 'Yemmiganur', 'Alur', 'Pathikonda', 'Mantralayam', 'Atmakur',
  
  // Kadapa District Cities
  'Kadapa', 'Proddatur', 'Jammalamadugu', 'Rayachoty', 'Mydukur', 'Badvel', 'Rajampet',
  
  // Visakhapatnam District Cities
  'Visakhapatnam', 'Anakapalle', 'Narsipatnam', 'Yelamanchili', 'Pendurthi', 'Bheemunipatnam', 'Araku Valley',
  
  // Vizianagaram District Cities
  'Vizianagaram', 'Bobbili', 'Parvathipuram', 'Salur', 'Cheepurupalli', 'Gajapathinagaram',
  
  // Srikakulam District Cities
  'Srikakulam', 'Amadalavalasa', 'Palasa', 'Narasannapeta', 'Ichapuram', 'Tekkali'
];

>>>>>>> 934061e (updated project)
interface RoomType {
  type: string;
  price: number;
  available: boolean;
}

<<<<<<< HEAD
interface Rule {
  title: string;
  description: string;
  clause: string;
}

=======
>>>>>>> 934061e (updated project)
const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Basic Info
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
<<<<<<< HEAD
  const [rent, setRent] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>(['']);
=======
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const [pincode, setPincode] = useState('');
  const [rent, setRent] = useState('');
  const [hostelType, setHostelType] = useState<'boys' | 'girls' | 'coed'>('boys');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
>>>>>>> 934061e (updated project)
  const [vibe, setVibe] = useState<'chill' | 'academic' | 'party'>('chill');
  const [vibeScore, setVibeScore] = useState('80');

  // Highlights
  const [curfew, setCurfew] = useState('No Curfew');
  const [guests, setGuests] = useState(false);
  const [pets, setPets] = useState(false);
  const [cooking, setCooking] = useState(false);

  // Amenities
  const [amenities, setAmenities] = useState<string[]>([]);
  const amenityOptions = ['WiFi', 'Laundry', 'Kitchen', 'Parking', 'Gym', 'Power Backup', 'CCTV', 'Garden', 'Rooftop', 'Study Room', 'Library', 'Mess', 'Cafeteria', 'Shuttle Service', 'Co-working Space', 'Game Room', 'AC'];

  // Room Types
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    { type: 'Single Occupancy', price: 0, available: true },
  ]);

<<<<<<< HEAD
  // Rules
  const [rules, setRules] = useState<Rule[]>([
    { title: '', description: '', clause: '' },
  ]);
=======
  // New sections replacing house rules
  const [security, setSecurity] = useState('');
  const [medication, setMedication] = useState('');
  const [hostelDescription, setHostelDescription] = useState('');
  const [generatingDescription, setGeneratingDescription] = useState(false);
>>>>>>> 934061e (updated project)

  // Hidden Costs
  const [hiddenCosts, setHiddenCosts] = useState<string[]>(['']);

  // Vibe Analysis
  const [vibeBadge, setVibeBadge] = useState('');
  const [vibeDescription, setVibeDescription] = useState('');

<<<<<<< HEAD
=======
  // City autocomplete functionality
  const handleCityChange = (value: string) => {
    setCity(value);
    setSelectedSuggestionIndex(-1); // Reset selection when typing
    
    if (value.length > 1) { // Start showing after 2 characters
      const filtered = INDIAN_CITIES.filter(cityName => {
        const cityLower = cityName.toLowerCase();
        const valueLower = value.toLowerCase();
        // Match from beginning of city name or after a space
        return cityLower.startsWith(valueLower) || 
               cityLower.includes(' ' + valueLower) ||
               cityLower.includes(valueLower);
      }).slice(0, 8); // Show max 8 suggestions
      
      setCitySuggestions(filtered);
      setShowCitySuggestions(true); // Always show dropdown when typing
    } else {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  };

  const selectCity = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCitySuggestions(false);
    setCitySuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showCitySuggestions || citySuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < citySuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : citySuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          selectCity(citySuggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowCitySuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // File upload functions
  const addAdditionalImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAdditionalImages(prev => [...prev, file]);
      }
    };
    input.click();
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const getImagePreviewUrl = (file: File) => {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error('Error creating object URL:', error);
      return '';
    }
  };

>>>>>>> 934061e (updated project)
  const toggleAmenity = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

<<<<<<< HEAD
=======
  // AI Description Generation
  const generateDescription = async () => {
    if (!name) {
      setError('Please enter a hostel name first');
      return;
    }

    setGeneratingDescription(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/rag/generate-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          city,
          hostelType,
          vibe,
          amenities,
          curfew,
          guests,
          pets,
          cooking,
          roomTypes: roomTypes.filter(rt => rt.type),
          rent
        })
      });

      const data = await response.json();

      if (data.success) {
        setHostelDescription(data.data.description);
      } else {
        setError(data.error || 'Failed to generate description');
      }
    } catch (err) {
      setError('Failed to generate description. Make sure the server is running.');
    } finally {
      setGeneratingDescription(false);
    }
  };

>>>>>>> 934061e (updated project)
  const addRoomType = () => {
    setRoomTypes([...roomTypes, { type: '', price: 0, available: true }]);
  };

  const removeRoomType = (index: number) => {
    setRoomTypes(roomTypes.filter((_, i) => i !== index));
  };

  const updateRoomType = (index: number, field: keyof RoomType, value: any) => {
    const updated = [...roomTypes];
    updated[index] = { ...updated[index], [field]: value };
    setRoomTypes(updated);
  };

<<<<<<< HEAD
  const addRule = () => {
    setRules([...rules, { title: '', description: '', clause: '' }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: keyof Rule, value: string) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [field]: value };
    setRules(updated);
  };

  const addImage = () => {
    setImages([...images, '']);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

=======
>>>>>>> 934061e (updated project)
  const addHiddenCost = () => {
    setHiddenCosts([...hiddenCosts, '']);
  };

  const removeHiddenCost = (index: number) => {
    setHiddenCosts(hiddenCosts.filter((_, i) => i !== index));
  };

  const updateHiddenCost = (index: number, value: string) => {
    const updated = [...hiddenCosts];
    updated[index] = value;
    setHiddenCosts(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

<<<<<<< HEAD
    const listingData = {
      name,
      location,
      city,
      rent: parseInt(rent),
      image: image || images[0],
      images: images.filter(img => img.trim() !== ''),
      vibe,
      vibeScore: parseInt(vibeScore),
      amenities,
      roomTypes: roomTypes.filter(rt => rt.type && rt.price > 0),
      rules: rules.filter(r => r.title && r.description),
      highlights: { curfew, guests, pets, cooking },
      hiddenCosts: hiddenCosts.filter(hc => hc.trim() !== ''),
      vibeAnalysis: { badge: vibeBadge, description: vibeDescription },
    };
=======
    // Create FormData for file uploads
    const formData = new FormData();
    
    // Add basic data
    formData.append('name', name);
    formData.append('location', location);
    formData.append('city', city);
    formData.append('pincode', pincode);
    formData.append('rent', rent);
    formData.append('hostelType', hostelType);
    formData.append('vibe', vibe);
    formData.append('vibeScore', vibeScore);
    
    // Add main image
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }
    
    // Add additional images
    additionalImages.forEach((image) => {
      formData.append('additionalImages', image);
    });
    
    // Add other data as JSON strings
    formData.append('amenities', JSON.stringify(amenities));
    formData.append('roomTypes', JSON.stringify(roomTypes.filter(rt => rt.type && rt.price > 0)));
    formData.append('highlights', JSON.stringify({ curfew, guests, pets, cooking }));
    formData.append('hiddenCosts', JSON.stringify(hiddenCosts.filter(hc => hc.trim() !== '')));
    formData.append('vibeAnalysis', JSON.stringify({ badge: vibeBadge, description: vibeDescription }));
    formData.append('security', security);
    formData.append('medication', medication);
    formData.append('hostelDescription', hostelDescription);
>>>>>>> 934061e (updated project)

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: 'POST',
<<<<<<< HEAD
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
=======
        body: formData,
>>>>>>> 934061e (updated project)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Reset form
        setName('');
        setLocation('');
        setCity('');
<<<<<<< HEAD
        setRent('');
        setImage('');
        setImages(['']);
=======
        setPincode('');
        setRent('');
        setHostelType('boys');
        setMainImage(null);
        setAdditionalImages([]);
>>>>>>> 934061e (updated project)
        setVibe('chill');
        setVibeScore('80');
        setCurfew('No Curfew');
        setGuests(false);
        setPets(false);
        setCooking(false);
        setAmenities([]);
        setRoomTypes([{ type: 'Single Occupancy', price: 0, available: true }]);
<<<<<<< HEAD
        setRules([{ title: '', description: '', clause: '' }]);
=======
        setSecurity('');
        setMedication('');
        setHostelDescription('');
>>>>>>> 934061e (updated project)
        setHiddenCosts(['']);
        setVibeBadge('');
        setVibeDescription('');
      } else {
        setError(data.error || 'Failed to create listing');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background pb-12">
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/30 pb-12 transition-colors duration-300">
>>>>>>> 934061e (updated project)
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
<<<<<<< HEAD
              <h1 className="text-3xl font-bold text-foreground">Add New Hostel</h1>
              <p className="text-muted-foreground">Fill in the details to list a new PG/Hostel</p>
=======
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Hostel</h1>
              <p className="text-gray-500 dark:text-gray-400">Fill in the details to list a new PG/Hostel</p>
>>>>>>> 934061e (updated project)
            </div>
          </div>
        </div>

        {success && (
<<<<<<< HEAD
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-500 font-medium">Hostel added successfully!</span>
=======
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-medium">Hostel added successfully!</span>
>>>>>>> 934061e (updated project)
          </div>
        )}

        {error && (
<<<<<<< HEAD
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3">
            <X className="w-5 h-5 text-destructive" />
            <span className="text-destructive font-medium">{error}</span>
=======
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">{error}</span>
>>>>>>> 934061e (updated project)
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hostel Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., GreenNest PG"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rent">Base Rent (₹/month) *</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    placeholder="e.g., 8500"
<<<<<<< HEAD
=======
                    className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
>>>>>>> 934061e (updated project)
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Koramangala, 5th Block"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
<<<<<<< HEAD
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Kota">Kota</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
=======
                  <div className="relative" ref={cityInputRef}>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Start typing city name..."
                      required
                      autoComplete="off"
                    />
                    {showCitySuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                        {citySuggestions.length > 0 ? (
                          citySuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className={`px-4 py-2 cursor-pointer text-sm text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                                index === selectedSuggestionIndex 
                                  ? 'bg-cyan-100 dark:bg-cyan-900' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => selectCity(suggestion)}
                              onMouseEnter={() => setSelectedSuggestionIndex(index)}
                            >
                              {suggestion}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                            No cities found. You can still type your own city name.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g., 560034"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostelType">Hostel Type *</Label>
                  <Select value={hostelType} onValueChange={(v: any) => setHostelType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boys">🚹 Boys Hostel</SelectItem>
                      <SelectItem value="girls">👩 Girls Hostel</SelectItem>
                      <SelectItem value="coed">👫 Coed Hostel</SelectItem>
>>>>>>> 934061e (updated project)
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vibe">Vibe Type *</Label>
                  <Select value={vibe} onValueChange={(v: any) => setVibe(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chill">✨ Chill</SelectItem>
                      <SelectItem value="academic">📚 Academic</SelectItem>
                      <SelectItem value="party">🎉 Party</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vibeScore">Vibe Score (0-100)</Label>
                  <Input
                    id="vibeScore"
                    type="number"
                    min="0"
                    max="100"
                    value={vibeScore}
                    onChange={(e) => setVibeScore(e.target.value)}
<<<<<<< HEAD
=======
                    className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
>>>>>>> 934061e (updated project)
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label>Main Image URL *</Label>
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Images</Label>
                {images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={img}
                      onChange={(e) => updateImage(index, e.target.value)}
                      placeholder="Image URL"
                    />
                    {images.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeImage(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                  <Plus className="w-4 h-4 mr-2" /> Add Image
                </Button>
=======
                <Label>Main Image *</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  {mainImage ? (
                    <div className="space-y-2">
                      {getImagePreviewUrl(mainImage) && (
                        <img 
                          src={getImagePreviewUrl(mainImage)} 
                          alt="Main preview" 
                          className="w-32 h-24 object-cover rounded-lg mx-auto border border-gray-200"
                        />
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">{mainImage.name}</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-600 dark:hover:text-red-400 transition-colors"
                        onClick={() => setMainImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto" />
                      <p className="text-gray-600 dark:text-gray-400">Click to upload main image</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="mainImage"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setMainImage(file);
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700 dark:hover:bg-cyan-900/20 dark:hover:border-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        onClick={() => document.getElementById('mainImage')?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Additional Images</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative group">
                      {getImagePreviewUrl(image) && (
                        <img 
                          src={getImagePreviewUrl(image)} 
                          alt={`Additional ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white border-2 border-white dark:border-gray-800 shadow-lg"
                        onClick={() => removeAdditionalImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <div 
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 dark:hover:border-cyan-600 dark:hover:bg-cyan-900/20 transition-colors group"
                    onClick={addAdditionalImage}
                  >
                    <Plus className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
>>>>>>> 934061e (updated project)
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Highlights & Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="curfew">Curfew Time</Label>
                <Select value={curfew} onValueChange={setCurfew}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No Curfew">No Curfew</SelectItem>
                    <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                    <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                    <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                    <SelectItem value="10:30 PM">10:30 PM</SelectItem>
                    <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox id="guests" checked={guests} onCheckedChange={(c) => setGuests(!!c)} />
                  <Label htmlFor="guests">Guests Allowed</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="pets" checked={pets} onCheckedChange={(c) => setPets(!!c)} />
                  <Label htmlFor="pets">Pet Friendly</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="cooking" checked={cooking} onCheckedChange={(c) => setCooking(!!c)} />
                  <Label htmlFor="cooking">Self Cooking</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <Badge
                    key={amenity}
<<<<<<< HEAD
                    variant={amenities.includes(amenity) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all ${
                      amenities.includes(amenity)
                        ? 'bg-cyan-500 hover:bg-cyan-600'
                        : 'hover:bg-muted'
=======
                    variant="outline"
                    className={`cursor-pointer transition-all border-2 ${
                      amenities.includes(amenity)
                        ? 'bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
>>>>>>> 934061e (updated project)
                    }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Room Types */}
          <Card>
            <CardHeader>
              <CardTitle>Room Types & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roomTypes.map((room, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Room Type</Label>
                    <Select value={room.type} onValueChange={(v) => updateRoomType(index, 'type', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Occupancy">Single Occupancy</SelectItem>
                        <SelectItem value="Double Sharing">Double Sharing</SelectItem>
                        <SelectItem value="Triple Sharing">Triple Sharing</SelectItem>
                        <SelectItem value="Four Sharing">Four Sharing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-32 space-y-2">
                    <Label>Price (₹)</Label>
                    <Input
                      type="number"
                      value={room.price || ''}
                      onChange={(e) => updateRoomType(index, 'price', parseInt(e.target.value) || 0)}
                      placeholder="Price"
<<<<<<< HEAD
=======
                      className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
>>>>>>> 934061e (updated project)
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <Checkbox
                      checked={room.available}
                      onCheckedChange={(c) => updateRoomType(index, 'available', !!c)}
                    />
                    <Label className="text-sm">Available</Label>
                  </div>
                  {roomTypes.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeRoomType(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addRoomType}>
                <Plus className="w-4 h-4 mr-2" /> Add Room Type
              </Button>
            </CardContent>
          </Card>

<<<<<<< HEAD
          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle>House Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rules.map((rule, index) => (
                <div key={index} className="p-4 border border-border rounded-xl space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      <Label>Rule Title</Label>
                      <Input
                        value={rule.title}
                        onChange={(e) => updateRule(index, 'title', e.target.value)}
                        placeholder="e.g., Gate Timing"
                      />
                    </div>
                    <div className="w-40 space-y-2">
                      <Label>Clause</Label>
                      <Input
                        value={rule.clause}
                        onChange={(e) => updateRule(index, 'clause', e.target.value)}
                        placeholder="e.g., Clause 4"
                      />
                    </div>
                    {rules.length > 1 && (
                      <Button type="button" variant="outline" size="icon" className="mt-8" onClick={() => removeRule(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={rule.description}
                      onChange={(e) => updateRule(index, 'description', e.target.value)}
                      placeholder="Describe the rule..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addRule}>
                <Plus className="w-4 h-4 mr-2" /> Add Rule
              </Button>
=======
          {/* Security, Medication & Description */}
          <Card>
            <CardHeader>
              <CardTitle>Security, Medication & Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="security">Security Information</Label>
                <Textarea
                  id="security"
                  value={security}
                  onChange={(e) => setSecurity(e.target.value)}
                  placeholder="Describe security measures, CCTV coverage, guards, access control, etc."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medication">Medication & Health Facilities</Label>
                <Textarea
                  id="medication"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  placeholder="Describe medical facilities, first aid, nearby hospitals, pharmacy access, etc."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hostelDescription">Hostel Description</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateDescription}
                    disabled={generatingDescription || !name}
                    className="gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 hover:opacity-90 disabled:opacity-50"
                  >
                    {generatingDescription ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id="hostelDescription"
                  value={hostelDescription}
                  onChange={(e) => setHostelDescription(e.target.value)}
                  placeholder="Provide a detailed description of the hostel, its atmosphere, facilities, and what makes it special... Or click 'Generate with AI' to auto-generate!"
                  rows={4}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  💡 Fill in the hostel details above, then click "Generate with AI" to create a professional description automatically.
                </p>
              </div>
>>>>>>> 934061e (updated project)
            </CardContent>
          </Card>

          {/* Hidden Costs */}
          <Card>
            <CardHeader>
              <CardTitle>Hidden Costs (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hiddenCosts.map((cost, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={cost}
                    onChange={(e) => updateHiddenCost(index, e.target.value)}
                    placeholder="e.g., Electricity charged at ₹8/unit above 100 units"
                  />
                  {hiddenCosts.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeHiddenCost(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addHiddenCost}>
                <Plus className="w-4 h-4 mr-2" /> Add Hidden Cost
              </Button>
            </CardContent>
          </Card>

          {/* Vibe Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Vibe Analysis (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Vibe Badge</Label>
                <Input
                  value={vibeBadge}
                  onChange={(e) => setVibeBadge(e.target.value)}
                  placeholder="e.g., Chill / Independence"
                />
              </div>
              <div className="space-y-2">
                <Label>Vibe Description</Label>
                <Textarea
                  value={vibeDescription}
                  onChange={(e) => setVibeDescription(e.target.value)}
                  placeholder="Describe the overall vibe of this place..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Adding Hostel...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Add Hostel
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
