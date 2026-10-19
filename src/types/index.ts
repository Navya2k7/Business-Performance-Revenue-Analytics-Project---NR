export type LeadSource = 'Google Ads' | 'Website' | 'Just Dial' | 'Referral' | 'Other';

export type LeadStatus = 'New' | 'Qualified' | 'Converted' | 'Unqualified';

export interface Lead {
  id: string; // e.g. "L-209610"
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  unqualifiedReason?: string;
  assignedTo: string;
  department: string;
  serviceInterest: string;
  createdAt: string; // ISO format
  updatedAt: string;
}

export type QuotationStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Expired';

export interface Quotation {
  id: string; // e.g. "Q-10467"
  leadId: string;
  leadName: string;
  dealId?: string;
  serviceCategory: string;
  quotedAmount: number;
  status: QuotationStatus;
  createdAt: string;
  validUntil: string;
  createdBy: string;
}

export type DealStage = 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type DealPriority = 'High' | 'Medium' | 'Low';

export interface Deal {
  id: string; // e.g. "D-822"
  leadId: string;
  leadName: string;
  quotationId?: string;
  title: string;
  serviceCategory: string;
  dealValue: number;
  stage: DealStage;
  priority: DealPriority;
  owner: string;
  department: string;
  createdAt: string;
  closedAt?: string; // used for won revenue calculation when Closed Won
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'On Hold';

export interface Order {
  id: string; // e.g. "O-2168"
  dealId: string;
  leadId: string;
  clientName: string;
  serviceCategory: string;
  status: OrderStatus;
  progressPercent: number; // 0-100
  currentStage: string;
  totalStages: number;
  completedStages: number;
  opsOwner: string;
  createdAt: string;
  dueDate: string;
  completedAt?: string;
}

export type PaymentMethod = 'NEFT/RTGS' | 'UPI' | 'Credit Card' | 'Net Banking';
export type PaymentStatus = 'Successful' | 'Pending' | 'Failed';

export interface Payment {
  id: string; // e.g. "P-1081"
  dealId: string;
  orderId?: string;
  leadId: string;
  clientName: string;
  invoiceNumber: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paymentDate: string; // collection date
  notes?: string;
}

export type DatePreset = 'today' | '7d' | '30d' | 'custom';

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface FilterState {
  datePreset: DatePreset;
  customRange: DateRange;
  selectedUser: string;
  selectedDept: string;
  searchQuery: string;
}

export interface MetricComparison {
  current: number;
  previous: number;
  diff: number;
  percentChange: number | null; // null if previous === 0
  isRateMetric?: boolean;
}

export interface ServiceQuotationDetail {
  service: string;
  quotations: number;
  quotedAmount: number;
  accepted: number;
  pending: number;
  rejected: number;
  conversionRate: number; // percentage
}

export interface UserSalesActivity {
  user: string;
  avatar: string;
  leadsHandled: number;
  qualified: number;
  converted: number;
  conversionRate: number;
  quotations: number;
  deals: number;
  dealValue: number;
  revenue: number;
}

export interface UserOpsActivity {
  user: string;
  avatar: string;
  ordersUpdated: number;
  stagesCompleted: number;
  pendingStages: number;
  overdueOrders: number;
}

export interface ActivityEvent {
  id: string;
  time: string;
  employee: string;
  action: 'Lead updated' | 'Lead created' | 'Quotation created' | 'Quotation accepted' | 'Deal created' | 'Deal won' | 'Order created' | 'Order stage updated' | 'Payment recorded';
  recordType: 'lead' | 'quotation' | 'deal' | 'order' | 'payment';
  recordId: string;
  details?: string;
}
