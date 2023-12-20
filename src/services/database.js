import { Client, Account, ID } from "appwrite";
import config from "./config";

class DBService {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.BASE_URL) // Your API Endpoint
      .setProject(config.ProjectID); // Your project ID

    this.database = new Database(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(title, content, featuredImage, userId) {
    try {
      return await this.database.createDocument(
        config.DataBaseID,
        config.CollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("error: createPost::database");
    }
  }
}

const dbService = new DBService();
export default dbService;
