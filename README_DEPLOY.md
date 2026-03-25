# Deploy va Botni ishga tushirish (TEKIN YO'L)

### 1. GitHub-ga yuklash (DIQQAT: MUHIM!)
Siz ishlatayotgan `8711207347:AAH38k...` bu **Telegram Bot Token**. Uni GitHub-ga kod yuklash uchun ishlata olmaysiz!

**To'g'ri yo'l:**
1. GitHub-dan [Personal Access Token](https://github.com/settings/tokens) oling (Nomi: `ghp_` bilan boshlanadi).
2. Terminalda quyidagicha yozing (TOKENingizni qo'shib):
   ```bash
   git remote set-url origin https://TOKENINGIZNI_SHU_YERGA_YOZING@github.com/davronbr/gostars.git
   ```
3. Endi push qiling:
   ```bash
   git push
   ```

### 2. Render-da Web Service ochish
1. [Render Dashboard](https://dashboard.render.com) -> **New +** -> **Web Service**.
2. GitHub repozitoriyangizni ulang.
3. **Runtime:** `Node`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm run start`

### 3. BOTNI FAOLLASHTIRISH
Render-da saytingiz yonib bo'lgandan keyin (Build success), quyidagi havolaga brauzerda bir marta kiring:

**Havola (Botni Webhook-ga ulash):**
`https://api.telegram.org/bot8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w/setWebhook?url=https://gostars.onrender.com/api/telegram`

Agar ekranda `{"ok":true,"result":true,"description":"Webhook was set"}` yozuvini ko'rsangiz, botingiz ishlashni boshlaydi!

**Eslatma:** Render-ning tekin rejasi saytni "uxlatib" qo'yishi mumkin. Agar bot javob bermasa, avval saytingizga brauzerda kiring, u "uyg'onadi" va bot ham ishlay boshlaydi.
