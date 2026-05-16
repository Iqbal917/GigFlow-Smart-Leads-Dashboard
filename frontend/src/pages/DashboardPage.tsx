import { useEffect, useState, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import toast from 'react-hot-toast';
import { LogOut, Plus, Download, User as UserIcon } from 'lucide-react';
import LeadsTable from '../components/LeadsTable';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import CreateLeadModal from '../components/CreateLeadModal';
import EditLeadModal from '../components/EditLeadModal';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/ui/Button';
import { getLeads, exportLeadsCSV } from '../services/lead.service';
import { useAuthStore } from '../store/authStore';
import { downloadCSV } from '../utils/downloadCSV';
import type { Lead } from '../types/lead.types';

const DashboardPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [sort, setSort] = useState('latest');

  const [debouncedSearch] = useDebounce(search, 500);
  const [showModal, setShowModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);

  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const query = `?page=${page}&search=${debouncedSearch}&status=${status}&source=${source}&sort=${sort}`;
      const data = await getLeads(query);
      setLeads(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status, source, sort]);

  const handleExport = async () => {
    try {
      const query = `?search=${debouncedSearch}&status=${status}&source=${source}&sort=${sort}`;
      const blob = await exportLeadsCSV(query);
      downloadCSV(blob, 'leads.csv');
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error('Export failed');
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    setPage(1);
  }, [search, status, source, sort]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">G</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              GigFlow
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
              <UserIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {user?.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 capitalize font-semibold">
                {user?.role}
              </span>
            </div>
            
            <ThemeToggle />
            
            <button 
              onClick={logout}
              className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Leads Dashboard</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your smart leads efficiently.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button variant="secondary" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </Button>
            )}
            <Button onClick={() => setShowModal(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </Button>
          </div>
        </div>

        <FilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          source={source}
          setSource={setSource}
          sort={sort}
          setSort={setSort}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Loading leads...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <LeadsTable
              leads={leads}
              currentPage={page}
              onDeleteSuccess={fetchLeads}
              onEdit={setEditLead}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}

      </main>

      {showModal && (
        <CreateLeadModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchLeads}
        />
      )}

      {editLead && (
        <EditLeadModal
          lead={editLead}
          onClose={() => setEditLead(null)}
          onSuccess={fetchLeads}
        />
      )}
    </div>
  );
};

export default DashboardPage;