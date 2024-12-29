import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Email",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize() {
            // Add logic here to look up the user from the credentials supplied
            
            return {
                name : "Sami",
                id:"1",
                email : "hsamaiuddin405@gmail.com"
            }

        
          }
        })
      ]
});


export const GET = handler ;
export const POST = handler ; 