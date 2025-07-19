import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Roles } from '../../types/auth';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  width?: string;
  sortable?: boolean;
  sortKey?: keyof T; // For custom accessor functions, specify which field to sort by
}

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  emptyMessage?: string;
}

const Table = <T,>({
  columns,
  data,
  className = '',
  rowClassName = '',
  headerClassName = '',
  cellClassName = '',
  emptyMessage = 'No data available',
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  // Function to get the sort key for a column
  const getSortKey = (column: Column<T>): keyof T | null => {
    if (column.sortKey) {
      return column.sortKey;
    }
    if (typeof column.accessor === 'string') {
      return column.accessor;
    }
    return null;
  };

  // Function to handle sorting
  const handleSort = (column: Column<T>) => {
    if (column.sortable === false) return;

    const sortKey = getSortKey(column);
    if (!sortKey) return;

    let direction: SortDirection = 'asc';

    if (sortConfig && sortConfig.key === sortKey) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      } else {
        direction = 'asc';
      }
    }

    setSortConfig(direction ? { key: sortKey, direction } : null);
  };

  // Function to get sort value from an item
  const getSortValue = (item: T, key: keyof T): any => {
    const value = item[key];

    // Handle different data types for sorting
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    if (typeof value === 'number') {
      return value;
    }
    if (value instanceof Date) {
      return value.getTime();
    }
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }

    // For other types, convert to string
    return String(value).toLowerCase();
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = getSortValue(a, sortConfig.key);
      const bValue = getSortValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Function to render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (column.sortable === false) return null;

    const sortKey = getSortKey(column);
    if (!sortKey) return null;

    const isCurrentSort = sortConfig?.key === sortKey;
    const direction = isCurrentSort ? sortConfig?.direction : null;

    if (direction === 'asc') {
      return <ChevronUp className="h-4 w-4 text-blue-600" />;
    } else if (direction === 'desc') {
      return <ChevronDown className="h-4 w-4 text-blue-600" />;
    } else {
      return (
        <ChevronsUpDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      );
    }
  };

  if (!sortedData?.length) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  // Create grid template columns based on the number of columns
  const gridTemplateColumns = columns
    .map(col => col.width || 'minmax(0, 1fr)')
    .join(' ');

  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="min-w-full">
        {/* Header */}
        <div
          className={`grid py-3 px-4 bg-[#DFDFDF] ${headerClassName}`}
          style={{ gridTemplateColumns }}
        >
          {columns.map((column, index) => {
            const sortKey = getSortKey(column);
            const isSortable = column.sortable !== false && sortKey;
            return (
              <div
                key={index}
                className={`font-semibold text-sm text-gray-700 ${column.className || ''} ${
                  isSortable ? 'cursor-pointer select-none group' : ''
                }`}
                onClick={() => isSortable && handleSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span
                    className={isSortable ? 'group-hover:text-gray-900' : ''}
                  >
                    {column.header}
                  </span>
                  {renderSortIcon(column)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-200 bg-white">
          {sortedData.map((item, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid py-4 px-4 items-center hover:bg-gray-50 ${rowClassName}`}
              style={{ gridTemplateColumns }}
            >
              {columns.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className={`text-sm ${cellClassName} ${column.className || ''}`}
                >
                  {typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : String(item[column.accessor])}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
