import React from 'react';
import { LayoutDashboard, Users, FileSpreadsheet, DollarSign, PackageCheck } from 'lucide-react';

export type NavTab = 'overview' | 'leads' | 'quotations' | 'deals' | 'orders';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  leadCount: number;
  quotationCount: number;
  dealCount: number;
  orderCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  leadCount,
  quotationCount,
  dealCount,
  orderCount
}) => {
  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads Analytics', icon: Users, count: leadCount },
    { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet, count: quotationCount },
    { id: 'deals', label: 'Deals & Revenue', icon: DollarSign, count: dealCount },
    { id: 'orders', label: 'Orders & Payments', icon: PackageCheck, count: orderCount }
  ] as const;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as NavTab)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {'count' in tab && tab.count !== undefined && (
                  <span
                    className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-blue-200/60 text-blue-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
