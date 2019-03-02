# Viper Scouting

https://exp.host/@jdvera/viper

## Installing Expo
This app was created based on React Native's [recommendation](https://facebook.github.io/react-native/docs/getting-started.html) of using [Expo](https://docs.expo.io/versions/latest/).
1. To view the development version of the app, first install the expo-cli - `npm install -g expo-cli`
   * Also, assuming you do not have an Android Virtual Device installed on your computer, you will also need a physical Android device with the [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) installed
2. After cloning the repo, run either `yarn start` or `expo start`
3. In the automatically opened browser window, either click "Run on Android device/emulator" if you have a virtual device installed, or open the Expo app on you device and scan the QR code
   * The first time you do this, you'll need to give the app permissions.  In my experience, after giving these permissions, you'll also need to close & re-open the Expo app and re-scan the QR code
   * Your device and computer need to be connected to the **exact** same wifi (including any 2.4g / 5g distinctions).  You may also need to disconnect from any VPNs.
   * I've had mixed success using their app, and have never gotten it to work on public wifi, so don't freak out if it gives you a "Something went wrong" error
4. At this point, the app should appear on your device
