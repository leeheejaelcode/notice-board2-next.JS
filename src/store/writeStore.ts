import { createData } from "@/api/CRUD";
import pb from "@/api/pb";
import { produce } from "immer";
import { create } from "zustand";

interface GetFun {
  (value: string): void;
}

interface StoreType {
  title: string;
  content: string;
  getTitle: GetFun;
  getContent: GetFun;
  createPost: () => Promise<boolean>;
}

export const writeStore = create<StoreType>((set) => {
  const INITIAL_STATE = {
    title: "",
    content: "",
  };

  const getTitle = (value: string) => {
    console.log(value);
    set(
      produce((draft) => {
        draft.title = value;
      })
    );
  };

  const getContent = (value: string) => {
    set(
      produce((draft) => {
        draft.content = value;
      })
    );
  };

  const createPost = async () => {
    const { title, content } = writeStore.getState();

    if (!title) {
      alert("제목을 입력해 주세요");
      return false;
    }

    if (!content) {
      alert("내용을 입력해 주세요");
      return false;
    }

    try {
      const data = {
        title,
        content,
        name: pb.authStore.model?.name,
      };
      await createData("noticeBoard", data);
      return true;
    } catch (error: unknown) {
      console.log(error);
      return false;
    }
  };

  return {
    ...INITIAL_STATE,
    getTitle,
    getContent,
    createPost,
  };
});
