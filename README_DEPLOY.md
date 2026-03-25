
# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. GitHub-ga yuklash
Agar hali yuklamagan bo'lsangiz, terminalda:
```bash
git add .
git commit -m "Fix: build configuration and update bot.py"
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
Render-da botni saytdan alohida ishlatish uchun:
1. **New +** -> **Background Worker** tanlang.
2. GitHub repozitoriyangizni yana ulang.
3. Sozlamalar:
   - **Runtime:** `Python`
   - **Build Command:** `pip install telethon python-dotenv`
   - **Start Command:** `python bot.py`

### 4. Environment Variables (Ixtiyoriy)
Garchi biz `bot.py` ichiga tokenni yozgan bo'lsak-da, xavfsizlik uchun Render dashboard-dagi **Environment** bo'limiga quyidagilarni qo'shish tavsiya etiladi:
- `TELEGRAM_BOT_TOKEN`: 8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w
- `GEMINI_API_KEY`: Google AI kalitingiz.
