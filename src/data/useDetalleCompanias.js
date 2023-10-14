import useSWR from 'swr';
import API from './index';

export const useDetalleCompanias = (id, options= {} ) => {
  const { data, error } = useSWR( `/compania/${ id }`, API.fetcher, options );

  return {
    detCompanias: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
