# Deploy va Botni ishga tushirish (TEKIN YO'L)

Loyiha Render platformasida bepul ishlashi uchun quyidagilarni bajaring:

### 1. GitHub-ga yuklash
1. Terminalda `git push` qiling.
2. Username: GitHub login.
3. Password: [Personal Access Token](https://github.com/settings/tokens).

### 2. Render-da Web Service ochish
1. [Render Dashboard](https://dashboard.render.com) -> **New +** -> **Web Service**.
2. GitHub repozitoriyangizni ulang.
3. **Runtime:** `Node`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm run start`

### 3. BOTNI ISHGA TUSHIRISH (MUHIM!)
Render-da pullik Background Worker ochish shart emas. Botni faollashtirish uchun quyidagi havolaga brauzeringizda (masalan, Chrome) bitta marta kiring:

**Havola:**
`https://api.telegram.org/bot8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w/setWebhook?url=https://gostars.onrender.com/api/telegram`

Agar ekranda `{"ok":true,"result":true,"description":"Webhook was set"}` yozuvini ko'rsangiz, demak botingiz ishlashni boshladi!

### Nega endi tekin?
Chunki bot endi alohida dastur sifatida emas, balki saytingizning bir qismi (Webhook) sifatida ishlaydi. Kimdir botga yozsa, Telegram avtomatik ravishda saytingizga xabar yuboradi.