import api from './BaseApi';

export const getProblemsApi = (data: any) => {
  return api.get(`/QuestionGroup/all`, { params: data });
};

export const editProblem = (data: any) => {
  return api.put(`/QuestionGroup`, data);
};

export const addProblem = (data: any) => {
  return api.post(`/QuestionGroup`, data);
};

export const addProcessing = (data: any) => {
  return api.post(`/processing-node/processing-node-create`, data);
};

export const editProcessing = (data: any) => {
  return api.put(`/processing-node/processing-node-update`, data);
};

export const getProcessing = (questionGroupId: number) => {
  return api.get(
    `/processing-node/get-processing-node-list/${questionGroupId}`,
  );
};

export const deleteProblem = (data: any) => {
  return api.delete(`/QuestionGroup`, {
    params: {
      id: data,
    },
  });
};

export const getSingleProblemApi = (id: number) => {
  return api.get(`/QuestionGroup`, { params: id });
};

export const addVideosApi = (data: any) => {
  return api.post(`/Files/batch`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const getSingleProblemVideos = (data: any) => {
  return api.get(`/Files/GetFilesByQuestionGroupId/${data.id}`, {
    params: {
      questionGroupId: data.id,
      skip: 0,
      take: 100,
    },
  });
};
