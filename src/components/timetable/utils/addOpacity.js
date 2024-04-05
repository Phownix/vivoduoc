const RGB_REPLACE_RULE = new RegExp('[\\d\\.]+\\)$', 'g');
const addOpacity = (rgbString, opacity) => {
    if (rgbString.startsWith('#')) {
        const r = parseInt(rgbString.slice(1, 3), 16);
        const g = parseInt(rgbString.slice(3, 5), 16);
        const b = parseInt(rgbString.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${opacity})`;
    }
    if (rgbString.startsWith('rgba')) {
        return rgbString.replace(RGB_REPLACE_RULE, `${opacity})`);
    }
    return rgbString.replace(')', `,${opacity})`).replace('rgb', 'rgba');
};
export default addOpacity;
