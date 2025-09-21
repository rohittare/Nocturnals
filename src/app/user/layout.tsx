import Navbar from "./Navbar";

 
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="relative bg-custom-bg min-h-screen w-full">
          <Navbar />
          <div className="flex ">{children}</div>
        </div>
  );
}