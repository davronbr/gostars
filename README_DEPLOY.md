# Deploy qilish bo'yicha qo'llanma (GitHub + Render)

Ushbu loyihani Render platformasiga chiqarish uchun quyidagi qadamlarni bajaring:

### 1. GitHub-ga yuklash (Terminalda)
Agar terminalda `git push` qilganingizda login/parol so'rasa:
1. **Username:** GitHub foydalanuvchi nomingizni (login) yozing.
2. **Password:** Bu yerda oddiy parolingizni emas, GitHub **Personal Access Token (PAT)** ni kiritishingiz kerak.
   - **Token olish tartibi:** GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token (classic).
   - `repo` huquqini belgilang. Parol so'ralganda shu tokenni qo'ying.

### 2. Saytni Render-da sozlash (Web Service)
1. [Render.com](https://render.com) ga kiring.
2. **New +** -> **Web Service** tanlang.
3. GitHub repozitoriyangizni ulang.
4. **Sozlamalar:**
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### 3. BOTNI ISHGA TUSHIRISH (MUHIM!)
Render saytni (NodeJS) ishga tushirganda botni (Python) avtomatik ishlatmaydi. Bot ishlashi uchun:
1. Render Dashboard-ga kiring.
2. **New +** -> **Background Worker** tanlang.
3. Shu GitHub repozitoriyangizni yana ulang.
4. **Bot sozlamalari:**
   - **Name:** `stars-bot`
   - **Runtime:** `Python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python bot.py`
5. **Environment Variables:** `Background Worker` sozlamalarida `TELEGRAM_BOT_TOKEN` ni qo'shing: `8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w`

### 4. Nega bot ishlamasligi mumkin?
- Agar botga `/start` yuborganda javob kelmasa, demak Render-da **Background Worker** hali ishga tushmagan yoki `Start Command` xato bergan. 
- Botni kompyuteringizda (Local) o'chirib qo'ying, aks holda Render va kompyuteringiz bir-biri bilan "urishib" qoladi (token bitta bo'lgani uchun).
