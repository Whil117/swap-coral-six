# **Swap Coral Six - Player Music**

the succesor of Spotify
Swap coral six is a project about music inspired in Spotify, I se the Spotify API combined ith Graphql and you can listen music without limits and announcements totally free
![](https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png)

## **Environment Variables**

This Application needs some variables.

| **1.NEXT_PUBLIC_SPOTIFY_CLIENT_ID**     | _--YOUR SPOTIFY CLIENT ID--_       |
| --------------------------------------- | ---------------------------------- |
| **2.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET** | _--YOUR SPOTIFY CLIENT SECRET--_   |
| **3.NEXT_PUBLIC_GRAPHQL_SERVER_URL**    | _---URL LOCALHOST OR DOMAIN--_     |
| **4.NEXTAUTH_SECRET**                   | _---AUTHSCRET FOR NEXTAUTH KEY---_ |
| **5.MONGODB_URI**                       | _---URL MONGODB CONNECTION---_     |

**1.NEXT_PUBLIC_SPOTIFY_CLIENT_ID & NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET **

The first step is go to https://developer.spotify.com/dashboard/applications and create a project
![](https://res.cloudinary.com/whil/image/upload/v1668403391/SWAAAP_zz545x.png)
So This project from Console Spotify has a client id and a client secret

**2.NEXT_PUBLIC_GRAPHQL_SERVER_URL**````
I recomend create a env.local in your PC and put this url

Example:
NEXT*PUBLIC_GRAPHQL_SERVER_URL:\_http://localhost:3000/api/graphql*
but in a web plataform for example vercel. You need put this variable
NEXT_PUBLIC_GRAPHQL_SERVER_URL:https://domain.example/api/graphql*

**3.NEXTAUTH_SECRET**
You need create a key unique for your app. this is for development and production
Example:
NEXTAUTH*SECRET=\_cvjWtBySvxBzkKMcHtMj3VNcQW*

**4.MONGODB_URI**
You need create a database for save data from swap coral six
Example:
MONGODB*URI:\_mongodb+srv://usernamepassword@clusterexample.mongodb.net/?retryWrites=true&w=majority*

## Structure Folders

![](https://res.cloudinary.com/whil/image/upload/v1668404763/FOLDERS_etamdm.png)

**1.BACKEND GRAPHQL**
If you want to know how i created the backend. you can watch the folder, I'm using microservices for this project with apollo-server-micro
apollo/server/graphpl

**2. FRONTEND**
I have created a components for reuse this logic in other pages. You can watch this components using in pages

**3.CONFIG**
1.Config for GRAPHQL SERVER AND MONGODB URI
![](https://res.cloudinary.com/whil/image/upload/v1668405185/CONNFIGG_gphkqw.png)

2.Config for Spotify Credentials and create Token Public
![](https://res.cloudinary.com/whil/image/upload/v1668405209/CONFI2_bcyfnx.png)
