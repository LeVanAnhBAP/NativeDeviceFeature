import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet, View } from 'react-native';
import IconButton from '../UI/IconButton';

export default function Map({ navigation }) {

    const [selectLocation, setSelectLocation] = useState()

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
    }

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude
        const long = event.nativeEvent.coordinate.longitude

        setSelectLocation({ lat: lat, long: long })

    }
    const savePickedLocationHandler = useCallback(() => {
        if (!selectLocation) {
            Alert.alert(
                'No location picked!',
                'You have to pick location {by tapping on the map} first!'
            )
            return
        }
        navigation.navigate('AddPlace', { pickedLat: selectLocation.lat, pickedLong: selectLocation.long })
    }, [navigation, selectLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton onPress={savePickedLocationHandler} name={'save'} size={16} color={tintColor} />
        })
    }, [navigation, savePickedLocationHandler])

    return (
        <View style={styles.container}>
            <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
                {selectLocation && (<Marker title='Picked Location' coordinate={{ latitude: selectLocation.lat, longitude: selectLocation.long }}>

                </Marker>)
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});