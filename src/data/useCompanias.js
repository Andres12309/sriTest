import useSWR from 'swr';
import API from './index';

export const useCompanias = (pageSize,pageIndex=0) => {
  const { data, error } = useSWR( `/compania/paginated?pageSize=${pageSize}&pageIndex=${pageIndex}`, API.fetcher );

  return {
    companias: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
