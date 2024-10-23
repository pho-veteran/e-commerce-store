import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-providers";
import ToastProvider from "@/providers/toast-provider";

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
        <html lang="en">
            <body className={`${font.className} antialiased`}>
                <ModalProvider />
                <ToastProvider />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
