## Technologies Used

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js 
- npm or yarn
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app


cd backend

npm install

then setup all key and server port (8000) in config copy.env (Please rename in to config.env)

and then run

```npm run dev

For client

cd frontend

npm install

Rename a .copyenv file to .env in the frontend directory with the following content:

VITE_SERVER_URL = `{Add your backend server link }`
SPOTIFY_CLIENT_ID = `{Add your spotify client Id}`
SPOTIFY_CLIENT_SECRET = `{Add your spotify  client Secrets}`

and then run 

```npm run dev

## Application Features

### User Flow

1. **Register**: 
   - The user signs up with a username, email, and password.
   - A JWT token is generated and stored for authenticating future requests.
   - Route look like :- `${URL}/singin`
2. **Login**: 
   - The user logs in using their email and password.
   - Upon successful login, the JWT token is stored, and the user is redirected to the **Dashboard**.
   - Route look like :- `${URL}/login`

3. **Access Dashboard**:
   - The user can view, create, edit, and delete tasks.
   - All API requests are authenticated using the stored JWT token.
   - Route look like :- `${URL}/dashboard`


![image](https://github.com/user-attachments/assets/0bb6780a-d7e7-4603-ac36-7b1c82dde95d)
![image](https://github.com/user-attachments/assets/ea870a32-85c8-48da-b308-af7593bb5642)
`In progress`
![image](https://github.com/user-attachments/assets/639994eb-4913-461b-a1b6-db7f2af1f88a)



