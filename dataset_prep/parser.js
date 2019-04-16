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
        for (var subdir of dirs) {
            let count = 0;
            console.log(dirs);
            
            const images = fs.readdirSync(PATH+subdir);
            for (var image of images) {
                var cleanString = image.substring(0, image.length - 4);
                if (cleanString.match(/[a-z]/i)) {
                    count++;
                    console.log(cleanString);
                    fs.rename(`${PATH}${subdir}/${image}`, `${PATH}${subdir}/${count}.jpg`, function(err) {
                        
                        if (err) {
                            console.log(err);
                        }
                    
                    })
                }

            }
        }
    })
}

train();