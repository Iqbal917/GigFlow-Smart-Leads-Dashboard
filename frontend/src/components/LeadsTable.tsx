import type { Lead } from '../types/lead.types';
import { deleteLead } from '../services/lead.service';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { Trash2, Edit2, User, Mail, Globe, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  leads: Lead[];
  currentPage?: number;
  onDeleteSuccess?: () => void;
  onEdit?: (lead: Lead) => void;
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Qualified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

const LeadsTable = ({ leads, currentPage = 1, onDeleteSuccess, onEdit }: Props) => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'admin';

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this lead?');
    if (!confirmDelete) return;

    try {
      await deleteLead(id);
      toast.success('Lead deleted');
      onDeleteSuccess?.();
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-dark-surface border-b border-slate-200 dark:border-dark-border">
            <tr className="text-slate-600 dark:text-slate-300 font-medium">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Lead Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-dark-border/50">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col items-center">
                    <User className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-600" />
                    <p className="text-lg font-medium">No leads found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr 
                  key={lead._id} 
                  className="hover:bg-slate-50 dark:hover:bg-dark-surface/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        {lead.name}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 text-xs">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', statusColors[lead.status] || 'bg-gray-100 text-gray-700')}>
                      {lead.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      {lead.source === 'Website' && <Globe className="w-4 h-4 text-blue-500" />}
                      {lead.source === 'Instagram' && <MapPin className="w-4 h-4 text-pink-500" />}
                      {lead.source === 'Referral' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {lead.source}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit?.(lead)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit Lead"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;