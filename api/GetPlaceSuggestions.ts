import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_GOOGLE_MAPS_BASE_URL;
const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const GetPlaceSuggestions = async (query: string) => {
    if (query.length < 3) return [];

  const apiUrl = `${baseUrl}/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === "OK" && data.predictions) {
      return data.predictions.map((prediction: any) => prediction.description);
    } else {
      console.warn("No predictions found:", data.status);
      return [];
    }
  } catch (error) {
    console.error("Suggestions API error:", error);
    return [];
  }
}