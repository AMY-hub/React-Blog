export const formatFilterName = (param: string): string => {
    let paramName: string;
    switch (param) {
        case 'css': paramName = 'About CSS';
            break;
        case 'html': paramName = 'About HTML';
            break;
        case 'javascript': paramName = 'About JavaScript';
            break;
        default: paramName = 'All posts'
    }
    return paramName;
}