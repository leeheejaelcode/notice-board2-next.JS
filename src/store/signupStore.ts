import { create } from "zustand";
import { produce } from "immer";
import { createData, getFirstListItem } from "@/api/CRUD";
import { ID_REG, NAME_REG, PASSWORD_REG, PHONENUMBER_REG } from "@/constant";
import { getRandomMinMax } from "@/utils";
/* ---------------------------------- 타입정의 ---------------------------------- */
interface GetFun {
  (value: string): void;
}
interface StoreType {
  verificationCode: string;
  user: {
    [key: string]: string;
  };
  getId: GetFun;
  checkId: () => void;
  getPassword: GetFun;
  getPasswordConfirm: GetFun;
  getName: GetFun;
  getPhoneNumber: GetFun;
  checkPhoneNumber: () => void;
  getVerificationCode: GetFun;
  signupButtonClick: () => void;
}

export const signupStore = create<StoreType>((set) => {
  const INITIAL_STATE = {
    verificationCode: "",
    user: {
      userId: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phoneNumber: "",
      userVerificationCode: "",
    },
  };

  const getId: GetFun = (value) => {
    set(
      produce((draft) => {
        if (ID_REG.test(value)) {
          draft.user.userId = value;
        }
      })
    );
  };

  const checkId = async () => {
    const { user } = signupStore.getState();

    if (user.userId === "") {
      alert("아이디를 입력해 주세요");
      const idInput = document.querySelector("#id");
      if (idInput) {
        (idInput as HTMLInputElement).focus();
      }
      return;
    }

    try {
      const data = await getFirstListItem("users", "userId", user.userId);
      if (data) {
        alert("이미 사용중인 아이디입니다.");
        set(
          produce((draft) => {
            draft.user.userId = "";
          })
        );
        return;
      } else {
        alert(`사용 가능한 아이디입니다.`);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getPassword: GetFun = (value) => {
    set(
      produce((draft) => {
        if (PASSWORD_REG.test(value)) {
          draft.user.password = value;
        }
      })
    );
  };

  const getPasswordConfirm: GetFun = (value) => {
    set(
      produce((draft) => {
        if (PASSWORD_REG.test(value)) {
          draft.user.passwordConfirm = value;
        }
      })
    );
  };

  const getName: GetFun = (value) => {
    set(
      produce((draft) => {
        if (NAME_REG.test(value)) {
          draft.user.name = value;
        }
      })
    );
  };

  const getPhoneNumber: GetFun = (value) => {
    set(
      produce((draft) => {
        if (PHONENUMBER_REG.test(value)) {
          draft.user.phoneNumber = value;
        }
      })
    );
  };

  const checkPhoneNumber = async () => {
    const { user } = signupStore.getState();
    if (user.phoneNumber === "") {
      alert("전화번호를 입력해 주세요");
      const phoneNumberInput = document.querySelector("#phoneNumber");
      if (phoneNumberInput) {
        (phoneNumberInput as HTMLInputElement).focus();
      }
      return;
    }

    try {
      const data = await getFirstListItem(
        "users",
        "phoneNumber",
        user.phoneNumber
      );
      if (data) {
        alert("이미 가입한 사용자 입니다.");
        return;
      } else {
        const code = getRandomMinMax(100000, 999999);
        alert(`인증번호 : ${code}`);
        set(
          produce((draft) => {
            draft.verificationCode = code.toString();
          })
        );
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getVerificationCode: GetFun = (value) => {
    set(
      produce((draft) => {
        draft.user.userVerificationCode = value;
      })
    );
  };

  const signupButtonClick = async () => {
    const { user, verificationCode } = signupStore.getState();
    if (user.userId === "") {
      alert("아이디를 입력해 주세요");
      const idInput = document.querySelector("#id");
      if (idInput) {
        (idInput as HTMLInputElement).focus();
      }
      return;
    }
    if (user.password === "") {
      alert("비밀번호를 입력해 주세요");
      const passwordInput = document.querySelector("#password");
      if (passwordInput) {
        (passwordInput as HTMLInputElement).focus();
      }
      return;
    }
    if (user.passwordConfirm === "") {
      alert("비밀번호확인을 입력해 주세요");
      const passwordConfirmInput = document.querySelector("#passwordConfirm");
      if (passwordConfirmInput) {
        (passwordConfirmInput as HTMLInputElement).focus();
      }
      return;
    }
    if (user.password !== user.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (user.name === "") {
      alert("이름을 입력해 주세요");
      const nameInput = document.querySelector("#name");
      if (nameInput) {
        (nameInput as HTMLInputElement).focus();
      }
      return;
    }
    if (user.phoneNumber === "") {
      alert("전화번호를 입력해 주세요");
      const phoneNumberInput = document.querySelector("#phoneNumber");
      if (phoneNumberInput) {
        (phoneNumberInput as HTMLInputElement).focus();
      }
      return;
    }

    if (user.userVerificationCode !== verificationCode) {
      alert("인증번호가 일치하지 않습니다.");
      return;
    }

    const userData = {
      userId: user.userId,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      name: user.name,
      phoneNumber: user.phoneNumber,
      emailVisibility: true,
    };

    try {
      await createData("users", userData);
      alert("회원가입에 성공하였습니다");
      set(
        produce((draft) => {
          draft.user = userData;
        })
      );
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return {
    ...INITIAL_STATE,
    getId,
    checkId,
    getPassword,
    getPasswordConfirm,
    getName,
    getPhoneNumber,
    checkPhoneNumber,
    getVerificationCode,
    signupButtonClick,
  };
});
