
# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. GitHub-ga yuklash
Agar hali yuklamagan bo'lsangiz, terminalda:
```bash
git add .
git commit -m "Fix: build configuration and add bot.py"
git push origin main
```

### 2. Render-da sozlash (Web Service)
1. [Render.com](https://render.com) ga kiring.
2. **New +** -> **Web Service** tanlang.
3. GitHub repozitoriyangizni ulang.
4. **MUHIM!** Quyidagi sozlamalarni kiriting:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### 3. Telegram Botni ishga tushirish (Background Worker)
Agar `bot.py` ni Render-da ishlatmoqchi bo'lsangiz, alohida **Background Worker** yarating:
- **Runtime:** `Python`
- **Build Command:** `pip install telethon python-dotenv`
- **Start Command:** `python bot.py`

### 4. Environment Variables (Environment bo'limi)
- `GEMINI_API_KEY`: Google AI kalitingiz.
- `TELEGRAM_BOT_TOKEN`: BotFather'dan olingan token.

### 5. Telegram Bot Webhook (Ixtiyoriy)
Agar API route-dan foydalanmoqchi bo'lsangiz:
`https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://SIZNING_URL.onrender.com/api/telegram`
