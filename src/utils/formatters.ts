/**
 * Utility formatters for Indian Rupee currency, dates, percentages, and status tags.
 */

export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  
  if (compact) {
    const abs = Math.abs(amount);
    if (abs >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    if (abs >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    if (abs >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function formatPercentage(value: number | null | undefined, isRateMetric: boolean = false): {
  text: string;
  isPositive: boolean;
  isZero: boolean;
} {
  if (value === null || value === undefined || isNaN(value)) {
    return { text: '—', isPositive: true, isZero: true };
  }

  const sign = value > 0 ? '+' : '';
  const unit = isRateMetric ? ' pp' : '%';
  const text = `${sign}${value.toFixed(1)}${unit}`;
  
  return {
    text,
    isPositive: value >= 0,
    isZero: Math.abs(value) < 0.05
  };
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  });
}

export function formatActivityTimestamp(dateString: string): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  const pad = (n: number) => String(n).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${ms}Z`;
}
