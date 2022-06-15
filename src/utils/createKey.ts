const createKey = (): string => {
    return Math.trunc(Math.random() * new Date().getSeconds()) + '' + Math.random().toString().slice(3);
}

export default createKey;