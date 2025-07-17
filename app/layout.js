// app/layout.js

export const metadata = {
  title: "Video Restriction CMS",
  description: "Manage video restrictions by country",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
