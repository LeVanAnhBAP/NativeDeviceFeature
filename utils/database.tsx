import * as SQLite from "expo-sqlite"
import Place from "../models/place"
const database = SQLite.openDatabase('places.db', '1')

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            long REAL NOT NULL
        )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise
}

export function insertPlace(place: Place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO places (title, imageUrl, address, lat, long) VALUES (?, ?, ?, ?, ?)`, 
            [place.title, place.imageUrl, place.address, place.location.lat, place.location.long],
            (_, result) => {
                console.log(result)
                resolve(result)
            },
            (_, error) => {
                reject(error)
            },
            )
        })
    })
    return promise
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT FORM places`,
            [],
            (_, result) => {
                console.log(result)
                const places = []
                for(const dp of result.rows._array) {
                    places.push(new Place(dp.title, dp.imageUrl, dp.address, {lat: dp.lat, long: dp.long}, dp.id))
                }
                resolve()
            },
            (_, error) => {
                reject(error)
            },
            )
        })
    })
    return promise
}

export function fetchPlaceDetails(id: string) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT FORM places WHERE id = ?`,
            [id],
            (_, result) => {
                console.log(result)
                resolve(result.rows._array[0])
            },
            (_, error) => {
                reject(error)
            },
            )
        })
    })
    return promise
}
