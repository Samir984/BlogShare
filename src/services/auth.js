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

class AppwriteClient {
  constructor() {
    this.client = new Client()
      .setEndpoint(config.BASE_URL) // Your API Endpoint
      .setProject(config.ProjectID); // Your project ID

    this.account = new Account(this.client);
  }

  createUser(userId, email, password) {
    return this.account.create(userId, email, password);
  }
}

export default new AppwriteClient();
