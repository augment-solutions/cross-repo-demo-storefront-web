import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  logo?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOpen,
  onClose,
  navigation,
  logo,
  className,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {logo || <span className="text-xl font-bold text-primary-600">Store</span>}
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <Icon name="x" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.label)}
                      className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {item.label}
                      <Icon
                        name="chevron-down"
                        size="sm"
                        className={cn('transition-transform', expandedItems.includes(item.label) && 'rotate-180')}
                      />
                    </button>
                    {expandedItems.includes(item.label) && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a href={child.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a href={item.href} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

Navbar.displayName = 'Navbar';

