
# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. GitHub-ga yuklash
Agar hali yuklamagan bo'lsangiz, terminalda:
```bash
git add .
git commit -m "Fix: build configuration"
git push origin main
```

### 2. Render-da sozlash
1. [Render.com](https://render.com) ga kiring.
2. **New +** -> **Web Service** tanlang.
3. GitHub repozitoriyangizni ulang.
4. **MUHIM!** Quyidagi sozlamalarni kiriting:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### 3. Environment Variables (Environment bo'limi)
- `GEMINI_API_KEY`: Google AI kalitingiz.

### 4. Xatolik yuz bersa (Logs)
Agar "Could not find a production build" xatosi chiqsa, Render dashboard-dagi **Events** bo'limida build jarayoni "Live" bo'lganini yoki xatolik bilan tugaganini tekshiring. Build muvaffaqiyatli o'tishi shart.

### 5. Telegram Bot Webhook
`https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://SIZNING_URL.onrender.com/api/telegram`
