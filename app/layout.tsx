import { Toaster } from "react-hot-toast";
import ClientOnly from "./components/ClientOnly";
import AuthForm from "./components/modals/AuthForm";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html data-theme="emerald" lang="en">
            <body className={inter.className}>
                <ClientOnly>
                    <Toaster />
                    <Navbar />
                    <AuthForm />
                </ClientOnly>

                <div className="min-h-screen">{children}</div>

                <Footer />
            </body>
        </html>
    );
}
