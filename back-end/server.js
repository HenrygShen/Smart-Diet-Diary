const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const nj = require('numjs');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

global.fetch = require('node-fetch');

dotenv.config();


const app = express();
app.use(cors());

/* Body parser to parse json */
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


/* API routes */
app.get('/', (req, res) => { res.send('Server is up'); });

app.post('/processImage', (req, res) => {

    parseImage(req.body.image, res);

})


app.get('/check', (req, res) => {
    parseImage();
    res.json({ code : 'hi'})
})

parseImage = async(picture, res) => {

    try {
        console.log('start');
        // const id = "image";

        const id = Math.random();
        fs.writeFileSync(`${id}.jpg`, picture, 'base64', function(err) {
            console.log(err);
        });
        console.log('start2');
        const model = await tf.loadLayersModel('file://Trained_model/model.json');

        fs.readFileSync(`${id}.jpg`, function(err) {
            console.log(err);
        });

        let imData = nj.images.read(`${id}.jpg`);
        imData = nj.images.resize(imData,50,50);
        imData.dtype = 'float32';
        
        let normalisedData = nj.divide(imData, 255);

        let nData = normalisedData.selection.data;
        let i = 0;
        let j = 0;
        let k = 0;
        let rgbCount = 0;
        let newData = 
        [
            [
                [[

                ]]
                    ]
                        ];

        // [    Image -> i = 0;
        //     [    ROW     -> j = 0;
        //         [RGB]    -> k = 0;
        //          ...
        //          48 others.
        //         [RGB]    -> k = 49;
        //                  ]

        //      ... 48 others.
        //     [    ROW     -> j = 49;
        //         [RGB]    -> k = 0;
        //          ...
        //          48 others.
        //         [RGB]
        //                  ]
        //                      ];                

        for (let data of nData) {

            if (rgbCount === 3) {
                rgbCount = 0;
                k++;
                if (k === 50) {
                    j++;
                    newData[0].push([]);
                    k = 0;
                    newData[0][j].push([]);
                }
                else {
                    newData[0][j].push([]);
                }
            }
            // console.log(j);
            newData[0][j][k].push(data);
            rgbCount++;
        }
        

        let data = tf.tensor(newData);

        /* Get prediction results */
        const prediction = model.predict(data);
        let labels = readLabels();
        let pred = prediction.dataSync();

        /* Find winner */
        let max = 0;
        let index = 0;
        for (let i = 0; i < pred.length; i++) {
            if (pred[i] > max) {
                max = pred[i];
                index = i;
            }
        }
        console.log(pred);
        console.log(labels[index]);
        
        res.json({ code : 0, answer: labels[index] });
        // setTimeout(() => {
        //     fs.unlinkSync(`${id}.jpg`);
        // }, 5000)
    }
    catch(e) {
        console.log(e)
    }

}

deleteImage = () => {

    fs.unlinkSync(`image.jpg`);

}

readLabels = () => {
    let contents = fs.readFileSync(`labels.json`);
    let jsonContent = JSON.parse(contents.toString('utf8'));
    return jsonContent['labels'];
}

app.listen(process.env.PORT || 3001, () => {
	console.log('Server started');
});

