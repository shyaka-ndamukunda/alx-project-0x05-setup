import React, { ReactNode } from 'react';
import Header from './Header'; // This will be created next

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24"> {/* Added padding top to account for fixed header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;