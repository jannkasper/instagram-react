export function decodeParamObject(paramsObject) {
    const paramsString = stringifyParamObject(paramsObject);
    return replaceSpecialCharacters(paramsString);
}

function stringifyParamObject(objectValue) {
    if (typeof objectValue !== 'object' || objectValue === null) {
        return objectValue;
    }

    const valueArray = [];

    for (const[key, value] of Object.entries(objectValue)) {
        if (!value) {
            continue;
        }
        valueArray.push(`"${key}":"${value}"`)
    }

    return `{${valueArray.join(",")}}`;
}

function replaceSpecialCharacters(value) {
    if (!value || typeof value !== 'string') {
        return value;
    }

    return value
        .replace(/,/g, '%2C')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/:/g, '%3A')
        .replace(/"/g, '%22')
        .replace(/=/g, '%3D')
        .replace(/\\/g, '%5C');
}
