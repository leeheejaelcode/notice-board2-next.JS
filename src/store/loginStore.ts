import { login } from "@/api/CRUD";
import { EMAIL_REG, PASSWORD_REG } from "@/constant";
import { produce } from "immer";
import { create } from "zustand";

interface GetFun {
  (value: string): void;
}

interface StoreType {
  email: string;
  password: string;
  getEmail: GetFun;
  getPassword: GetFun;
  loginButtonClick: () => Promise<boolean>;
}

export const loginStore = create<StoreType>((set) => {
  const INITIAL_STATE = {
    email: "",
    password: "",
  };

  const getEmail: GetFun = (value) => {
    if (EMAIL_REG.test(value)) {
      set(
        produce((draft) => {
          draft.email = value;
        })
      );
    }
  };

  const getPassword: GetFun = (value) => {
    if (PASSWORD_REG.test(value)) {
      set(
        produce((draft) => {
          draft.password = value;
        })
      );
    }
  };

  const loginButtonClick = async () => {
    const { email, password } = loginStore.getState();
    if (email === "") {
      alert("아이디를 입력해 주세요");
      const emailInput = document.querySelector("#loginEmail");
      if (emailInput) {
        (emailInput as HTMLInputElement).focus();
      }
      return false;
    }
    if (password === "") {
      alert("비밀번호를 입력해 주세요");
      const passwordInput = document.querySelector("#loginPassword");
      if (passwordInput) {
        (passwordInput as HTMLInputElement).focus();
      }
      return false;
    }
    try {
      await login(email, password);
      return true;
    } catch (error) {
      console.log(error);
      alert("아이디 또는 비밀번호를 확인해주세요");
      return false;
    }
  };

  return {
    ...INITIAL_STATE,
    getEmail,
    getPassword,
    loginButtonClick,
  };
});
