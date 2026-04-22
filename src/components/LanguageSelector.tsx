import React from "react";

const LanguageSelector = () => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    if (!selectedLang) return;

    // 1️⃣ Set the cookie that Google Translate reads:
    document.cookie = `googtrans=/en/${selectedLang};path=/`;

    // 2️⃣ Optionally set URL hash (for some implementations):
    window.location.hash = `#googtrans=en/${selectedLang}`;

    // 3️⃣ Click the matching language anchor in the iframe:
    const intervalId = setInterval(() => {
      const iframe = document.querySelector(
        "iframe.goog-te-menu-frame",
      ) as HTMLIFrameElement;
      if (!iframe) return;

      const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!innerDoc) return;

      const anchors = Array.from(
        innerDoc.querySelectorAll("a.goog-te-menu2-item"),
      );
      const match = anchors.find((a) =>
        a.getAttribute("href")?.includes(`#${selectedLang}`),
      );
      if (match) {
        (match as HTMLElement).click();
        clearInterval(intervalId);
      }
    }, 300);

    setTimeout(() => clearInterval(intervalId), 5000);

    // 4️⃣ Force a reload so translation applies everywhere:
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <select
      onChange={handleLanguageChange}
      className="bg-transparent dark:bg-black text-black dark:text-white border border-black dark:border-white px-2 rounded-full"
      defaultValue=""
    >
      <option value="" disabled>
        Language
      </option>
      <option value="en">English</option>
      <option value="ar">Arabic</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="hi">Hindi</option>
      <option value="zh-CN">Chinese</option>
      <option value="ja">Japanese</option>
      <option value="es">Spanish</option>
      <option value="it">Italian</option>
      <option value="pt">Portuguese</option>
      <option value="ru">Russian</option>
      <option value="ko">Korean</option>
      <option value="tr">Turkish</option>
      <option value="bn">Bengali</option>
      <option value="ta">Tamil</option>
      <option value="te">Telugu</option>
      <option value="mr">Marathi</option>
      <option value="gu">Gujarati</option>
      <option value="pa">Punjabi</option>
      <option value="nl">Dutch</option>
    </select>
  );
};

export default LanguageSelector;
