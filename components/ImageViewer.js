import { Image, StyleSheet } from "react-native"

function ImageViewer({ placeHolderImageSource }) {
    return (
        <Image source={placeHolderImageSource} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 22,
    }
})


export default ImageViewer