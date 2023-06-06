import { GiFullPizza } from "react-icons/gi";
import { FaPastafarianism } from "react-icons/fa";
import { LuSalad } from "react-icons/lu";
import { BiDrink } from "react-icons/bi";
import { IconType } from "react-icons/lib";

export interface CategotyOption {
    readonly id: string;
    readonly value: string;
    readonly label: string;
    readonly icon: IconType;
  }

export const categories: readonly CategotyOption[] = [
    { id: "1", value:"PIZZA", label: "Pizza", icon: GiFullPizza },
    { id: "2", value:"PASTA", label: "Pasta", icon: FaPastafarianism },
    { id: "3", value:"SALAD", label: "Salad", icon: LuSalad },
    { id: "4", value:"DRINKS", label: "Drinks", icon: BiDrink },
];

export const getCategory = (category: string) => {
    return categories.filter((c) => c.value === category)[0];
};