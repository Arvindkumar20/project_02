import { useState } from "react"

export const useHttpClient = () => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });
            const data = response.json();
            if (!data.ok) {
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}