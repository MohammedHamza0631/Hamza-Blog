# Blog Project
### This is a fully responsive Fullstack blog app built using MERN(MongoDB, Express.js, React, Node.js) stack.

# Description
### Home Page:
![image](https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/336d89f4-1a31-446c-9855-23c3a50849f3)

### Login and Register Page: 
<img src="https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/8b8650a6-eb1e-42a7-8dd9-9e156571b2c1" width=500px></img> <img src="https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/7fc70293-377d-4aad-9687-1ce123a171ca" width=500px></img>
### Create Post Page:
<img src="https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/27972296-637e-4527-a080-81d762054034"></img>

### Edit Post Page:
<img src="https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/5f0a116f-e270-4133-bf0d-0511f99c8ad6"></img>

### Single Post Page:
<img src="https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/fff76326-1b3e-45fb-8a54-8fa7af60d483"></img>

## Cloning the project:
You can clone the project by running the following command in the terminal:

```
git clone https://github.com/MohammedHamza0631/MERN-Blog.git
```

## Running the project on Local Machine:
- Clone the repository into a folder, say **my-blog**.
- Navigate to the project folder:
  
    ```
    cd my-blog
    ```
- open the terminal and go to client folder and start the client side:
  
 ```
  cd client
  npm install 
  npm start 
 ```
- open another terminal and go to server folder and start the server side:

```
  cd server
  npm install 
```
- in ```server/index.js```:
  
  replace ```process.env.MONGO_URL``` with your own Mongo Atlas connection string and ```process.env.SECRET``` with your own secret string.
  
- After making the above changes, run the following command in the terminal of server directory:
  ```
  nodemon index.js
  ```
