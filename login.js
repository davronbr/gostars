const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const apiId = 16108895;
const apiHash = "9eeedcc1eb10e1f0a11caf3815a3768d";
const stringSession = new StringSession("");

(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input.text("Telefon raqamingiz (+998...): "),
        password: async () => await input.text("2FA Parolingiz (agar bo'lsa): "),
        phoneCode: async () => await input.text("Telegramdan kelgan kod: "),
    });
    console.log("\n--- MANA BU KODNI NUSXALAB OLING ---");
    console.log(client.session.save());
    console.log("-----------------------------------\n");
    await client.disconnect();
    process.exit();
})();
