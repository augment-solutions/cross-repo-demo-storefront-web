import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

// Polymorphic component types
export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithoutRef<C>['ref'];

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// Orientation type
export type Orientation = 'horizontal' | 'vertical';

// Direction type
export type Direction = 'ltr' | 'rtl';

// Alignment types
export type Alignment = 'start' | 'center' | 'end';
export type Side = 'top' | 'right' | 'bottom' | 'left';

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Data fetch state
export interface DataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Pagination
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Sort
export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

// Table column definition
export interface ColumnDef<T> {
  id: string;
  header: ReactNode;
  accessor: keyof T | ((row: T) => ReactNode);
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

// Form field
export interface FormFieldState {
  value: unknown;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

