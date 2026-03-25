'use server';

import { NextRequest, NextResponse } from 'next/server';

/**
 * Ushbu API Telegram Webhook orqali botni boshqaradi.
 * Render-ning bepul rejasida bot ishlashi uchun eng maqbul yo'l.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const botToken = "8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w";
    const webAppUrl = "https://gostars.onrender.com";

    const message = body.message;
    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text;
    const firstName = message.from.first_name || "Foydalanuvchi";

    if (text === '/start') {
      // Premium emojilar bilan salomlashish matni
      // 5798587088077066898 -> Tovuq
      // 5767374504175078683 -> Do'kon
      // 5470177992950946662 -> Qo'l
      const welcomeText = 
        `<tg-emoji emoji-id="5798587088077066898">🐥</tg-emoji> Salom, ${firstName}!\n\n` +
        `<tg-emoji emoji-id="5767374504175078683">🛒</tg-emoji> Pastdagi tugma orqali do'konimizga\n` +
        `kirishingiz mumkin: <tg-emoji emoji-id="5470177992950946662">👇</tg-emoji>`;

      const payload = {
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
      };

      // Telegram API-ga javob yuborish
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
