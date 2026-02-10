import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MessageSquareWarning, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Trash2,
  RefreshCw,
  BarChart3,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Loader2,
  X,
  Send
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

interface Complaint {
  _id: string;
  listingId: string;
  listingName: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  response?: string;
  responseDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  byStatus: Array<{ _id: string; count: number }>;
  byPriority: Array<{ _id: string; count: number }>;
  byCategory: Array<{ _id: string; count: number }>;
  recent: Complaint[];
  total: Array<{ _id: null; count: number }>;
}

const ManagerDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [response, setResponse] = useState('');
  const [responseLoading, setResponseLoading] = useState(false);
  const [updatingComplaint, setUpdatingComplaint] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchComplaints();
    fetchStats();
  }, [currentPage, statusFilter, priorityFilter, categoryFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });
      
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (categoryFilter) params.append('category', categoryFilter);

      const res = await fetch(`${API_URL}/complaints?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setComplaints(data.data.complaints);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/complaints/stats`);
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdateComplaint = async (complaintId: string, status: string, responseText?: string) => {
    try {
      setUpdatingComplaint(complaintId);
      const res = await fetch(`${API_URL}/complaints/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          response: responseText
        })
      });

      const data = await res.json();
      if (data.success) {
        fetchComplaints();
        fetchStats();
        setSelectedComplaint(null);
        setResponse('');
      } else {
        console.error('Update failed:', data.error);
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
    } finally {
      setUpdatingComplaint(null);
    }
  };

  const handleDeleteComplaint = async (complaintId: string) => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
      const res = await fetch(`${API_URL}/complaints/${complaintId}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (data.success) {
        fetchComplaints();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500 text-white';
      case 'in-progress': return 'bg-orange-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      case 'closed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <X className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.listingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by active tab
  const tabFilteredComplaints = filteredComplaints.filter(complaint => {
    if (activeTab === 'active') {
      return complaint.status !== 'resolved' && complaint.status !== 'closed';
    } else {
      return complaint.status === 'resolved' || complaint.status === 'closed';
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/30 pb-12 transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <MessageSquareWarning className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PG/Hostel Manager Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage complaints and monitor hostel operations</p>
              </div>
            </div>
            <Button onClick={fetchComplaints} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Complaints</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {(stats.byStatus.find(s => s._id === 'open')?.count || 0) + 
                       (stats.byStatus.find(s => s._id === 'in-progress')?.count || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Open Issues</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {stats.byStatus.find(s => s._id === 'open')?.count || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {stats.byStatus.find(s => s._id === 'in-progress')?.count || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {(stats.byStatus.find(s => s._id === 'resolved')?.count || 0) + 
                       (stats.byStatus.find(s => s._id === 'closed')?.count || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Categories</option>
                <option value="Maintenance Issues">Maintenance Issues</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Noise Complaints">Noise Complaints</option>
                <option value="Security Concerns">Security Concerns</option>
                <option value="Facility Problems">Facility Problems</option>
                <option value="Staff Behavior">Staff Behavior</option>
                <option value="Billing Issues">Billing Issues</option>
                <option value="Food Quality">Food Quality</option>
                <option value="Internet/WiFi">Internet/WiFi</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquareWarning className="w-5 h-5" />
                Complaints Management
              </CardTitle>
              
              {/* Tab System */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'active'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Active ({filteredComplaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length})
                </button>
                <button
                  onClick={() => setActiveTab('resolved')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'resolved'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Resolved ({filteredComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length})
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
              </div>
            ) : tabFilteredComplaints.length === 0 ? (
              <div className="text-center py-20">
                <MessageSquareWarning className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Complaints Found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {activeTab === 'active' 
                    ? 'No active complaints match your current filters' 
                    : 'No resolved complaints match your current filters'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tabFilteredComplaints.map((complaint) => (
                  <div key={complaint._id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{complaint.listingName}</h3>
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {complaint.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(complaint.status)}>
                            {getStatusIcon(complaint.status)}
                            {complaint.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {complaint.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {complaint.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {complaint.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-3">
                          {complaint.category}
                        </Badge>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{complaint.description}</p>
                        
                        {complaint.response && (
                          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-green-800 dark:text-green-200">Management Response</span>
                              {complaint.responseDate && (
                                <span className="text-sm text-green-600 dark:text-green-400">
                                  {new Date(complaint.responseDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-green-700 dark:text-green-300">{complaint.response}</p>
                          </div>
                        )}
                        
                        {/* Show resolution date for resolved complaints */}
                        {(complaint.status === 'resolved' || complaint.status === 'closed') && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium text-blue-800 dark:text-blue-200">
                                Resolved on {new Date(complaint.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedComplaint(complaint)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteComplaint(complaint._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600"
                          onClick={() => handleUpdateComplaint(complaint._id, 'in-progress')}
                          disabled={updatingComplaint === complaint._id}
                        >
                          {updatingComplaint === complaint._id ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Clock className="w-4 h-4 mr-1" />
                          )}
                          Mark In Progress
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                          onClick={() => handleUpdateComplaint(complaint._id, 'resolved')}
                          disabled={updatingComplaint === complaint._id}
                        >
                          {updatingComplaint === complaint._id ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          )}
                          Mark Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Response Modal */}
      {selectedComplaint && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setSelectedComplaint(null)}
          />
          <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50">
            <Card className="h-full md:h-auto max-h-[90vh] overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle>Respond to Complaint</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setSelectedComplaint(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto">
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedComplaint.listingName}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedComplaint.category}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">{selectedComplaint.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Response Message
                    </label>
                    <Textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Type your response to the complaint..."
                      rows={4}
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedComplaint(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleUpdateComplaint(selectedComplaint._id, 'resolved', response)}
                      disabled={responseLoading || !response.trim()}
                    >
                      {responseLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Send Response & Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;