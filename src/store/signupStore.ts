import { create } from "zustand";
import { produce } from "immer";
import { createData, getFirstListItem } from "@/api/CRUD";
import { EMAIL_REG, NAME_REG, PASSWORD_REG, PHONENUMBER_REG } from "@/constant";
import { getRandomMinMax } from "@/utils";
/* ---------------------------------- 타입정의 ---------------------------------- */
interface GetFun {
  (value: string): void;
}
interface StoreType {
  verificationCode: string;
  isCheckedId: boolean;
  user: {
    [key: string]: string;
  };
  getEmail: GetFun;
  checkId: () => void;
  getPassword: GetFun;
  getPasswordConfirm: GetFun;
  getName: GetFun;
  getPhoneNumber: GetFun;
  checkPhoneNumber: () => void;
  getVerificationCode: GetFun;
  signupButtonClick: () => Promise<boolean>;
}

export const signupStore = create<StoreType>((set) => {
  const INITIAL_STATE = {
    verificationCode: "",
    isCheckedId: false,
    user: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      phoneNumber: "",
      userVerificationCode: "",
    },
  };

  const getEmail: GetFun = (value) => {
    if (EMAIL_REG.test(value)) {
      set(
        produce((draft) => {
          draft.user.email = value;
        })
      );
    }
  };

  const checkId = async () => {
    const { user } = signupStore.getState();

    if (user.email === "") {
      alert("아이디를 입력해 주세요");
      const idInput = document.querySelector("#id");
      if (idInput) {
        (idInput as HTMLInputElement).focus();
      }
      return;
    }

    try {
      const data = await getFirstListItem("users", "email", user.email);
      if (data) {
        alert("이미 사용중인 아이디입니다.");
        set(
          produce((draft) => {
            draft.user.email = "";
            draft.isCheckedId = false;
          })
        );
        return;
      } else {
        alert(`사용 가능한 아이디입니다.`);
        set(
          produce((draft) => {
            draft.isCheckedId = true;
          })
        );
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getPassword: GetFun = (value) => {
    if (PASSWORD_REG.test(value)) {
      set(
        produce((draft) => {
          draft.user.password = value;
        })
      );
    }
  };

  const getPasswordConfirm: GetFun = (value) => {
    if (PASSWORD_REG.test(value)) {
      set(
        produce((draft) => {
          draft.user.passwordConfirm = value;
        })
      );
    }
  };

  const getName: GetFun = (value) => {
    if (NAME_REG.test(value)) {
      set(
        produce((draft) => {
          draft.user.name = value;
        })
      );
    }
  };

  const getPhoneNumber: GetFun = (value) => {
    if (PHONENUMBER_REG.test(value)) {
      set(
        produce((draft) => {
          draft.user.phoneNumber = value;
        })
      );
    }
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
    const { user, verificationCode, isCheckedId } = signupStore.getState();
    if (user.email === "") {
      alert("아이디를 입력해 주세요");
      const idInput = document.querySelector("#signupEmail");
      if (idInput) {
        (idInput as HTMLInputElement).focus();
      }
      return false;
    }
    if (user.password === "") {
      alert("비밀번호를 입력해 주세요");
      const passwordInput = document.querySelector("#signupPassword");
      if (passwordInput) {
        (passwordInput as HTMLInputElement).focus();
      }
      return false;
    }
    if (user.passwordConfirm === "") {
      alert("비밀번호확인을 입력해 주세요");
      const passwordConfirmInput = document.querySelector(
        "#signupPasswordConfirm"
      );
      if (passwordConfirmInput) {
        (passwordConfirmInput as HTMLInputElement).focus();
      }
      return false;
    }
    if (user.password !== user.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    if (user.name === "") {
      alert("이름을 입력해 주세요");
      const nameInput = document.querySelector("#signupName");
      if (nameInput) {
        (nameInput as HTMLInputElement).focus();
      }
      return false;
    }
    if (user.phoneNumber === "") {
      alert("전화번호를 입력해 주세요");
      const phoneNumberInput = document.querySelector("#signupPhoneNumber");
      if (phoneNumberInput) {
        (phoneNumberInput as HTMLInputElement).focus();
      }
      return false;
    }

    if (user.userVerificationCode !== verificationCode) {
      alert("인증번호가 일치하지 않습니다.");
      return false;
    }

    if (!isCheckedId) {
      alert("아이디 중복확인이 필요합니다.");
      return false;
    }

    const userData = {
      email: user.email,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      name: user.name,
      phoneNumber: user.phoneNumber,
      emailVisibility: true,
    };

    try {
      await createData("users", userData);
      set(
        produce((draft) => {
          draft.user = userData;
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    ...INITIAL_STATE,
    getEmail,
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
