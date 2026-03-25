import { NextRequest, NextResponse } from 'next/server';

/**
 * Telegram Webhook API.
 * Ushbu route Telegram-dan kelgan xabarlarni qabul qiladi va darhol javob qaytaradi (Webhook Reply).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webAppUrl = "https://gostars.onrender.com";

    // Telegram-dan kelgan xabarni tekshirish
    const message = body.message;
    
    if (message && message.text && message.text.startsWith('/start')) {
      const chatId = message.chat.id;
      const firstName = message.from.first_name || "Foydalanuvchi";

      // Premium emojilar bilan salomlashish (ID orqali)
      const welcomeText = 
        `<tg-emoji emoji-id="5798587088077066898">🐥</tg-emoji> Salom, ${firstName}!\n\n` +
        `<tg-emoji emoji-id="5767374504175078683">🛒</tg-emoji> Pastdagi tugma orqali do'konimizga\n` +
        `kirishingiz mumkin: <tg-emoji emoji-id="5470177992950946662">👇</tg-emoji>`;

      // Webhook Reply: Telegram-ga darhol JSON javob qaytarish
      // Bu usul eng tezkor va resurslarni tejaydigan usuldir.
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

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    // Telegram-ga har doim 200 qaytarish kerak, aks holda u qayta-qayta yuboraveradi
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
