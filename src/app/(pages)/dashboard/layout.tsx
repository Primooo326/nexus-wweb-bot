import DashobarLayout from "@/layouts/DashobarLayout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard de Nexus WWeb Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashobarLayout>
      {children}
    </DashobarLayout>

  );
}