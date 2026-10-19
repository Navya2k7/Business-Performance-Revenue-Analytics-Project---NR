import React, { useState, useMemo } from 'react';
import { FilterState, DatePreset } from './types';
import {
  ALL_LEADS,
  ALL_QUOTATIONS,
  ALL_DEALS,
  ALL_ORDERS,
  ALL_PAYMENTS,
  RECENT_ACTIVITY_LOG,
  DEMO_DATE_STR
} from './data/mockData';
import { computeDashboardAnalytics } from './utils/analyticsCalculations';
import { Header } from './components/layout/Header';
import { Navigation, NavTab } from './components/layout/Navigation';
import { OverviewView } from './components/views/OverviewView';
import { LeadsView } from './components/views/LeadsView';
import { QuotationsView } from './components/views/QuotationsView';
import { DealsRevenueView } from './components/views/DealsRevenueView';
import { OrdersPaymentsView } from './components/views/OrdersPaymentsView';
import { EntityDrawer, SelectedEntity } from './components/common/EntityDrawer';
import { ShieldCheck, Calendar, Info } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(null);

  const [filterState, setFilterState] = useState<FilterState>({
    datePreset: '30d',
    customRange: {
      startDate: '2026-10-01',
      endDate: '2026-10-19'
    },
    selectedUser: 'all',
    selectedDept: 'all',
    searchQuery: ''
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilterState({
      datePreset: '30d',
      customRange: {
        startDate: '2026-10-01',
        endDate: '2026-10-19'
      },
      selectedUser: 'all',
      selectedDept: 'all',
      searchQuery: ''
    });
  };

  // Dynamically compute metrics based on filter state
  const metrics = useMemo(() => {
    return computeDashboardAnalytics(
      ALL_LEADS,
      ALL_QUOTATIONS,
      ALL_DEALS,
      ALL_ORDERS,
      ALL_PAYMENTS,
      filterState
    );
  }, [filterState]);

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#0f172a] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Header
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        metrics={metrics}
      />

      {/* Navigation Tabs */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        leadCount={metrics.filteredLeads.length}
        quotationCount={metrics.filteredQuotations.length}
        dealCount={metrics.filteredDeals.length}
        orderCount={metrics.filteredOrders.length}
      />

      {/* Active Filter Pill Bar (If custom user or date is chosen) */}
      {(filterState.datePreset !== '30d' || filterState.selectedUser !== 'all' || filterState.selectedDept !== 'all') && (
        <div className="bg-blue-50/70 border-b border-blue-100 py-1.5 px-4 sm:px-8 text-xs flex items-center justify-between text-blue-900">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-blue-700">Active Filters:</span>
            <span className="bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-800 font-medium">
              Period: {metrics.window.days} Days ({filterState.datePreset.toUpperCase()})
            </span>
            {filterState.selectedUser !== 'all' && (
              <span className="bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-800 font-medium">
                Owner: {filterState.selectedUser}
              </span>
            )}
            {filterState.selectedDept !== 'all' && (
              <span className="bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-800 font-medium">
                Dept: {filterState.selectedDept}
              </span>
            )}
          </div>
          <button
            onClick={handleResetFilters}
            className="text-blue-700 hover:text-blue-900 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'overview' && (
          <OverviewView
            metrics={metrics}
            onSelectEntity={setSelectedEntity}
            onNavigateTab={setCurrentTab}
            allLeads={ALL_LEADS}
            allQuotations={ALL_QUOTATIONS}
            allDeals={ALL_DEALS}
            allOrders={ALL_ORDERS}
            allPayments={ALL_PAYMENTS}
            activityLogs={RECENT_ACTIVITY_LOG}
          />
        )}

        {currentTab === 'leads' && (
          <LeadsView leads={metrics.filteredLeads} onSelectEntity={setSelectedEntity} />
        )}

        {currentTab === 'quotations' && (
          <QuotationsView
            quotations={metrics.filteredQuotations}
            onSelectEntity={setSelectedEntity}
          />
        )}

        {currentTab === 'deals' && (
          <DealsRevenueView deals={metrics.filteredDeals} onSelectEntity={setSelectedEntity} />
        )}

        {currentTab === 'orders' && (
          <OrdersPaymentsView
            orders={metrics.filteredOrders}
            payments={metrics.filteredPayments}
            onSelectEntity={setSelectedEntity}
          />
        )}
      </main>

      {/* Slide-Over Relational Inspector Drawer */}
      <EntityDrawer
        selected={selectedEntity}
        onClose={() => setSelectedEntity(null)}
        onSelectEntity={setSelectedEntity}
        allLeads={ALL_LEADS}
        allQuotations={ALL_QUOTATIONS}
        allDeals={ALL_DEALS}
        allOrders={ALL_ORDERS}
        allPayments={ALL_PAYMENTS}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Business Performance & Revenue Analytics Dashboard · Internship Project</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Demo Anchor: 19 October 2026
            </span>
            <span className="flex items-center">
              <Info className="w-3.5 h-3.5 mr-1 text-slate-400" /> 100% Deterministic Client-Side State
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
