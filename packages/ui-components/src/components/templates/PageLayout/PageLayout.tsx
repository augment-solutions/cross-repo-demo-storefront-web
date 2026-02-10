import * as React from 'react';
import { cn } from '../../../utils/cn';
import { Header, HeaderProps } from '../../organisms/Header';
import { Footer, FooterProps } from '../../organisms/Footer';
import { Navbar, NavItem } from '../../organisms/Navbar';

export interface PageLayoutProps {
  children: React.ReactNode;
  headerProps?: Omit<HeaderProps, 'onMenuClick'>;
  footerProps?: FooterProps;
  navigation?: NavItem[];
  showFooter?: boolean;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  headerProps,
  footerProps,
  navigation = [],
  showFooter = true,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      <Header
        {...headerProps}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      
      <Navbar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        logo={headerProps?.logo}
      />

      <main className="flex-1">
        {children}
      </main>

      {showFooter && <Footer {...footerProps} />}
    </div>
  );
};

PageLayout.displayName = 'PageLayout';

