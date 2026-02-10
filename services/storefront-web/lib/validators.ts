import { z } from 'zod';

export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits');

export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code');

export const creditCardSchema = z
  .string()
  .regex(/^\d{13,19}$/, 'Please enter a valid card number');

export const expiryDateSchema = z
  .string()
  .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry date (MM/YY)');

export const cvvSchema = z
  .string()
  .regex(/^\d{3,4}$/, 'Please enter a valid CVV');

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: emailSchema,
  phone: phoneSchema,
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: zipCodeSchema,
  country: z.string().min(1, 'Country is required'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Review must be at least 10 characters'),
});

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const result = passwordSchema.safeParse(password);
  if (result.success) return { valid: true, errors: [] };
  return { valid: false, errors: result.error.errors.map((e) => e.message) };
}

export function validateCreditCard(number: string): boolean {
  const cleaned = number.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) return false;
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

