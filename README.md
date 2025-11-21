# Vaccination Manager Frontend

This is the front-end application for the Vaccination Manager system. It allows you to manage people, vaccines, and vaccination records via a REST API.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the App](#running-the-app)
5. [Usage](#usage)
   - [Pages and Features](#pages-and-features)
   - [API Integration](#api-integration)
6. [Routing & API Endpoints](#routing--api-endpoints)
7. [Architecture & Design Decisions](#architecture--design-decisions)
8. [Future Improvements](#future-improvements)
9. [License](#license)

---

## Overview

This frontend provides a user interface for interacting with the Vaccination Manager backend. Users can:

- Create and delete people
- List people with pagination
- Register vaccination records (person, vaccine, date, dose)
- View vaccination records associated with a person

---

## Tech Stack

- React
- TypeScript
- Material-UI (MUI)
- Axios (for API calls)
- React State Hooks (`useState`, `useEffect`)

---

## Project Structure

```bash
src/
├─ api/ # API client modules
│ ├─ person.ts
│ ├─ vaccine.ts
│ └─ vaccinationRecord.ts
├─ components/ # Reusable UI components
│ ├─ CopyButton.tsx
│ └─ ScrollableText.tsx
├─ pages/ # Page-level components
│ ├─ PersonPage.tsx
│ ├─ VaccinePage.tsx
│ └─ VaccinationRecordPage.tsx
├─ App.tsx # Main app layout and routing
└─ index.tsx # React entry point
```

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- Yarn or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ghitado/vaccination-manager-frontend.git
cd vaccination-manager-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

### Running the App

```bash
npm start
# or
yarn start
```

This will start the development server. Open http://localhost:5173 (or the port shown in your terminal) to access the app.

## Usage

### Pages and Features

- Person Page: add a person, list persons, delete a person.

- Vaccine Page: list vaccines (you probably have similar create/list operations here).

- Vaccination Record Page: create a new vaccination record by entering a person ID, a vaccine ID, date, and dose.

## API Integration

All API calls are done via Axios in src/api/.
For example, to create a person:

```bash
import { createPersonApi } from "../api/person";

await createPersonApi({ name: "John Doe" });
```

## Routing & API Endpoints

Here are the main API endpoints used by this frontend:

Feature API Route Method Description
Get paginated persons GET `/api/person` pageNumber, pageSize query params Returns a PaginatedResult with id and name of persons.
Create person POST `/api/person` Body: `{ name: string }` Creates a new person, returns PersonResponse.
Delete person DELETE `/api/person/{id}` - Deletes a person by ID.
Create vaccination record POST `/api/vaccinationrecord` Body: `{ personId, vaccineId, appliedAt, dose }` Creates a new vaccination record.
Get person by ID with vaccination records GET `/api/person/{id}` - Returns full PersonResponse, including vaccinationRecords.

## Architecture & Design Decisions

- State Management: The project uses React state hooks (useState, useEffect) rather than a more complex library (like Redux) because the state requirements are simple.

- UI Framework: Material-UI (MUI) is used for quick, consistent styling and layout.

- API Client: Axios is used for HTTP requests. The API layer is abstracted in src/api/ for maintainability.

- Responsiveness: Layout is built with MUI Grid and Stack to support responsive design.

- Conciseness & Readability: The UI focuses on functionality, avoiding unnecessary complexity.

- Error Handling: Basic checks are done (for example, not submitting the form if required fields are empty). More robust error handling could be added later.

## Future Improvements

- Validation: Add form validation (e.g., verify correct GUID format, valid date, etc.).

- User Feedback: Show notification or toast messages after create/delete operations.

- View Details: Replace alert with a modal on “View Person” to show vaccination records.

- Search & Filter: Enable searching or filtering people and vaccination records.

- Authentication: Add login/auth (JWT or OAuth) to secure the API.

- Testing: Add unit tests (React Testing Library) or integration tests.

## Author

By Thiago de Melo Mota. Implementation prepared as part of a technical challenge submission.
