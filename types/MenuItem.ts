export type MenuItem = {
    id: string;
    name: string;
    description: string;
    imageSrc: string;
    flavours: { name: string }[];
    sizes: { size: string; price: number }[];
    categories: { id: string, value: string }[];
    isSoldOut: boolean;
}