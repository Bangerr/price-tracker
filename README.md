# Price Tracker

A web scraper for tracking Amazon product prices, built for educational purposes.

## Introduction

This project allows users to track prices of Amazon products by simply pasting the product link. It uses a web scraper to fetch and store product details in MongoDB. Authentication is handled by AuthJS, enabling users to log in with their Google accounts.

## Features

- Add products to track by pasting Amazon product links
- User authentication via Google accounts
- Product details stored in MongoDB
- Automated price tracking and updates

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- Google Cloud Console account (for OAuth credentials)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/price-tracker.git
   cd price-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```
   Replace the placeholder values with your actual credentials.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## Usage

1. Log in using your Google account.
2. Paste an Amazon product link in the search bar to add it to your tracking list.
3. View your tracked products and their price history.

## Docker

While this project was developed using Docker, it's not required to run the application. If you prefer to use Docker, a `Dockerfile` and `docker-compose.yml` are provided in the repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This project is for educational purposes only. Please ensure you comply with Amazon's terms of service when using this application.
