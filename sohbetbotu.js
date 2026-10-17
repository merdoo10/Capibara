const chatbox = document.getElementById("chat-box");
const userinput = document.getElementById("user-input");
const sendbtn = document.getElementById("send-btn");



const rastgele = (liste) => liste[Math.floor(Math.random() * liste.length)];


function normalize(s) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function guvenliMatematik(ifade) {
  const metin = ifade.trim();
  if (!metin || !/^[\d\s+\-*/^().,]+$/.test(metin)) return null;

  try {
    const sonuc = new Function("return (" + metin.replace(/\^/g, "**") + ");")();
    return Number.isFinite(sonuc) ? sonuc : null;
  } catch {
    return null;
  }
}

function mesajEkle(sinif, icerik, html = false) {
  const satir = document.createElement("div");
  satir.className = sinif;
  const balon = document.createElement("div");
  balon.className = "bubble";
  if (html) balon.innerHTML = icerik;
  else balon.textContent = icerik;
  satir.appendChild(balon);
  chatbox.appendChild(satir);
  chatbox.scrollTop = chatbox.scrollHeight;
}


const sss = [
  { anahtar: ["kac yil", "omur"], cevap: "Doğada genelde 8-10 yıl, bakım altında 12 yıla kadar yaşarlar." },
  { anahtar: ["boy", "kilo", "agirlik", "buyuk", "boyut"], cevap: "Yetişkinler 106-134 cm boyunda, 35-79 kg ağırlığındadır. Dünyanın en büyük kemiricisidir." },
  { anahtar: ["beslenme", "ne yer", "ne yiyor", "yemek", "otcul"], cevap: "Otçuldur. Çimen, su bitkileri, meyve, ağaç kabuğu ve bazı bitki köklerini yer." },
  { anahtar: ["nerede", "yasam alan", "habitat"], cevap: "Şili hariç tüm Güney Amerika ülkelerinde, su kenarlarında, bataklıklarda ve ormanlarda yaşar." },
  { anahtar: ["yuz", "suda", "nefes"], cevap: "Perdeli ayakları sayesinde çok iyi yüzer ve suda 5 dakikaya kadar nefesini tutabilir." },
  { anahtar: ["yavru", "dogum", "ureme"], cevap: "Dişiler yılda bir kez, genellikle 4-5 yavru doğurur. Yavrular kısa sürede yüzmeyi öğrenir." },
  { anahtar: ["grup", "sosyal", "yalniz"], cevap: "Çok sosyal hayvanlardır, genellikle 10-20 bireylik gruplar halinde yaşarlar." },
  { anahtar: ["tehlikeli", "saldir", "isir"], cevap: "Çok sakindirler, insanlara karşı genelde zararsızdır. Yine de vahşi hayvandır, yaklaşıp rahatsız etmemek gerekir." },
  { anahtar: ["evcil", "evde", "sahiplen"], cevap: "Geniş alan, su ve sosyal bir grup ister, bu yüzden evde tutmaya uygun değildir. Yasal durum ülkeye göre değişir." },
  { anahtar: ["akraba", "kemirgen", "kobay"], cevap: "Kemirgendir, en yakın akrabaları arasında kobaylar var." },
];



const sabitCevaplar = {
  yigit: "Kickte yayin acan,basketbolda post oynama konusunda ozel dersler vererek gecimini saglayan uzun boylu unlu insan.",
  tuna: "Kobe Bryantin ruhunu Turkiye parkelerinde yasatan,orta mesafe konusunda makaleler yazan,Kumru7nin unlu mudavimi.",
  duru: "Erzurum sinirlarindan cikan nadir entel insanlarin basinda bulunan,feminist degerleri guncel degerlerimize uygulamak icin makaleler yazan kisi.",
  poyraz: "El goatinholar derneginin baskani,c dilinin onde gelen isimlerinden biri ve prime doneminde muhammed aliyi yenen birkac boksorden biri.",
  "/motivasyon": "Hemen panik yap ve elindeki herseyi sat.Her sey bitti.",
  "/makarna": "makarnayi hasla ve ye",
  ne: "ne var lan essek sipasi beni oraya getirtme",
  "/ben": "Eger bu saheseri yapan kisiye ulasmak istersen dm gel Slack hesabim=surucumert7",
};

const selamlar = ["selam", "selamun aleykum", "merhaba"];

const yardimMetni =
  "🤖 <b>MerdAI v1.0 Komut Listesi:</b><br><br>" +
  "<b>/help</b> - Bu yardım menüsünü gösterir<br>" +
  "<b>/saat</b> - Anlık zamanı gösterir<br>" +
  "<b>/tarih</b> - Anlık tarihi gösterir<br>" +
  "<b>/zar</b> - 1-6 arası zar atar<br>" +
  "<b>/olay</b> - Tamamen absürt bir son dakika haberi üretir<br>" +
  "<b>/motivasyon</b> - Kritik finansal tavsiyeler verir<br>" +
  "<b>/makarna</b> - Mutfak tüyoları sunar<br>" +
  "🐹 Capibara hakkında soru sorabilirsin (Örn: ne yer, kaç yıl yaşar)<br>" +
  "💡 <i>İpucu: Direkt matematik işlemi (Örn: 25*4+5) yazarak hesaplatabilirsin!</i>";

function olayUret() {
  const mekanlar = [
    "Antarktika'daki bir penguen kongresinde",
    "Erzurum'daki yerel bir kahvehanede",
    "Uluslararası Uzay İstasyonu'nun mutfak bölümünde",
    "Kral Şakir'in gizli yeraltı sığınağında",
    "Metrobüsün Zincirlikuyu virajında",
  ];
  const ozneler = [
    "C dilinde yazılmış yapay zekalı bir çamaşır makinesi",
    "Kobe Bryant hayranı bir güvercin sürüsü",
    "Vergi dairesinden kaçan bir grup yazılımcı",
    "Feminist teoriler üzerine havlayan bir sokak köpeği",
    "Sadece makarna yiyerek hayatta kalan bir astronot",
  ];
  const eylemler = [
    "yanlışlıkla kuantum fiziğini çözdü ve paniğe kapılıp her şeyi sattı.",
    "bedava çiğ köfte dağıtılacağını duyunca izdihama neden oldu.",
    "Slack üzerinden evrene 'Aynen' mesajı göndererek büyük bir kriz başlattı.",
    "açtığı canlı yayında 10000 yıl boyunca hareketsiz durma rekoru kırdı.",
    "domates fiyatlarını protesto etmek için amuda kalkarak yürüyüş yaptı.",
  ];
  return (
    "🚨 <b>MERDAI SON DAKİKA HABERİ</b> 🚨<br><br>" +
    rastgele(mekanlar) + " " + rastgele(ozneler) + " " + rastgele(eylemler)
  );
}


function cevapUret(metin) {
  const temiz = metin.trim().toLowerCase();

  if (temiz === "/help" || temiz === "help") return yardimMetni;
  if (temiz === "/olay" || temiz === "olay") return olayUret();
  if (temiz === "/saat") return "Şu an saat: " + new Date().toLocaleTimeString();
  if (temiz === "/tarih") return "Anlik olarak tarih " + new Date().toLocaleDateString();
  if (temiz === "/zar") return "Zar sonucu: " + (Math.floor(Math.random() * 6) + 1);
  if (selamlar.includes(temiz)) return "OBAAAA .Seni buralarda gormek ne guzel.";
  if (Object.hasOwn(sabitCevaplar, temiz)) return sabitCevaplar[temiz];

  const sorgu = normalize(temiz);
  const sssCevap = sss.find((s) => s.anahtar.some((k) => sorgu.includes(k)));
  if (sssCevap) return sssCevap.cevap;

  const sonuc = guvenliMatematik(temiz);
  if (sonuc !== null) return "🧮 İşlem Sonucu: " + sonuc;

  return "Bilgim dahilinde degil ben 10000 yil calisip gelecegim.";
}



sendbtn.addEventListener("click", () => {
  const metin = userinput.value;
  if (metin.trim() === "") return;

  mesajEkle("message-user", metin);
  userinput.value = "";

  setTimeout(() => mesajEkle("message-bot", cevapUret(metin), true), 500);
});

userinput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendbtn.click();
});