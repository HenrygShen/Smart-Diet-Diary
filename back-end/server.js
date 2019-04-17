const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const tf = require('@tensorflow/tfjs');
// require('@tensorflow/tfjs-node');


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
        const model = await tf.loadGraphModel('file://./Trained_model/model.json');
        // const example = tf.fromPixels('test');  // for example
        // const prediction = model.predict(example);
        // console.log(prediction);
    }
    catch(e) {
        console.log(e)
    }
    

}

app.listen(process.env.PORT || 3001, () => {
	console.log('Server started');
});

