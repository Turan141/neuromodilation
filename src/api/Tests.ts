import api from './BaseApi';

export const createTest = (data: any) => {
  return api.post('/Tests', data);
};

export const getTestsApi = (data: any) => {
  return api.get('/Tests/list', { params: data });
};

export const deleteTest = (data: any) => {
  return api.delete('/Tests', { params: data });
};

export const getSingleTestApi = (data: any) => {
  return api.get('/Tests', { params: data });
};

export const putSingleTestApi = (data: any) => {
  return api.post('/Tests', data);
};

export const getQuestionsApi = (id: number) => {
  return api.get(`/Tests/${id}/questions`);
};

export const getQuestionApi = (id: number) => {
  return api.get(`/Question?id=${id}`);
};

export const addQuestionApi = (data: any) => {
  return api.post(`/Tests/add-question?testId=${data.testId}`, data);
};

export const getQuestionsInSubtest = (subtestId: number) => {
  return api.get(`/Tests/subtest/${subtestId}/questions`);
};

export const getResults = (testId: number) => {
  return api.get(`/Tests/${testId}/question-groups`);
};

export const setResults = (data: any) => {
  return api.post(`/Tests/set-results/${data.testId}`, data.results);
};

export const editQuestionApi = (data: any) => {
  return api.put('/Question', data);
};

export const deleteQuestionApi = (id: string) => {
  return api.delete('/Question', { params: { id: id } });
};

export const getQuestionGroupsApi = () => {
  return api.get(`/QuestionGroup/list`);
};
