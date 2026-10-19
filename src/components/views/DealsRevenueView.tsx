import React, { useState } from 'react';
import { Search, Download, ArrowUpDown, ChevronRight, Briefcase, DollarSign } from 'lucide-react';
import { Deal } from '../../types';
import { formatDate, formatINR } from '../../utils/formatters';
import { exportToCSV } from '../../utils/exportCsv';
import { SelectedEntity } from '../common/EntityDrawer';

interface DealsRevenueViewProps {
  deals: Deal[];
  onSelectEntity: (entity: SelectedEntity) => void;
}

export const DealsRevenueView: React.FC<DealsRevenueViewProps> = ({ deals, onSelectEntity }) => {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortField, setSortField] = useState<'createdAt' | 'dealValue'>('createdAt');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = deals.filter((d) => {
    const matchesSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.leadName.toLowerCase().includes(search.toLowerCase()) ||
      d.serviceCategory.toLowerCase().includes(search.toLowerCase()) ||
      d.owner.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === 'all' || d.stage === stageFilter;
    const matchesPriority = priorityFilter === 'all' || d.priority === priorityFilter;

    return matchesSearch && matchesStage && matchesPriority;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'createdAt') {
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortField === 'dealValue') {
      cmp = a.dealValue - b.dealValue;
    }
    return sortAsc ? cmp : -cmp;
  });

  const handleExport = () => {
    exportToCSV(sorted, 'Deals_Revenue_Analytics_Export');
  };

  const getStageBadge = (stage: Deal['stage']) => {
    switch (stage) {
      case 'Closed Won':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Closed Won</span>;
      case 'Negotiation':
      case 'Proposal':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">{stage}</span>;
      case 'Closed Lost':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Closed Lost</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">{stage}</span>;
    }
  };

  const getPriorityBadge = (priority: Deal['priority']) => {
    switch (priority) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">High</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Low</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center space-x-2 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by deal ID (e.g. D-822), title, lead, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
          >
            <option value="all">All Stages</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Proposal">Proposal</option>
            <option value="Discovery">Discovery</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
          Export CSV ({sorted.length})
        </button>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Deal ID</th>
                <th className="py-3 px-4">Deal Title & Client</th>
                <th className="py-3 px-4">Service Category</th>
                <th
                  onClick={() => {
                    setSortField('dealValue');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 text-right"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Deal Value</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Owner</th>
                <th
                  onClick={() => {
                    setSortField('createdAt');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center space-x-1">
                    <span>Created Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No deals found matching filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => onSelectEntity({ type: 'deal', data: deal })}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">#{deal.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{deal.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{deal.leadName}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-800">{deal.serviceCategory}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-700">
                      {formatINR(deal.dealValue)}
                    </td>
                    <td className="py-3 px-4">{getPriorityBadge(deal.priority)}</td>
                    <td className="py-3 px-4">{getStageBadge(deal.stage)}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{deal.owner}</td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(deal.createdAt)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-blue-600 hover:text-blue-800 inline-flex items-center font-semibold text-xs">
                        Inspect <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
