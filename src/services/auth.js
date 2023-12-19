import { Client, Account, ID } from "appwrite";
import config from "./config";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.BASE_URL) // Your API Endpoint
      .setProject(config.ProjectID); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      console.log(email, name, password);
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.signIn(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error occure in ::auth::createAccount ");
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async signOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  async signInWithGoogle() {
    try {
      return await this.account.createOAuth2Session(
        "google",
        "http://localhost:5173/",
        "http://localhost:5173/2/signin"
      );
    } catch (error) {
      console.log("Appwrite service ::sign with google:: auth");
    }
  }
}

const authService = new AuthService();
export default authService;
