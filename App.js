import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react';
import CircleButton from './components/CircleButton'
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import IconButton from './components/IconButton'
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSlectedImage] = useState(null)
  const [showAppOptions, setshowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

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

  const onSaveImageAsync = () => {

  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
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
      <StatusBar style='auto' />
    </View>
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
});
