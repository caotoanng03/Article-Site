// Random String
export const generateRandomString = (length: number): string => {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result: string = "";

    for (let i = 0; i < length; ++i) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

// Random Number
export const generateRandomNumber = (length: number): string => {
    const numbers: string = "0123456789";
    let result = "";

    for (let i = 0; i < length; ++i) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
}