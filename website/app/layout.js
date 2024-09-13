import "./globals.scss";
import Navbar from './navbar';

export const metadata = {
  title: "Audio Dataset Audit - Search Datasets",
  description: "",
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
