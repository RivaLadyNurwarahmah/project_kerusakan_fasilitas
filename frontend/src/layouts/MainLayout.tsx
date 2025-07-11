import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
    {/* Header di atas */}
    <Header />

    {/* Sidebar dan Konten dalam satu baris */}
    <div className="flex flex-1">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  </div>
  );
}
