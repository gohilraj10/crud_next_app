"use client";

import { AppSidebar } from "../AppSidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function Applayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <header className="border-b p-4">
          <SidebarTrigger />
        </header>

        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
