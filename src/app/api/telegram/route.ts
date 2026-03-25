import { NextRequest, NextResponse } from 'next/server';

/**
 * Ushbu API Telegram Webhook orqali botni boshqaradi.
 * Render-ning bepul rejasida bot ishlashi uchun eng maqbul yo'l.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webAppUrl = "https://gostars.onrender.com";

    // Telegram yuborgan xabarni olish
    const message = body.message;
    
    // Agar xabar matnli bo'lsa va /start bilan boshlansa
    if (message && message.text && message.text.startsWith('/start')) {
      const chatId = message.chat.id;
      const firstName = message.from.first_name || "Foydalanuvchi";

      // Premium emojilar bilan salomlashish matni
      const welcomeText = 
        `<tg-emoji emoji-id="5798587088077066898">🐥</tg-emoji> Salom, ${firstName}!\n\n` +
        `<tg-emoji emoji-id="5767374504175078683">🛒</tg-emoji> Pastdagi tugma orqali do'konimizga\n` +
        `kirishingiz mumkin: <tg-emoji emoji-id="5470177992950946662">👇</tg-emoji>`;

      // Webhook Response usuli: Telegram-ga darhol javob qaytarish
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: welcomeText,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛒 Xarid qilish",
                web_app: { url: webAppUrl }
              }
            ]
          ]
        }
      });
    }

    // Boshqa turdagi xabarlar uchun shunchaki OK qaytarish
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    // Xatolik bo'lsa ham 200 qaytaramiz, aks holda Telegram qayta-qayta so'rov yuboraveradi
    return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
  }
}
