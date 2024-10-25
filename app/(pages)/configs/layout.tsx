import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/_components/providers";
import { AppNavBar } from "@/app/_components/app-nav-bar";
import { AppMenu } from "@/app/_components/app-menu";
import Loading from "./loading";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Managment Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const navbarHeight = 16 * 4; // h-16
 
  return (
    <html lang="en">
        <body className={`${inter.className}`}>
          <Providers>
            <div className="flex flex-col h-screen">
              <AppNavBar></AppNavBar>

              <Toaster position="bottom-center" />

              <div className="flex" style={{ height: `calc(100vh - ${navbarHeight}px)` }}>

                <div className="flex-none overflow-y-auto bg-white bg-opacity-75 w-96">
                  <Suspense fallback={<Loading></Loading>}>
                    <AppMenu></AppMenu>
                  </Suspense>
                </div>

                <div className="flex-auto overflow-y-auto">
                  <Suspense fallback={<Loading></Loading>}>
                    <div className="m-8">
                      {children}
                    </div>
                  </Suspense>
                </div>
                
              </div>
            </div>
          </Providers>
        </body>
    </html>
  );
}
