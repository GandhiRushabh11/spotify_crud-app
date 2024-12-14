## Technologies Used

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

## Live Project Link 
<a>https://spotify-crud-app.vercel.app</a>

## Getting Started

### Prerequisites

- Node.js 
- npm or yarn
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/GandhiRushabh11/spotify_crud_app
cd spotify_crud_app
```

```bash
cd backend
npm install
```

Then renamed config copy.env to config.env and all key value pair listed below
```ENV
MONGODB_URL = `{Add your mopngo server link }`
PORT = `{Add your port}`
JWT_SECRET = `{Add your JWT }`
JWT_EXPIRE = `{Add your JWT Expire Time }`
frontEnd_Link =`{Add your Frontend server link }`
```
and then run

``` bash
npm run dev

```

### For FrontEnd 

```bash
cd backend
npm install
```

Rename a .copyenv file to .env in the frontend directory with the following content:
```ENV
VITE_SERVER_URL = `{Add your backend server link }`
SPOTIFY_CLIENT_ID = `{Add your spotify client Id}`
SPOTIFY_CLIENT_SECRET = `{Add your spotify  client Secrets}`
```
and then run 

```bash
npm run dev
```

## Application Features

### User Flow

1. **Register**: 
   - The user signs up with a username, email, and password.
   - A JWT token is generated and stored for authenticating future requests.
   - Route look like :- `${URL}/singup`
2. **Login**: 
   - The user logs in using their email and password.
   - Upon successful login, the JWT token is stored, and the user is redirected to the **Dashboard**.
   - Route look like :- `${URL}/login`

3. **Access Dashboard / Spotify API Integration**:
   - Dashboard have search bar that allows users to search for songs.
   - Allowing users to add songs from the search results to their playlists.
   - Route look like :- `${URL}/dashboard`
     
3. **Playlist Management**:
   - Create a dashboard where users can view all their playlists.
   - Implement forms to add new playlists and update existing ones.
   - Enable users to delete playlists
   - Route look like :- `${URL}/manage-playlist`


