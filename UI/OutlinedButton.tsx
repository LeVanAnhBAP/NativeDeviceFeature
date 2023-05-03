import { Pressable, StyleSheet, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Colors } from "../contants/Colors"

interface Props {
    onPress: () => void,
    name: string,
    size: number,
    color?: string,
    text: string
}

function OutlinedButton(props: Props) {

    return (
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={props.onPress}>
            <Icon style={styles.icon} name={props.name} size={props.size} color={props.color}>

            </Icon>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500

    },
    pressed: {
        opacity: 0.7

    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    }
})

export default OutlinedButton