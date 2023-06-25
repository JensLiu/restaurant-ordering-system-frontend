"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
    const pahtname = usePathname();
    if (pahtname.includes("/admin")) {
        return null;
    }
    return (
        <footer className="footer footer-center p-10 bg-primary text-primary-content">
            <div>
                <p className="font-bold">
                    This is a programming assignment <br />
                </p>
                <p>Copyright © 2023 - All right reserved</p>
            </div>
            {/* <div>
                <div className="grid grid-flow-col gap-4">
                   
                </div>
            </div> */}
        </footer>
    );
};

export default Footer;
