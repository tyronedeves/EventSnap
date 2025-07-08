import { Client, Account, ID } from 'react-native-appwrite';

// Appwrite configuration
const config = {
  endpoint: EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite endpoint
  platform: EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your app's bundle ID
  projectId: EXPO_PUBLIC_APPWRITE_PLATFORM, // Replace with your actual project ID
  databaseId: 'YOUR_DATABASE_ID', // Replace with your database ID (if needed)
  userCollectionId: 'YOUR_USER_COLLECTION_ID', // Replace with your user collection ID (if needed)
};

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// Initialize account service
const account = new Account(client);

// Authentication functions
export const appwriteAuth = {
  // Create a new user account
  createAccount: async (email, password, name) => {
    try {
      const newAccount = await account.create(ID.unique(), email, password, name);
      return newAccount;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Sign in user
  signIn: async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const currentAccount = await account.get();
      return currentAccount;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await account.deleteSessions();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      await account.get();
      return true;
    } catch (error) {
      return false;
    }
  }
};

export { client, account, config };