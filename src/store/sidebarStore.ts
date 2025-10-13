// stores/sidebarStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type SidebarSettings = {
  disabled: boolean;
  isHoverOpen: boolean;
};

type SidebarStoreState = {
  isOpen: boolean;
  isHover: boolean;
  settings: SidebarSettings;
};

type SidebarStoreActions = {
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHover: (isHover: boolean) => void;
  getOpenState: () => boolean;
  setSettings: (settings: Partial<SidebarSettings>) => void;
};

export const useSidebar = create<SidebarStoreState & SidebarStoreActions>()(
  persist(
    immer((set, get) => ({
      isOpen: true,
      isHover: false,
      settings: { disabled: false, isHoverOpen: false },

      toggleOpen: () => {
        set((state) => {
          state.isOpen = !state.isOpen;
        });
      },

      setIsOpen: (isOpen) => {
        set((state) => {
          state.isOpen = isOpen;
        });
      },

      setIsHover: (isHover) => {
        set((state) => {
          state.isHover = isHover;
        });
      },

      getOpenState: () => {
        const state = get();
        return state.isOpen || (state.settings.isHoverOpen && state.isHover);
      },

      setSettings: (settings) => {
        set((state) => {
          state.settings = { ...state.settings, ...settings };
        });
      },
    })),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
