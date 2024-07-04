# Blog Project
### This is a fully responsive Fullstack blog app built using MERN(MongoDB, Express.js, React, Node.js) stack.

![image](https://github.com/MohammedHamza0631/MERN-Blog/assets/91896151/336d89f4-1a31-446c-9855-23c3a50849f3)

## Access the site <a href="https://hamza-blog-teal.vercel.app/">here</a>.
## Backend Repo <a href="https://github.com/MohammedHamza0631/Hamza-Blog-server">here</a>.

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
- if not redirected then visit http://localhost:3000 to view the website in Live action.
