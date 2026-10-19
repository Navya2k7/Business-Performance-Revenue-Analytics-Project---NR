import React, { useState } from 'react';
import { Calendar, Users, Briefcase, Download, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { FilterState, DatePreset } from '../../types';
import { EMPLOYEES, DEPARTMENTS } from '../../data/employees';
import { exportToCSV } from '../../utils/exportCsv';
import { DashboardMetrics } from '../../utils/analyticsCalculations';

interface HeaderProps {
  filterState: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  metrics: DashboardMetrics;
}

export const Header: React.FC<HeaderProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  metrics
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  const isFiltered = 
    filterState.datePreset !== '30d' ||
    filterState.selectedUser !== 'all' ||
    filterState.selectedDept !== 'all' ||
    filterState.searchQuery !== '';

  const handleExportAll = () => {
    // Export executive summary CSV
    const exportData = [
      { Metric: 'Total Leads Created', Current_Period: metrics.newLeads.current, Previous_Period: metrics.newLeads.previous, Change: `${metrics.newLeads.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Qualified Leads', Current_Period: metrics.qualifiedLeads.current, Previous_Period: metrics.qualifiedLeads.previous, Change: `${metrics.qualifiedLeads.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Converted Leads', Current_Period: metrics.convertedLeads.current, Previous_Period: metrics.convertedLeads.previous, Change: `${metrics.convertedLeads.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Unqualified Leads', Current_Period: metrics.unqualifiedLeads.current, Previous_Period: metrics.unqualifiedLeads.previous, Change: `${metrics.unqualifiedLeads.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Conversion Rate', Current_Period: `${metrics.conversionRate.current.toFixed(1)}%`, Previous_Period: `${metrics.conversionRate.previous.toFixed(1)}%`, Change: `${metrics.conversionRate.diff.toFixed(1)} pp` },
      { Metric: 'Quotations Created', Current_Period: metrics.quotationsCreated.current, Previous_Period: metrics.quotationsCreated.previous, Change: `${metrics.quotationsCreated.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Deals Created', Current_Period: metrics.dealsCreated.current, Previous_Period: metrics.dealsCreated.previous, Change: `${metrics.dealsCreated.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Invoices Generated', Current_Period: metrics.invoicesGenerated.current, Previous_Period: metrics.invoicesGenerated.previous, Change: `${metrics.invoicesGenerated.percentChange?.toFixed(1) || 0}%` },
      { Metric: 'Total Won Deal Value (₹)', Current_Period: metrics.totalDealValue, Previous_Period: '-', Change: '-' },
      { Metric: 'Net Collected Revenue (₹)', Current_Period: metrics.netCollectedRevenue, Previous_Period: '-', Change: '-' },
      { Metric: 'Outstanding Revenue (₹)', Current_Period: metrics.outstandingRevenue, Previous_Period: '-', Change: '-' }
    ];

    exportToCSV(exportData, `CRM_Analytics_Summary_${filterState.datePreset}`);
  };

  const getPresetLabel = (preset: DatePreset) => {
    switch (preset) {
      case 'today': return 'Today (19 Oct 2026)';
      case '7d': return 'Last 7 Days (13 - 19 Oct)';
      case '30d': return 'Oct 1 - Oct 31, 2026';
      case 'custom': return `${filterState.customRange.startDate} to ${filterState.customRange.endDate}`;
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title & Subtitle */}
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                Business Performance & Revenue Analytics
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Demo As of 19 Oct 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Track your leads, conversions, quotations, deals, revenue and operations in real time.
            </p>
          </div>

          {/* Action & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Date Preset Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                  setShowUserDropdown(false);
                  setShowDeptDropdown(false);
                }}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                <span>{getPresetLabel(filterState.datePreset)}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
              </button>

              {showDatePicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDatePicker(false)} />
                  <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Date Range Presets
                    </div>
                    {(['today', '7d', '30d'] as DatePreset[]).map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          onFilterChange({ datePreset: preset });
                          setShowDatePicker(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                      >
                        <span>{getPresetLabel(preset)}</span>
                        {filterState.datePreset === preset && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}

                    <div className="border-t border-slate-100 my-1 pt-2 px-3">
                      <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Custom Date Range:</span>
                      <div className="space-y-1.5">
                        <div>
                          <label className="text-[10px] text-slate-500 block">Start Date</label>
                          <input
                            type="date"
                            value={filterState.customRange.startDate}
                            onChange={(e) =>
                              onFilterChange({
                                datePreset: 'custom',
                                customRange: { ...filterState.customRange, startDate: e.target.value }
                              })
                            }
                            className="w-full text-xs p-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block">End Date</label>
                          <input
                            type="date"
                            value={filterState.customRange.endDate}
                            onChange={(e) =>
                              onFilterChange({
                                datePreset: 'custom',
                                customRange: { ...filterState.customRange, endDate: e.target.value }
                              })
                            }
                            className="w-full text-xs p-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* All Users Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowDatePicker(false);
                  setShowDeptDropdown(false);
                }}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
              >
                <Users className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                <span>{filterState.selectedUser === 'all' ? 'All Users' : filterState.selectedUser}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
              </button>

              {showUserDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserDropdown(false)} />
                  <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onFilterChange({ selectedUser: 'all' });
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between"
                    >
                      <span>All Users</span>
                      {filterState.selectedUser === 'all' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    {EMPLOYEES.map((emp) => (
                      <button
                        key={emp.id}
                        onClick={() => {
                          onFilterChange({ selectedUser: emp.name });
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-4 h-4 rounded-full text-[9px] text-white flex items-center justify-center font-bold ${emp.avatarColor}`}>
                            {emp.avatarInitial}
                          </span>
                          <span>{emp.name}</span>
                        </div>
                        {filterState.selectedUser === emp.name && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* All Departments Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowDeptDropdown(!showDeptDropdown);
                  setShowDatePicker(false);
                  setShowUserDropdown(false);
                }}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                <span>{filterState.selectedDept === 'all' ? 'All Departments' : filterState.selectedDept}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
              </button>

              {showDeptDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDeptDropdown(false)} />
                  <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <button
                      onClick={() => {
                        onFilterChange({ selectedDept: 'all' });
                        setShowDeptDropdown(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                    >
                      <span>All Departments</span>
                      {filterState.selectedDept === 'all' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    {DEPARTMENTS.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => {
                          onFilterChange({ selectedDept: dept });
                          setShowDeptDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between"
                      >
                        <span>{dept}</span>
                        {filterState.selectedDept === dept && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Reset Button (Visible when filters changed) */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                title="Reset all filters to default"
                className="inline-flex items-center px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-500" />
                Reset
              </button>
            )}

            {/* Export CSV Button */}
            <button
              onClick={handleExportAll}
              className="inline-flex items-center px-3.5 py-1.5 border border-transparent rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
