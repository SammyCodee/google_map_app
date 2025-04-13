import * as SecureStore from "expo-secure-store";

export async function savedSearchHistory(history: string[]) {
    await SecureStore.setItemAsync("searchHistory", JSON.stringify(history));
}

export async function getSearchHistory(): Promise<string[]> {
    const result = await SecureStore.getItemAsync("searchHistory");

    return result ? JSON.parse(result) : [];
}
