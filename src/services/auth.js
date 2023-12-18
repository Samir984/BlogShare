import { Client, Account, ID } from "appwrite";
import config from "./config";
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

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
      // if (userAccount) {
      //   console.log(userAccount);
      //   this.signIn({ email, password });
      // } else {
      //   return userAccount;
      // }
      return userAccount;
    } catch (error) {
      console.log("error occure in ::auth::createAccount ");
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      console.log("enter signin");
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

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
