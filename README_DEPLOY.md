# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. Kodni GitHub-ga yuklash
Agar sizda "No configured push destination" xatosi chiqsa, demak hali GitHub linkini qo'shmagansiz. Terminalda quyidagilarni bajaring:

```bash
# 1. Git-ni qayta sozlash (agar kerak bo'lsa)
git init

# 2. Barcha fayllarni tayyorlash
git add .

# 3. Saqlash (Commit)
git commit -m "Initial commit"

# 4. GitHub-da yangi repozitoriy ochib, uning linkini nusxalab quyidagiga qo'shing:
# DIQQAT: Linkni o'zingizniki bilan almashtiring!
git remote add origin https://github.com/USER_NOMINGIZ/REPO_NOMINGIZ.git

# 5. Asosiy tarmoqni (branch) belgilash
git branch -M main

# 6. Kodni yuborish
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
