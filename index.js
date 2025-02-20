const { connect } = require("puppeteer-real-browser");
const fs = require("fs");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const accountPath = "account.json";
const cooldownPath = "cooldowns.json";
const cooldownTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

async function saveCooldown() {
    const data = { lastClaim: Date.now() };
    fs.writeFileSync(cooldownPath, JSON.stringify(data, null, 2));
}

function checkCooldown() {
    if (!fs.existsSync(cooldownPath)) return false;
    const data = JSON.parse(fs.readFileSync(cooldownPath, "utf8"));
    return Date.now() - data.lastClaim < cooldownTime;
}

function printBoxedText(text) {
    console.log("╔" + "═".repeat(text.length + 2) + "╗");
    console.log("║ " + text + " ║");
    console.log("╚" + "═".repeat(text.length + 2) + "╝");
}

async function login(page) {
    if (!fs.existsSync(accountPath)) {
        console.log("⚠️ Please create account.json with your email and password.");
        process.exit(1);
    }
    const { email, password } = JSON.parse(fs.readFileSync(accountPath, "utf8"));
    
    console.log("🔗 Navigating to glob.shaga.xyz..");
    await page.goto("https://glob.shaga.xyz/main", { waitUntil: "networkidle2" });
    await delay(5000);
    
    await page.click(".bg-white10");
    await delay(10000);

    console.log("🔑 Logging in..");
    await page.type("#email", email, { delay: 100 }); 
    await delay(3000);
    await page.type("#password", password, { delay: 100 });
    await delay(3000);
    await page.click(".leading-6");
    
    console.log("🔓 Logged in successfully!");
    await delay(5000);
}

async function getGlobPoints(page) {
    const points = await page.evaluate(() => {
        const el = document.querySelector("div.flex.justify-center.items-center.gap-2 > span");
        return el ? el.innerText : "0";
    });
    console.clear();
    console.log("🎮 Shaga Bot\n☕ github.com/zarpeggio");
    printBoxedText(`🌎 Glob Points: ${points}`);
    return points;
}

async function claimRewards(page) {
    if (checkCooldown()) {
        console.log("⏳ You have already claimed your rewards. Try again later.");
        return;
    }
    console.log("🎁 Claiming rewards...");
    const claimButton = await page.$("div.relative.h-full.flex.items-center.justify-between.px-4.py-3 > button");
    if (claimButton) {
        const isDisabled = await page.evaluate(el => el.hasAttribute("disabled"), claimButton);
        if (isDisabled) {
            const countdown = await page.evaluate(() => {
                const el = document.querySelector("div.flex.items-center.gap-1 > span.text-white");
                return el ? el.innerText : "Unavailable";
            });
            console.log(`⏳ Claim available in: ${countdown}`);
        } else {
            await claimButton.click();
            console.log("✅ Claim successful!");
            saveCooldown();
        }
    } else {
        console.log("❌ Claim button not found!");
    }
}

(async () => {
    const { browser, page } = await connect({ headless: false, turnstile: true });
      
    await login(page);
    await getGlobPoints(page);
    await claimRewards(page);
    
    console.log("🏆 Shaga Bot execution completed!");
    await browser.close();
})();
