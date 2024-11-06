# Book Finder
This is a React-based book search application using the OpenLibrary API to fetch and display book data. Users can search books by title, author, and subject, view detailed book information, and navigate between search results.

## Features

- Book Search: Search books by title, author, or subject.
- Search Caching: Caches search results to reduce redundant API calls.
- Pagination: Easily navigate through search results.
- Book Details Modal: View additional information in a modal, with clickable author names to refine searches.
- Responsive Design: Fully responsive layout using Tailwind CSS.
- Loading State: Displays a full-screen loader while fetching data.

## Demo
A live demo is available here: [Demo Link](https://dxjl2w-5173.csb.app/)

## Tech Stack

- React: Frontend framework
- React Router: For navigation and URL-based state
- Tailwind CSS: For styling
- PropTypes: For type checking React props
- OpenLibrary API: Fetches book data

## Installation

### Clone the repository:
- `git clone https://github.com/smalik21/book-finder.git`
- `cd book-finder`

### Install dependencies:
`npm install`

### Run the application:
`npm start`

The app will be available at http://localhost:5173.

## Project Structure

├── api
│   └── openLibrary.js          # API request functions
├── assets
│   └── image-not-available.jpg # Placeholder image for missing book covers
├── components
│   ├── BookCard.js             # Book card component for listing
│   ├── BookDetailsModal.js     # Modal component for displaying book details
│   ├── ResultsList.js          # Component for listing search results
│   ├── SearchBar.js            # Search bar component
│   └── Title.js               # Title component with homepage link
├── App.js                      # Main app component
└── index.js                    # Entry point

## Usage

- Search for Books: Enter a keyword in the search bar, choose a search type, and hit Enter.
- View Book Details: Click on any book card to open a modal with more details.
- Navigate Pages: Use the pagination buttons to view more results.
- Refine Search by Author: In the modal, click on an author's name to search by that author.

## Components

- Home: Main component with state management for the search query, search type, results, and pagination.
- Title: Navigable title component that resets search settings when clicked.
- SearchBar: Input field to enter search queries.
- ResultsList: Lists the fetched book results with pagination.
- BookCard: Displays book details in a compact format.
- BookDetailsModal: Shows detailed information with a clickable author link.
