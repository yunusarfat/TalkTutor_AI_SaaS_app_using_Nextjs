import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";


const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalkTutor",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //  <ClerkProvider>
    //   <html lang="en">
    //     <body className={`${bricolage.variable}  antialiased`}>
    //       <header className="flex justify-end items-center p-4 gap-4 h-16">
    // <Navbar />        
    // <SignedOut>
    //           <SignInButton />
    //           <SignUpButton />
    //         </SignedOut>
    //         <SignedIn>
    //           <UserButton />
    //         </SignedIn>
    //       </header>
    //       <Navbar />
    //       {children}
    //     </body>
    //   </html>
    // </ClerkProvider>
    <ClerkProvider appearance={{variables:{colorPrimary:'#5e5933'}}}>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <Navbar  />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
