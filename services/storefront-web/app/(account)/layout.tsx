import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-custom py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="w-full lg:w-64 lg:flex-shrink-0">
              <AccountSidebar />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

