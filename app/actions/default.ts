import { Role } from "@/types/UserTypes";

export const apiBaseDomainName =
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production"
        ? "necessary-soap-production.up.railway.app"
        : "localhost:8080";

export const websiteBaseDomainName =
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production"
        ? "ordering.jensdevelops.de"
        : "localhost:3000";

export const websiteBaseUrl = `http${
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production" ? "s" : ""
}://${websiteBaseDomainName}`;

export const apiBaseUrl = `http${
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production" ? "s" : ""
}://${apiBaseDomainName}`;

export const paymentSuccessUrl = `${websiteBaseUrl}/me/orders`;
export const paymentCancelUrl = `${websiteBaseUrl}/me/orders`;

export const getHomeUrlByRole = (role: Role) => {
    switch (role) {
        case "CUSTOMER":
            return "/home";
        case "CHEF":
            return "/chef";
        case "ADMIN":
            return "/admin";
    }
};
