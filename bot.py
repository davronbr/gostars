
import os
import asyncio
from telethon import TelegramClient, events, types
from dotenv import load_dotenv

# .env faylidan o'zgaruvchilarni yuklash
load_dotenv()

# login.js dagi ma'lumotlar bilan bir xil
API_ID = 16108895
API_HASH = "9eeedcc1eb10e1f0a11caf3815a3768d"
# Siz bergan bot tokeni
BOT_TOKEN = "8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w"
# Ilova manzili
WEB_APP_URL = "https://gostars.onrender.com"

# Mijozni yaratish (Bot sifatida)
client = TelegramClient('tez_nft_bot', API_ID, API_HASH)

async def main():
    if not BOT_TOKEN:
        print("XATO: BOT_TOKEN topilmadi!")
        return

    await client.start(bot_token=BOT_TOKEN)
    print("Tez Nft Bot muvaffaqiyatli ishga tushdi!")

    @client.on(events.NewMessage(pattern='/start'))
    async def start_handler(event):
        """Start buyrug'iga javob berish (Premium emojilar bilan)."""
        sender = await event.get_sender()
        name = sender.first_name if sender.first_name else "Foydalanuvchi"
        
        # Premium emojilar HTML formati orqali yuboriladi
        welcome_text = (
            f"<emoji id='5798587088077066898'>🐥</emoji> Salom, {name}!\n\n"
            f"<emoji id='5767374504175078683'>🛒</emoji> Pastdagi tugmalar orqali xizmatlarimizdan\n"
            f"foydalanishingiz mumkin: <emoji id='5470177992950946662'>👇</emoji>"
        )
        
        # Web App tugmasini yaratish
        button = [
            [types.KeyboardButtonWebView("🛒 Xarid qilish", url=WEB_APP_URL)]
        ]
        
        await event.respond(welcome_text, buttons=button, parse_mode='html')

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
