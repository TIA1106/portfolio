import "./globals.css";
import Navbar from "./components/Navbar";
import { StarCursor } from "./components/ui/StarCursor";
import StickyLinks from "./components/StickyLinks";

export const metadata = {
  title: "TIA.S // ML Sorceress",
  description: "Engineering Music Patterns & Autonomous Agents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black antialiased overflow-x-hidden">
        {/* The Magic Wand - Follows you everywhere */}
        <StarCursor />
        
        {/* The Floating Navigation */}
        <Navbar />

        {/* Global Quick Links */}
        <StickyLinks />
        
        {/* The Page Content */}
        {children}
      </body>
    </html>
  );
}