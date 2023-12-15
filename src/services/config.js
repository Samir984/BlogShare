const config = {
  BASE_URL: String(import.meta.env.VITE_APP_APPWRITE_BASEURL),
  ProjectID: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
  DataBaseID: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID),
  BUcketID: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID),
};
console.log(config);
export default config;
