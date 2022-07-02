type ValidateFN = (data: { [key: string]: any }) => {
    invalidFields: string[],
    invalid: boolean
};

export const validatePostData: ValidateFN = (data) => {
    const invalidFields: string[] = [];

    for (let key in data) {
        const content = data[key];

        if (typeof content === 'string') {
            if (!content.trim()) {
                invalidFields.push(key);
            }
        } else if (Array.isArray(content)) {
            if (content.length === 0) {
                invalidFields.push(key);
            }
        } else if (!content) {
            invalidFields.push(key);
        }
    }
    return {
        invalidFields,
        invalid: !!invalidFields.length
    };
}