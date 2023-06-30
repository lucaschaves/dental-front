import axios, { AxiosRequestConfig } from "axios";
import api from "./client";

interface IGetProps {
    url: string;
    config?: AxiosRequestConfig;
}

interface IPostProps {
    url: string;
    body?: object;
    config?: AxiosRequestConfig;
}

interface IResponse {
    success: boolean;
    data: any;
    message?: string;
}

const headersDefault = {
    headers: {
        Accept: "application/json",
    },
};

export const getApi = async (props: IGetProps) => {
    const { url, config = {} } = props;
    try {
        const {
            data: { data, success },
            status,
        } = await api.get<IResponse>(url, {
            ...headersDefault,
            ...config,
        });

        return {
            data,
            status,
            success,
        };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("error message: ", err.message);
            return {
                message: err.message,
                success: false,
            };
        } else {
            console.error("unexpected error: ", err);
            return {
                message: "An unexpected error occurred",
                success: false,
            };
        }
    }
};

export const postApi = async (props: IPostProps) => {
    const { url, body = {}, config = {} } = props;
    try {
        const { data, status } = await api.post(url, body, {
            ...headersDefault,
            ...config,
        });
        return {
            data,
            status,
        };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.error("error message: ", err.message);
            return err.message;
        } else {
            console.error("unexpected error: ", err);
            return "An unexpected error occurred";
        }
    }
};
