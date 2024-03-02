import { QueryClient, dehydrate, hydrate } from "@tanstack/react-query";
import localForage from 'localforage';

// Function to save cache to storage
export const persistQueryClient = {
  // Function to get the query cache and save it
  async persistClient(_client : QueryClient) {
    await localForage.setItem('react-query-cache', dehydrate(_client));
  },
  // Function to restore cache
  async restoreClient(client : QueryClient) {
    const cache = await localForage.getItem('react-query-cache');

    if(!cache) {
      return undefined;
    }

    return hydrate(client, cache);
  },

  async clearCache(client : QueryClient) {
    await localForage.removeItem('react-query-cache');

    client.clear();
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: Infinity,
    },
  },
});

persistQueryClient.restoreClient(queryClient);

window.addEventListener('beforeunload', () => {
  const cache = queryClient.getQueryCache().findAll();
  persistQueryClient.persistClient(queryClient, cache);
});

export default queryClient;

