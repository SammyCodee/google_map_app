import 'dotenv/config';
import os from 'os';

if (typeof os.availableParallelism !== 'function') {
  os.availableParallelism = () => os.cpus().length;
}

// ✅ Use process.env here instead of Constants
console.log("✅ Loaded API Key:", process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

export default {
  expo: {
    name: "google_map_app",
    slug: "google_map_app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sam.googlemapapp", // 👈 required
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "We need access to your location to show your position on the map",
        NSLocationAlwaysUsageDescription: "We need access to your location to show your position on the map",
      },
    },
    android: {
      package: "com.sam.googlemapapp", // 👈 required
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY, // 👈 required
        },
      },
      "permissions": ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      GOOGLE_MAPS_BASE_URL: process.env.EXPO_PUBLIC_GOOGLE_MAPS_BASE_URL,
      eas: {
        projectId: "6c9cd469-223a-48e5-917a-a66c20db10df"
      }
    }
  },
};