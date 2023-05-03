import { Text } from "@rneui/base"
import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { Colors } from "../contants/Colors"
import OutlinedButton from "../UI/OutlinedButton"
import { fetchPlaceDetails } from "../utils/database"

function PlaceDetails({ router, navigation }) {
    const [fetchedPlaceDetais, setFetchedPlaceDetails] = useState()
    function showOnMapHandler() {
        navigation.navigate('Map')

    }
    const selectedPlaceId = router.params.placeId
    useEffect(() => {
        async function loadPlaceDetails() {
            const place = await fetchPlaceDetails(selectedPlaceId)
            setFetchedPlaceDetails(place)
            navigation.setOptions({
                title: place.title
            })
        }
        loadPlaceDetails()
    }, [selectedPlaceId])
    if (!fetchedPlaceDetais) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        )
    }
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: fetchedPlaceDetais.imageUrl }}>
            </Image>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlaceDetais.address}</Text>
                </View>
                <OutlinedButton name={"map"} onPress={showOnMapHandler} text="View on Map" size={16}></OutlinedButton>
            </View>

        </ScrollView>
    )

}
const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})
export default PlaceDetails