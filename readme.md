# Discord

Discord is an instant messaging social platform that replicates the communication experience of voice calls, video calls, text messaging, and media/file sharing built using the PERN stack.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mihir9702/discord.git

2. Install dependencies for the server:

   ```bash
   cd discord/server
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

6. Access Discord at `http://localhost:3000`.

7. (Optional) To generate TypeScript types from GraphQL schema and operations, run:

   ```bash
   cd discord/controller
   yarn install
   yarn gen
