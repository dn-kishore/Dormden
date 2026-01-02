import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Upload, FileText, Loader2, CheckCircle, X, 
  RefreshCw, Sparkles, MapPin, Brain 
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

interface Listing {
  _id: string;
  id?: string;
  name: string;
  location: string;
  city: string;
  rent: number;
  vibe: string;
  image: string;
  rules?: any[];
}

const ManageListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [indexing, setIndexing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [aiStatus, setAiStatus] = useState({ gemini: false, pinecone: false });

  useEffect(() => {
    fetchListings();
    checkAIStatus();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_URL}/listings`);
      const data = await res.json();
      setListings(data.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch listings' });
    } finally {
      setLoading(false);
    }
  };

  const checkAIStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/rag/status`);
      const data = await res.json();
      setAiStatus(data.data || { gemini: false, pinecone: false });
    } catch {
      // Ignore
    }
  };

  const handlePDFUpload = async (listingId: string, file: File) => {
    setUploading(listingId);
    setMessage(null);

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch(`${API_URL}/rag/upload/${listingId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Extracted ${data.data.extractedRules} rules from PDF!` 
        });
        fetchListings(); // Refresh
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload PDF' });
    } finally {
      setUploading(null);
    }
  };

  const handleIndexRules = async (listingId: string) => {
    setIndexing(listingId);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/rag/index/${listingId}`, {
        method: 'POST',
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Indexed ${data.data.rulesIndexed} rules to vector DB!` 
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Indexing failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to index rules' });
    } finally {
      setIndexing(null);
    }
  };

  const getListingId = (listing: Listing) => listing._id || listing.id || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 pb-12">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Rules Manager</h1>
                <p className="text-gray-500">Upload PDFs & index rules for RAG-powered Warden Bot</p>
              </div>
            </div>
            <Button onClick={fetchListings} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>

          {/* AI Status */}
          <div className="flex gap-3 mb-6">
            <Badge variant={aiStatus.gemini ? 'default' : 'secondary'} className={aiStatus.gemini ? 'bg-green-500' : ''}>
              <Sparkles className="w-3 h-3 mr-1" />
              Gemini: {aiStatus.gemini ? 'Connected' : 'Not Configured'}
            </Badge>
            <Badge variant={aiStatus.pinecone ? 'default' : 'secondary'} className={aiStatus.pinecone ? 'bg-green-500' : ''}>
              <Brain className="w-3 h-3 mr-1" />
              Pinecone: {aiStatus.pinecone ? 'Connected' : 'Not Configured'}
            </Badge>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-xl flex items-center gap-3 mb-6 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
              <span className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {message.text}
              </span>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
          </div>
        ) : listings.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Listings Found</h3>
              <p className="text-gray-500">Add some hostels first from the Admin page</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const listingId = getListingId(listing);
              return (
                <Card key={listingId} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={listing.image} 
                      alt={listing.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white truncate">{listing.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{listing.city}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{listing.vibe}</Badge>
                      <span className="text-sm text-gray-500">
                        {listing.rules?.length || 0} rules
                      </span>
                    </div>

                    {/* PDF Upload */}
                    <div className="space-y-2">
                      <label className="block">
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePDFUpload(listingId, file);
                          }}
                          disabled={uploading === listingId || !aiStatus.gemini}
                        />
                        <Button 
                          variant="outline" 
                          className="w-full gap-2"
                          disabled={uploading === listingId || !aiStatus.gemini}
                          asChild
                        >
                          <span>
                            {uploading === listingId ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload Rules PDF
                          </span>
                        </Button>
                      </label>
                    </div>

                    {/* Index to Pinecone */}
                    <Button
                      variant="default"
                      className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90"
                      onClick={() => handleIndexRules(listingId)}
                      disabled={indexing === listingId || !aiStatus.gemini || !aiStatus.pinecone}
                    >
                      {indexing === listingId ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Brain className="w-4 h-4" />
                      )}
                      Index for AI Search
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-500" />
              How RAG Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-cyan-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900">Upload PDF</h4>
                <p>Upload your "House Rules & Agreement" PDF. Gemini AI extracts rules, curfew times, and policies.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900">Index Rules</h4>
                <p>Rules are converted to embeddings and stored in Pinecone vector database for semantic search.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-pink-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900">Ask Warden Bot</h4>
                <p>Users ask questions, relevant rules are retrieved, and Gemini generates accurate answers.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageListings;
