import { create } from "zustand";

interface AuthFormState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    modalId: string;
}

const useAuthForm = create<AuthFormState>()((set) => ({
    isOpen: false,
    modalId: "login-modal",
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAuthForm;