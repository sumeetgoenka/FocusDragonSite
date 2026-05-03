import Link from "next/link";
import { headers } from "next/headers";
import { LOCALES, type Locale, isLocale, DEFAULT_LOCALE } from "../i18n/locales";
import { APP_VERSION } from "@/lib/version";

/**
 * Localized 404. Inline copy per locale (intentionally not part of
 * Dict — adding 8 more keys × 20 locales would dominate translation
 * maintenance, and 404 copy is short and rarely changes).
 *
 * Kept playful: "even the dragon is lost." Links back to the home
 * page in the user's language so the click-out is friction-free.
 */

type NotFoundCopy = {
  code: string;       // "404"
  title: string;      // "Even the dragon got lost."
  body: string;       // "The page you tried to focus on doesn't exist."
  homeCta: string;    // "Take me home"
  downloadCta: string;// "Download FocusDragon"
};

const COPY: Record<Locale, NotFoundCopy> = {
  en: { code: "404", title: "Even the dragon got lost.", body: "The page you tried to focus on doesn't exist — maybe it was blocked, maybe it never was.", homeCta: "Take me home", downloadCta: "Download FocusDragon" },
  de: { code: "404", title: "Sogar der Drache hat sich verlaufen.", body: "Die Seite, auf die du dich konzentrieren wolltest, gibt es nicht — vielleicht blockiert, vielleicht nie da gewesen.", homeCta: "Zur Startseite", downloadCta: "FocusDragon laden" },
  fr: { code: "404", title: "Même le dragon s'est perdu.", body: "La page que tu voulais voir n'existe pas — peut-être bloquée, peut-être jamais créée.", homeCta: "Retour à l'accueil", downloadCta: "Télécharger FocusDragon" },
  nl: { code: "404", title: "Zelfs de draak is verdwaald.", body: "De pagina die je zocht bestaat niet — misschien geblokkeerd, misschien nooit geweest.", homeCta: "Terug naar start", downloadCta: "Download FocusDragon" },
  es: { code: "404", title: "Hasta el dragón se perdió.", body: "La página en la que te ibas a concentrar no existe — quizá bloqueada, quizá nunca lo fue.", homeCta: "Volver al inicio", downloadCta: "Descargar FocusDragon" },
  pt: { code: "404", title: "Até o dragão se perdeu.", body: "A página que você queria ver não existe — talvez bloqueada, talvez nunca tenha existido.", homeCta: "Voltar ao início", downloadCta: "Baixar FocusDragon" },
  it: { code: "404", title: "Anche il drago si è perso.", body: "La pagina su cui volevi concentrarti non esiste — forse bloccata, forse mai esistita.", homeCta: "Torna all'inizio", downloadCta: "Scarica FocusDragon" },
  pl: { code: "404", title: "Nawet smok się zgubił.", body: "Strona, na której chciałeś się skupić, nie istnieje — może zablokowana, a może nigdy jej nie było.", homeCta: "Wróć na stronę główną", downloadCta: "Pobierz FocusDragon" },
  ru: { code: "404", title: "Даже дракон заблудился.", body: "Страницы, на которой ты хотел сфокусироваться, не существует — может, заблокирована, может, и не была.", homeCta: "На главную", downloadCta: "Скачать FocusDragon" },
  tr: { code: "404", title: "Ejderha bile kayboldu.", body: "Odaklanmaya çalıştığın sayfa yok — belki engellendi, belki hiç olmadı.", homeCta: "Ana sayfaya dön", downloadCta: "FocusDragon'u indir" },
  ar: { code: "٤٠٤", title: "حتى التنين ضاع.", body: "الصفحة التي أردت التركيز عليها غير موجودة — ربما حُجبت، أو ربما لم تكن أصلاً.", homeCta: "إلى الصفحة الرئيسية", downloadCta: "حمّل FocusDragon" },
  fa: { code: "۴۰۴", title: "حتی اژدها هم گم شده.", body: "صفحه‌ای که می‌خواستی روی آن تمرکز کنی وجود ندارد — شاید مسدود شده، شاید هرگز نبوده.", homeCta: "به صفحهٔ اصلی", downloadCta: "FocusDragon را دانلود کن" },
  zh: { code: "404", title: "连龙都迷路了。", body: "你想专注的页面不存在 — 可能被拦截了,也可能从未存在过。", homeCta: "回到首页", downloadCta: "下载 FocusDragon" },
  ja: { code: "404", title: "ドラゴンも迷子になりました。", body: "集中しようとしたページは存在しません — ブロックされたか、最初から無かったか。", homeCta: "ホームへ戻る", downloadCta: "FocusDragon をダウンロード" },
  ko: { code: "404", title: "용도 길을 잃었어요.", body: "집중하려던 페이지가 존재하지 않아요 — 차단됐거나, 애초에 없었거나.", homeCta: "홈으로 돌아가기", downloadCta: "FocusDragon 다운로드" },
  vi: { code: "404", title: "Đến rồng cũng lạc đường.", body: "Trang bạn định tập trung không tồn tại — có thể đã bị chặn, có thể chưa từng có.", homeCta: "Về trang chủ", downloadCta: "Tải FocusDragon" },
  hi: { code: "404", title: "ड्रैगन भी खो गया।", body: "जिस पेज पर आप ध्यान देने आए थे वो मौजूद नहीं है — शायद ब्लॉक हो गया, शायद कभी था ही नहीं।", homeCta: "होम पर जाएँ", downloadCta: "FocusDragon डाउनलोड करें" },
  bn: { code: "৪০৪", title: "ড্রাগনও পথ হারিয়েছে।", body: "যে পেজে মনোযোগ দিতে এসেছিলেন সেটা নেই — হয়তো ব্লক হয়েছে, হয়তো কখনোই ছিল না।", homeCta: "হোমে ফিরুন", downloadCta: "FocusDragon ডাউনলোড করুন" },
  th: { code: "404", title: "แม้แต่มังกรยังหลงทาง", body: "หน้าที่คุณตั้งใจจะโฟกัสไม่มีอยู่ — อาจถูกบล็อกไป หรืออาจไม่เคยมี", homeCta: "กลับหน้าแรก", downloadCta: "ดาวน์โหลด FocusDragon" },
  id: { code: "404", title: "Bahkan naga pun tersesat.", body: "Halaman yang ingin kamu fokuskan tidak ada — mungkin diblokir, mungkin memang tidak pernah ada.", homeCta: "Kembali ke beranda", downloadCta: "Unduh FocusDragon" },
};

export default async function NotFound() {
  // Next 16 doesn't pass [locale] params to global not-found.tsx, so
  // we sniff the locale from the URL header. Falls back to English.
  const hdrs = await headers();
  const url = hdrs.get("x-invoke-path") ?? hdrs.get("next-url") ?? "";
  const first = url.split("/").filter(Boolean)[0];
  const locale: Locale = first && isLocale(first) ? first : DEFAULT_LOCALE;
  const c = COPY[locale];

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-7xl md:text-9xl font-extrabold mb-3 bg-gradient-to-br from-violet-400/40 to-fuchsia-500/10 bg-clip-text text-transparent select-none tabular-nums">
          {c.code}
        </div>
        <div className="text-5xl mb-6" aria-hidden>🐉</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{c.title}</h1>
        <p className="text-white/55 leading-relaxed mb-10">{c.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition"
          >
            {c.homeCta}
          </Link>
          <a
            href={`/api/download?v=${APP_VERSION}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition text-sm"
          >
            {c.downloadCta}
          </a>
        </div>
      </div>
    </main>
  );
}
