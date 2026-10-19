import React, { useState } from 'react';
import { Search, Download, ArrowUpDown, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { Quotation } from '../../types';
import { formatDate, formatINR } from '../../utils/formatters';
import { exportToCSV } from '../../utils/exportCsv';
import { SelectedEntity } from '../common/EntityDrawer';

interface QuotationsViewProps {
  quotations: Quotation[];
  onSelectEntity: (entity: SelectedEntity) => void;
}

export const QuotationsView: React.FC<QuotationsViewProps> = ({ quotations, onSelectEntity }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'createdAt' | 'quotedAmount'>('createdAt');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = quotations.filter((q) => {
    const matchesSearch =
      q.id.toLowerCase().includes(search.toLowerCase()) ||
      q.leadName.toLowerCase().includes(search.toLowerCase()) ||
      q.serviceCategory.toLowerCase().includes(search.toLowerCase()) ||
      q.createdBy.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortField === 'createdAt') {
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortField === 'quotedAmount') {
      cmp = a.quotedAmount - b.quotedAmount;
    }
    return sortAsc ? cmp : -cmp;
  });

  const handleExport = () => {
    exportToCSV(sorted, 'Quotations_Analytics_Export');
  };

  const getStatusBadge = (status: Quotation['status']) => {
    switch (status) {
      case 'Accepted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Accepted</span>;
      case 'Pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Pending</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Rejected</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">Expired</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center space-x-2 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by quote ID (e.g. Q-10467), client name, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
          >
            <option value="all">All Quotation Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
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

      {/* Quotations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Quote ID</th>
                <th className="py-3 px-4">Client & Lead</th>
                <th className="py-3 px-4">Service Category</th>
                <th
                  onClick={() => {
                    setSortField('quotedAmount');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 text-right"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Quoted Amount</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Linked Deal</th>
                <th className="py-3 px-4">Created By</th>
                <th
                  onClick={() => {
                    setSortField('createdAt');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
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
                    No quotations found matching filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => onSelectEntity({ type: 'quotation', data: q })}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">#{q.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{q.leadName}</td>
                    <td className="py-3 px-4 text-slate-800">{q.serviceCategory}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {formatINR(q.quotedAmount)}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(q.status)}</td>
                    <td className="py-3 px-4">
                      {q.dealId ? (
                        <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          #{q.dealId}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{q.createdBy}</td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(q.createdAt)}</td>
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
