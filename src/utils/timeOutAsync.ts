// setTimeOut de forma assincrona
export const timeOutAsync = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
