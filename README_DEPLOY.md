# Botni faollashtirish (ENG OSON YO'L)

### 1. GitHub-ga kodni yuklash
GitHub sizdan parolni terminalda so'raganda, oddiy parolingizni emas, **Personal Access Token** (ghp_...) kiritishingiz shart.

**DIQQAT:** Telegram bot tokenini (`8711207347...`) GitHub-ga yozmang!

**To'g'ri buyruq (TOKENingizni ghp_... deb yozing):**
```bash
git remote set-url origin https://TOKENINGIZNI_SHU_YERGA_YOZING@github.com/davronbr/gostars.git
git add .
git commit -m "update"
git push
```

### 2. Botni bir marta faollashtirish
Saytingiz Render-da yonganidan so'ng (Build success):
1. Ilovangizga kiring (`gostars.onrender.com`).
2. **Sozlamalar** (Settings) belgisini bosing.
3. **"Botni faollashtirish"** (Activate Bot) tugmasini bosing.

**Tamom!** Endi botingiz Telegram-da xabarlarga javob berishni boshlaydi.

**Eslatma:** Render-ning tekin rejasi saytni "uxlatib" qo'yishi mumkin. Agar bot javob bermasa, avval saytingizga brauzerda kiring, u "uyg'onadi" va bot ham ishlay boshlaydi.
