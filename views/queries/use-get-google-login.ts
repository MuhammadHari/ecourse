import {gql, useQuery} from "@apollo/client";

const QUERY = gql`
  query{
    gRedirect
  }
`

type UseGetGoogleLogin = {
  loading: boolean
  data: string
}

export function useGetGoogleLogin(): UseGetGoogleLogin {
  const {loading, data} = useQuery<{gRedirect:string}>(QUERY);
  return {
    loading,
    data : data ? data.gRedirect : ""
  }
}
