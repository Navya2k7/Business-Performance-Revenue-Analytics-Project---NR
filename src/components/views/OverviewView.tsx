import React from 'react';
import {
  Users,
  CheckCircle,
  Award,
  XCircle,
  Percent,
  FileSpreadsheet,
  Briefcase,
  Receipt,
  Target,
  ArrowUpRight,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { DashboardMetrics } from '../../utils/analyticsCalculations';
import { KpiCard } from '../common/KpiCard';
import { SelectedEntity } from '../common/EntityDrawer';
import { formatINR } from '../../utils/formatters';
import { Lead, Quotation, Deal, Order, Payment } from '../../types';

interface OverviewViewProps {
  metrics: DashboardMetrics;
  onSelectEntity: (entity: SelectedEntity) => void;
  onNavigateTab: (tab: any) => void;
  allLeads: Lead[];
  allQuotations: Quotation[];
  allDeals: Deal[];
  allOrders: Order[];
  allPayments: Payment[];
  activityLogs: any[];
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  metrics,
  onSelectEntity,
  onNavigateTab,
  allLeads,
  allQuotations,
  allDeals,
  allOrders,
  allPayments,
  activityLogs
}) => {
  const {
    window,
    newLeads,
    qualifiedLeads,
    qualifiedPercent,
    convertedLeads,
    convertedPercent,
    unqualifiedLeads,
    unqualifiedPercent,
    conversionRate,
    quotationsCreated,
    dealsCreated,
    invoicesGenerated,
    targetRevenue,
    achievedRevenue,
    remainingRevenue,
    targetPercent,
    funnel,
    dailyLeadTrend,
    leadSources,
    quotationsByService,
    serviceWiseQuotations,
    quoteToDealRate,
    dealsVsRevenueByService,
    revenueByCategory,
    priorityBreakdown,
    dailyRevenueTrend,
    totalDealValue,
    netCollectedRevenue,
    outstandingRevenue,
    salesTeamActivity,
    opsTeamActivity,
    ordersAndStageProgress
  } = metrics;

  return (
    <div className="space-y-6">
      {/* =========================================================================
          TIER 1: 8 Top KPI Metric Cards (Matching Screenshot)
         ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <KpiCard
          title="New Leads"
          value={newLeads.current}
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          comparison={newLeads}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('leads')}
          tooltipText="Total new leads captured in the selected timeframe"
        />

        <KpiCard
          title="Qualified Leads"
          value={qualifiedLeads.current}
          subValue={`${qualifiedPercent.toFixed(1)}%`}
          subLabel="Qualified %"
          icon={CheckCircle}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          comparison={qualifiedLeads}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('leads')}
          tooltipText="Leads verified as high-intent prospects"
        />

        <KpiCard
          title="Converted Leads"
          value={convertedLeads.current}
          subValue={`${convertedPercent.toFixed(1)}%`}
          subLabel="Conversion %"
          icon={Award}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
          comparison={convertedLeads}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('leads')}
          tooltipText="Leads successfully converted into paying deals"
        />

        <KpiCard
          title="Unqualified Leads"
          value={unqualifiedLeads.current}
          subValue={`${unqualifiedPercent.toFixed(1)}%`}
          subLabel="Unqualified %"
          icon={XCircle}
          iconBgColor="bg-slate-100"
          iconColor="text-slate-600"
          comparison={unqualifiedLeads}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('leads')}
          tooltipText="Leads disqualified due to budget or criteria mismatch"
        />

        <KpiCard
          title="Conversion Rate"
          value={`${conversionRate.current.toFixed(1)}%`}
          icon={Percent}
          iconBgColor="bg-cyan-50"
          iconColor="text-cyan-600"
          comparison={conversionRate}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('leads')}
          tooltipText="Percentage of total leads in period converted into deals"
        />

        <KpiCard
          title="Quotations Created"
          value={quotationsCreated.current}
          icon={FileSpreadsheet}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          comparison={quotationsCreated}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('quotations')}
          tooltipText="Formal proposals created in this date window"
        />

        <KpiCard
          title="Deals Created"
          value={dealsCreated.current}
          icon={Briefcase}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          comparison={dealsCreated}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('deals')}
          tooltipText="Pipeline sales deals initiated in the period"
        />

        <KpiCard
          title="Invoices Generated"
          value={invoicesGenerated.current}
          icon={Receipt}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          comparison={invoicesGenerated}
          comparisonLabel={window.label}
          onClick={() => onNavigateTab('orders')}
          tooltipText="Total invoices / payment collections processed"
        />
      </div>

      {/* =========================================================================
          TIER 2: Target Achievement, Lead Funnel, Daily Lead Trend, Lead Sources
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Target Achievement */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-800">Target Achievement</h3>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block">Monthly Revenue Target</span>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {formatINR(targetRevenue)}
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                  Achieved
                </span>
                <span className="font-bold text-slate-900">
                  {formatINR(achievedRevenue)} ({targetPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="flex items-center text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-slate-300 mr-1.5"></span>
                  Remaining
                </span>
                <span className="font-bold text-slate-700">
                  {formatINR(remainingRevenue)} ({(100 - targetPercent).toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Target vs Achieved Progress Funnel/Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
                Target vs Achieved (Revenue)
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, targetPercent)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹0</span>
                <span>{targetPercent.toFixed(1)}% Achieved</span>
                <span>{formatINR(targetRevenue, true)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Lead Funnel */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800">Lead Funnel</h3>
            <span className="text-[10px] font-semibold text-slate-500">
              {funnel.totalLeads} Total
            </span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 py-1">
            {/* Top: New Leads */}
            <div className="w-full max-w-[220px] bg-blue-500 text-white rounded-t-lg py-1.5 px-3 text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">New Leads</span>
              <span className="text-sm font-extrabold">{funnel.totalLeads}</span>
            </div>

            {/* Mid: Qualified */}
            <div className="w-[80%] max-w-[176px] bg-emerald-500 text-white py-1.5 px-3 text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">Qualified</span>
              <span className="text-sm font-extrabold">{funnel.qualifiedLeads}</span>
            </div>

            {/* Bottom: Converted */}
            <div className="w-[55%] max-w-[120px] bg-amber-500 text-white rounded-b-lg py-1.5 px-3 text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">Converted</span>
              <span className="text-sm font-extrabold">{funnel.convertedLeads}</span>
            </div>

            {/* Unqualified Aside Pill */}
            <div className="w-full mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs px-2">
              <span className="text-slate-500 flex items-center">
                <span className="w-2 h-2 rounded-full bg-slate-300 mr-1.5"></span>
                Unqualified Leads:
              </span>
              <span className="font-bold text-slate-700">
                {funnel.unqualifiedLeads} ({unqualifiedPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* 3. Daily Lead Trend */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-800">Daily Lead Trend</h3>
            <div className="flex items-center space-x-2 text-[10px]">
              <span className="flex items-center text-blue-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1"></span> New
              </span>
              <span className="flex items-center text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1"></span> Qual
              </span>
              <span className="flex items-center text-amber-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span> Conv
              </span>
            </div>
          </div>

          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyLeadTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9 }} interval="preserveStartEnd" stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="newLeads" stroke="#2563eb" strokeWidth={2} dot={false} name="New Leads" />
                <Line type="monotone" dataKey="qualified" stroke="#10b981" strokeWidth={1.5} dot={false} name="Qualified" />
                <Line type="monotone" dataKey="converted" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Converted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Lead Sources Donut */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-800">Lead Sources</h3>
            <span className="text-[10px] text-slate-400 font-semibold">{funnel.totalLeads} Total</span>
          </div>

          <div className="flex items-center">
            <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSources}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={3}
                  >
                    {leadSources.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any, name: any) => [`${val} leads`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-slate-900">{funnel.totalLeads}</span>
                <span className="text-[8px] uppercase tracking-wider text-slate-400">Leads</span>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="ml-3 flex-1 space-y-1 text-[11px] overflow-hidden">
              {leadSources.slice(0, 4).map((src) => (
                <div key={src.name} className="flex items-center justify-between">
                  <div className="flex items-center truncate mr-1">
                    <span className="w-2 h-2 rounded-full mr-1.5 shrink-0" style={{ backgroundColor: src.color }}></span>
                    <span className="truncate text-slate-600">{src.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800 shrink-0">
                    {src.count} ({src.percentage.toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TIER 3: Quotation Analytics (Matching Screenshot)
         ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Quotation Analytics</h2>
          </div>
          <button
            onClick={() => onNavigateTab('quotations')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            View all quotations <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Quotations by Service / Order Category */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-2">Quotations by Service</h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quotationsByService.slice(0, 6)} margin={{ top: 5, right: 5, left: -25, bottom: 20 }}>
                  <XAxis
                    dataKey="service"
                    tick={{ fontSize: 8 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    stroke="#94a3b8"
                  />
                  <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} name="Quotations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Quotation Value by Service */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-2">Quotation Value by Service</h4>
            <div className="space-y-2 mt-2">
              {quotationsByService.slice(0, 5).map((item, idx) => {
                const totalVal = quotationsByService.reduce((s, i) => s + i.value, 0);
                const pct = totalVal > 0 ? (item.value / totalVal) * 100 : 0;
                return (
                  <div key={item.service} className="text-xs">
                    <div className="flex justify-between items-center text-slate-700 mb-1">
                      <span className="truncate pr-2 font-medium">{item.service}</span>
                      <span className="font-bold text-slate-900 shrink-0">
                        {formatINR(item.value)} ({pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${Math.max(4, pct)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Service Wise Quotation Details Table */}
          <div className="overflow-x-auto">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Service Wise Quotation Details</h4>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-1 px-1.5">Service</th>
                  <th className="py-1 px-1.5 text-center">Quotes</th>
                  <th className="py-1 px-1.5 text-right">Quoted (₹)</th>
                  <th className="py-1 px-1.5 text-center">Acc</th>
                  <th className="py-1 px-1.5 text-center">Conv %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceWiseQuotations.slice(0, 5).map((srv) => (
                  <tr key={srv.service} className="hover:bg-slate-50">
                    <td className="py-1.5 px-1.5 font-medium text-slate-800 truncate max-w-[110px]" title={srv.service}>
                      {srv.service}
                    </td>
                    <td className="py-1.5 px-1.5 text-center text-slate-600">{srv.quotations}</td>
                    <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{formatINR(srv.quotedAmount, true)}</td>
                    <td className="py-1.5 px-1.5 text-center text-emerald-600 font-semibold">{srv.accepted}</td>
                    <td className="py-1.5 px-1.5 text-center text-slate-700 font-semibold">{srv.conversionRate.toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Quote to Deal Conversion Rate */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Quote to Deal Conversion Rate</h4>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Converted', value: quoteToDealRate },
                      { name: 'Unconverted', value: Math.max(0, 100 - quoteToDealRate) }
                    ]}
                    dataKey="value"
                    innerRadius={38}
                    outerRadius={50}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#2563eb" />
                    <Cell fill="#e2e8f0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-extrabold text-slate-900">{quoteToDealRate.toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-slate-600 mt-2">
              {metrics.convertedQuotationsCount} Deals / {metrics.totalQuotationsCount} Quotations
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TIER 4: Deals & Revenue (Matching Screenshot)
         ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Deals & Revenue</h2>
          </div>
          <button
            onClick={() => onNavigateTab('deals')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            View all deals <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* 1. Deals Created vs Deal Revenue */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Deals vs Revenue</h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealsVsRevenueByService.slice(0, 5)} margin={{ top: 5, right: 5, left: -25, bottom: 20 }}>
                  <XAxis dataKey="service" tick={{ fontSize: 8 }} angle={-25} textAnchor="end" stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="dealsCreated" fill="#2563eb" radius={[3, 3, 0, 0]} name="Deals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Revenue by Service Category */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Revenue by Service</h4>
            <div className="space-y-2 mt-1">
              {revenueByCategory.slice(0, 5).map((cat) => (
                <div key={cat.category} className="text-xs">
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span className="truncate pr-1 font-medium">{cat.category}</span>
                    <span className="font-bold text-slate-900 shrink-0">{formatINR(cat.revenue, true)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.max(4, cat.percentage)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Priority Breakdown */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Priority Breakdown</h4>
            <div className="space-y-2">
              {priorityBreakdown.map((p) => (
                <div key={p.priority} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                    <span className="font-semibold text-slate-800">{p.priority}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">{formatINR(p.revenue)}</span>
                    <span className="text-[10px] text-slate-500">{p.deals} Deals ({p.percentage.toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Daily Revenue Trend */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Daily Revenue Trend</h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRevenueTrend.slice(-10)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 8 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => formatINR(Number(val))}
                  />
                  <Bar dataKey="wonRevenue" fill="#2563eb" name="Won Deal" />
                  <Bar dataKey="collectedRevenue" fill="#10b981" name="Collected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. Total vs Collected Revenue Summary Card */}
          <div className="lg:col-span-1 flex flex-col justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800">Total vs Collected</h4>

            <div className="space-y-3 my-2">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-semibold block">Total Deal Value</span>
                <span className="text-base font-extrabold text-blue-700 font-sans">
                  {formatINR(totalDealValue)}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-semibold block">Net Collected Revenue</span>
                <span className="text-base font-extrabold text-emerald-700 font-sans">
                  {formatINR(netCollectedRevenue)}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-semibold block">Outstanding Revenue</span>
                <span className="text-base font-extrabold text-amber-600 font-sans">
                  {formatINR(outstandingRevenue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TIER 5: Sales Team, Ops Team, Orders Progress, CRM Activity Log (Exact Reference)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* 1. Sales Team Activity Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">Sales Team Activity</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Sales Team
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200 font-semibold">
                <tr>
                  <th className="py-1.5 px-2">User</th>
                  <th className="py-1.5 px-1.5 text-center">Leads</th>
                  <th className="py-1.5 px-1.5 text-center">Conv %</th>
                  <th className="py-1.5 px-1.5 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salesTeamActivity.map((user) => (
                  <tr key={user.user} className="hover:bg-slate-50">
                    <td className="py-2 px-2 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[9px]">
                        {user.avatar}
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[85px]">{user.user}</span>
                    </td>
                    <td className="py-2 px-1.5 text-center text-slate-600">{user.leadsHandled}</td>
                    <td className="py-2 px-1.5 text-center text-indigo-600 font-semibold">{user.conversionRate.toFixed(1)}%</td>
                    <td className="py-2 px-1.5 text-right font-bold text-slate-900">{formatINR(user.revenue, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Operations Team Activity Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">Operations Team Activity</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Operations
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200 font-semibold">
                <tr>
                  <th className="py-1.5 px-2">User</th>
                  <th className="py-1.5 px-1.5 text-center">Orders</th>
                  <th className="py-1.5 px-1.5 text-center">Stages Done</th>
                  <th className="py-1.5 px-1.5 text-center">Pending</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {opsTeamActivity.map((user) => (
                  <tr key={user.user} className="hover:bg-slate-50">
                    <td className="py-2 px-2 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">
                        {user.avatar}
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[85px]">{user.user}</span>
                    </td>
                    <td className="py-2 px-1.5 text-center text-slate-600 font-semibold">{user.ordersUpdated}</td>
                    <td className="py-2 px-1.5 text-center text-emerald-600 font-semibold">{user.stagesCompleted}</td>
                    <td className="py-2 px-1.5 text-center text-amber-600 font-semibold">{user.pendingStages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Orders & Stage Progress (Horizontal Stacked Bar by Service) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800">Orders & Stage Progress</h3>
            <div className="flex items-center space-x-2 text-[9px]">
              <span className="flex items-center text-amber-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span> In Prog
              </span>
              <span className="flex items-center text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span> Done
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {ordersAndStageProgress.slice(0, 5).map((item) => (
              <div key={item.service} className="text-xs">
                <div className="flex justify-between text-slate-700 mb-1">
                  <span className="truncate pr-1 font-medium text-[11px]">{item.service}</span>
                  <span className="font-bold text-slate-900 text-[11px]">{item.total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 flex overflow-hidden">
                  <div
                    className="bg-amber-500 h-full"
                    style={{ width: `${item.total > 0 ? (item.inProgress / item.total) * 100 : 0}%` }}
                    title={`${item.inProgress} In Progress`}
                  ></div>
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${item.total > 0 ? (item.completed / item.total) * 100 : 0}%` }}
                    title={`${item.completed} Completed`}
                  ></div>
                  <div
                    className="bg-slate-300 h-full"
                    style={{ width: `${item.total > 0 ? (item.pending / item.total) * 100 : 0}%` }}
                    title={`${item.pending} Pending`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Recent CRM Activity Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800">Recent CRM Activity</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {activityLogs.slice(0, 7).map((log) => {
              // Resolve entity for click drilldown
              const handleClick = () => {
                if (log.recordType === 'lead') {
                  const item = allLeads.find((l) => l.id === log.recordId);
                  if (item) onSelectEntity({ type: 'lead', data: item });
                } else if (log.recordType === 'quotation') {
                  const item = allQuotations.find((q) => q.id === log.recordId);
                  if (item) onSelectEntity({ type: 'quotation', data: item });
                } else if (log.recordType === 'deal') {
                  const item = allDeals.find((d) => d.id === log.recordId);
                  if (item) onSelectEntity({ type: 'deal', data: item });
                } else if (log.recordType === 'order') {
                  const item = allOrders.find((o) => o.id === log.recordId);
                  if (item) onSelectEntity({ type: 'order', data: item });
                } else if (log.recordType === 'payment') {
                  const item = allPayments.find((p) => p.id === log.recordId);
                  if (item) onSelectEntity({ type: 'payment', data: item });
                }
              };

              return (
                <div
                  key={log.id}
                  onClick={handleClick}
                  className="p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 text-[11px]"
                >
                  <div className="flex items-center justify-between text-slate-500 text-[10px]">
                    <span className="font-mono">{log.time.slice(0, 19).replace('T', ' ')}</span>
                    <span className="font-bold text-blue-600 hover:underline">#{log.recordId}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="font-bold text-slate-800">{log.employee}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600 font-medium">{log.action}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
