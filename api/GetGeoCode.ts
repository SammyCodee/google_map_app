import axios from "axios";
import Constants from "expo-constants";

const baseUrl = Constants.expoConfig?.extra?.GOOGLE_MAPS_BASE_URL;
const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;

export const GetGeoCode = async (placeName: string) => {
    try {
        const response = await axios.get(`${baseUrl}/geocode/json`, {
            params: {
              address: placeName,
              key: apiKey,
            },
          });
      
          return response.data;
    } catch (error: any) {
        console.error("❌ API error:", error);
    throw new Error(error.message || "Failed to search location.");
    }
}