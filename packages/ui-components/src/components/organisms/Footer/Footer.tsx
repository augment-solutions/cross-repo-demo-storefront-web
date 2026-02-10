import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  sections?: FooterSection[];
  socialLinks?: Array<{ icon: React.ReactNode; href: string; label: string }>;
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
  copyrightText?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  sections = [],
  socialLinks = [],
  showNewsletter = true,
  onNewsletterSubmit,
  copyrightText = `© ${new Date().getFullYear()} Store. All rights reserved.`,
  className,
}) => {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewsletterSubmit?.(email);
    setEmail('');
  };

  return (
    <footer className={cn('bg-gray-900 text-gray-300', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            {logo || <span className="text-2xl font-bold text-white">Store</span>}
            <p className="mt-4 text-sm">
              Premium quality products for your everyday needs. Free shipping on orders over $50.
            </p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-6">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <div className="lg:col-span-2 md:col-span-2 lg:col-start-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Subscribe to our newsletter</h3>
              <p className="mt-4 text-sm">Get the latest updates on new products and upcoming sales.</p>
              <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

