import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const initDB = () => {
    
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
    
            console.log('Database opened.');
    
            DB.executeSql('CREATE table IF NOT EXISTS Calendar(ID INTEGER PRIMARY KEY, Food text, Calories Integer, Date text)')
            .then(() => {
                console.log('Table : OKAY');
                resolve(true);
            })
            .catch((e) => {
                console.log('Something went wrong, please check line 20 of database.js.');
                reject(e);
            });
    
        })
    })

};

export const checkUser = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
    
            console.log('Database opened.');
    
            DB.executeSql('CREATE table IF NOT EXISTS User(Weight integer, Height integer, Age integer, CalorieIntake integer)')
            .then(() => {
                DB.executeSql("SELECT * from User", [])
                .then(([results]) => {
                    resolve(results.rows);
                })
                .catch(() => {
                    console.log('Could not get user.');
                    reject(e);
                })
            })
            .catch(() => {
                console.log('Could not create user table.');
            });
        })
    })

}

export const insertUserData = (weight, height, age, calorieIntake) => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
    
            console.log('Database opened.');
    
            DB.executeSql(`INSERT INTO User (Weight, Height, Age, CalorieIntake) VALUES(${weight},${height}, ${age}, ${calorieIntake})`)
            .then(() => {
                console.log('User data inserted');
                resolve(true);
            })
            .catch((e) => {
                console.log('Could not insert data.');
                reject(e);
            });
        })
    })
}

export const resetDB = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
            DB.executeSql('DROP TABLE Calendar')
            .then(() => {
                DB.executeSql('DROP TABLE User')
                .then(() => {
                    DB.close()
                    .then(status => {
                        console.log('DB closed.');
                        resolve(true);
                    })
                })
                .catch((e) => {
                    console.log('Tried to drop User table, nothing exists.');
                    reject(e);
                })
            })
            .catch(() => {
                console.log('Tried to drop Calendar table, nothing exists.');
        
                DB.executeSql('DROP TABLE User')
                .then(() => {
                    resolve(true);
                })
                .catch((e) => {
                    console.log('Tried to drop User table, nothing exists.');
                    reject(e);
                })
            })
        })
        .catch((e) => {
            reject(e);
        });
    })

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
            DB.executeSql(`DELETE FROM Calendar WHERE ID = "${ID}"`)
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

export const getDetails = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'diary.db', location: 'Library'})
        .then(DB => {
            DB.executeSql(`SELECT * FROM User`, [])
            .then(([results]) => {
                resolve(results.rows);
            })
            .catch((e) => {
                reject(e);
            })
        })
    })
}