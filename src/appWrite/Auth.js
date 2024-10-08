import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // Call login if the account is successfully created
                return await this.login({ email, password });
            } 
            return userAccount;
            
        } catch (error) {
            // Handle errors more gracefully if needed, or log them
            throw new Error(`Account creation failed: ${error.message}`);
        }
    }
    
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {

            throw new Error(`Login failed: ${error.message}`);
        }
    }
      async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    
    }
     async logout(){
        try {
             return this.account.deleteSessions()
        } catch (error) {
            console.log("App write service_logout-errror"+error);
            
        }
     }
}

const authService = new AuthService();
export default authService;
