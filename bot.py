
import os
import asyncio
from telethon import TelegramClient, events
from dotenv import load_dotenv

# .env faylidan o'zgaruvchilarni yuklash
load_dotenv()

# login.js dagi ma'lumotlar bilan bir xil
API_ID = 16108895
API_HASH = "9eeedcc1eb10e1f0a11caf3815a3768d"
# Bot tokenini .env fayliga qo'shishingiz kerak: TELEGRAM_BOT_TOKEN=...
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')

# Mijozni yaratish (Bot sifatida)
client = TelegramClient('tez_nft_bot', API_ID, API_HASH)

async def main():
    if not BOT_TOKEN:
        print("XATO: TELEGRAM_BOT_TOKEN topilmadi! .env faylida bot tokenini ko'rsating.")
        return

    await client.start(bot_token=BOT_TOKEN)
    print("Tez Nft Bot muvaffaqiyatli ishga tushdi!")

    @client.on(events.NewMessage(pattern='/start'))
    async def start_handler(event):
        """Start buyrug'iga javob berish."""
        sender = await event.get_sender()
        welcome_text = (
            f"Salom, {sender.first_name}!\n\n"
            "Tez Nft rasmiy botiga xush kelibsiz. Men orqali siz:\n"
            "• Buyurtmalarni kuzatishingiz\n"
            "• Stars va Premium sotib olishingiz\n"
            "• Sovg'alaringizni boshqarishingiz mumkin.\n\n"
            "Ilovani ochish uchun pastdagi tugmani bosing."
        )
        await event.respond(welcome_text)

    @client.on(events.NewMessage(pattern='/help'))
    async def help_handler(event):
        """Yordam xabari."""
        await event.respond("Yordam uchun: @moglq bilan bog'laning.")

    # Botni doimiy ishlab turishini ta'minlash
    await client.run_until_disconnected()

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nBot to'xtatildi.")
