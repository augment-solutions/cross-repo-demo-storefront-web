import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Input } from '../../atoms/Input';
import { Label } from '../../atoms/Label';
import { Button } from '../../atoms/Button';
import { Select } from '../../atoms/Select';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface CheckoutFormProps {
  initialData?: Partial<CheckoutFormData>;
  onSubmit: (data: CheckoutFormData) => void;
  isLoading?: boolean;
  countries?: Array<{ value: string; label: string }>;
  className?: string;
}

const defaultCountries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading = false,
  countries = defaultCountries,
  className,
}) => {
  const [formData, setFormData] = React.useState<CheckoutFormData>({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zipCode: '', country: 'US', phone: '',
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="state">State / Province</Label>
            <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP / Postal Code</Label>
            <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={formData.country} onValueChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
        Continue to Payment
      </Button>
    </form>
  );
};

CheckoutForm.displayName = 'CheckoutForm';

