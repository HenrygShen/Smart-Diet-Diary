export const getDDMMYY = (timestamp) => {
    
    let date = new Date(+timestamp);
    let day =  +date.getDate();
    let month = +date.getMonth() + 1;
    let year = +date.getFullYear();

    month = month.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');

    let result = `${day}/${month}/${year}`;

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