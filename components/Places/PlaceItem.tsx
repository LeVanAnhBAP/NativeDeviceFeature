import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../contants/Colors"
import Place from "../../models/place"

interface Props {
    place: Place,
    onSelect: (id: string) => void
}

function PlaceItem(props: Props) {
    return (
        <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={props.onSelect,bind(this, props.place.id)}>
            <View>
                <Image style={styles.image} source={{ uri: props.place.imageUrl }}>
                </Image>
                <View style={styles.info}>
                    <Text style={styles.title}>
                        {props.place.title}
                    </Text>
                    <Text style={styles.address}>
                        {'Nguyen Chi Phuong, Da Nang'}
                    </Text>
                </View>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },

    address: {
        color: Colors.gray700,
        fontSize: 18

    }
})

export default PlaceItem