
# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. GitHub-ga yuklash (Terminalda)
Agar terminalda `git push` qilganingizda login/parol so'rasa:
1. **Username:** GitHub foydalanuvchi nomingizni (login) yozing.
2. **Password:** Bu yerda oddiy parolingizni emas, GitHub **Personal Access Token (PAT)** ni kiritishingiz kerak.
   - **Token olish tartibi:**
     - GitHub sahifangizga kiring.
     - **Settings** -> **Developer settings** -> **Personal access tokens** -> **Tokens (classic)**.
     - **Generate new token (classic)** tugmasini bosing.
     - `repo` huquqlarini belgilang va tokenni nusxalab oling.
     - Terminalda parol so'raganda shu tokenni qo'ying (terminalda yozilgani ko'rinmaydi, shunchaki Paste qilib Enter bosing).

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

### 4. Environment Variables
Render dashboard-dagi **Environment** bo'limiga quyidagilarni qo'shish tavsiya etiladi:
- `TELEGRAM_BOT_TOKEN`: 8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w
- `GEMINI_API_KEY`: Google AI kalitingiz.
