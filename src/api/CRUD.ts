import pb from "./pb";

export const getFullList = async () => {
  try {
    const response = await pb.collection("noticeBoard").getFullList();
    return response;
  } catch (error: unknown) {
    // error 타입을 unknown으로 선언
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        "전체 리스트를 가져오는 데 실패했습니다: " + error.message
      );
    } else {
      throw new Error(
        "전체 리스트를 가져오는 데 실패했습니다: 알 수 없는 오류입니다."
      );
    }
  }
};

// 아이디가 일치하는 한 개의 데이터 가져오기
export const getOneById = async (resource: string, id: string) => {
  try {
    const response = await pb.collection(resource).getOne(id);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        `리소스 '${resource}'의 아이디 '${id}'에 해당하는 데이터를 가져오는 데 실패했습니다: ${error.message}`
      );
    } else {
      throw new Error(
        `리소스 '${resource}'의 아이디 '${id}'에 해당하는 데이터를 가져오는 데 실패했습니다: 알 수 없는 오류입니다.`
      );
    }
  }
};

// 조건에 일치하는 첫 번째 데이터 가져오기
export const getFirstListItem = async (
  resource: string,
  field: string,
  value: string
) => {
  try {
    const response = await pb
      .collection(resource)
      .getFirstListItem(`${field}="${value}"`);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        `리소스 '${resource}'에서 '${field}'가 '${value}'인 첫 번째 데이터를 가져오는 데 실패했습니다: ${error.message}`
      );
    } else {
      throw new Error(
        `리소스 '${resource}'에서 '${field}'가 '${value}'인 첫 번째 데이터를 가져오는 데 실패했습니다: 알 수 없는 오류입니다.`
      );
    }
  }
};

// POST 요청 함수
export const createData = async (
  resource: string,
  data: {
    [key: string]: string | boolean;
  }
) => {
  try {
    const response = await pb.collection(resource).create(data);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        `리소스 '${resource}'에 데이터를 생성하는 데 실패했습니다: ${error.message}`
      );
    } else {
      throw new Error(
        `리소스 '${resource}'에 데이터를 생성하는 데 실패했습니다: 알 수 없는 오류입니다.`
      );
    }
  }
};

// PUT 요청 함수
export const updateData = async (
  resource: string,
  id: string,
  data: {
    [key: string]: string;
  }
) => {
  try {
    const response = await pb.collection(resource).update(id, data);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        `리소스 '${resource}'의 아이디 '${id}'에 해당하는 데이터를 수정하는 데 실패했습니다: ${error.message}`
      );
    } else {
      throw new Error(
        `리소스 '${resource}'의 아이디 '${id}'에 해당하는 데이터를 수정하는 데 실패했습니다: 알 수 없는 오류입니다.`
      );
    }
  }
};

// DELETE 요청 함수
export const deleteData = async (resource: string, id: string) => {
  try {
    const response = await pb.collection(resource).delete(id);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        `리소스 '${resource}'의 아이디 '${id}'에 해당하는 데이터를 삭제하는 데 실패했습니다: ${error.message}`
      );
    } else {
      throw new Error(
        `리소스 '${resource}'의 아이디 '${id}'에 해당하는 데이터를 삭제하는 데 실패했습니다: 알 수 없는 오류입니다.`
      );
    }
  }
};

export const login = async (id: string, password: string) => {
  try {
    const response = await pb
      .collection("users")
      .authWithPassword(id, password);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(
        "로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다. " + error.message
      );
    } else {
      throw new Error("로그인 실패: 알 수 없는 오류입니다.");
    }
  }
};
