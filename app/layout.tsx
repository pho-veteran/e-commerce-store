import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";

const font = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "E-commerce Store",
    description: "Simple e-commerce store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${font.className} antialiased`}>
                    <ModalProvider />
                    <ToastProvider />
                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
