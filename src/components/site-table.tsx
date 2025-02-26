'use client';

import { RefreshCw } from 'lucide-react';
import React, { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type SiteTableColumn<T> = {
  key?: string;
  title: string | React.ReactNode;
  render?: (item: T) => React.ReactNode | string;
  classNameTitle?: string;
  classNameData?: string;
  noWrap?: boolean;
  width?: string;
};

export type SiteTableSelection<T> = {
  selected: T[];
  onSelectionChange: (items: T[]) => void;
};

export type SiteTableProps<T> = {
  title: string;
  data: T[];
  rowKey: keyof T;
  columns: SiteTableColumn<T>[];
  className?: string;
  loading?: boolean;
  fetching?: boolean;
  error?: any;
  description?: string;
  noDataTemplate?: React.ReactNode;
  onRefresh?: () => void;
  onRowClick?: (item: T) => void;
  selection?: SiteTableSelection<T>;
  skeletonRowClass?: string;
  emptyStateAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  errorActions?: {
    primary?: {
      label: string;
      onClick: () => void;
    };
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
  ref?: React.RefObject<HTMLTableElement>;
};

export default function SiteTable<T>(props: SiteTableProps<T>) {
  const {
    data,
    columns,
    loading,
    fetching,
    error,
    description,
    noDataTemplate,
    onRefresh,
    onRowClick,
    selection,
    emptyStateAction,
    skeletonRowClass,
    errorActions,
    rowKey,
    title,
    ref,
  } = props;

  // Handle row selection
  const handleRowSelection = React.useCallback(
    (item: any, checked: boolean) => {
      if (!selection) return;

      const newSelected = checked
        ? [...selection.selected, item]
        : selection.selected.filter(
            (selectedItem) => selectedItem[rowKey] !== item[rowKey]
          );

      selection.onSelectionChange(newSelected);
    },
    [selection, rowKey]
  );

  // Handle select all
  const handleSelectAll = React.useCallback(
    (checked: boolean) => {
      if (!selection) return;
      selection.onSelectionChange(checked ? [...data] : []);
    },
    [selection, data]
  );

  // Check if a row is selected
  const isSelected = React.useCallback(
    (item: any) => {
      if (!selection) return false;
      return selection.selected.some(
        (selectedItem) => selectedItem[rowKey] === item[rowKey]
      );
    },
    [selection, rowKey]
  );

  // Memoize row rendering function
  const renderRow = React.useCallback(
    (item: any, rowIndex: number) => {
      return (
        <TableRow
          key={item[rowKey]}
          className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
          onClick={(e) => {
            // Prevent row click when clicking checkbox
            if ((e.target as HTMLElement).closest('[data-selection-checkbox]'))
              return;
            onRowClick?.(item);
          }}
        >
          {selection && (
            <TableCell className="w-[40px]">
              <Checkbox
                data-selection-checkbox
                checked={isSelected(item)}
                onCheckedChange={(checked) =>
                  handleRowSelection(item, checked as boolean)
                }
              />
            </TableCell>
          )}
          {columns.map((column, colIndex) => (
            <TableCell
              key={`${rowIndex}-${colIndex}`}
              className={`${column.width || ''} ${column.classNameData || ''} ${column.noWrap ? 'whitespace-nowrap' : ''}`}
            >
              {column.render
                ? column.render(item)
                : String(item[column.key as keyof any])}
            </TableCell>
          ))}
        </TableRow>
      );
    },
    [columns, onRowClick, selection, isSelected, handleRowSelection, rowKey]
  );

  // Memoize skeleton rows
  const skeletonRows = React.useMemo(
    () =>
      [...Array(3)].map((_, rowIndex) => (
        <TableRow
          key={`skeleton-${rowIndex}`}
          className={skeletonRowClass || 'h-9'}
        >
          {selection && (
            <TableCell className="w-[40px]">
              <div className="size-4 animate-pulse rounded bg-muted" />
            </TableCell>
          )}
          {columns.map((column, colIndex) => (
            <TableCell
              key={`skeleton-cell-${rowIndex}-${colIndex}`}
              className={`${column.width || ''} ${column.noWrap ? 'whitespace-nowrap' : ''}`}
            >
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </TableCell>
          ))}
        </TableRow>
      )),
    [columns, selection, skeletonRowClass]
  );

  const allSelected = React.useMemo(() => {
    if (!selection || !data.length) return false;
    return selection.selected.length === data.length;
  }, [selection, data]);

  return (
    <Table ref={ref} className="dark:bg-accent/10">
      <TableHeader className="relative dark:bg-accent/30">
        <TableRow>
          {selection && (
            <TableHead className="w-[40px]">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all rows"
              />
            </TableHead>
          )}
          {columns.map((column, index) => (
            <TableHead
              key={column.key || index}
              className={`${column.width || ''} ${column.classNameTitle || ''} ${column.noWrap ? 'whitespace-nowrap' : ''}`}
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
        {fetching && (
          <TableRow className="absolute bottom-0 left-0 h-[3px] w-full overflow-hidden">
            <TableCell className="animate-loading-line absolute h-full w-1/3 bg-primary" />
          </TableRow>
        )}
      </TableHeader>
      <TableBody className="relative">
        {loading ? (
          skeletonRows
        ) : (
          <>
            {error ? (
              <TableRow>
                <TableCell
                  colSpan={selection ? columns.length + 1 : columns.length}
                  className="h-36"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <div className="text-center">
                      <h3 className="mb-1 text-lg font-medium">
                        Unable to load data
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        There was an error loading the {title}. This could be
                        due to a network issue or server problem.
                      </p>
                    </div>
                    {(onRefresh || errorActions) && (
                      <div className="flex gap-3">
                        {errorActions?.secondary ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={errorActions.secondary.onClick}
                          >
                            <RefreshCw className="mr-2 size-4" />{' '}
                            {errorActions.secondary.label}
                          </Button>
                        ) : (
                          onRefresh && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.location.reload()}
                            >
                              <RefreshCw className="mr-2 size-4" /> Reload page
                            </Button>
                          )
                        )}
                        {errorActions?.primary ? (
                          <Button
                            size="sm"
                            onClick={errorActions.primary.onClick}
                          >
                            <RefreshCw className="mr-2 size-4" />{' '}
                            {errorActions.primary.label}
                          </Button>
                        ) : (
                          onRefresh && (
                            <Button size="sm" onClick={onRefresh}>
                              <RefreshCw className="mr-2 size-4" /> Try again
                            </Button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={selection ? columns.length + 1 : columns.length}
                  className="h-36"
                >
                  {noDataTemplate || (
                    <div className="flex h-full flex-col items-center justify-center gap-3">
                      <div className="text-center">
                        <h3 className="mb-1 text-lg font-medium">
                          No {title} Available
                        </h3>
                        {description && (
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        )}
                      </div>
                      {emptyStateAction && (
                        <Button size="sm" onClick={emptyStateAction.onClick}>
                          {emptyStateAction.icon && (
                            <span className="mr-2">
                              {emptyStateAction.icon}
                            </span>
                          )}
                          {emptyStateAction.label}
                        </Button>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
}
