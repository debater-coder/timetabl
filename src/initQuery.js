import { QueryClient } from 'react-query';


const fetchPortalAuthenticated = async ({ queryKey }) => {
  const res = await fetch(
    "https://student.sbhs.net.au/api/"
    + queryKey[1]
    + "?access_token="
    + localStorage.getItem("access_token")
  )

  if (res.status === 401) {
    throw new Error("401")
  }

  if (!res.ok) {
    const message = `An error has occured: ${res.status}`;
    throw new Error(message);
  }

  return await res.json()
}

export default new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetchPortalAuthenticated,
      refetchInterval: 60 * 1000,
      cacheTime: 1000 * 60 * 60 * 24
    }
  }
});