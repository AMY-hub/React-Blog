interface IValidationResp {
    invalidFields: string[],
    invalid: boolean
}

export const validatePostData = (postData: { [key: string]: any }): IValidationResp => {
    const invalidFields: string[] = [];
    for (let key in postData) {
        const content = postData[key];

        if (typeof content === 'string') {
            if (!content.trim()) {
                invalidFields.push(key);
            }
        } else if (Array.isArray(content)) {
            if (content.length === 0) {
                invalidFields.push(key);
            }
        }
    }
    return {
        invalidFields,
        invalid: !!invalidFields.length
    };
}