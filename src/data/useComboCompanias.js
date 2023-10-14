import useSWR from 'swr';
import API from './index';

export const useComboCompanias = () => {
  const { data, error } = useSWR( `/combobox/companies`, API.fetcher );

  return {
    companias: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
