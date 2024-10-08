NOT FINISHED YET!!!!

# Price Tracker

A web scraper for tracking Amazon product prices, built for educational purposes.

## Introduction

This project allows users to track Amazon product prices by adding items through their product links. It uses MongoDB for data storage, Auth.js for Google account authentication, and Bright Data with Cheerio for web scraping.

## Features

- Add products to track by pasting Amazon product links
- User authentication via Google accounts
- Automated web scraping to update product prices
- Data storage in MongoDB

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
   BRIGHT_DATA_USERNAME=your_bright_data_username
   BRIGHT_DATA_PASSWORD=your_bright_data_password
   BRIGHT_DATA_AUTH=your_bright_data_auth
   MONGODB_URI=your_mongodb_connection_string
   AUTH_SECRET=your_auth_secret
   AUTH_GOOGLE_ID=your_google_id
   AUTH_GOOGLE_SECRET=your_google_secret
   ```

   Replace the placeholder values with your own secrets and credentials.

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Log in using your Google account.
2. Paste an Amazon product link into the search bar to add it to your tracking list.
3. View and manage your tracked products on the dashboard.

## Docker

This project includes Docker support, but it's not required to run the application. If you prefer to use Docker:

1. Build the Docker image:

   ```
   docker build -t price-tracker .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 price-tracker
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This project is for educational purposes only. Be sure to comply with Amazon's terms of service and robots.txt when using this application.
