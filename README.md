# Location Search App 📍

A React Native application that integrates Google Maps and Places API for location search functionality with search history features.

# 🚀 Features

🔍 Search for places using Google Places API

🗺️ Display map using Google Maps

🕘 View previous search history (locally saved)

⚡ Built with Expo + Dev Client for fast iteration

## Prerequisites

Before you begin, ensure you have:

-   Node.js (LTS version)
-   npm or yarn
-   Android Studio (for Android development)
-   Google Maps API key
-   Expo CLI (`npm install -g expo-cli`)
-   EAS CLI (`npm install -g eas-cli`)
-   EAS account (required for building with dev client)

## Emulator Setup

-   This project uses Android API 34 (Android 14.0, codename UpsideDownCake) for testing.

1.  Open Android Studio.
2.  Go to Device Manager → Create New Virtual Device.
3.  Choose any Pixel device or use the default device (e.g., Pixel 6).
4.  Select API Level 34 (Android 14.0 UpsideDownCake) system image.
5.  Finish setup and launch emulator.

-   ✅ Make sure the emulator is running before starting your app.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone [your-repo-url]
    cd [your-repo-name]
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. Environment Configuration:

    - Create a `.env` file in the root directory
    - Add your Google Maps API key:
        ```
        EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
        ```
    - Must use EXPO_PUBLIC_XXXX to be used in the client side for fetching api purpose

    - Go to https://expo.dev/accounts

    - Choose your project → Configuration → Environment variables

    - Add the variables by selecting "+ Add Variables", input the EXPO_PUBLIC_GOOGLE_MAPS_API_KEY and value

4. Android Development Setup:

    ```bash
    # Login to EAS
    eas login

    ❗ You must have an EAS account.

    # Create development build
    eas build --profile development --platform android
    ```

## Running the App

1. Start the development server:

    ```bash
    npx expo start --dev-client
    ```

2. Manually open the app on the emulator:

    If it doesn't auto-connect to Metro:

    Copy the Metro URL shown in terminal (e.g. exp://192.168.0.x:8081)

    Open the Expo Go or custom dev client app on your emulator

    Tap "Enter URL manually" and paste it in

    ⚠️ Note: This is required because npx expo start with "a" shortcut won’t work with dev client builds.

3. Clear cache if needed:
    ```bash
    npx expo start --dev-client --clear
    ```

## Project Structure

```
├── app/
│   ├── (tabs)/             # Screens using tab navigation
│   │   ├── index.tsx       # Main map screen
│   │   └── profile.tsx     # Profile screen (placeholder)
│   └── _layout.tsx         # Root layout
├── components/             # Reusable components
│   └── SearchInput.tsx     # Search bar with clear & history
├── utils/                  # Utility functions
├── assets/                 # Static files (icons, images)
└── .env                    # API key (not committed)
```

## Tech Stack

-   React Native with Expo
-   TypeScript
-   Google Maps API
-   Expo Router for navigation
-   NativeWind (Tailwind CSS) for styling
-   Expo SecureStore for local storage
-   EAS Build for development builds

## Development Notes

-   Expo Router enables file-based routing (app/(tabs)/index.tsx)
-   Styling is implemented using NativeWind (Tailwind CSS)
-   Search history stored with expo-secure-store
-   Map functionality is implemented using react-native-maps
-   Maps rendered via react-native-maps with custom markers
-   Places autocomplete via https://maps.googleapis.com/maps/api/place/autocomplete/json

## License

[MIT]
