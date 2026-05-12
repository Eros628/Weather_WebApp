

export function debounce (cb, delay = 1000){
    let timeout;

    const runDebounce = (...args)=>{
         clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    };

    runDebounce.cancel = ()=>{
        clearTimeout(timeout);
    }

    return runDebounce;
}