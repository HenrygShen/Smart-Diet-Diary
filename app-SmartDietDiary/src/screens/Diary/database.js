import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const initDB = () => {
    SQLite.openDatabase({name: 'diary.db', location: 'Library'})
    .then(DB => {

        console.log('Database opened.');

        DB.executeSql('CREATE table IF NOT EXISTS Calender(Food text, Calories Integer, Date text)')
        .then(() => {
            console.log('Tables created');
            DB.close()
            .then(status => {
                console.log('DB closed.');
            })
        })
        .catch(() => {
            console.log('Something went wrong, please check line 22.');
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
    SQLite.openDatabase({name: 'diary.db', location: 'Library'})
    .then(DB => {
        const epoch = (new Date).getTime().toString();
        DB.executeSql(`INSERT into Calender (Food, Calories, Date) VALUES ("${name}", ${calories}, ${epoch})`)
        .then(() => {
            DB.executeSql("SELECT * from Calender", [])
            .then(([results]) => {
                for (let i = 0;i < results.rows.length; i++) {
                    console.log('Item 1 is ', results.rows.item(i));
                }
                console.log('Length is ', results.rows.length);
            })
            .then(() => {
                DB.close()
                .then(status => {
                    console.log('DB closed.');
                })
            })
        })
        .catch((e) => {
            console.log('Failed to insert data.', e);
        })
    })
}
