export const toTimeNumber = (value) => {
    return (100 + value).toString().slice(1);
};

export const dateFormatGeneration = () => {
    const date = new Date();
    return toTimeNumber(date.getDate())+'.'
        +toTimeNumber(date.getMonth())+'.'
        +date.getFullYear()+' '
        +date.toTimeString().slice(0, 5);
};

export const toDateFormat = (str) => {
    return str.slice(8) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4)
};
