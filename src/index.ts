
const debounce = <T>(fn: (arg?: T) => void, ms: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return (arg?: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(arg), ms);
    };
}

const throttle = <T>(fn: (arg?: T) => void, ms: number) => {
    let lastCall = 0;
    return (arg?: T) => {
        const now = Date.now();
        if (now - lastCall >= ms) {
            lastCall = now;
            fn(arg);
        }
    }
}

export { debounce, throttle };
