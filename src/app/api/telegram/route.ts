import { NextRequest, NextResponse } from 'next/server';

/**
 * Telegram Webhook API.
 * Bu route Telegramdan kelgan har bir xabarni qayta ishlaydi.
 */
export async function POST(req: NextRequest) {
  const token = "8711207347:AAH38kfcpBK04gB0Xm0wOSLPsz_VcYph80w";
  const webAppUrl = "https://gostars.onrender.com";

  try {
    const body = await req.json();
    console.log("BOT LOG:", JSON.stringify(body));

    const message = body.message || body.edited_message;
    
    if (message && message.chat) {
      const chatId = message.chat.id;
      const firstName = message.from?.first_name || "Foydalanuvchi";
      const text = message.text || "";

      // Faqat /start buyrug'iga javob beramiz
      if (text.startsWith('/start')) {
        const welcomeText = 
          `<tg-emoji emoji-id="5798587088077066898">🐥</tg-emoji> Salom, ${firstName}!\n\n` +
          `<tg-emoji emoji-id="5767374504175078683">🛒</tg-emoji> Pastdagi tugma orqali do'konimizga\n` +
          `kirishingiz mumkin: <tg-emoji emoji-id="5470177992950946662">👇</tg-emoji>`;

        // Telegram API-ga to'g'ridan-to'g'ri so'rov yuboramiz (Response reply emas)
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
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
          })
        });

        const result = await response.json();
        console.log("TELEGRAM RESPONSE:", JSON.stringify(result));
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("WEBHOOK ERROR:", error.message);
    // Xatolik bo'lsa ham 200 qaytaramiz, aks holda Telegram qayta-qayta so'rov yuboraveradi
    return NextResponse.json({ ok: true });
  }
}
