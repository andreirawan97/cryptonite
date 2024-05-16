
# Cryptonite

Cryptonite is a Crypto Exchange Trading page.
This app was made for Pintu take home test.

![Kapture 2024-05-16 at 20 53 24](https://github.com/andreirawan97/cryptonite/assets/25521515/16ac2ebf-aca6-45bb-ad4d-b6f823059511)


## Tech Stacks
This app uses:

- React Native with Expo.
- EAS to build the APK and upload it to the server.
- No additional library used to do the REST API fetching and WebSocket (I installed Axios just in case but decide not to use it).
- I add some unit test because I do Test Driven Development when developing the Utility functions.
- For the API Provider, I use Crypto Facilities (https://docs.cryptofacilities.com/#introduction). I used it for both the candlestick and order book data.
- For the Candlestick Chart, I use `react-native-wagmi-charts`.
- For the Order Book, I manually create the table.
- For the Bottom Tab, I use React Navigation.
- For the UI Library, I use Gluestack UI (For the Modal, Select, etc).



