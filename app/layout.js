import Navbar from "@/components/common/Navbar";
import "./globals.css";

export const metadata = {
  title: "Man Fashion",
  description: "Data Invoice Software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
