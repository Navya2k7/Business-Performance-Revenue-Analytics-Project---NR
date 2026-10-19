import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricComparison } from '../../types';
import { formatPercentage } from '../../utils/formatters';

interface KpiCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  subLabel?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  comparison?: MetricComparison;
  comparisonLabel?: string;
  onClick?: () => void;
  tooltipText?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subValue,
  subLabel,
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
  comparison,
  comparisonLabel = 'vs. previous period',
  onClick,
  tooltipText
}) => {
  const trend = comparison ? formatPercentage(comparison.percentChange, comparison.isRateMetric) : null;

  return (
    <div
      onClick={onClick}
      title={tooltipText}
      className={`bg-white rounded-xl p-4 border border-slate-200 shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-blue-400 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgColor}`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <span className="text-xs font-semibold text-slate-600 tracking-tight">{title}</span>
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
          {value}
        </div>
        {subValue && (
          <div className="text-right">
            <span className="text-xs font-bold text-slate-800">{subValue}</span>
            {subLabel && <span className="block text-[10px] text-slate-500">{subLabel}</span>}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-2.5 flex items-center text-[11px] font-medium">
          {trend.isZero ? (
            <span className="text-slate-500 flex items-center">
              <Minus className="w-3 h-3 mr-0.5" /> 0.0%
            </span>
          ) : trend.isPositive ? (
            <span className="text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> {trend.text}
            </span>
          ) : (
            <span className="text-rose-500 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> {trend.text}
            </span>
          )}
          <span className="text-slate-500 ml-1 truncate">{comparisonLabel}</span>
        </div>
      )}
    </div>
  );
};
