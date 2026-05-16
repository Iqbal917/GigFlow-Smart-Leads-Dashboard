import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Select } from './ui/Select';

interface Props {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  source: string;
  setSource: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
}

const FilterBar = ({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="glass-card rounded-2xl p-5 mb-6 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-surface text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <div className="absolute left-3 z-10 text-slate-400">
             <Filter className="w-4 h-4" />
          </div>
          <Select
            className="pl-10 !py-2.5"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'New', label: 'New' },
              { value: 'Contacted', label: 'Contacted' },
              { value: 'Qualified', label: 'Qualified' },
              { value: 'Lost', label: 'Lost' }
            ]}
          />
        </div>

        {/* Source Filter */}
        <div className="relative flex items-center">
          <div className="absolute left-3 z-10 text-slate-400">
             <Filter className="w-4 h-4" />
          </div>
          <Select
            className="pl-10 !py-2.5"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            options={[
              { value: '', label: 'All Sources' },
              { value: 'Website', label: 'Website' },
              { value: 'Instagram', label: 'Instagram' },
              { value: 'Referral', label: 'Referral' }
            ]}
          />
        </div>

        {/* Sort */}
        <div className="relative flex items-center">
          <div className="absolute left-3 z-10 text-slate-400">
             <ArrowUpDown className="w-4 h-4" />
          </div>
          <Select
            className="pl-10 !py-2.5"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={[
              { value: 'latest', label: 'Sort by: Latest' },
              { value: 'oldest', label: 'Sort by: Oldest' }
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default FilterBar;