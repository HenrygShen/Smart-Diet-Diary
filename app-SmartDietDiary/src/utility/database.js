import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const initDB = () => {
    
    SQLite.openDatabase({name: 'diary.db', location: 'Library'})
    .then(DB => {

        console.log('Database opened.');

        DB.executeSql('CREATE table IF NOT EXISTS Calendar(Food text, Calories Integer, Date text)')
        .then(() => {
            console.log('Table : OKAY');
        })
        .catch(() => {
            console.log('Something went wrong, please check line 20 of database.js.');
        });

    })

};

export const resetDB = () => {
    SQLite.openDatabase({name: 'diary.db', location: 'Library'})
    .then(DB => {

        DB.executeSql('DROP TABLE Calender')
        .then(() => {
            console.log('Table dropped.');
            DB.close()
            .then(status => {
                console.log('DB closed.');
            })
        })
        .catch(() => {
            console.log('Tried to drop table, nothing exists.')
        })
    })
    .catch(() => {
    });
}

export const insertData = (name, calories) => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
            const epoch = (new Date).getTime().toString();
            DB.executeSql(`INSERT into Calendar (Food, Calories, Date) VALUES ("${name}", ${calories}, ${epoch})`)
            .then(() => {
                DB.close()
                .then(status => {
                    console.log('DB closed.');
                    resolve(true);
                })
            })
            .catch((e) => {
                console.log('Failed to insert data.', e);
                reject(false);
            })
        })
    })

}

export const getEntries = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
            DB.executeSql("SELECT * from Calendar", [])
            .then(([results]) => {
                resolve(results.rows);
            })
            .catch(() => {
                console.log('Could not get entries.');
                reject(e);
            })
        })
    })

}

export const removeItemWithKey = (ID) => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
            DB.executeSql(`DELETE FROM Calendar WHERE Date = "${ID}"`)
            .then(() => {
                resolve(true);
            })
            .catch(() => {
                console.log('Could not get entries.');
                reject(false);
            })
        })
    })
}
