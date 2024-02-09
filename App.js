import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { useState, useRef } from 'react';
import CircleButton from './components/CircleButton'
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import IconButton from './components/IconButton'
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSlectedImage] = useState(null)
  const [showAppOptions, setshowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const imageRef = useRef()

  if (status === null) {
    requestPermission()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setSlectedImage(result.assets[0].uri)
      setshowAppOptions(true)
    } else {
      alert('You did not select any image')
    }
  }

  const onReset = () => {
    setshowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
    console.log(isModalVisible)
  }

  const onSaveImageAsync = async () => {
    try {
      if (Platform.OS !== 'web') {
        const localUri = await captureRef(imageRef, {
          height: 440, quality: 1
        })

        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri) {
          alert('Saved')
        }
      } else {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })
        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      }
    } catch (e) {
      console.log(e)
    }
  }


  const onModalClose = () => {
    setIsModalVisible(false)
  }

  return (

    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} style={styles.imageContainer}>
        <ImageViewer placeHolderImageSource={PlaceHolderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {
        showAppOptions ? (
          <View style={styles.optionsContainer} >
            <View style={styles.optionsRow}>
              <>
                <IconButton icon='refresh' label='Reset' onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
              </>
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}  >
            <>
              <Button theme='Primary' label='Choose a Photo' onPress={pickImageAsync} />
              <Button label='Use this Photo' onPress={() => setshowAppOptions(true)} />
            </>
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style='light' />
    </GestureHandlerRootView>
  );

}
const styles = StyleSheet.create({
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#25293e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
})
