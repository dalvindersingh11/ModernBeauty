// utils/ToastUtils.js
import Toast from 'react-native-simple-toast';

export const showToast = (
 message: string,
 duration = Toast.SHORT,
 gravity = Toast.BOTTOM
) => {
 Toast.showWithGravity(message, duration, gravity);
};
