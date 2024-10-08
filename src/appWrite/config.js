import { Client, Databases, ID, Query, Storage} from "appwrite";
import conf from "../conf/conf";
export class Service {
     client;    
     databases;
     bucket;
    constructor() {
        this.client=new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createpost({ title, content, featuredimage, slug,status, userid }) {
        
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid ,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updatePost({title,content,featuredimage,status,slug}){
        try {
            
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                 slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            
           return  await this.databases.listDocuments(

                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
            
        }
      
       
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId){
         try{
        
            await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId,
        
        )
        return true
    }
    catch(error){
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false
     
    }
    }
     getFilepreview(fileId){
        console.log("File ID passed:", fileId); 
        let mode = "admin";
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
            mode,

        )

     }




}
const service=new Service()
export default service

     



