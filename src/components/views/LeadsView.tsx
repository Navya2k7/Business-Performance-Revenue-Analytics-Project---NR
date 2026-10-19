import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpDown, ChevronRight, User, Phone, Mail, Building } from 'lucide-react';
import { Lead } from '../../types';
import { formatDate } from '../../utils/formatters';
import { exportToCSV } from '../../utils/exportCsv';
import { SelectedEntity } from '../common/EntityDrawer';

interface LeadsViewProps {
  leads: Lead[];
  onSelectEntity: (entity: SelectedEntity) => void;
}

export const LeadsView: React.FC<LeadsViewProps> = ({ leads, onSelectEntity }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'createdAt' | 'clientName' | 'status'>('createdAt');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.companyName.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.serviceInterest.toLowerCase().includes(search.toLowerCase()) ||
      l.assignedTo.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || l.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'createdAt') {
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortField === 'clientName') {
      cmp = a.clientName.localeCompare(b.clientName);
    } else if (sortField === 'status') {
      cmp = a.status.localeCompare(b.status);
    }
    return sortAsc ? cmp : -cmp;
  });

  const handleExport = () => {
    exportToCSV(sorted, 'Leads_Analytics_Export');
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'Qualified':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Qualified</span>;
      case 'Converted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">Converted</span>;
      case 'Unqualified':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Unqualified</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">New</span>;
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
              placeholder="Search by client, company, ID (e.g. L-209610), service, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Unqualified">Unqualified</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
          >
            <option value="all">All Sources</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Website">Website</option>
            <option value="Just Dial">Just Dial</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
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

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Lead ID</th>
                <th
                  onClick={() => {
                    setSortField('clientName');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center space-x-1">
                    <span>Client & Company</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Service Interest</th>
                <th className="py-3 px-4">Source</th>
                <th
                  onClick={() => {
                    setSortField('status');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Assigned To</th>
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
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectEntity({ type: 'lead', data: lead })}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">#{lead.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{lead.clientName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center mt-0.5">
                        <Building className="w-3 h-3 mr-1 text-slate-400" />
                        {lead.companyName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{lead.serviceInterest}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{lead.assignedTo}</td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(lead.createdAt)}</td>
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
