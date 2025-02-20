# Shaga Bot

Shaga Bot is an automation script using Puppeteer Real Browser to interact with [Shaga](https://glob.shaga.xyz/?r=tQqqXgxpvo). It automates the login process, retrieves wallet details, claims rewards every 6 hours, and extracts Glob Points data.

## Features

- Automated login using credentials stored in `account.json`
- Retrieves wallet address and Glob Points
- Checks claim cooldown and countdown timer

## Requirements

- **Node.js** (v16+ recommended)
- **Puppeteer Real Browser**

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/zarpeggio/shaga-bot.git
   cd shaga-bot
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure login credentials:**
   - Open `account.json` and enter your Shaga login details.

     ```json
     {
       "email": "your-email@example.com",
       "password": "your-password"
     }
     ```

4. **Run the bot:**

   ```sh
   node index.js
   ```

## Notes

- This bot **only works in headless mode (`headless: true`)**. Running in **headless: false** may cause issues with selectors not being found.
- **Can this run on a VPS?**
  - Yes, it can run on a VPS **if the VPS supports a graphical environment**.
  - Puppeteer Real Browser requires a display server, so if running on a headless VPS (without a GUI), you may need to install **Xvfb** (X virtual framebuffer) to emulate a display.
  - Example setup for VPS:

    ```sh
    sudo apt update && sudo apt install -y xvfb
    xvfb-run -- node index.js
    ```

## Disclaimer

This script is for educational purposes only. Use it responsibly and at your own risk. Automating websites may violate their terms of service.

