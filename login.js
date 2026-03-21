const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const apiId = 16108895;
const apiHash = "9eeedcc1eb10e1f0a11caf3815a3768d";
const stringSession = new StringSession("");

(async () => {
    try {
        const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
        });
        await client.start({
            phoneNumber: async () => await input.text("Telefon raqamingiz (+998...): "),
            phoneCode: async () => await input.text("Telegramdan kelgan kod: "),
            password: async () => await input.text("2FA Parol (bo'lsa): "),
            onError: (err) => console.log("Xato:", err),
        });
        console.log("\n--- MANA BU KODNI TO'LIQ NUSXALAB OLING ---");
        console.log(client.session.save());
        console.log("-------------------------------------------\n");
        await client.disconnect();
        process.exit(0);
    } catch (e) {
        console.error("Xatolik yuz berdi:", e);
        process.exit(1);
    }
})();
