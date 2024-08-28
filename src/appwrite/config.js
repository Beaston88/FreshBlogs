import conf from '../conf/conf' 

import { Client, ID, Databases, Storage, Query } from "appwrite";
// Refer document of appwrite of how to create databases.
// 5. Now we have created authentication services. We will be creating our new service for databases;
export class Service{
    client = new Client();
    databases;
    bucket; // 5.1 : This is for Storage
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // 5.2 slug is acting as document Id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite error :: createPost :: error ",error);
            
        }
    }

    // 5.2 : We are taking slug separately because we defined slug as our document Id. So instead of calling it from the object we are directly using it.
    async updatePost(slug , {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite error :: updatePost :: error ",error);
        }
    }

    async deletePost (slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            return true;
        }
        catch(error){
            console.log("Appwrite error :: deletePost :: error ",error);
            return false;
        }
    }

    // 5.3 : this is to get one document through ID
    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
        } catch (error) {
            console.log("Appwrite error :: getPost :: error ",error);
            return false;
        }
    }

    // 5.4 : To get all document at once

    async getPosts (queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries, // 5.4.1 : If we had not defined the queries as a parameter then we will be defining here instead of just writing queries.
            )
        } catch (error) {
            console.log("Appwrite error :: getPosts :: error ",error);
            return false;
        }
    }

    // 6.0 : Another Service : File Uploading - although we should have declared in separate file but its okay. And we are using the service of storage which we have instantiated in bucket variable

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique, 
                file
            )
        } catch (error) {
            console.log("Appwrite error :: uploadFile :: error ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: error ",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
};

const service = new Service();

export default service;