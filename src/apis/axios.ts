import type { IApiResponse, IApiService } from "./interface";
import axios from "axios";
import type { AxiosResponse } from "axios";
import queryString from "query-string";
import env from "../constants/env";
import { toast } from "react-toastify";
// We'll initialize this later when the LoadingProvider is available
let loadingController: {
    incrementPendingRequests: () => void;
    decrementPendingRequests: () => void;
} | null = null;

// Function to set the loading controller from outside
export const setLoadingController = (controller: {
    incrementPendingRequests: () => void;
    decrementPendingRequests: () => void;
}) => {
    loadingController = controller;
};
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: env.API_URL, // Change this to your API URL
    timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Increment pending requests counter
        if (loadingController) {
            loadingController.incrementPendingRequests();
        }

        const token = localStorage.getItem("authToken"); // or from context/redux
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Decrement pending requests counter even if there's an error
        if (loadingController) {
            loadingController.decrementPendingRequests();
        }
        return Promise.reject(error);
    }
);

const handleErrorResponse = (response: AxiosResponse<any, any>) => {
    try {
        const errorMessage = response.statusText;

        if (errorMessage) {
            toast.error(errorMessage);
        } else {
            toast.error("Thất bại!");
        }
        return Promise.reject(response);
    } catch (error) {
        console.log("error", error);
        return Promise.reject(error);
    }
};

const handleSuccessResponse = (response: AxiosResponse<any, any>) => {
    try {
        const responseCast = response.data as IApiResponse<any>;
        if (responseCast.isSuccess === true) {
            return response.data;
        } else if (responseCast.isSuccess === false) {
            responseCast.errorMessageList.forEach((msg) => toast.error(msg));
        }
        return response;
    } catch (error) {
        console.log("error", error);
        return response;
    }
};

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Decrement pending requests counter on successful response
        if (loadingController) {
            loadingController.decrementPendingRequests();
        }
        return handleSuccessResponse(response);
    },
    (error) => {
        // Decrement pending requests counter on error response
        if (loadingController) {
            loadingController.decrementPendingRequests();
        }
        return handleErrorResponse(error);
    }
);
export const apiService = ({
    url,
    pathVars,
    params,
    body,
    ...options
}: IApiService): Promise<any> => {
    let updatedUrl = url;

    if (pathVars && Object.keys(pathVars).length !== 0) {
        updatedUrl = Object.entries(pathVars).reduce(
            (replacedPath, [key, value]) => replacedPath.replace(`:${key}`, `${value || ""}`),
            url || ""
        );
    }

    if (params && Object.keys(params).length !== 0) {
        updatedUrl = `${updatedUrl}?${queryString.stringify(params)}`;
    }

    return axiosInstance({
        data: body,
        url: updatedUrl,
        ...options,
    });
};

export default axiosInstance;
