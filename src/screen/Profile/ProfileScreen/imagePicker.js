import ImagePicker from 'react-native-image-crop-picker';

export const pickProfileImage = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    });

    return image;
  } catch (error) {
    console.log('Image pick cancelled');
    return null;
  }
};
