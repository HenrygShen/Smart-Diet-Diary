const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

/* Body parser to parse json */
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


const sqlite3 = require('sqlite3').verbose();

var userDB = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: "./fruit.db"
	},
	useNullAsDefault: true
});


/* API routes */
app.get('/', (req, res) => { res.send('Server is up'); });

app.post('/processImage', (req, res) => {
    return res.json({ 
        code: 0,
        result: {
            name: 'Apple',
            mass: 100,
            calories: 95
        }
    })
});

app.get('/getList', (req, res) => {

    let contents = fs.readFileSync('labels.json');
    let jsonContent = JSON.parse(contents.toString('utf8'));


    const output = {
        code: 0,
        list: jsonContent['labels']
    }
    return res.json(output);
});

app.post('/calculateCalories', (req, res) => {

    const list = req.body['list'];

    const finalList = [];

    userDB.select('*')
    .from('Fruit')
    .then(rows => {

        for (var item of list) {
            console.log(item);
            if (item['type'] === 'list') {
                const index = getIndex(rows, item['name']);
                if (index !== -1) {
                    const calories = rows[index].Calories/100 * item['mass'];
                    finalList.push({ name : item['name'], calories: calories })
                }
                else {
                    return res.json({ 
                        code: 2,
                        message: 'Item not found in database'
                    })
                }
                
            }
            else {
                finalList.push({ name : item['name'], calories: item['calories'] });
            }
        }
        return res.json({ 
            code: 0,
            list: finalList
        })
    })
});


const getIndex = (rows, itemName) => {
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]['Name'] === itemName) {
            return i;
        }
    }
    return -1;
}

app.listen(process.env.PORT || 3001, () => {
	console.log('Server started');
});

