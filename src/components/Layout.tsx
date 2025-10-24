import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 MotelOperation. All rights reserved.</p>
          <p className="text-sm mt-2 opacity-80">Premium hospitality solutions for modern travelers</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
