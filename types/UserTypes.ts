export type Role = "ADMIN" | "CUSTOMER" | "CHEF" | "INVALID";
export type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
    imageSrc: string;
    registeredAt: Date;
}