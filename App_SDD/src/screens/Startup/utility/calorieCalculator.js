export const calculateCalorieIntake = (state) => {

    const { gender, age, weight, height, exercise } = state;


    let calorieIntake = 0;
    let BMR = 0;
    if (gender === 0) {
        BMR = 66 + (6.3 * 2.205 * weight) + (12.9/2.54 * height) - (6.8 * age);
    }
    else {
        BMR = 655 + (4.3 * 2.205 * weight) + (4.7/2.54 * height) - (4.7 * age) * 1.2;
    }
    switch(exercise) {
        /* sedentary */
        case 0:
            calorieIntake = BMR * 1.2;
            break;
        /* lightly active */
        case 1:
            calorieIntake = BMR * 1.375;
            break;
        /* moderately active */
        case 2:
            calorieIntake = BMR * 1.55;
            break;
        /* very active */
        case 3:
            calorieIntake = BMR * 1.725;
            break;
        /* extra active */
        case 4:
            calorieIntake = BMR * 1.9;
            break;
        default:
            calroieIntake = BMR * 1.2;
            break;
    }
    return parseInt(calorieIntake);
    
}