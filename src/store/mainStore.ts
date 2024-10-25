import pb from "@/api/pb";
import { produce } from "immer";
import { create } from "zustand";

interface GetFun {
  (value: string): void;
}

interface StoreType {
  isLoggedIn: boolean;
  updateIsLoggedIn: () => void;
}

export const mainStore = create<StoreType>((set) => {
  const INITIAL_STATE = {
    isLoggedIn: false,
  };

  const updateIsLoggedIn = () => {
    set(
      produce((draft) => {
        draft.isLoggedIn = pb.authStore.isValid;
      })
    );
  };

  return {
    ...INITIAL_STATE,
    updateIsLoggedIn,
  };
});
