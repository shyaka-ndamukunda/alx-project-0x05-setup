import React, { ReactNode } from 'react';
import Header from './Header'; // Assuming Header is in the same directory

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20"> {/* Added padding-top to account for fixed header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;