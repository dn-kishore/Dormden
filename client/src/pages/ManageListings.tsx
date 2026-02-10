import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Upload, FileText, Loader2, CheckCircle, X, 
<<<<<<< HEAD
  RefreshCw, Sparkles, MapPin, Brain 
=======
  RefreshCw, Sparkles, MapPin, Brain, Trash2, AlertTriangle, Eye 
>>>>>>> 934061e (updated project)
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
<<<<<<< HEAD
=======
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewingRules, setViewingRules] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
>>>>>>> 934061e (updated project)
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

<<<<<<< HEAD
  const getListingId = (listing: Listing) => listing._id || listing.id || '';

  return (
    <div className="min-h-screen bg-background pb-12">
=======
  const handleDeleteListing = async (listingId: string) => {
    setDeleting(listingId);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/listings/${listingId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Hostel deleted successfully!' 
        });
        fetchListings(); // Refresh the list
      } else {
        setMessage({ type: 'error', text: data.error || 'Delete failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete hostel' });
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  const confirmDelete = (listingId: string) => {
    setDeleteConfirm(listingId);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleViewRules = (listing: Listing) => {
    setSelectedListing(listing);
    setViewingRules(getListingId(listing));
  };

  const closeRulesModal = () => {
    setViewingRules(null);
    setSelectedListing(null);
  };

  const getListingId = (listing: Listing) => listing._id || listing.id || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/30 pb-12 transition-colors duration-300">
>>>>>>> 934061e (updated project)
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
<<<<<<< HEAD
                <h1 className="text-3xl font-bold text-foreground">AI Rules Manager</h1>
                <p className="text-muted-foreground">Upload PDFs & index rules for RAG-powered Warden Bot</p>
=======
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Rules Manager</h1>
                <p className="text-gray-500 dark:text-gray-400">Upload PDFs & index rules for RAG-powered Warden Bot</p>
>>>>>>> 934061e (updated project)
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
<<<<<<< HEAD
                ? 'bg-green-500/10 border border-green-500/20' 
                : 'bg-destructive/10 border border-destructive/20'
=======
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
>>>>>>> 934061e (updated project)
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
<<<<<<< HEAD
                <X className="w-5 h-5 text-destructive" />
              )}
              <span className={message.type === 'success' ? 'text-green-500' : 'text-destructive'}>
=======
                <X className="w-5 h-5 text-red-500" />
              )}
              <span className={message.type === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
>>>>>>> 934061e (updated project)
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
<<<<<<< HEAD
          <Card>
            <CardContent className="py-20 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Listings Found</h3>
              <p className="text-muted-foreground">Add some hostels first from the Admin page</p>
=======
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="py-20 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Listings Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Add some hostels first from the Admin page</p>
>>>>>>> 934061e (updated project)
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              const listingId = getListingId(listing);
              return (
<<<<<<< HEAD
                <Card key={listingId} className="overflow-hidden">
=======
                <Card key={listingId} className="overflow-hidden relative bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {/* Delete Button - Top Right */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 dark:bg-gray-800/90 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 hover:text-red-700 dark:hover:text-red-400 transition-colors border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 shadow-sm"
                    onClick={() => confirmDelete(listingId)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

>>>>>>> 934061e (updated project)
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
<<<<<<< HEAD
                      <span className="text-sm text-muted-foreground">
=======
                      <span className="text-sm text-gray-500 dark:text-gray-400">
>>>>>>> 934061e (updated project)
                        {listing.rules?.length || 0} rules
                      </span>
                    </div>

<<<<<<< HEAD
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
=======
                    {/* Delete Confirmation */}
                    {deleteConfirm === listingId ? (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-medium text-sm">Delete this hostel?</span>
                        </div>
                        <p className="text-red-600 dark:text-red-300 text-xs">
                          This action cannot be undone. All data including rules and reviews will be permanently deleted.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDeleteListing(listingId)}
                            disabled={deleting === listingId}
                          >
                            {deleting === listingId ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              'Delete'
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={cancelDelete}
                            disabled={deleting === listingId}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          {/* PDF Upload */}
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
                              size="sm"
                              className="w-full gap-2 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400"
                              disabled={uploading === listingId || !aiStatus.gemini}
                              asChild
                            >
                              <span>
                                {uploading === listingId ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Upload className="w-3 h-3" />
                                )}
                                Upload Rules
                              </span>
                            </Button>
                          </label>

                          {/* View Rules */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                            onClick={() => handleViewRules(listing)}
                            disabled={!listing.rules || listing.rules.length === 0}
                          >
                            <Eye className="w-3 h-3" />
                            View Rules
                          </Button>
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
                      </>
                    )}
>>>>>>> 934061e (updated project)
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Instructions */}
<<<<<<< HEAD
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
=======
        <Card className="mt-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
>>>>>>> 934061e (updated project)
              <FileText className="w-5 h-5 text-cyan-500" />
              How RAG Works
            </CardTitle>
          </CardHeader>
<<<<<<< HEAD
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-cyan-500">1</span>
                </div>
                <h4 className="font-semibold text-foreground">Upload PDF</h4>
                <p>Upload your "House Rules & Agreement" PDF. Gemini AI extracts rules, curfew times, and policies.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-purple-500">2</span>
                </div>
                <h4 className="font-semibold text-foreground">Index Rules</h4>
                <p>Rules are converted to embeddings and stored in Pinecone vector database for semantic search.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-pink-500">3</span>
                </div>
                <h4 className="font-semibold text-foreground">Ask Warden Bot</h4>
=======
          <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Upload PDF</h4>
                <p>Upload your "House Rules & Agreement" PDF. Gemini AI extracts rules, curfew times, and policies.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Index Rules</h4>
                <p>Rules are converted to embeddings and stored in Pinecone vector database for semantic search.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-pink-600 dark:text-pink-400">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Ask Warden Bot</h4>
>>>>>>> 934061e (updated project)
                <p>Users ask questions, relevant rules are retrieved, and Gemini generates accurate answers.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
<<<<<<< HEAD
=======

      {/* Rules Modal */}
      {viewingRules && selectedListing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">House Rules</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedListing.name}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={closeRulesModal}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {selectedListing.rules && selectedListing.rules.length > 0 ? (
                <div className="space-y-4">
                  {selectedListing.rules.map((rule: any, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {rule.title || `Rule ${index + 1}`}
                        </h3>
                        {rule.clause && (
                          <Badge variant="outline" className="text-xs">
                            {rule.clause}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Rules Found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload a PDF document to extract house rules for this hostel.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedListing.rules?.length || 0} rules extracted
              </div>
              <Button onClick={closeRulesModal} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
>>>>>>> 934061e (updated project)
    </div>
  );
};

export default ManageListings;
