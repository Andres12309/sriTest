import useSWR from 'swr';
import API from './index';

export const useDashboard = (id, options= {} ) => {
  const { data, error } = useSWR( `/dashboard/general/${ id }`, API.fetcher, options );

  return {
    dashboardCompania: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
