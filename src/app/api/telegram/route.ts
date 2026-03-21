'use server';

import { NextRequest, NextResponse } from 'next/server';

/**
 * Bu funksiya Telegram Bot Webhook orqali yuborilgan POST so'rovlarini qabul qiladi.
 * Foydalanuvchi botga xabar yuborganda, Telegram shu URL manzilga ma'lumot yuboradi.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // --- XAVFSIZLIK UCHUN MUHIM ---
    // Production'ga chiqishdan oldin, Telegram'dan kelayotgan so'rovlarni tasdiqlash uchun
    // maxfiy kalit (secret token) ishlatish zarur.
    // const secretToken = req.headers.get('X-Telegram-Bot-Api-Secret-Token');
    // if (secretToken !== process.env.TELEGRAM_SECRET_TOKEN) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // --- XAVFSIZLIK QISMI TUGADI ---

    // 1. Telegram'dan kelgan xabarni ajratib olish
    const message = body.message;
    if (!message || !message.from || !message.text) {
      // Agar bu biz qayta ishlay olmaydigan xabar bo'lsa (masalan, kanal posti, stiker va hk),
      // shunchaki "ok" javobini qaytaramiz.
      return NextResponse.json({ status: 'ok', message: 'Qayta ishlanmaydigan xabar.' });
    }

    const telegramUserId = message.from.id;
    const telegramUsername = message.from.username;
    const text = message.text; // Xabar matni

    // 2. Xabar matnini tahlil qilib, sovg'a qo'shish buyrug'ini aniqlash.
    // Masalan, foydalanuvchi "/addgift <sovg'a_id>" formatida xabar yuboradi deb faraz qilamiz.
    if (text.startsWith('/addgift')) {
      const giftId = text.split(' ')[1];
      if (!giftId) {
        // Haqiqiy botda foydalanuvchiga buyruqni qanday ishlatish haqida javob yuborish kerak.
        return NextResponse.json({ status: 'error', message: 'Sovg\'a ID\'si topilmadi.' });
      }

      // 3. Firestore (yoki boshqa) ma'lumotlar bazasidan foydalanuvchini topish.
      // Bu yerda telegramUserId orqali qidirish logikasi bo'lishi kerak.
      // Hozircha biz bu jarayonni simulyatsiya qilamiz va logga chiqaramiz.
      // Haqiqiy kodda quyidagicha bo'lardi:
      // const { firestore } = initializeFirebase(); // Firestore instance'ni olish
      // const usersRef = collection(firestore, 'users');
      // const q = query(usersRef, where("telegramUserId", "==", telegramUserId));
      // const querySnapshot = await getDocs(q);
      // if (querySnapshot.empty) {
      //   return NextResponse.json({ status: 'error', message: `Bunday Telegram ID'li foydalanuvchi topilmadi.` });
      // }
      // const userDoc = querySnapshot.docs[0];
      // const userRef = doc(firestore, 'users', userDoc.id);

      console.log(`Foydalanuvchi (Telegram ID: ${telegramUserId}) uchun '${giftId}' sovg'asini qo'shishga harakat qilinmoqda.`);
      
      // 4. Sovg'ani foydalanuvchining inventariga qo'shish.
      // Bu ham simulyatsiya. Haqiqiy kodda Firestore'dagi 'gifts' massiviga qo'shiladi.
      // await updateDoc(userRef, {
      //   gifts: arrayUnion(giftId) // arrayUnion takrorlanishni oldini oladi.
      // });
      console.log(`DATABASE'GA SO'ROV (SIMULYATSIYA): "users" kolleksiyasidagi foydalanuvchining "gifts" maydoniga '${giftId}' qo'shiladi.`);

      // 5. Telegram'ga muvaffaqiyatli qabul qilinganlik haqida javob yuborish.
      // Telegram'ga murakkab javob shart emas, 200 OK statusining o'zi kifoya.
      return NextResponse.json({ status: 'success', message: `Sovg'a '${giftId}' ${telegramUsername} uchun muvaffaqiyatli qayta ishlandi.` });
    }

    // Agar xabar bizning buyruqlarimizga to'g'ri kelmasa, shunchaki OK qaytaramiz.
    return NextResponse.json({ status: 'ok', message: 'Xabar qabul qilindi, lekin hech qanday amal bajarilmadi.' });

  } catch (error: any) {
    console.error('Telegram webhook'ni qayta ishlashda xatolik:', error);
    // Xatolik yuz bersa, 500 status bilan javob qaytaramiz.
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
