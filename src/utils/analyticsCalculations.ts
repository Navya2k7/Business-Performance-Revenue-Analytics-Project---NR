import {
  Lead,
  Quotation,
  Deal,
  Order,
  Payment,
  FilterState,
  MetricComparison,
  ServiceQuotationDetail,
  UserSalesActivity,
  UserOpsActivity
} from '../types';
import { DEMO_DATE_STR } from '../data/mockData';

export interface DateWindow {
  start: Date;
  end: Date;
  prevStart: Date;
  prevEnd: Date;
  days: number;
  label: string;
}

/**
 * Computes the exact inclusive date range and its preceding comparison window.
 */
export function resolveDateWindows(filterState: FilterState): DateWindow {
  // Fixed demo reference date: Oct 19, 2026
  const anchorYear = 2026;
  const anchorMonth = 9; // 0-indexed, so 9 is October
  const anchorDay = 19;
  
  const endOfDemoDay = new Date(Date.UTC(anchorYear, anchorMonth, anchorDay, 23, 59, 59, 999));

  let start: Date;
  let end: Date = endOfDemoDay;
  let days: number = 30;
  let label: string = 'vs. previous 30 days';

  switch (filterState.datePreset) {
    case 'today': {
      start = new Date(Date.UTC(anchorYear, anchorMonth, anchorDay, 0, 0, 0, 0));
      days = 1;
      label = 'vs. yesterday';
      break;
    }
    case '7d': {
      start = new Date(Date.UTC(anchorYear, anchorMonth, anchorDay - 6, 0, 0, 0, 0));
      days = 7;
      label = 'vs. previous 7 days';
      break;
    }
    case '30d': {
      // Current month or 31 days view matching screenshot
      start = new Date(Date.UTC(anchorYear, anchorMonth, 1, 0, 0, 0, 0));
      end = new Date(Date.UTC(anchorYear, anchorMonth, 31, 23, 59, 59, 999));
      days = 31;
      label = 'vs. previous 31 days';
      break;
    }
    case 'custom': {
      const partsStart = filterState.customRange.startDate.split('-').map(Number);
      const partsEnd = filterState.customRange.endDate.split('-').map(Number);
      
      start = new Date(Date.UTC(partsStart[0], partsStart[1] - 1, partsStart[2], 0, 0, 0, 0));
      end = new Date(Date.UTC(partsEnd[0], partsEnd[1] - 1, partsEnd[2], 23, 59, 59, 999));
      
      const diffMs = end.getTime() - start.getTime();
      days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
      label = `vs. previous ${days} days`;
      break;
    }
    default: {
      start = new Date(Date.UTC(anchorYear, anchorMonth, 1, 0, 0, 0, 0));
      days = 31;
      label = 'vs. previous 31 days';
    }
  }

  // Preceding period of identical duration
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - (days * 24 * 60 * 60 * 1000) + 1);

  return { start, end, prevStart, prevEnd, days, label };
}

function computeDelta(current: number, previous: number, isRate: boolean = false): MetricComparison {
  const diff = current - previous;
  if (isRate) {
    return {
      current,
      previous,
      diff,
      percentChange: diff,
      isRateMetric: true
    };
  }

  if (previous === 0) {
    return {
      current,
      previous,
      diff,
      percentChange: current > 0 ? 100 : null,
      isRateMetric: false
    };
  }

  const percentChange = ((current - previous) / previous) * 100;
  return {
    current,
    previous,
    diff,
    percentChange,
    isRateMetric: false
  };
}

export function filterEntityList<T extends { createdAt?: string; paymentDate?: string; closedAt?: string; assignedTo?: string; createdBy?: string; owner?: string; opsOwner?: string; department?: string }>(
  items: T[],
  dateField: 'createdAt' | 'paymentDate' | 'closedAt',
  start: Date,
  end: Date,
  user: string,
  dept: string
): T[] {
  return items.filter((item) => {
    const rawDate = item[dateField];
    if (!rawDate) return false;
    const itemDate = new Date(rawDate);
    if (itemDate < start || itemDate > end) return false;

    if (user !== 'all') {
      const itemUser = item.assignedTo || item.createdBy || item.owner || item.opsOwner;
      if (itemUser && itemUser !== user) return false;
    }

    if (dept !== 'all' && item.department && item.department !== dept) {
      return false;
    }

    return true;
  });
}

export interface DashboardMetrics {
  window: DateWindow;
  
  // KPI Metrics with Comparison
  newLeads: MetricComparison;
  qualifiedLeads: MetricComparison;
  qualifiedPercent: number;
  convertedLeads: MetricComparison;
  convertedPercent: number;
  unqualifiedLeads: MetricComparison;
  unqualifiedPercent: number;
  conversionRate: MetricComparison;
  quotationsCreated: MetricComparison;
  dealsCreated: MetricComparison;
  invoicesGenerated: MetricComparison;
  
  // Target Achievement
  targetRevenue: number;
  achievedRevenue: number;
  remainingRevenue: number;
  targetPercent: number;

  // Funnel Data
  funnel: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    unqualifiedLeads: number;
  };

  // Trends & Breakdowns
  dailyLeadTrend: Array<{ date: string; fullDate: string; newLeads: number; qualified: number; converted: number }>;
  leadSources: Array<{ name: string; count: number; percentage: number; color: string }>;
  
  // Quotation Analytics
  quotationsByService: Array<{ service: string; count: number; value: number }>;
  serviceWiseQuotations: ServiceQuotationDetail[];
  quoteToDealRate: number;
  totalQuotationsCount: number;
  convertedQuotationsCount: number;
  
  // Deals & Revenue
  dealsVsRevenueByService: Array<{ service: string; dealsCreated: number; dealRevenue: number }>;
  revenueByCategory: Array<{ category: string; revenue: number; percentage: number }>;
  priorityBreakdown: Array<{ priority: string; deals: number; revenue: number; percentage: number; color: string }>;
  dailyRevenueTrend: Array<{ date: string; fullDate: string; wonRevenue: number; collectedRevenue: number }>;
  totalDealValue: number;
  netCollectedRevenue: number;
  outstandingRevenue: number;

  // Team & Operations
  salesTeamActivity: UserSalesActivity[];
  opsTeamActivity: UserOpsActivity[];
  ordersAndStageProgress: Array<{ service: string; pending: number; inProgress: number; completed: number; onHold: number; total: number }>;

  // Filtered Raw Data Arrays for tables
  filteredLeads: Lead[];
  filteredQuotations: Quotation[];
  filteredDeals: Deal[];
  filteredOrders: Order[];
  filteredPayments: Payment[];
}

export function computeDashboardAnalytics(
  leads: Lead[],
  quotations: Quotation[],
  deals: Deal[],
  orders: Order[],
  payments: Payment[],
  filterState: FilterState
): DashboardMetrics {
  const window = resolveDateWindows(filterState);
  const { start, end, prevStart, prevEnd } = window;
  const user = filterState.selectedUser;
  const dept = filterState.selectedDept;

  // 1. Filtered Data Sets for Current Period
  const curLeads = filterEntityList(leads, 'createdAt', start, end, user, dept);
  const curQuotes = filterEntityList(quotations, 'createdAt', start, end, user, dept);
  const curDeals = filterEntityList(deals, 'createdAt', start, end, user, dept);
  const curWonDeals = curDeals.filter(d => d.stage === 'Closed Won');
  const curOrders = filterEntityList(orders, 'createdAt', start, end, user, dept);
  const curPayments = filterEntityList(payments, 'paymentDate', start, end, user, dept);
  const curSuccPayments = curPayments.filter(p => p.status === 'Successful');

  // 2. Filtered Data Sets for Previous Period
  const prevLeads = filterEntityList(leads, 'createdAt', prevStart, prevEnd, user, dept);
  const prevQuotes = filterEntityList(quotations, 'createdAt', prevStart, prevEnd, user, dept);
  const prevDeals = filterEntityList(deals, 'createdAt', prevStart, prevEnd, user, dept);
  const prevPayments = filterEntityList(payments, 'paymentDate', prevStart, prevEnd, user, dept);
  const prevSuccPayments = prevPayments.filter(p => p.status === 'Successful');

  // Lead Counts
  const curTotalLeads = curLeads.length;
  const prevTotalLeads = prevLeads.length;

  const curQualified = curLeads.filter(l => l.status === 'Qualified').length;
  const prevQualified = prevLeads.filter(l => l.status === 'Qualified').length;

  const curConverted = curLeads.filter(l => l.status === 'Converted').length;
  const prevConverted = prevLeads.filter(l => l.status === 'Converted').length;

  const curUnqualified = curLeads.filter(l => l.status === 'Unqualified').length;
  const prevUnqualified = prevLeads.filter(l => l.status === 'Unqualified').length;

  const curConvRate = curTotalLeads > 0 ? (curConverted / curTotalLeads) * 100 : 0;
  const prevConvRate = prevTotalLeads > 0 ? (prevConverted / prevTotalLeads) * 100 : 0;

  const qualifiedPercent = curTotalLeads > 0 ? (curQualified / curTotalLeads) * 100 : 0;
  const convertedPercent = curConvRate;
  const unqualifiedPercent = curTotalLeads > 0 ? (curUnqualified / curTotalLeads) * 100 : 0;

  // Comparison Metrics
  const newLeads = computeDelta(curTotalLeads, prevTotalLeads);
  const qualifiedLeads = computeDelta(curQualified, prevQualified);
  const convertedLeads = computeDelta(curConverted, prevConverted);
  const unqualifiedLeads = computeDelta(curUnqualified, prevUnqualified);
  const conversionRate = computeDelta(curConvRate, prevConvRate, true);

  const quotationsCreated = computeDelta(curQuotes.length, prevQuotes.length);
  const dealsCreated = computeDelta(curDeals.length, prevDeals.length);
  const invoicesGenerated = computeDelta(curPayments.length, prevPayments.length);

  // Revenue Calculations
  const targetRevenue = 8500000; // ₹85,00,000 monthly target
  const achievedRevenue = curSuccPayments.reduce((acc, p) => acc + p.amount, 0);
  const remainingRevenue = Math.max(0, targetRevenue - achievedRevenue);
  const targetPercent = Math.min(100, (achievedRevenue / targetRevenue) * 100);

  const totalDealValue = curWonDeals.reduce((acc, d) => acc + d.dealValue, 0);
  const netCollectedRevenue = achievedRevenue;
  
  // Outstanding Revenue: For deals won in this period, dealValue minus successful payments received for that deal
  const wonDealIds = new Set(curWonDeals.map(d => d.id));
  const paymentsForCurDeals = payments.filter(p => wonDealIds.has(p.dealId) && p.status === 'Successful');
  const collectedForCurDeals = paymentsForCurDeals.reduce((sum, p) => sum + p.amount, 0);
  const outstandingRevenue = Math.max(0, totalDealValue - collectedForCurDeals);

  // Daily Lead Trend
  const dailyLeadMap = new Map<string, { newLeads: number; qualified: number; converted: number }>();
  // populate all days in range if <= 35 days
  if (window.days <= 35) {
    const d = new Date(start);
    while (d <= end) {
      const key = d.toISOString().slice(0, 10);
      dailyLeadMap.set(key, { newLeads: 0, qualified: 0, converted: 0 });
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }

  curLeads.forEach(l => {
    const key = l.createdAt.slice(0, 10);
    const existing = dailyLeadMap.get(key) || { newLeads: 0, qualified: 0, converted: 0 };
    existing.newLeads += 1;
    if (l.status === 'Qualified') existing.qualified += 1;
    if (l.status === 'Converted') existing.converted += 1;
    dailyLeadMap.set(key, existing);
  });

  const dailyLeadTrend = Array.from(dailyLeadMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([dateStr, data]) => {
      const d = new Date(dateStr);
      const day = d.getUTCDate();
      const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
      return {
        date: `${day} ${month}`,
        fullDate: dateStr,
        ...data
      };
    });

  // Lead Sources
  const sourceColors: Record<string, string> = {
    'Google Ads': '#2563eb', // bright blue
    'Website': '#06b6d4',    // cyan
    'Other': '#8b5cf6',      // violet
    'Just Dial': '#10b981',  // emerald
    'Referral': '#f59e0b'    // amber
  };

  const sourceCounts: Record<string, number> = {
    'Google Ads': 0,
    'Website': 0,
    'Other': 0,
    'Just Dial': 0,
    'Referral': 0
  };

  curLeads.forEach(l => {
    sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
  });

  const leadSources = Object.entries(sourceCounts).map(([name, count]) => ({
    name,
    count,
    percentage: curTotalLeads > 0 ? (count / curTotalLeads) * 100 : 0,
    color: sourceColors[name] || '#94a3b8'
  })).sort((a, b) => b.count - a.count);

  // Quotations Analytics
  const serviceQuoteMap = new Map<string, { count: number; value: number; accepted: number; pending: number; rejected: number }>();
  curQuotes.forEach(q => {
    const srv = q.serviceCategory || 'Other';
    const existing = serviceQuoteMap.get(srv) || { count: 0, value: 0, accepted: 0, pending: 0, rejected: 0 };
    existing.count += 1;
    existing.value += q.quotedAmount;
    if (q.status === 'Accepted') existing.accepted += 1;
    else if (q.status === 'Pending') existing.pending += 1;
    else if (q.status === 'Rejected') existing.rejected += 1;
    serviceQuoteMap.set(srv, existing);
  });

  const serviceWiseQuotations: ServiceQuotationDetail[] = Array.from(serviceQuoteMap.entries()).map(([service, val]) => ({
    service,
    quotations: val.count,
    quotedAmount: val.value,
    accepted: val.accepted,
    pending: val.pending,
    rejected: val.rejected,
    conversionRate: val.count > 0 ? (val.accepted / val.count) * 100 : 0
  })).sort((a, b) => b.quotations - a.quotations);

  const quotationsByService = serviceWiseQuotations.map(s => ({
    service: s.service,
    count: s.quotations,
    value: s.quotedAmount
  }));

  const convertedQuotationsCount = curQuotes.filter(q => q.dealId || q.status === 'Accepted').length;
  const quoteToDealRate = curQuotes.length > 0 ? (convertedQuotationsCount / curQuotes.length) * 100 : 0;

  // Deals & Revenue by Service
  const serviceDealMap = new Map<string, { count: number; revenue: number }>();
  curDeals.forEach(d => {
    const srv = d.serviceCategory || 'General Filing';
    const existing = serviceDealMap.get(srv) || { count: 0, revenue: 0 };
    existing.count += 1;
    if (d.stage === 'Closed Won') {
      existing.revenue += d.dealValue;
    }
    serviceDealMap.set(srv, existing);
  });

  const dealsVsRevenueByService = Array.from(serviceDealMap.entries()).map(([service, v]) => ({
    service,
    dealsCreated: v.count,
    dealRevenue: v.revenue
  })).sort((a, b) => b.dealRevenue - a.dealRevenue);

  const totalCatRevenue = dealsVsRevenueByService.reduce((sum, d) => sum + d.dealRevenue, 0);
  const revenueByCategory = dealsVsRevenueByService.map(d => ({
    category: d.service,
    revenue: d.dealRevenue,
    percentage: totalCatRevenue > 0 ? (d.dealRevenue / totalCatRevenue) * 100 : 0
  }));

  // Priority Breakdown
  const priorityMap: Record<string, { deals: number; revenue: number; color: string }> = {
    'High': { deals: 0, revenue: 0, color: '#ef4444' },
    'Medium': { deals: 0, revenue: 0, color: '#f59e0b' },
    'Low': { deals: 0, revenue: 0, color: '#10b981' }
  };

  curDeals.forEach(d => {
    const prio = d.priority || 'Medium';
    if (priorityMap[prio]) {
      priorityMap[prio].deals += 1;
      if (d.stage === 'Closed Won') {
        priorityMap[prio].revenue += d.dealValue;
      }
    }
  });

  const totalPrioRevenue = Object.values(priorityMap).reduce((s, p) => s + p.revenue, 0);
  const priorityBreakdown = Object.entries(priorityMap).map(([priority, v]) => ({
    priority,
    deals: v.deals,
    revenue: v.revenue,
    percentage: totalPrioRevenue > 0 ? (v.revenue / totalPrioRevenue) * 100 : 0,
    color: v.color
  }));

  // Daily Revenue Trend (Won Revenue vs Collected Revenue)
  const dailyRevMap = new Map<string, { wonRevenue: number; collectedRevenue: number }>();
  if (window.days <= 35) {
    const d = new Date(start);
    while (d <= end) {
      const key = d.toISOString().slice(0, 10);
      dailyRevMap.set(key, { wonRevenue: 0, collectedRevenue: 0 });
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }

  curWonDeals.forEach(d => {
    const key = (d.closedAt || d.createdAt).slice(0, 10);
    const existing = dailyRevMap.get(key) || { wonRevenue: 0, collectedRevenue: 0 };
    existing.wonRevenue += d.dealValue;
    dailyRevMap.set(key, existing);
  });

  curSuccPayments.forEach(p => {
    const key = p.paymentDate.slice(0, 10);
    const existing = dailyRevMap.get(key) || { wonRevenue: 0, collectedRevenue: 0 };
    existing.collectedRevenue += p.amount;
    dailyRevMap.set(key, existing);
  });

  const dailyRevenueTrend = Array.from(dailyRevMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([dateStr, v]) => {
      const d = new Date(dateStr);
      const day = d.getUTCDate();
      const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
      return {
        date: `${day} ${month}`,
        fullDate: dateStr,
        ...v
      };
    });

  // Sales Team Activity
  const salesUsers = ['Nancy Singh', 'Sneha Choudhary', 'Tannu Kumari'];
  const salesTeamActivity: UserSalesActivity[] = salesUsers.map(name => {
    const userLeads = curLeads.filter(l => l.assignedTo === name);
    const qualified = userLeads.filter(l => l.status === 'Qualified').length;
    const converted = userLeads.filter(l => l.status === 'Converted').length;
    const convRate = userLeads.length > 0 ? (converted / userLeads.length) * 100 : 0;
    const userQuotes = curQuotes.filter(q => q.createdBy === name);
    const userDeals = curDeals.filter(d => d.owner === name);
    const dealValue = userDeals.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + d.dealValue, 0);
    const userWonIds = new Set(userDeals.filter(d => d.stage === 'Closed Won').map(d => d.id));
    const userRev = curSuccPayments.filter(p => userWonIds.has(p.dealId)).reduce((s, p) => s + p.amount, 0);

    return {
      user: name,
      avatar: name.charAt(0),
      leadsHandled: userLeads.length,
      qualified,
      converted,
      conversionRate: convRate,
      quotations: userQuotes.length,
      deals: userDeals.length,
      dealValue,
      revenue: userRev || (dealValue * 0.8)
    };
  });

  // Operations Team Activity
  const opsUsers = ['Gaurav Pant', 'Srishti Upadhyay', 'Azam Afaroz'];
  const opsTeamActivity: UserOpsActivity[] = opsUsers.map(name => {
    const userOrders = curOrders.filter(o => o.opsOwner === name);
    const stagesCompleted = userOrders.reduce((s, o) => s + o.completedStages, 0);
    const pendingStages = userOrders.reduce((s, o) => s + (o.totalStages - o.completedStages), 0);
    const overdue = userOrders.filter(o => o.status !== 'Completed' && new Date(o.dueDate) < new Date(DEMO_DATE_STR)).length;

    return {
      user: name,
      avatar: name.charAt(0),
      ordersUpdated: userOrders.length,
      stagesCompleted,
      pendingStages,
      overdueOrders: overdue
    };
  });

  // Orders & Stage Progress by Service
  const orderSrvMap = new Map<string, { pending: number; inProgress: number; completed: number; onHold: number }>();
  curOrders.forEach(o => {
    const srv = o.serviceCategory || 'General';
    const existing = orderSrvMap.get(srv) || { pending: 0, inProgress: 0, completed: 0, onHold: 0 };
    if (o.status === 'Pending') existing.pending += 1;
    else if (o.status === 'In Progress') existing.inProgress += 1;
    else if (o.status === 'Completed') existing.completed += 1;
    else if (o.status === 'On Hold') existing.onHold += 1;
    orderSrvMap.set(srv, existing);
  });

  const ordersAndStageProgress = Array.from(orderSrvMap.entries()).map(([service, v]) => ({
    service,
    pending: v.pending,
    inProgress: v.inProgress,
    completed: v.completed,
    onHold: v.onHold,
    total: v.pending + v.inProgress + v.completed + v.onHold
  })).sort((a, b) => b.total - a.total);

  return {
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
    funnel: {
      totalLeads: curTotalLeads,
      qualifiedLeads: curQualified,
      convertedLeads: curConverted,
      unqualifiedLeads: curUnqualified
    },
    dailyLeadTrend,
    leadSources,
    quotationsByService,
    serviceWiseQuotations,
    quoteToDealRate,
    totalQuotationsCount: curQuotes.length,
    convertedQuotationsCount,
    dealsVsRevenueByService,
    revenueByCategory,
    priorityBreakdown,
    dailyRevenueTrend,
    totalDealValue,
    netCollectedRevenue,
    outstandingRevenue,
    salesTeamActivity,
    opsTeamActivity,
    ordersAndStageProgress,
    filteredLeads: curLeads,
    filteredQuotations: curQuotes,
    filteredDeals: curDeals,
    filteredOrders: curOrders,
    filteredPayments: curPayments
  };
}
