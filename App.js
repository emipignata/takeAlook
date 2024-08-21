import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log('Image Picker Result:', result); // Debug line

    if (!result.canceled) {
      console.log('Image URI:', result.uri); // Debug line
      setImageUri(result.uri);
      Alert.alert(
        'Photo Captured',
        `Photo URI: ${result.uri}`,
        [{ text: 'OK', onPress: () => console.log('Photo URI:', result.uri) }],
        { cancelable: false }
      );
    } else {
      alert('Photo capture canceled.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={takePhoto} />
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'red',
  },
});
