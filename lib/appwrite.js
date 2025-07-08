import { Client, Account, ID } from 'react-native-appwrite';

// Appwrite configuration
const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite endpoint
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM, // Your app's bundle ID/platform
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID, // Your database ID (optional for auth)
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID, // Your user collection ID (optional for auth)
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
      console.error('Create account error:', error);
      throw new Error(error.message);
    }
  },

  // Sign in user
  signIn: async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error(error.message);
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const currentAccount = await account.get();
      return currentAccount;
    } catch (error) {
      console.error('Get current user error:', error);
      throw new Error(error.message);
    }
  },

  // Sign out user - improved with better error handling
  signOut: async () => {
    try {
      // Try to delete all sessions
      await account.deleteSessions();
    } catch (error) {
      // If deleteSessions fails, try to delete current session
      try {
        await account.deleteSession('current');
      } catch (deleteError) {
        // If both fail, it might be because there's no active session
        // This is not necessarily an error, so we'll just log it
        console.log('No active session to delete or delete failed:', deleteError.message);
      }
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