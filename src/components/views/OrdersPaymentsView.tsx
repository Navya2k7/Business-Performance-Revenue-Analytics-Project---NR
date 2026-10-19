import React, { useState } from 'react';
import { Search, Download, ArrowUpDown, ChevronRight, PackageCheck, CreditCard, Clock, CheckCircle2 } from 'lucide-react';
import { Order, Payment } from '../../types';
import { formatDate, formatINR } from '../../utils/formatters';
import { exportToCSV } from '../../utils/exportCsv';
import { SelectedEntity } from '../common/EntityDrawer';

interface OrdersPaymentsViewProps {
  orders: Order[];
  payments: Payment[];
  onSelectEntity: (entity: SelectedEntity) => void;
}

export const OrdersPaymentsView: React.FC<OrdersPaymentsViewProps> = ({
  orders,
  payments,
  onSelectEntity
}) => {
  const [subTab, setSubTab] = useState<'orders' | 'payments'>('orders');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.clientName.toLowerCase().includes(search.toLowerCase()) ||
      o.serviceCategory.toLowerCase().includes(search.toLowerCase()) ||
      o.currentStage.toLowerCase().includes(search.toLowerCase()) ||
      o.opsOwner.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered Payments
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase()) ||
      p.dealId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportOrders = () => {
    exportToCSV(filteredOrders, 'Orders_Operations_Export');
  };

  const handleExportPayments = () => {
    exportToCSV(filteredPayments, 'Payments_Invoices_Export');
  };

  const getOrderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Completed</span>;
      case 'In Progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">In Progress</span>;
      case 'On Hold':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">On Hold</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Pending</span>;
    }
  };

  const getPaymentStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'Successful':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Successful</span>;
      case 'Pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Pending</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Failed</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Sub Tabs: Orders vs Payments */}
      <div className="flex border-b border-slate-200 space-x-6 pb-2">
        <button
          onClick={() => {
            setSubTab('orders');
            setStatusFilter('all');
          }}
          className={`text-sm font-bold pb-2 flex items-center space-x-2 border-b-2 transition-colors ${
            subTab === 'orders'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>Orders & Operations ({orders.length})</span>
        </button>

        <button
          onClick={() => {
            setSubTab('payments');
            setStatusFilter('all');
          }}
          className={`text-sm font-bold pb-2 flex items-center space-x-2 border-b-2 transition-colors ${
            subTab === 'payments'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payments & Invoices ({payments.length})</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center space-x-2 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={
                subTab === 'orders'
                  ? 'Search orders by ID (e.g. O-2168), client, stage, owner...'
                  : 'Search payments by ID (e.g. P-1081), invoice, client, method...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-hidden"
            />
          </div>

          {subTab === 'orders' ? (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
            >
              <option value="all">All Order Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="On Hold">On Hold</option>
            </select>
          ) : (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 outline-hidden"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Successful">Successful</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          )}
        </div>

        <button
          onClick={subTab === 'orders' ? handleExportOrders : handleExportPayments}
          className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
          Export CSV ({subTab === 'orders' ? filteredOrders.length : filteredPayments.length})
        </button>
      </div>

      {/* Orders Table */}
      {subTab === 'orders' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Client & Service</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Ops Owner</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No orders found matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => onSelectEntity({ type: 'order', data: order })}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-amber-600">#{order.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{order.clientName}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{order.serviceCategory}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-800 font-medium">{order.currentStage}</td>
                      <td className="py-3 px-4 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-slate-700">{order.progressPercent}%</span>
                          <span className="text-slate-400">
                            {order.completedStages}/{order.totalStages} stages
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              order.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${order.progressPercent}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{getOrderStatusBadge(order.status)}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{order.opsOwner}</td>
                      <td className="py-3 px-4 text-slate-500">{formatDate(order.dueDate)}</td>
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
      )}

      {/* Payments Table */}
      {subTab === 'payments' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Invoice Number</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No payments found matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      onClick={() => onSelectEntity({ type: 'payment', data: payment })}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">#{payment.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{payment.invoiceNumber}</td>
                      <td className="py-3 px-4 text-slate-700">{payment.clientName}</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-700">
                        {formatINR(payment.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {payment.method}
                        </span>
                      </td>
                      <td className="py-3 px-4">{getPaymentStatusBadge(payment.status)}</td>
                      <td className="py-3 px-4 text-slate-500">{formatDate(payment.paymentDate)}</td>
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
      )}
    </div>
  );
};
