import { Pressable, StyleSheet, Text } from "react-native"
import { Colors } from "../contants/Colors";

interface Props {
    onPress: () => void,
    text: string,
}

function Button(props: Props) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset:{width: 1, height: 1},
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary500
    }
})

export default Button