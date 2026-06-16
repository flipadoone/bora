import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_ID_KEY = "@bora_profile_id";

export async function saveProfileId(profileId: string) {
  try {
    await AsyncStorage.setItem(
      PROFILE_ID_KEY,
      profileId
    );
  } catch (error) {
    console.log(
      "Erro ao salvar profileId:",
      error
    );
  }
}

export async function getProfileId() {
  try {
    return await AsyncStorage.getItem(
      PROFILE_ID_KEY
    );
  } catch (error) {
    console.log(
      "Erro ao buscar profileId:",
      error
    );

    return null;
  }
}

export async function clearProfileId() {
  try {
    await AsyncStorage.removeItem(
      PROFILE_ID_KEY
    );
  } catch (error) {
    console.log(
      "Erro ao limpar profileId:",
      error
    );
  }
}