import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text } from '@rneui/base';
import { Colors } from '../../contants/Colors';
import OutlinedButton from '../../UI/OutlinedButton';

interface Props {
  onTakeImage: (arg0: string) => void
}

export default function MyImagePicker({onTakeImage}: Props) {
  const [image, setImage] = useState('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (status?.status == ImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (status?.status == ImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      )
      return false
    }

    return true
  }

  const pickImage = async () => {
    const hasPermisison = await verifyPermission()
    if (!hasPermisison) {
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onTakeImage(result.assets[0].uri)
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>
  if (image) {
    imagePreview = <Image style={styles.image} source={{ uri: image }}></Image>
  }

  return (
    <View style={styles.imagePreview}>
      <OutlinedButton text="Pick an image from camera roll" onPress={pickImage} name={'camera'} size={16} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%'
  }
})