import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Building2, Save, Loader2, CheckCircle, X } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

interface RoomType {
  type: string;
  price: number;
  available: boolean;
}

interface Rule {
  title: string;
  description: string;
  clause: string;
}

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Basic Info
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [rent, setRent] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>(['']);
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

  // Rules
  const [rules, setRules] = useState<Rule[]>([
    { title: '', description: '', clause: '' },
  ]);

  // Hidden Costs
  const [hiddenCosts, setHiddenCosts] = useState<string[]>(['']);

  // Vibe Analysis
  const [vibeBadge, setVibeBadge] = useState('');
  const [vibeDescription, setVibeDescription] = useState('');

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

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

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Reset form
        setName('');
        setLocation('');
        setCity('');
        setRent('');
        setImage('');
        setImages(['']);
        setVibe('chill');
        setVibeScore('80');
        setCurfew('No Curfew');
        setGuests(false);
        setPets(false);
        setCooking(false);
        setAmenities([]);
        setRoomTypes([{ type: 'Single Occupancy', price: 0, available: true }]);
        setRules([{ title: '', description: '', clause: '' }]);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 pb-12">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Hostel</h1>
              <p className="text-gray-500">Fill in the details to list a new PG/Hostel</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-medium">Hostel added successfully!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">{error}</span>
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
                    variant={amenities.includes(amenity) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all ${
                      amenities.includes(amenity)
                        ? 'bg-cyan-500 hover:bg-cyan-600'
                        : 'hover:bg-gray-100'
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

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle>House Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rules.map((rule, index) => (
                <div key={index} className="p-4 border rounded-xl space-y-3">
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
