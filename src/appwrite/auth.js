import conf from '../conf/conf' 

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    // 3. Now suppose we are not using appwrite. All we have to change is constructor value of creation for that backend and also change a bit of try and catch
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // 4. Flow
    /*
      4.1 User created account - createAccount()
      4.2 once created he/she get logged in automatically throw return of createAccount - login()
      4.3 Now user may want to check whether he is logged in or not - getCurrentUser()
      4.4 After wrinting blogs user want to log out - logout()

      4.5 - all are accessible throw the object which we created by the help of dot operator - authservice.4.1/4.2/4.3/4.4
      Tip - Now we can use services whether we are using firebase or our own service. just need to change contructor and then some method inside these asyncs like create,deleteSessions according to the service we choose. We can use this js file whenever we will do project on appwrite. 

    */ 
    async createAccount ({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
            
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite error :: getCurrentUser :: error ",error);
            
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite error :: logout :: error ",error);
            
        }
    }
};
const authService = new AuthService();
export default authService;