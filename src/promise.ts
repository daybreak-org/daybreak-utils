const succeedAll = <T>(values: Iterable<T | PromiseLike<T>>): Promise<T[]> => new Promise((resolve, reject) => {
    const items = Array.from(values);
    const results: T[] = new Array(items.length);
    let remaining = items.length;

    if (remaining === 0) {
        resolve(results);
        return;
    }

    for (let i = 0; i < items.length; i++) {
        Promise.resolve(items[i]).then((value) => {
            results[i] = value;
            remaining--;
            if (remaining === 0) {
                resolve(results);
            }
        }, reject)
    }
    return results;
});

export { succeedAll }