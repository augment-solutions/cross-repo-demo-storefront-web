import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'success' | 'warning';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export interface InputBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseProps {
  label?: string;
  error?: string;
  hint?: string;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isRequired?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectBaseProps extends BaseProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  size?: Size;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export interface ModalBaseProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface ToastBaseProps extends BaseProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export interface BadgeBaseProps extends BaseProps {
  variant?: ColorScheme;
  size?: 'sm' | 'md' | 'lg';
}

export interface SkeletonBaseProps extends BaseProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export interface SpinnerBaseProps extends BaseProps {
  size?: Size;
  color?: ColorScheme;
}

export interface AvatarBaseProps extends BaseProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size;
  fallback?: ReactNode;
}

export interface CheckboxBaseProps extends BaseProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export interface RadioGroupBaseProps extends BaseProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
}

export interface SwitchBaseProps extends BaseProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ProgressBaseProps extends BaseProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: ColorScheme;
  showValue?: boolean;
}

export interface SliderBaseProps extends BaseProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  isDisabled?: boolean;
}

