export const calculateColor = (recommended, total) => {

    const caloriesLeft = recommended - total;

    if (caloriesLeft > 500) {
        return '#00ff00';
    }
    else if (caloriesLeft> 400) {
        return '#99ff33'
    }
    else if (caloriesLeft > 300) {
        return '#ff9900'
    }
    else if (caloriesLeft > 100) {
        return '#ff3300';
    }
    else {
        return '#ff0000';
    }
}