# Location Search App 📍

A React Native application that integrates Google Maps and Places API for location search functionality with search history features.

## Prerequisites

Before you begin, ensure you have:

-   Node.js (LTS version)
-   npm or yarn
-   Android Studio (for Android development)
-   Google Maps API key
-   Expo CLI (`npm install -g expo-cli`)
-   EAS CLI (`npm install -g eas-cli`)

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

3. Environment Configuration:

    - Create a `.env` file in the root directory
    - Add your Google Maps API key:
        ```
        GOOGLE_MAPS_API_KEY=your_api_key_here
        ```

4. Android Development Setup:

    ```bash
    # Login to EAS
    eas login

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

    Open the browser and paste the URL shown in the terminal (e.g., exp://127.0.0.1:8081)

    Or run this command to send it to the emulator:

    ```bash
    adb shell input text 'exp://127.0.0.1:8081'
    ```

    Press Enter in the emulator to launch the app

3. Clear cache if needed:
    ```bash
    npx expo start --dev-client --clear
    ```

## Project Structure

```
├── app/
│   ├── (tabs)/          # Tab-based screens
│   │   ├── index.tsx    # Main map screen
│   │   └── profile.tsx  # Profile screen
│   └── _layout.tsx      # Root layout
├── components/          # Reusable components
│   └── SearchInput.tsx  # Search input component
├── utils/              # Utility functions
└── assets/            # Static assets
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

-   The app uses file-based routing with Expo Router
-   Styling is implemented using NativeWind (Tailwind CSS)
-   Search history is persisted using Expo SecureStore
-   Map functionality is implemented using react-native-maps

## License

[Your License]
