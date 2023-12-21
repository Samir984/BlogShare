import { Client, Databases, Storage, ID } from "appwrite";
import config from "./config";

class DBService {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.BASE_URL) // Your API Endpoint
      .setProject(config.ProjectID); // Your project ID

    this.database = new Databases(this.client);
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

  async updatePost(blogId, title, content, featuredImage) {
    try {
      return await this.database.updateDocument(
        config.DataBaseID,
        config.CollectionId,
        blogId,
        {
          title,
          content,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(blogId) {
    try {
      await this.database.deleteDocument(
        config.DataBaseID,
        config.CollectionId,
        blogId
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(blogId) {
    try {
      return await this.database.getDocument(
        config.DataBaseID,
        config.CollectionId,
        blogId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getAllPosts() {
    try {
      return await this.database.listDocuments(
        config.DataBaseID,
        config.CollectionId
      );
    } catch (error) {
      console.log("Appwrite serive :: getAllPosts :: error", error);
    }
  }
  //bucket service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.BucketID, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.BucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.BucketID, fileId);
  }
}

const dbService = new DBService();
export default dbService;
