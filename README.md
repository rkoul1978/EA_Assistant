# Enterprise Architecture Assistant

The Enterprise Architecture Assistant is an interactive tool designed to support architects, development teams, and IT professionals by providing comprehensive resources and guidance on enterprise architecture.

## Features

- Interactive chat interface for asking questions about enterprise architecture
- Pre-canned questions for quick access to common inquiries
- Detailed responses on various topics related to enterprise architecture
- Multi-agent system for processing queries and generating responses

## UI

### Technology Stack

- React.js for the frontend
- Material-UI for component styling
- Context API for state management
- Custom agent system for processing queries

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Getting Started

1. Clone the repository:
   ```
   git clone https://atcgenai@dev.azure.com/atcgenai/ea_assistant/_git/ea_assistant
   ```

2. Navigate to the project directory:
   ```
   cd ea_assistant
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Backend

This project can run without a backend, but it's responses will be more generic without your documentation driving your standards, principles, etc...  

### About
This project uses Microsofts GraphRAG for the backend, with a customized ontology for enterprise architecture.

* [Learn More About GraphRAG](https://microsoft.github.io/graphrag/)
* [Learn More About the Custom Ontology](docs/ontology/README.md)

### Setup & Running

Details for setting up and running the backend can be found in [docs/BACKEND.md](docs/BACKEND.md).