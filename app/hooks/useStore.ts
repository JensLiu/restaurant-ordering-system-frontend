import { useState, useEffect } from "react";

// To solve the hydration problem
// reference https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5
const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,    // the 'unknown' will be replaced by F once callback is determined 
    callback: (state: T) => F
) => {

    const result = store(callback) as F;    // get result from store(zustand) using callback function
    const [data, setData] = useState<F>();  // data is initially undefined

    useEffect(() => {                       // when the client component momunts, data will be set to result
        setData(result);
    }, [result]);

    return data;                            // we return the state of the data
};

export default useStore;
