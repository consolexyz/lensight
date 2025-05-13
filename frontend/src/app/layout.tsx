import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "../../public/globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { Login } from "@/components/login";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lens Predictions",
  description: "Create and engage with predictions on Lens Protocol",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased m-0 p-0 overflow-hidden"}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm border-b z-10">
              <div className="container mx-auto flex justify-between items-center h-16 px-4">
                <div className="flex items-center gap-6">
                  <Link href="/" className="font-bold text-xl">Lens Predictions</Link>
                  <nav className="hidden md:flex items-center space-x-4">
                    <Link href="/explore" className="text-foreground/80 hover:text-foreground transition-colors">Explore</Link>
                    <Link href="/create" className="text-foreground/80 hover:text-foreground transition-colors">Create</Link>
                    <Link href="/profile" className="text-foreground/80 hover:text-foreground transition-colors">Profile</Link>
                  </nav>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[200px]">
                    <Login />
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="flex-1 pt-16 bg-background">
              <div className="container mx-auto px-4">
                {children}
              </div>
            </main>

            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
