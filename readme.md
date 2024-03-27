# Midnight

Midnight is an instant messaging social platform that replicates the communication experience of voice calls, video calls, text messaging, and media/file sharing built using the PERN stack.

## Features

- **Real-Time Communication**: Utilizes Socket.io for real-time messaging, voice calls, and video calls.
- **Text Messaging**: Users can send text messages in real-time.
- **Voice Calls**: Users can make voice calls to other users.
- **Video Calls**: Users can make video calls to other users.
- **Media/File Sharing**: Supports sharing images, videos, files, etc., among users.
- **User Authentication**: Secure user authentication and authorization system.
- **Responsive Design**: Provides a seamless experience across devices of various screen sizes.
- **Search Functionality**: Users can search for other users or conversations.
- **Notifications**: Users receive real-time notifications for new messages, calls, etc.

## Technologies Used

### Backend

- **Express.js**: Web application framework for Node.js.
- **TypeORM**: Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **TypeGraphQL**: Modern framework for building GraphQL APIs with TypeScript.
- **Apollo Server Express**: GraphQL server for Express.js.
- **Socket.io**: Library for real-time web applications.
- **PostgreSQL**: Relational database management system.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: Library for loading environment variables.

### Controller

- **@apollo/client**: Apollo Client for GraphQL.
- **graphql**: JavaScript reference implementation for GraphQL.

### Client

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework.
- **Framer Motion**: Library for animations in React.
- **@apollo/client**: Apollo Client for GraphQL.
- **graphql**: JavaScript reference implementation for GraphQL.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mihir9702/midnight.git

2. Install dependencies for the server:

   ```bash
   cd midnight/server
   yarn install

3. Run the server:

   ```bash
   yarn dev

4. Open a new terminal window, navigate to the client directory, and install dependencies:

   ```bash
   cd ../client
   yarn install

5. Run the client:

   ```bash
   yarn dev

6. Access Midnight at `http://localhost:3000`.

7. (Optional) To generate TypeScript types from GraphQL schema and operations, run:

   ```bash
   cd midnight/controller
   yarn install
   yarn gen
