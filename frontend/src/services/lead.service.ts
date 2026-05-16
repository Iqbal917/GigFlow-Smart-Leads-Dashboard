import api from './api';

export const getLeads = async (
  query = ''
) => {
  const response = await api.get(
    `/leads${query}`
  );

  return response.data;
};

export const createLead = async (
  data: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {
  const response = await api.post(
    '/leads',
    data
  );

  return response.data;
};

export const deleteLead = async (
  id: string
) => {
  const response = await api.delete(
    `/leads/${id}`
  );

  return response.data;
};

export const updateLead = async (
  id: string,
  data: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {
  const response = await api.put(
    `/leads/${id}`,
    data
  );

  return response.data;
};

export const exportLeadsCSV = async (
  query: string
) => {
  const response = await api.get(
    `/leads/export${query}`,
    {
      responseType: 'blob'
    }
  );

  return response.data;
};