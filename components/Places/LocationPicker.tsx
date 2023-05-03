import { Alert, Image, StyleSheet, View } from "react-native"
import { Colors } from "../../contants/Colors"
import OutlinedButton from "../../UI/OutlinedButton"
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location"
import { useEffect, useState } from "react"
import getMapPreview, { getAddress } from "../../utils/Location"
import { Text } from "@rneui/base"
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native"

interface Props {
    onLocationPick: (location) => void
}

function LocationPicker({ onLocationPick }: Props) {

    const isFocused = useIsFocused()

    const route = useRoute()


    const navigation = useNavigation()
    const [pickedLocation, setPickedLocation] = useState()

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = { lat: route.params.pickedLat, long: route.params.pickedLong }
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = getAddress(pickedLocation.lat, pickedLocation.long)
                onLocationPick( {...pickedLocation, address: address})
            }
        }
        handleLocation()
    }, [pickedLocation, onLocationPick])

    const [status, requestPermission] = useForegroundPermissions()

    async function verifyPermission() {
        if (status?.status == PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }

        if (status?.status == PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            )
            return false
        }

        return true
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync()
        console.log(location)
        setPickedLocation({ lat: location.coords.latitude, long: location.coords.longitude })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        console.log(getMapPreview(pickedLocation.lat, pickedLocation.long))

        locationPreview = (
            <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.long) }}></Image>
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.action}>
                <OutlinedButton onPress={getLocationHandler} name={"location"} size={16} color={'white'} text={"Location user"}></OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} name={"map"} size={16} color={'white'} text={"Pick on Map"}></OutlinedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})

export default LocationPicker