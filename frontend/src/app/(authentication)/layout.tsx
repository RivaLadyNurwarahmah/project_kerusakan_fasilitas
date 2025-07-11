import DefaultLayout from "@/layouts/MainLayout";
import React from "react";

export default function DashboardLayout({children}: {children: React.ReactNode}){
return(
    <DefaultLayout>
        {children}
    </DefaultLayout>
)}