import { View } from "react-native/types"
import PlaceForm from "../components/Places/PlaceForm"
import Place from "../models/place"
import { insertPlace } from "../utils/database"

function AddPlace({ navigation }) {
    async function createPlaceHandler(place: Place) {
        await insertPlace(place)
        navigation.navigate('AllPlaces', { place: place })
    }
    return (
        <PlaceForm onCreatePlace={createPlaceHandler}>

        </PlaceForm>
    )

}

export default AddPlace