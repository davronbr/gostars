# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. Kodni GitHub-ga yuklash
Firebase Studio terminalida quyidagi buyruqlarni ketma-ket yozing:
```bash
git init
git add .
git commit -m "Initial commit"
# GitHub-da yangi repozitoriy ochib, uning linkini qo'shing:
git remote add origin https://github.com/USER_NOMINGIZ/REPO_NOMINGIZ.git
git branch -M main
git push -u origin main
```

### 2. Render-da sozlash
1. [Render.com](https://render.com) ga kiring va GitHub orqali ro'yxatdan o'ting.
2. **New +** tugmasini bosib, **Web Service** tanlang.
3. GitHub-dagi loyihangizni ulang.
4. Quyidagi sozlamalarni kiriting:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### 3. Environment Variables (Environment bo'limi)
Agar `.env` faylingizda maxfiy kalitlar bo'lsa (masalan, `GEMINI_API_KEY`), ularni Render-dagi **Environment** bo'limiga qo'shing.

### 4. Telegram Bot Webhook-ni sozlash
Botga xabarlar kelishi uchun Webhook-ni o'rnatish kerak. Brauzerda quyidagi manzilni oching:
`https://api.telegram.org/bot<SIZNING_BOT_TOKENINGIZ>/setWebhook?url=https://sizning-saytingiz.onrender.com/api/telegram`

**Eslatma:** Render-ning bepul tarifida sayt 15 daqiqa ishlatilmasa "uyquga" ketadi. Birinchi marta botga yozganingizda uyg'onishi uchun biroz vaqt (30-60 soniya) kerak bo'lishi mumkin.
