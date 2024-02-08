import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'


export default function Button({ label, theme }) {
    if (theme === 'Primary') {
        return (
            <View style={[styles.buttonContainer, { borderWidth: 0.5, borderColor: '#ffd33d', borderRadius: 10 }]} >
                <Pressable style={[styles.button, { backgroundColor: '#fff' }]} onPress={() => alert('You Pressed the Button')} >
                    <FontAwesome name='picture-o' size={18} color="#25292e" style={styles.buttonIcon} />
                    <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
                </Pressable>
            </View>
        )
    }
    return (
        <View style={[styles.buttonContainer]} >
            <Pressable style={styles.button} onPress={() => alert('You Pressed the Button')} >
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});
