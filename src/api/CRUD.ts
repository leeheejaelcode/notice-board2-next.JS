import pb from "./pb";
export const getFullList = async () => {
  try {
    const response = await pb.collection("noticeBoard").getFullList();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 아이디가 일치하는 한 개의 데이터 가져오기
export const getOneById = async (resource: string, id: string) => {
  try {
    const response = await pb.collection(resource).getOne(id);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 조건에 일치하는 첫번째 데이터 가져오기
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
  } catch (error) {
    console.log(error);
    return null;
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
  } catch (error) {
    console.log(error);
    return null;
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
  } catch (error) {
    console.log(error);
    return null;
  }
};

// DELETE 요청 함수
export const deleteData = async (resource: string, id: string) => {
  try {
    const response = await pb.collection(resource).delete(id);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
