import { Toaster } from "react-hot-toast";
import ClientOnly from "./components/ClientOnly";
import AuthForm from "./components/modals/AuthForm";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import CartDrawer from "./components/cart/CartDrawer";
import NotificationProvider from "./components/NotificationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Restaurant Ordering System",
    description: "A restaurant ordering system",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen max-w-screen">
                    <ClientOnly>
                        <Toaster />
                        <Navbar />
                        <CartDrawer />
                        <AuthForm />
                        <NotificationProvider />
                    </ClientOnly>
                    <>{children}</>
                </div>
                <Footer />
            </body>
        </html>
    );
}
