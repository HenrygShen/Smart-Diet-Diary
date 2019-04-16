const fs = require('fs');


const parser = () => {
    fs.readFile('classes.txt' ,(err, data) => {
        data = data.toString();
        data = data.split("\n");
        // console.log(data);
    
        const endData = [];
        data.forEach(row => {
            endData.push(row);
        });
    
        let writeData = {
            classes: endData
        }
        console.log(endData);
    
        fs.writeFile('classes.json', JSON.stringify(writeData), (err) => {
    
        });
    })
    
}

const PATH = 'E:/Downloads/fruit/images/';


const train = () => {


    fs.readdir(PATH, function(err, dirs) {

        /* Loop through all of the categories */
        for (var subdir of dirs) {

            let count = 1;
            /* Get all images in one category */
            const images = fs.readdirSync(PATH+subdir);
            for (var image of images) {

                /* If not named properly */
                var cleanString = image.substring(0, image.length - 4);
                if (cleanString.match(/[a-z]/i)) {

                    fs.rename(`${PATH}${subdir}/${image}`, `${PATH}${subdir}/${count}.jpg`, function(err) {
                        
                        if (err) {
                            console.log(err);
                        }
                        
                    })
                    
                }
                addLabel(subdir, count.toString());
                count++;

            }
        }
    })
}

const ROOT_PATH = 'E:/Downloads/fruit';
const addLabel = (type, name) => {
    let contents = fs.readFileSync(`${ROOT_PATH}/meta/train.json`);
    let jsonContent = JSON.parse(contents.toString('utf8'));

    if (jsonContent[type]) {
        if (!jsonContent[type].includes(`${type}/${name}`)) {
            jsonContent[type].push(`${type}/${name}`);
        }
    }
    else {
        jsonContent[type] = [ `${type}/${name}` ];
    }
    fs.writeFileSync(`${ROOT_PATH}/meta/train.json`, JSON.stringify(jsonContent), 'utf8');
}

train();