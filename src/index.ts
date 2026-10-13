
const debounce = <T>(fn: (arg?: T) => void, ms: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return (arg?: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(arg), ms);
    };
}

export { debounce };
