import { isImagePickerCancelled, pickImageFromSource } from '../../../utils/imagePicker';

export const pickProfileImage = async (source = 'gallery') => {
  try {
    const image = await pickImageFromSource(source, {
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.8,
    });

    return image;
  } catch (error) {
    if (!isImagePickerCancelled(error)) {
      console.log('Profile image pick error:', error);
    }
    return null;
  }
};
