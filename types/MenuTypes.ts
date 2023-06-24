export type MenuItem = {
    id: string;
    name: string;
    description: string;
    imageSrc: string;
    flavours: MenuItemFlavour[];
    sizes: MenuItemSize[];
    categories: MenuItemCategory[];
    isSoldOut: boolean;
}

export type MenuItemFlavour = {
    id: string;
    name: string;
}

export type MenuItemSize = {
    id: string;
    size: string;
    price: number;
}

export type MenuItemCategory = {
    id: string;
    value: string;
}