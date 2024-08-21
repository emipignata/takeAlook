import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    // Solicitar permisos para la cámara
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de cámara requerido', 'Se requiere permiso para acceder a la cámara');
      return;
    }

    // Tomar foto
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      Alert.alert('Foto capturada', `URL de la imagen: ${uri}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Tomar Foto" onPress={pickImage} />
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.text}>Guille, esto fue muy fácil</Text>
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
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderColor: 'red',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
