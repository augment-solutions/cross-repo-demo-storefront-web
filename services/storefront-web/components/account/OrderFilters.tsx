'use client';

import { useState } from 'react';

interface OrderFiltersProps {
  onFilterChange?: (filters: { status?: string; dateRange?: string }) => void;
}

export function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onFilterChange?.({ status: newStatus, dateRange });
  };

  const handleDateRangeChange = (newRange: string) => {
    setDateRange(newRange);
    onFilterChange?.({ status, dateRange: newRange });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
        <select
          value={dateRange}
          onChange={(e) => handleDateRangeChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Time</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="1y">Last Year</option>
        </select>
      </div>
    </div>
  );
}

export default OrderFilters;

