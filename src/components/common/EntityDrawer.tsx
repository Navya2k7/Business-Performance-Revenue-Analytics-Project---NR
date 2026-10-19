import React from 'react';
import { X, ArrowRight, CheckCircle2, Clock, FileText, Briefcase, ShoppingBag, CreditCard, User, ExternalLink, Calendar, Phone, Mail, Building } from 'lucide-react';
import { Lead, Quotation, Deal, Order, Payment } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';

export type SelectedEntity = 
  | { type: 'lead'; data: Lead }
  | { type: 'quotation'; data: Quotation }
  | { type: 'deal'; data: Deal }
  | { type: 'order'; data: Order }
  | { type: 'payment'; data: Payment };

interface EntityDrawerProps {
  selected: SelectedEntity | null;
  onClose: () => void;
  onSelectEntity: (entity: SelectedEntity) => void;
  allLeads: Lead[];
  allQuotations: Quotation[];
  allDeals: Deal[];
  allOrders: Order[];
  allPayments: Payment[];
}

export const EntityDrawer: React.FC<EntityDrawerProps> = ({
  selected,
  onClose,
  onSelectEntity,
  allLeads,
  allQuotations,
  allDeals,
  allOrders,
  allPayments
}) => {
  if (!selected) return null;

  // Resolve connected records
  let rootLead: Lead | undefined;
  let linkedQuotes: Quotation[] = [];
  let linkedDeals: Deal[] = [];
  let linkedOrders: Order[] = [];
  let linkedPayments: Payment[] = [];

  if (selected.type === 'lead') {
    rootLead = selected.data;
    linkedQuotes = allQuotations.filter(q => q.leadId === rootLead?.id);
    linkedDeals = allDeals.filter(d => d.leadId === rootLead?.id);
    const dealIds = new Set(linkedDeals.map(d => d.id));
    linkedOrders = allOrders.filter(o => dealIds.has(o.dealId) || o.leadId === rootLead?.id);
    linkedPayments = allPayments.filter(p => dealIds.has(p.dealId) || p.leadId === rootLead?.id);
  } else if (selected.type === 'quotation') {
    rootLead = allLeads.find(l => l.id === selected.data.leadId);
    linkedQuotes = [selected.data];
    if (selected.data.dealId) {
      linkedDeals = allDeals.filter(d => d.id === selected.data.dealId);
      const dealIds = new Set(linkedDeals.map(d => d.id));
      linkedOrders = allOrders.filter(o => dealIds.has(o.dealId));
      linkedPayments = allPayments.filter(p => dealIds.has(p.dealId));
    }
  } else if (selected.type === 'deal') {
    rootLead = allLeads.find(l => l.id === selected.data.leadId);
    linkedQuotes = allQuotations.filter(q => q.id === selected.data.quotationId || q.dealId === selected.data.id);
    linkedDeals = [selected.data];
    linkedOrders = allOrders.filter(o => o.dealId === selected.data.id);
    linkedPayments = allPayments.filter(p => p.dealId === selected.data.id);
  } else if (selected.type === 'order') {
    const parentDeal = allDeals.find(d => d.id === selected.data.dealId);
    if (parentDeal) {
      rootLead = allLeads.find(l => l.id === parentDeal.leadId);
      linkedDeals = [parentDeal];
      linkedQuotes = allQuotations.filter(q => q.id === parentDeal.quotationId);
    }
    linkedOrders = [selected.data];
    linkedPayments = allPayments.filter(p => p.orderId === selected.data.id || (parentDeal && p.dealId === parentDeal.id));
  } else if (selected.type === 'payment') {
    const parentDeal = allDeals.find(d => d.id === selected.data.dealId);
    if (parentDeal) {
      rootLead = allLeads.find(l => l.id === parentDeal.leadId);
      linkedDeals = [parentDeal];
    }
    if (selected.data.orderId) {
      linkedOrders = allOrders.filter(o => o.id === selected.data.orderId);
    }
    linkedPayments = [selected.data];
  }

  const renderBadge = (status: string) => {
    switch (status) {
      case 'Qualified':
      case 'Accepted':
      case 'Closed Won':
      case 'Completed':
      case 'Successful':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">{status}</span>;
      case 'In Progress':
      case 'Pending':
      case 'Negotiation':
      case 'Proposal':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">{status}</span>;
      case 'Unqualified':
      case 'Rejected':
      case 'Closed Lost':
      case 'Failed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">{status}</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs uppercase font-bold tracking-wider">
              {selected.type}
            </span>
            <h2 className="text-lg font-bold truncate">
              {selected.type === 'lead' && (selected.data as Lead).clientName}
              {selected.type === 'quotation' && `Quotation ${(selected.data as Quotation).id}`}
              {selected.type === 'deal' && (selected.data as Deal).title}
              {selected.type === 'order' && `Order ${(selected.data as Order).id}`}
              {selected.type === 'payment' && `Payment ${(selected.data as Payment).id}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Relational Breadcrumb Trail */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center space-x-2 text-xs overflow-x-auto text-slate-600">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Relational Trail:</span>
          {rootLead && (
            <button
              onClick={() => onSelectEntity({ type: 'lead', data: rootLead! })}
              className={`font-semibold hover:underline flex items-center ${selected.type === 'lead' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
            >
              #{rootLead.id}
            </button>
          )}
          {linkedQuotes.length > 0 && (
            <>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onSelectEntity({ type: 'quotation', data: linkedQuotes[0] })}
                className={`hover:underline flex items-center ${selected.type === 'quotation' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                #{linkedQuotes[0].id}
              </button>
            </>
          )}
          {linkedDeals.length > 0 && (
            <>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onSelectEntity({ type: 'deal', data: linkedDeals[0] })}
                className={`hover:underline flex items-center ${selected.type === 'deal' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                #{linkedDeals[0].id}
              </button>
            </>
          )}
          {linkedOrders.length > 0 && (
            <>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onSelectEntity({ type: 'order', data: linkedOrders[0] })}
                className={`hover:underline flex items-center ${selected.type === 'order' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                #{linkedOrders[0].id}
              </button>
            </>
          )}
          {linkedPayments.length > 0 && (
            <>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => onSelectEntity({ type: 'payment', data: linkedPayments[0] })}
                className={`hover:underline flex items-center ${selected.type === 'payment' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                #{linkedPayments[0].id}
              </button>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Entity Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-slate-500 font-mono">ID: {selected.data.id}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {'clientName' in selected.data && selected.data.clientName}
                  {'title' in selected.data && selected.data.title}
                  {'quotedAmount' in selected.data && `Quotation for ${(selected.data as Quotation).serviceCategory}`}
                  {'invoiceNumber' in selected.data && (selected.data as Payment).invoiceNumber}
                </h3>
                {'companyName' in selected.data && (
                  <p className="text-sm text-slate-600 flex items-center mt-1">
                    <Building className="w-4 h-4 mr-1.5 text-slate-400" />
                    {(selected.data as Lead).companyName}
                  </p>
                )}
              </div>
              <div>{renderBadge('status' in selected.data ? (selected.data as any).status : (selected.data as Deal).stage)}</div>
            </div>

            {/* Quick Grid Properties */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              {'quotedAmount' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Quoted Amount</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {formatINR((selected.data as Quotation).quotedAmount)}
                  </span>
                </div>
              )}
              {'dealValue' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Deal Value</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {formatINR((selected.data as Deal).dealValue)}
                  </span>
                </div>
              )}
              {'amount' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Paid Amount</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {formatINR((selected.data as Payment).amount)}
                  </span>
                </div>
              )}
              {'priority' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Deal Priority</span>
                  <span className="font-semibold text-slate-900">{(selected.data as Deal).priority}</span>
                </div>
              )}
              {'progressPercent' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Progress</span>
                  <span className="font-semibold text-blue-600">{(selected.data as Order).progressPercent}%</span>
                </div>
              )}
              {'source' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Lead Source</span>
                  <span className="font-semibold text-slate-900">{(selected.data as Lead).source}</span>
                </div>
              )}
              {'assignedTo' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Sales Owner</span>
                  <span className="font-semibold text-slate-900">{(selected.data as Lead).assignedTo}</span>
                </div>
              )}
              {'opsOwner' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Operations Owner</span>
                  <span className="font-semibold text-slate-900">{(selected.data as Order).opsOwner}</span>
                </div>
              )}
              {'owner' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Deal Owner</span>
                  <span className="font-semibold text-slate-900">{(selected.data as Deal).owner}</span>
                </div>
              )}
              {'createdAt' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Created Date</span>
                  <span className="text-slate-700">{formatDate((selected.data as any).createdAt)}</span>
                </div>
              )}
              {'paymentDate' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Payment Date</span>
                  <span className="text-slate-700">{formatDate((selected.data as Payment).paymentDate)}</span>
                </div>
              )}
              {'method' in selected.data && (
                <div>
                  <span className="text-slate-500 block">Payment Method</span>
                  <span className="font-medium text-slate-800">{(selected.data as Payment).method}</span>
                </div>
              )}
            </div>

            {'email' in selected.data && (
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                <span className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {(selected.data as Lead).email}
                </span>
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {(selected.data as Lead).phone}
                </span>
              </div>
            )}
          </div>

          {/* Relational Tabs / Lists */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Connected CRM Records</h4>

            {/* Linked Quotations */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                  Quotations ({linkedQuotes.length})
                </span>
              </div>
              {linkedQuotes.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No quotations linked to this record.</p>
              ) : (
                <div className="space-y-2">
                  {linkedQuotes.map(q => (
                    <div
                      key={q.id}
                      onClick={() => onSelectEntity({ type: 'quotation', data: q })}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-xs transition-all text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">#{q.id}</span>
                          <span className="font-medium text-slate-800">{q.serviceCategory}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{formatDate(q.createdAt)} · By {q.createdBy}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 block">{formatINR(q.quotedAmount)}</span>
                        {renderBadge(q.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Deals */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  <Briefcase className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                  Deals ({linkedDeals.length})
                </span>
              </div>
              {linkedDeals.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No deals generated yet.</p>
              ) : (
                <div className="space-y-2">
                  {linkedDeals.map(d => (
                    <div
                      key={d.id}
                      onClick={() => onSelectEntity({ type: 'deal', data: d })}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:border-indigo-400 hover:shadow-xs transition-all text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-indigo-600">#{d.id}</span>
                          <span className="font-medium text-slate-800">{d.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{d.serviceCategory} · Owner: {d.owner}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-700 block">{formatINR(d.dealValue)}</span>
                        {renderBadge(d.stage)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Orders */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  Orders & Operations ({linkedOrders.length})
                </span>
              </div>
              {linkedOrders.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No operations orders created.</p>
              ) : (
                <div className="space-y-2">
                  {linkedOrders.map(o => (
                    <div
                      key={o.id}
                      onClick={() => onSelectEntity({ type: 'order', data: o })}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:border-amber-400 hover:shadow-xs transition-all text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-amber-600">#{o.id}</span>
                          <span className="font-medium text-slate-800">{o.currentStage}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">Ops: {o.opsOwner} · Due: {formatDate(o.dueDate)}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-blue-600 block">{o.progressPercent}%</span>
                        {renderBadge(o.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Payments & Invoices */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  <CreditCard className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Payments & Invoices ({linkedPayments.length})
                </span>
              </div>
              {linkedPayments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No payments recorded.</p>
              ) : (
                <div className="space-y-2">
                  {linkedPayments.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onSelectEntity({ type: 'payment', data: p })}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:border-emerald-400 hover:shadow-xs transition-all text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-emerald-600">#{p.id}</span>
                          <span className="font-medium text-slate-800">{p.invoiceNumber}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{p.method} · {formatDate(p.paymentDate)}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 block">{formatINR(p.amount)}</span>
                        {renderBadge(p.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Demo Data Context: All connected records resolved from internal state.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
