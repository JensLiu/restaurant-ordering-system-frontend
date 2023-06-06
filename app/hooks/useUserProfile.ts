import useSWR from "swr";
import fetcherWithRefreshToken from "../actions/dataFetcher";
import { UserState } from "./useUserStore";

export const useCurrentUser = () => {
    const { data, error, isLoading } = useSWR<UserState>(
        `http://localhost:8080/api/v1/users/me`,
        fetcherWithRefreshToken
    );
    return {
        data,
        error,
        isLoading,
    };
};
