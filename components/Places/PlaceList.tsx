import { useNavigation } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../contants/Colors"
import Place from "../../models/place"
import PlaceDetails from "../../screens/PlaceDetails"
import PlaceItem from "./PlaceItem"

interface Props {
    places: Place[],
}

function PlaceList({ places }: Props) {
    const navigation = useNavigation()
    function selectedPlaceIdHandle(id: string) {
        navigation.navigate('PlaceDetails', {
            placeId: id
        })
    }
    if (!places || places.length == 0) {
        return (
            <View style={styles.fallBackContainer}>
                <Text style={styles.fallBackText}>
                    No places added yet - start adding some!
                </Text>
            </View>
        )
    }

    return (
        <FlatList style={styles.list} data={places} keyExtractor={(item) => item.id} renderItem={(item) => <PlaceItem onSelect={selectedPlaceIdHandle} place={item.item} />}>
        </FlatList>
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    fallBackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fallBackText: {
        fontSize: 16,
        color: Colors.accent500
    }
})

export default PlaceList