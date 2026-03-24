# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. Render-da sozlash
1. [Render.com](https://render.com) ga kiring va GitHub orqali ro'yxatdan o'ting.
2. **New +** tugmasini bosib, **Web Service** tanlang.
3. GitHub-dagi `davronbr/gostars` loyihangizni ulang.
4. Quyidagi sozlamalarni kiriting:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### 2. Environment Variables (Environment bo'limi)
Agar `.env` faylingizda maxfiy kalitlar bo'lsa, ularni Render-dagi **Environment** bo'limiga qo'shing:
- `GEMINI_API_KEY`: AI funksiyalari ishlashi uchun zarur.

### 3. Telegram Bot Webhook-ni sozlash
Botga xabarlar kelishi uchun Webhook-ni o'rnatish kerak. Brauzerda quyidagi manzilni oching:
`https://api.telegram.org/bot<SIZNING_BOT_TOKENINGIZ>/setWebhook?url=https://gostars-nomi.onrender.com/api/telegram`

### 4. Muhim Eslatma
Render-ning tekin (Free) tarifida sayt 15 daqiqa ishlatilmasa "uxlab" qoladi. Birinchi marta ochilganda 30-50 soniya kutishingiz kerak bo'lishi mumkin.