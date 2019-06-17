export const getDDMMYY = (timestamp) => {
    let result =  new Date(+timestamp).toLocaleString('en-gb', 'Pacific/Auckland');
    let index = result.indexOf(",");
    result = result.substring(0, index);
    return result;
}

export const getIndexOfDate = (date, entries) => {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].Date === date) {
            
            return i;
        }
    }
    return -1;
} 