import { Pressable, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

interface Props {
    onPress: () => void,
    name: string,
    size: number,
    color?: string
}

function IconButton(props: Props) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={props.onPress}>
            <Icon name={props.name} color={props.color} size={props.size} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 4,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
})

export default IconButton