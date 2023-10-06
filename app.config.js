import "dotenv/config";

export default {
  expo: {
    name: "Expo Firebase Starter",
    slug: "expo-firebase",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.15.0",
    orientation: "portrait",
    icon: "./assets/flame.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#FFFFFF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      // config: {
      //   googleMaps: {
      //     apiKey: process.env.GOOGLE_MAP_API,
      //   },
      // },
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      databaseURL: process.env.DATABASE_URL,
      apiKeyGoogle: process.env.GOOGLE_MAP_API,
      apiKeyGoogle2: process.env.GOOGLE_MAP_API_2,
    },
  },
};
