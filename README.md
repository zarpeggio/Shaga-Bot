# Shaga Bot

Shaga Bot is an automated bot for interacting with the Shaga platform using Puppeteer Real Browser. It automates login and reward claiming processes while handling session persistence.

## Features
- Automated login using credentials stored in `account.json`
- Claims rewards every 6 hours
- Extracts and displays wallet address and Glob Points
- Checks claim button status and handles cooldown timers

## Requirements
- Node.js (v16 or later)
- Puppeteer Real Browser
- A valid Shaga account

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/shaga-bot.git
   cd shaga-bot
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create `account.json` in the root directory and add your Shaga credentials:
   ```json
   {
       "email": "your-email@example.com",
       "password": "your-password"
   }
   ```

4. Run the bot:
   ```sh
   node index.js
   ```

## Cooldown Management
- The bot ensures rewards are only claimed every **6 hours**.
- Uses a timestamp file to track the last claim attempt.

## Notes
- Running the bot too frequently may result in failed attempts due to cooldown restrictions.
- Use at your own discretion and ensure compliance with platform policies.

## License
This project is for educational purposes only. Use responsibly.

