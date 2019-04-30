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
app.get('/check', (req, res) => {
    parseImage();
    res.json({ code : 'hi'})
})

parseImage = async() => {
    try {
        const model = await tf.loadLayersModel('file://Trained_model/model.json');

        let imData = nj.images.read('./please.jpg');
        imData = nj.images.resize(imData,50,50);
        imData.dtype = 'float32';
        
        let wow = nj.divide(imData, 255);
        // console.log(wow);

        let dataWow = wow.selection.data;
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

        for (let data of dataWow) {
            // console.log(data);
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
        
        // newData.reshape(-1,50,50,3);
        console.log(newData[i].length);
        // const example = tf.fromPixels('test');  // for example
        let data = tf.tensor(newData);
        const prediction = model.predict(data);
        let labels = readLabels();
        let maxPred = prediction.argMax().dataSync()[0];
        console.log(labels[maxPred]);
    }
    catch(e) {
        console.log(e)
    }
    

}


readLabels = () => {
    let contents = fs.readFileSync(`labels.json`);
    let jsonContent = JSON.parse(contents.toString('utf8'));
    return jsonContent['labels'];
}

app.listen(process.env.PORT || 3001, () => {
	console.log('Server started');
});

