'use client'

import { UserDashboard } from "@/components/ui/UmumDashboard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  if( !user ) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (user.peran === "umum") {
    return <UserDashboard />;
  }else if( user.peran === "teknisi") {
    return <UserDashboard />;
  }else if( user.peran === "admin") {
    return <UserDashboard />;
  }
}
