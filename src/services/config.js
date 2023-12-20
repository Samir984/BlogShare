const config = {
  BASE_URL: String(import.meta.env.VITE_APP_APPWRITE_BASEURL),
  ProjectID: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
  DataBaseID: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
  CollectionId: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID),
  BucketID: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID),
};
config;
export default config;
