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

  async createBlog(title, content, featuredImage, userId) {
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

  async updateBlog(blogId, title, content, featuredImage) {
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
      console.log("Appwrite serive :: updateBlog :: error", error);
    }
  }

  async deleteBlog(blogId) {
    try {
      await this.database.deleteDocument(
        config.DataBaseID,
        config.CollectionId,
        blogId
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteBlog :: error", error);
      return false;
    }
  }

  async getBlog(blogId) {
    try {
      return await this.database.getDocument(
        config.DataBaseID,
        config.CollectionId,
        blogId
      );
    } catch (error) {
      console.log("Appwrite serive :: getBlog :: error", error);
      return false;
    }
  }

  async getAllBlogs() {
    try {
      return await this.database.listDocuments(
        config.DataBaseID,
        config.CollectionId
      );
    } catch (error) {
      console.log("Appwrite serive :: getAllBlogs :: error", error);
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
