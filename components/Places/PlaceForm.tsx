import { Text } from "@rneui/base"
import { useCallback, useState } from "react"
import { ScrollView, StyleSheet, TextInput, View } from "react-native"
import { Colors } from "../../contants/Colors"
import Place from "../../models/place"
import Button from "../../UI/Button"
import LocationPicker from "./LocationPicker"
import MyImagePicker from "./MyImagePicker"

interface Props {
    onCreatePlace: (place: Place) => void
}

function PlaceForm({onCreatePlace}: Props) {
    const [enteredTitle, setEnteredTitle] = useState('')

    const [selectedImage, setSelectedImage] = useState('')

    const [pickedLocation, setPickedLocation] = useState()


    function changeTitleHandler(enteredText: string) {
        setEnteredTitle(enteredText)
    }

    function onImageTakenHandler(imageUrl: string) {
        setSelectedImage(imageUrl)
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation.address, {lat: pickedLocation.lat, long: pickedLocation.long})
        onCreatePlace(placeData)
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}></TextInput>
            </View>
            <MyImagePicker onTakeImage={onImageTakenHandler}></MyImagePicker>
            <LocationPicker onLocationPick={pickLocationHandler}></LocationPicker>
            <Button text="Add Place" onPress={savePlaceHandler}></Button>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 24,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }

})

export default PlaceForm