/**
 * SPLASH MINECRAFT SOFTWARE — OFFICIAL PRODUCTION INTERACTIVE CONTROLLER
 * High-performance 500Hz/240Hz/144Hz responsive micro-interactions
 */

// Central Configurable Site Data (Effortlessly Editable)
const siteConfig = {
  softwareName: "Splash",
  version: "v1.1.0",
  tagline: "Master Precision. Dominate The Meta.",
  accentColor: "#0088FF",
  pricing: [
    {
      id: "monthly",
      name: "Monthly",
      billingSub: "Standard Access • Cancel anytime",
      badge: null,
      includesText: null,
      desc: "Full access to Splash with all current modules, automatic updates, and standard support.",
      price: "5.99",
      period: "/ MONTH",
      featured: false,
      ctaText: "Buy Now",
      checkoutUrl: "#pricing",
      features: [
        "Windows 10 / 11",
        "Regular Updates",
        "24/7 Discord Support",
        "Any Launcher Support",
        "Any Version Support",
        "30-Day Access",
        "Cancel anytime"
      ]
    },
    {
      id: "beta_vip",
      name: "Beta",
      billingSub: "Developer Builds • Early Access",
      badge: "Bestseller",
      includesText: "Includes everything in the $14.99 plan:",
      desc: "Everything in Permanent plus early experimental builds, private developer channel, and beta access.",
      price: "19.99",
      period: "/ BETA",
      featured: true,
      ctaText: "Buy Now",
      checkoutUrl: "#pricing",
      features: [
        "Windows 10 / 11",
        "Regular Updates",
        "24/7 Discord Support",
        "Any Launcher Support",
        "Any Version Support",
        "Permanent Access",
        "Beta Access"
      ]
    },
    {
      id: "permanent",
      name: "Permanent",
      billingSub: "Lifetime Ownership",
      badge: null,
      includesText: "Includes everything in the $5.99 plan:",
      desc: "Permanent ownership with all future updates, priority support, and zero recurring fees.",
      price: "14.99",
      period: "/ PERMANENT",
      featured: false,
      ctaText: "Buy Now",
      checkoutUrl: "#pricing",
      features: [
        "Windows 10 / 11",
        "Regular Updates",
        "24/7 Discord Support",
        "Any Launcher Support",
        "Any Version Support",
        "Permanent Access"
      ]
    }
  ],
  explorer: {
    profiles: {
      title: "Profiles & Slot Macro Engine",
      desc: "Create and organize dedicated profiles for various game modes. Each profile contains customized macro slots, trigger keys, and multi-action key bindings with microsecond delay accuracy.",
      image: "assets/images/preview_profiles_latest.png",
      video: "assets/videos/gui_dashboard.mp4",
      chips: ["Multi-Profile Management", "Microsecond Precision", "Trigger Key Capture", "Action Sequences"]
    },
    click: {
      title: "Auto Clicker & Hold Behavior",
      desc: "Advanced auto-click engine with humanized CPS variation, cycle limit counts, and smart Hold Modes (Hold while pressed vs. Toggle on/off) to flawlessly assist block placement and combat.",
      image: "assets/images/preview_click_latest.png",
      video: "assets/videos/slot_actions.mp4",
      chips: ["1-500 CPS Range", "Hold & Toggle Modes", "Humanized Jitter", "Safe Cycle Limits"]
    },
    switch: {
      title: "Slot Switch & Combo Sequence Matrix",
      desc: "Four independent sequences with 8 configurable output steps each. Sequence weapon swaps, food consumption, and totem clutches with individual millisecond delay pacing.",
      image: "assets/images/preview_switch_latest.png",
      video: "assets/videos/combat_clutch.mp4",
      chips: ["4 Independent Sequences", "8 Output Steps", "Paced Timing Matrix", "Hold & Press Modes"]
    }
  }
};

// Multi-Language Translation Dictionary (Brand 'Splash' Preserved Exactly)
const translations = {
  "en": {
    "navOverview": "Overview",
    "navShowcase": "Showcase",
    "navReviews": "Reviews",
    "navClients": "Clients",
    "navPricing": "Pricing",
    "navFaq": "FAQ",
    "navDownload": "Download",
    "navLogin": "Log In",
    "navGetAccess": "Get Access",
    "heroBadge": "Best Macro Software",
    "heroTitleLead": "Minecraft Best",
    "heroTitleAccent": "Undetected Macro",
    "heroTitleSub": "Minecraft Best Undetected Macro",
    "heroSubtitle": "Custom profiles, responsive timing, and lightweight performance — all in one premium experience.",
    "heroCtaPrimary": "Get Splash — $5.99 / mo",
    "heroCtaWatch": "Watch In Action",
    "heroMetric1": "Hardware Frame Pacing",
    "heroMetric2": "Input Dispatch Latency",
    "heroMetric3": "Client Compatibility",
    "heroMetric4": "Memory Injections",
    "supportedClientsLabel": "SUPPORTED CLIENTS:",
    "featTag": "Architectural Superiority",
    "featTitle": "Built for total combat supremacy.",
    "featDesc": "Splash delivers surgical input automation without touching game memory. Every keystroke, click, and slot swap is simulated at native hardware speeds.",
    "feat1Title": "Completely Undetectable",
    "feat1Desc": "Ring-3 external execution. Zero memory injection, zero DLL tampering, and zero process hook signatures. Completely immune to server-side anticheats.",
    "feat2Title": "Keeps Your FPS at Max",
    "feat2Desc": "Ultra-lean background worker tied to high-precision Windows multimedia timer queues. Guarantees sub-millisecond execution with zero frame drops.",
    "feat3Title": "Configure Everything",
    "feat3Desc": "Four sequence channels with 8 discrete outputs each. Customize hotkeys, switch delays, crystal placements, and block hold modes with microsecond precision.",
    "feat4Title": "Autonomous Client Hook",
    "feat4Desc": "Real-time process monitor that automatically detects Lunar, Badlion, Feather, LabyMod, Modrinth, CurseForge, Prism, and Vanilla on launch.",
    "feat5Title": "Procedural Canvas & Themes",
    "feat5Desc": "7 selectable procedural GPU patterns (Subtle Grid, Flowing Lines, Cyber Dots, Deep Waves, Mesh) dynamically tinted to your electric-blue aesthetic.",
    "feat6Title": "Regular Silent Updates",
    "feat6Desc": "Cryptographically verified background update engine with SHA-256 and RSA-4096. Minimizes to the Windows tray with instant RAM reclamation (~20MB).",
    "reviewsTag": "Verified Feedback",
    "reviewsTitle": "What players say.",
    "reviewsDesc": "Unfiltered experiences from top-tier competitive PvP players, rank leaders, and daily combatants.",
    "pricingTag": "Transparent Licensing",
    "pricingTitle": "Pick a plan.",
    "pricingDesc": "Instant automatic delivery immediately upon checkout. Unrestricted feature access on all plans with zero hidden fees."
  },
  "es": {
    "navOverview": "Resumen",
    "navShowcase": "Demostración",
    "navReviews": "Opiniones",
    "navClients": "Clientes",
    "navPricing": "Precios",
    "navFaq": "Preguntas",
    "navDownload": "Descargar",
    "navLogin": "Iniciar sesión",
    "navGetAccess": "Obtener acceso",
    "heroBadge": "El Mejor Software de Macros",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "El Mejor Macro Indetectable",
    "heroTitleSub": "El Mejor Macro Indetectable para Minecraft",
    "heroSubtitle": "Perfiles personalizados, sincronización responsiva y rendimiento ultraligero.",
    "heroCtaPrimary": "Obtén Splash — $5.99 / mes",
    "heroCtaWatch": "Ver en Acción",
    "heroMetric1": "Sincronización de fotogramas",
    "heroMetric2": "Latencia de despacho",
    "heroMetric3": "Compatibilidad de clientes",
    "heroMetric4": "Inyecciones en memoria",
    "supportedClientsLabel": "CLIENTES SOPORTADOS:",
    "featTag": "Superioridad Arquitectónica",
    "featTitle": "Construido para supremacía total en combate.",
    "featDesc": "Splash ofrece automatización quirúrgica de entrada sin tocar la memoria del juego.",
    "feat1Title": "Totalmente Indetectable",
    "feat1Desc": "Ejecución externa Ring-3. Cero inyección de memoria y cero firmas de enganche.",
    "feat2Title": "Mantiene tus FPS al Máximo",
    "feat2Desc": "Sub-milisegundo garantizado con temporizadores de alta precisión de Windows.",
    "feat3Title": "Configura Todo",
    "feat3Desc": "4 canales de secuencia con 8 salidas discretas cada uno.",
    "feat4Title": "Enganche Autónomo de Clientes",
    "feat4Desc": "Monitor de procesos en tiempo real con detección automática de clientes.",
    "feat5Title": "Lienzo Procedural y Temas",
    "feat5Desc": "Patrones dinámicos renderizados por GPU en tono azul eléctrico.",
    "feat6Title": "Actualizaciones Silenciosas Regulares",
    "feat6Desc": "Motor de actualización seguro en segundo plano con RSA-4096.",
    "reviewsTag": "Comentarios Verificados",
    "reviewsTitle": "Lo que dicen los jugadores.",
    "reviewsDesc": "Experiencias de jugadores competitivos de alto nivel.",
    "pricingTag": "Licencias Transparentes",
    "pricingTitle": "Elige un plan.",
    "pricingDesc": "Entrega automática e instantánea al completar la compra."
  },
  "fr": {
    "navOverview": "Aperçu",
    "navShowcase": "Démo",
    "navReviews": "Avis",
    "navClients": "Clients",
    "navPricing": "Tarifs",
    "navFaq": "FAQ",
    "navDownload": "Télécharger",
    "navLogin": "Connexion",
    "navGetAccess": "Obtenir l'accès",
    "heroBadge": "Meilleur logiciel de macro",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Meilleur Macro Indétectable",
    "heroTitleSub": "Le meilleur macro indétectable pour Minecraft",
    "heroSubtitle": "Profils personnalisés, réactivité absolue et performance ultra-légère.",
    "heroCtaPrimary": "Obtenir Splash — $5.99 / mois",
    "heroCtaWatch": "Voir en action",
    "heroMetric1": "Cadence matérielle",
    "heroMetric2": "Latence d'entrée",
    "heroMetric3": "Compatibilité clients",
    "heroMetric4": "Injections mémoire",
    "supportedClientsLabel": "CLIENTS SUPPORTÉS:",
    "featTag": "Supériorité architecturale",
    "featTitle": "Conçu pour une suprématie totale au combat.",
    "featDesc": "Splash offre une automatisation chirurgicale des commandes sans toucher la mémoire.",
    "feat1Title": "Totalement indétectable",
    "feat1Desc": "Exécution externe Ring-3 sans aucune injection de processus.",
    "feat2Title": "Préserve vos FPS au maximum",
    "feat2Desc": "Exécution sub-milliseconde grâce aux minuteries haute précision.",
    "feat3Title": "Entièrement configurable",
    "feat3Desc": "4 canaux de séquence avec 8 sorties paramétrables.",
    "feat4Title": "Détection automatique des clients",
    "feat4Desc": "Détection en temps réel de Lunar, Badlion, Feather et Vanilla.",
    "feat5Title": "Visuels procéduraux GPU",
    "feat5Desc": "Motifs dynamiques haute fidélité aux nuances bleu électrique.",
    "feat6Title": "Mises à jour silencieuses",
    "feat6Desc": "Mises à jour automatiques sécurisées et réduction en barre des tâches.",
    "reviewsTag": "Avis vérifiés",
    "reviewsTitle": "Ce que disent les joueurs.",
    "reviewsDesc": "Retours authentiques des meilleurs compétiteurs PvP.",
    "pricingTag": "Licence transparente",
    "pricingTitle": "Choisissez un forfait.",
    "pricingDesc": "Livraison instantanée dès la validation de votre achat."
  },
  "de": {
    "navOverview": "Übersicht",
    "navShowcase": "Showcase",
    "navReviews": "Bewertungen",
    "navClients": "Clients",
    "navPricing": "Preise",
    "navFaq": "FAQ",
    "navDownload": "Download",
    "navLogin": "Anmelden",
    "navGetAccess": "Zugang",
    "heroBadge": "Beste Makro-Software",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Bestes Unentdecktes Makro",
    "heroTitleSub": "Bestes unentdecktes Minecraft-Makro",
    "heroSubtitle": "Benutzerdefinierte Profile, reaktionsschnelles Timing und erstklassige Leistung.",
    "heroCtaPrimary": "Splash Holen — $5.99 / Mo",
    "heroCtaWatch": "In Aktion ansehen",
    "heroMetric1": "Hardware-Frame-Pacing",
    "heroMetric2": "Eingabeverzögerung",
    "heroMetric3": "Client-Kompatibilität",
    "heroMetric4": "Speicher-Injektionen",
    "supportedClientsLabel": "UNTERSTÜTZTE CLIENTS:",
    "featTag": "Architektonische Überlegenheit",
    "featTitle": "Entwickelt für absolute Kampfüberlegenheit.",
    "featDesc": "Splash liefert chirurgische Eingabeautomatisierung ohne Spielspeicherzugriff.",
    "feat1Title": "Vollständig unentdeckbar",
    "feat1Desc": "Ring-3 externe Ausführung. Null Speicherinjektion, null Erkennungsrisiko.",
    "feat2Title": "Maximale FPS garantiert",
    "feat2Desc": "Sub-Millisekunden-Ausführung mit Windows-Hochpräzisions-Timer.",
    "feat3Title": "Alles konfigurierbar",
    "feat3Desc": "Vier Sequenzkanäle mit je 8 diskreten Ausgängen.",
    "feat4Title": "Autonomer Client-Hook",
    "feat4Desc": "Echtzeit-Überwachung zur Erkennung gängiger Minecraft-Clients.",
    "feat5Title": "Prozedurales Design",
    "feat5Desc": "GPU-beschleunigte Hintergründe im Splash-Blau-Design.",
    "feat6Title": "Regelmäßige Updates",
    "feat6Desc": "Sichere automatische Updates im Hintergrund via System-Tray.",
    "reviewsTag": "Verifiziertes Feedback",
    "reviewsTitle": "Was Spieler sagen.",
    "reviewsDesc": "Erfahrungen von erstklassigen Wettkampfspielern.",
    "pricingTag": "Transparente Preise",
    "pricingTitle": "Wähle einen Plan.",
    "pricingDesc": "Sofortige automatische Bereitstellung direkt nach dem Kauf."
  },
  "ru": {
    "navOverview": "Обзор",
    "navShowcase": "Демонстрация",
    "navReviews": "Отзывы",
    "navClients": "Клиенты",
    "navPricing": "Тарифы",
    "navFaq": "ЧаВо",
    "navDownload": "Скачать",
    "navLogin": "Войти",
    "navGetAccess": "Получить доступ",
    "heroBadge": "Лучший софт для макросов",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Лучший Необнаруживаемый Макрос",
    "heroTitleSub": "Лучший необнаруживаемый макрос для Minecraft",
    "heroSubtitle": "Пользовательские профили, мгновенный отклик и максимальная производительность.",
    "heroCtaPrimary": "Получить Splash — $5.99 / мес",
    "heroCtaWatch": "Смотреть в действии",
    "heroMetric1": "Кадровая синхронизация",
    "heroMetric2": "Задержка ввода",
    "heroMetric3": "Поддержка клиентов",
    "heroMetric4": "Внедрений в память",
    "supportedClientsLabel": "ПОДДЕРЖИВАЕМЫЕ КЛИЕНТЫ:",
    "featTag": "Превосходство архитектуры",
    "featTitle": "Создан для полного доминирования в бою.",
    "featDesc": "Splash обеспечивает хирургически точный ввод без изменения памяти игры.",
    "feat1Title": "Полностью необнаружим",
    "feat1Desc": "Внешнее выполнение Ring-3 без модификации процессов.",
    "feat2Title": "Максимальный FPS",
    "feat2Desc": "Субмиллисекундное выполнение без просадок кадров.",
    "feat3Title": "Полная настройка",
    "feat3Desc": "4 канала последовательностей по 8 шагов каждый.",
    "feat4Title": "Автоопределение клиентов",
    "feat4Desc": "Поддержка Lunar, Badlion, Feather и других популярнейших сборок.",
    "feat5Title": "Процедурные темы",
    "feat5Desc": "Динамические визуальные фоны на GPU в фирменном неоново-синем стиле.",
    "feat6Title": "Тихие обновления",
    "feat6Desc": "Криптографическая проверка обновлений и работа в трее Windows.",
    "reviewsTag": "Проверенные отзывы",
    "reviewsTitle": "Отзывы игроков.",
    "reviewsDesc": "Реальный опыт сильнейших PvP игроков серверов.",
    "pricingTag": "Честные цены",
    "pricingTitle": "Выберите тариф.",
    "pricingDesc": "Мгновенная доставка лицензии сразу после оформления заказа."
  },
  "pt": {
    "navOverview": "Visão Geral",
    "navShowcase": "Demonstração",
    "navReviews": "Avaliações",
    "navClients": "Clientes",
    "navPricing": "Preços",
    "navFaq": "Perguntas",
    "navDownload": "Baixar",
    "navLogin": "Entrar",
    "navGetAccess": "Obter Acesso",
    "heroBadge": "Melhor Software de Macros",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "O Melhor Macro Indetectável",
    "heroTitleSub": "O Melhor Macro Indetectável para Minecraft",
    "heroSubtitle": "Perfis customizados, tempos de resposta ultra-rápidos e performance impecável.",
    "heroCtaPrimary": "Obter Splash — $5.99 / mês",
    "heroCtaWatch": "Ver em Ação",
    "heroMetric1": "Sincronia de hardware",
    "heroMetric2": "Latência de entrada",
    "heroMetric3": "Compatibilidade",
    "heroMetric4": "Injeções em memória",
    "supportedClientsLabel": "CLIENTES SUPORTADOS:",
    "featTag": "Superioridade Arquitetônica",
    "featTitle": "Feito para domínio completo no combate.",
    "featDesc": "O Splash garante automação precisa sem injetar nem alterar o jogo.",
    "feat1Title": "Totalmente Indetectável",
    "feat1Desc": "Execução externa Ring-3 com total imunidade a anticheats.",
    "feat2Title": "Mantém seus FPS no Máximo",
    "feat2Desc": "Processamento sub-milissegundo com consumo mínimo de recursos.",
    "feat3Title": "Configuração Completa",
    "feat3Desc": "4 canais com 8 saídas configuráveis com precisão milimétrica.",
    "feat4Title": "Detecção Automática de Clientes",
    "feat4Desc": "Identificação instantânea de Lunar, Badlion, Feather e outros.",
    "feat5Title": "Design Dinâmico por GPU",
    "feat5Desc": "Fundos animados procedurais na estética azul elétrico.",
    "feat6Title": "Atualizações Silenciosas",
    "feat6Desc": "Atualizações automáticas seguras minimizadas na bandeja do Windows.",
    "reviewsTag": "Opiniões Verificadas",
    "reviewsTitle": "O que dizem os jogadores.",
    "reviewsDesc": "Depoimentos de jogadores competitivos no topo dos rankings.",
    "pricingTag": "Preços Transparentes",
    "pricingTitle": "Escolha seu plano.",
    "pricingDesc": "Ativação instantânea logo após a confirmação."
  },
  "it": {
    "navOverview": "Panoramica",
    "navShowcase": "Dimostrazione",
    "navReviews": "Recensioni",
    "navClients": "Client",
    "navPricing": "Prezzi",
    "navFaq": "Domande",
    "navDownload": "Download",
    "navLogin": "Accedi",
    "navGetAccess": "Ottieni Accesso",
    "heroBadge": "Miglior Software di Macro",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Il Miglior Macro Non Rilevabile",
    "heroTitleSub": "Il Miglior Macro Non Rilevabile per Minecraft",
    "heroSubtitle": "Profili personalizzati, tempi di risposta fulminei e prestazioni ultraleggere.",
    "heroCtaPrimary": "Ottieni Splash — $5.99 / mese",
    "heroCtaWatch": "Guarda in Azione",
    "heroMetric1": "Sincronizzazione Frame Hardware",
    "heroMetric2": "Latenza di Invio Input",
    "heroMetric3": "Compatibilità con i Client",
    "heroMetric4": "Iniezioni di Memoria",
    "supportedClientsLabel": "CLIENT SUPPORTATI:",
    "featTag": "Superiorità Architetturale",
    "featTitle": "Costruito per la supremazia assoluta in combattimento.",
    "featDesc": "Splash offre un'automazione degli input chirurgica senza toccare la memoria del gioco.",
    "feat1Title": "Completamente Non Rilevabile",
    "feat1Desc": "Esecuzione esterna Ring-3. Zero iniezioni di memoria e zero rischi di rilevamento anticheat.",
    "feat2Title": "Mantiene i Tuoi FPS al Massimo",
    "feat2Desc": "Esecuzione sub-millisecondo garantita grazie ai timer multimediali Windows.",
    "feat3Title": "Configura Tutto",
    "feat3Desc": "4 canali di sequenza con 8 uscite indipendenti ciascuno.",
    "feat4Title": "Aggancio Autonomo del Client",
    "feat4Desc": "Monitoraggio in tempo reale che rileva automaticamente Lunar, Badlion, Feather e Vanilla.",
    "feat5Title": "Sfondi Dinamici e Temi GPU",
    "feat5Desc": "7 fantastici motivi procedurali con resa in blu elettrico ad alta fluidità.",
    "feat6Title": "Aggiornamenti Silenziosi Regolari",
    "feat6Desc": "Verifica crittografica con SHA-256 e RSA-4096. Si riduce nella barra delle applicazioni.",
    "reviewsTag": "Feedback Verificato",
    "reviewsTitle": "Cosa dicono i giocatori.",
    "reviewsDesc": "Esperienze autentiche dei migliori giocatori competitivi PvP.",
    "pricingTag": "Licenze Trasparenti",
    "pricingTitle": "Scegli un piano.",
    "pricingDesc": "Consegna automatica istantanea subito dopo l'acquisto."
  },
  "ja": {
    "navOverview": "概要",
    "navShowcase": "紹介",
    "navReviews": "レビュー",
    "navClients": "クライアント",
    "navPricing": "料金",
    "navFaq": "よくある質問",
    "navDownload": "ダウンロード",
    "navLogin": "ログイン",
    "navGetAccess": "アクセス権を取得",
    "heroBadge": "最高峰のマクロソフトウェア",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "最強の完全未検知マクロ",
    "heroTitleSub": "Minecraft 最強の完全未検知戦闘マクロ",
    "heroSubtitle": "カスタムプロファイル、ミリ秒単位の応答性、そして圧倒的な軽量性能をひとつのプレミアム体験に。",
    "heroCtaPrimary": "Splash を入手 — 月額 $5.99",
    "heroCtaWatch": "動作デモを見る",
    "heroMetric1": "120 FPS ハードウェア同期",
    "heroMetric2": "入力遅延 < 1ms",
    "heroMetric3": "主要クライアント完全対応",
    "heroMetric4": "メモリ注入 0件",
    "supportedClientsLabel": "対応クライアント:",
    "featTag": "圧倒的アーキテクチャ",
    "featTitle": "戦闘における絶対的優位性を求めて設計。",
    "featDesc": "Splash はゲームメモリに一切触れずに高精度のキー入力をシミュレート。アンチチートの監視を完全に回避します。",
    "feat1Title": "完全未検知・外部実行",
    "feat1Desc": "Ring-3 外部プロセス実行。DLL 改造やプロセスフック不要。サーバー監視に対して完全安全です。",
    "feat2Title": "最高FPSを維持",
    "feat2Desc": "Windows 高精度タイマーと直結。フレーム落ちゼロでサブミリ秒の打鍵を実現します。",
    "feat3Title": "自由自在なカスタマイズ",
    "feat3Desc": "4 つのシーケンスチャンネルに各 8 段階の出力。ホットキーやディレイを自由自在に調整可能。",
    "feat4Title": "クライアント自動検出",
    "feat4Desc": "Lunar、Badlion、Feather、LabyMod、Vanilla などを起動時に自動認識します。",
    "feat5Title": "プロシージャル GPU テーマ",
    "feat5Desc": "エレクトリックブルーの美しい GPU シェーダー背景が起動中のデスクトップを彩ります。",
    "feat6Title": "静かな自動バックグラウンド更新",
    "feat6Desc": "SHA-256 と RSA-4096 暗号検証。タスクトレイに最小化されメモリ消費は約20MB。",
    "reviewsTag": "実証済みの評価",
    "reviewsTitle": "プレイヤーの生の声。",
    "reviewsDesc": "トップランカーや対戦 PvP プレイヤーからの偽りのないレビュー。",
    "pricingTag": "明瞭なプラン設計",
    "pricingTitle": "プランを選択。",
    "pricingDesc": "決済完了後すぐに自動発行。すべての機能に追加費用なしでアクセス可能。"
  },
  "ko": {
    "navOverview": "개요",
    "navShowcase": "쇼케이스",
    "navReviews": "후기",
    "navClients": "클라이언트",
    "navPricing": "가격",
    "navFaq": "자주 묻는 질문",
    "navDownload": "다운로드",
    "navLogin": "로그인",
    "navGetAccess": "이용권 구매",
    "heroBadge": "최고의 매크로 소프트웨어",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "최강의 미감지 전투 매크로",
    "heroTitleSub": "Minecraft 최고의 미감지 전투 매크로",
    "heroSubtitle": "커스텀 프로필, 초정밀 타이밍, 초경량 구동 성능을 하나의 프리미엄 소프트웨어에서 경험하세요.",
    "heroCtaPrimary": "Splash 시작하기 — $5.99 / 월",
    "heroCtaWatch": "실제 구동 영상 보기",
    "heroMetric1": "하드웨어 프레임 페이싱",
    "heroMetric2": "입력 지연 시간 < 1ms",
    "heroMetric3": "모든 클라이언트 호환",
    "heroMetric4": "메모리 인젝션 0건",
    "supportedClientsLabel": "지원 클라이언트:",
    "featTag": "독보적인 아키텍처",
    "featTitle": "전장에서의 완벽한 승리를 위해 설계되었습니다.",
    "featDesc": "Splash 는 게임 메모리를 전혀 건드리지 않고 하드웨어 수준의 정밀한 키 입력을 구현합니다.",
    "feat1Title": "완벽한 미감지 보장",
    "feat1Desc": "Ring-3 외부 프로세스 실행. DLL 변조 및 메모리 주입이 전혀 없어 안티치트에 절대 감지되지 않습니다.",
    "feat2Title": "최대 FPS 유지",
    "feat2Desc": "Windows 고정밀 멀티미디어 타이머 기반. 렉과 프레임 드랍 없이 즉각 실행됩니다.",
    "feat3Title": "완벽한 사용자 커스텀",
    "feat3Desc": "각각 8개 출력을 갖춘 4개의 시퀀스 채널. 핫키와 스위칭 딜레이를 정밀하게 설정하세요.",
    "feat4Title": "클라이언트 자동 감지",
    "feat4Desc": "Lunar, Badlion, Feather, LabyMod, Vanilla 등 실행 시 즉각 자동으로 감지합니다.",
    "feat5Title": "절차적 GPU 비주얼 & 테마",
    "feat5Desc": "일렉트릭 블루 테마와 7가지 GPU 절차적 애니메이션 배경을 제공합니다.",
    "feat6Title": "무중단 무음 업데이트",
    "feat6Desc": "SHA-256 및 RSA-4096 보안 검증. 트레이로 최소화 시 단 20MB 내외의 초경량 메모리 사용.",
    "reviewsTag": "검증된 사용자 후기",
    "reviewsTitle": "플레이어들의 평가.",
    "reviewsDesc": "최상위 랭커와 랭킹 PvP 플레이어들의 생생한 실제 사용 경험.",
    "pricingTag": "투명한 라이선스",
    "pricingTitle": "요금제 선택.",
    "pricingDesc": "구매 즉시 자동 발급. 숨겨진 비용 없이 모든 기능을 무제한 이용하세요."
  },
  "zh": {
    "navOverview": "概览",
    "navShowcase": "演示",
    "navReviews": "评价",
    "navClients": "客户端",
    "navPricing": "定价",
    "navFaq": "常见问题",
    "navDownload": "下载",
    "navLogin": "登录",
    "navGetAccess": "获取权限",
    "heroBadge": "最佳宏指令软件",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "顶尖不可检测战斗宏",
    "heroTitleSub": "Minecraft 顶尖不可检测战斗宏",
    "heroSubtitle": "自定义配置、极致响应速度与超轻量级运行表现。",
    "heroCtaPrimary": "获取 Splash — $5.99 / 月",
    "heroCtaWatch": "查看实机效果",
    "heroMetric1": "120 FPS 硬件帧同步",
    "heroMetric2": "输入延迟 < 1 ms",
    "heroMetric3": "100% 客户端兼容",
    "heroMetric4": "零内存注入",
    "supportedClientsLabel": "支持的客户端：",
    "featTag": "卓越架构",
    "featTitle": "专为战斗统治力打造。",
    "featDesc": "Splash 提供手术刀般精准的按键自动化，完全不触碰游戏内存。所有指令以原生硬件速度模拟执行。",
    "feat1Title": "完全不可检测",
    "feat1Desc": "Ring-3 纯外部运行。零 DLL 注入，零内存修改。完美避开所有服务器反作弊检测。",
    "feat2Title": "保持极致满帧 FPS",
    "feat2Desc": "依托 Windows 多媒体高精定时器。确保亚毫秒级执行，告别微卡顿与掉帧。",
    "feat3Title": "全自由度参数配置",
    "feat3Desc": "4 个独立序列通道，每个拥有 8 步输出。微秒级调节武器切槽、连击与按键长按。",
    "feat4Title": "全自动客户端扫描",
    "feat4Desc": "实时识别 Lunar、Badlion、Feather、LabyMod、Modrinth、CurseForge、Prism 及原生启动器。",
    "feat5Title": "程序化动态画布与主题",
    "feat5Desc": "7 款 GPU 程序化背景图案，完美呼应标志性电光蓝 #0088FF 配色。",
    "feat6Title": "常规静默后台更新",
    "feat6Desc": "SHA-256 与 RSA-4096 双重密码学校验。最小化至托盘仅占用约 20MB 内存。",
    "reviewsTag": "真实玩家认证",
    "reviewsTitle": "玩家真实评价。",
    "reviewsDesc": "来自顶级竞技 PvP 选手与天梯排行榜玩家的真实体验。",
    "pricingTag": "透明授权方案",
    "pricingTitle": "选择您的方案。",
    "pricingDesc": "结账后系统秒级自动开通。全模块无限制访问，无任何隐藏费用。"
  },
  "hi": {
    "navOverview": "अवलोकन",
    "navShowcase": "प्रदर्शन",
    "navReviews": "समीक्षाएं",
    "navClients": "क्लाइंट्स",
    "navPricing": "कीमतें",
    "navFaq": "प्रश्न",
    "navDownload": "डाउनलोड",
    "navLogin": "लॉग इन",
    "navGetAccess": "पहुंच प्राप्त करें",
    "heroBadge": "सर्वश्रेष्ठ मैक्रो सॉफ्टवेयर",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "सर्वश्रेष्ठ अनडिटेक्टेड मैक्रो",
    "heroTitleSub": "Minecraft का सबसे सुरक्षित और सटीक मैक्रो",
    "heroSubtitle": "कस्टम प्रोफाइल, त्वरित प्रतिक्रिया और हल्का प्रदर्शन — सब कुछ एक ही प्रीमियम अनुभव में।",
    "heroCtaPrimary": "Splash प्राप्त करें — $5.99 / माह",
    "heroCtaWatch": "एक्शन में देखें",
    "heroMetric1": "हार्डवेयर फ्रेम पेसिंग",
    "heroMetric2": "इनपुट डिस्पैच विलंबता",
    "heroMetric3": "क्लाइंट अनुकूलता",
    "heroMetric4": "मेमोरी इंजेक्शन",
    "supportedClientsLabel": "समर्थित क्लाइंट्स:",
    "featTag": "तकनीकी श्रेष्ठता",
    "featTitle": "लड़ाई में पूर्ण वर्चस्व के लिए निर्मित।",
    "featDesc": "Splash खेल की मेमोरी को छुए बिना अत्यधिक सटीक इनपुट ऑटोमेशन प्रदान करता है।",
    "feat1Title": "पूरी तरह से अप्रभावी/सुरक्षित",
    "feat1Desc": "Ring-3 बाहरी निष्पादन। कोई मेमोरी इंजेक्शन या हुक सिग्नेचर नहीं।",
    "feat2Title": "आपके FPS को अधिकतम रखता है",
    "feat2Desc": "Windows हाई-प्रिसिजन टाइमर के साथ उप-मिलीसेकंड निष्पादन।",
    "feat3Title": "सब कुछ कॉन्फ़िगर करें",
    "feat3Desc": "8 अलग-अलग आउटपुट के साथ 4 अनुक्रम चैनल।",
    "feat4Title": "स्वचालित क्लाइंट पहचान",
    "feat4Desc": "Lunar, Badlion, Feather और Vanilla की त्वरित पहचान।",
    "feat5Title": "प्रोसीजरल थीम्स",
    "feat5Desc": "इलेक्ट्रिक ब्लू थीम में गतिशील GPU-एनिमेटेड पैटर्न।",
    "feat6Title": "नियमित शांत अपडेट",
    "feat6Desc": "RSA-4096 द्वारा सुरक्षित स्वचालित पृष्ठभूमि अपडेट।",
    "reviewsTag": "सत्यापित समीक्षाएं",
    "reviewsTitle": "खिलाड़ी क्या कहते हैं।",
    "reviewsDesc": "शीर्ष प्रतिस्पर्धी PvP खिलाड़ियों के वास्तविक अनुभव।",
    "pricingTag": "पारदर्शी लाइसेंसिंग",
    "pricingTitle": "एक योजना चुनें।",
    "pricingDesc": "चेकआउट के तुरंत बाद स्वचालित तत्काल डिलीवरी।"
  },
  "tr": {
    "navOverview": "Genel Bakış",
    "navShowcase": "Tanıtım",
    "navReviews": "Yorumlar",
    "navClients": "İstemciler",
    "navPricing": "Fiyatlandırma",
    "navFaq": "SSS",
    "navDownload": "İndir",
    "navLogin": "Giriş Yap",
    "navGetAccess": "Erişim Satın Al",
    "heroBadge": "En İyi Makro Yazılımı",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "En İyi Tespit Edilemeyen Makro",
    "heroTitleSub": "Minecraft En İyi Tespit Edilemeyen Makro",
    "heroSubtitle": "Özel profiller, anında tepki süresi ve hafif performans — hepsi tek bir premium deneyimde.",
    "heroCtaPrimary": "Splash Satın Al — $5.99 / ay",
    "heroCtaWatch": "İş Başında İzle",
    "heroMetric1": "Donanım Kare Senkronizasyonu",
    "heroMetric2": "Girdi Gecikmesi < 1ms",
    "heroMetric3": "Tüm İstemcilerle Uyumlu",
    "heroMetric4": "Bellek Enjeksiyonu 0",
    "supportedClientsLabel": "DESTEKLENEN İSTEMCİLER:",
    "featTag": "Mimari Üstünlük",
    "featTitle": "Savaşta mutlak üstünlük için tasarlandı.",
    "featDesc": "Splash, oyun belleğine dokunmadan milisaniyelik hassasiyette tuş simülasyonu sunar.",
    "feat1Title": "Tamamen Tespit Edilemez",
    "feat1Desc": "Ring-3 harici yürütme. Sıfır DLL enjeksiyonu ve sıfır anticheat riski.",
    "feat2Title": "FPS Değerinizi Zirvede Tutar",
    "feat2Desc": "Windows yüksek hassasiyetli multimedya zamanlayıcıları ile sıfır takılma.",
    "feat3Title": "Her Şeyi Özelleştirin",
    "feat3Desc": "Her biri 8 çıkışa sahip 4 dizi kanalı. Kısayolları ve gecikmeleri dilediğiniz gibi ayarlayın.",
    "feat4Title": "Otomatik İstemci Tespiti",
    "feat4Desc": "Lunar, Badlion, Feather ve Vanilla istemcilerini başlatıldığında anında tanır.",
    "feat5Title": "Prosedürel GPU Temaları",
    "feat5Desc": "Elektrik mavisi tarzında 7 farklı akıcı GPU arka plan animasyonu.",
    "feat6Title": "Sessiz Düzenli Güncellemeler",
    "feat6Desc": "SHA-256 ve RSA-4096 doğrulamalı sistem tepsisi üzerinde çalışan hafif yapı (~20MB).",
    "reviewsTag": "Doğrulanmış İncelemeler",
    "reviewsTitle": "Oyuncular ne diyor.",
    "reviewsDesc": "Üst düzey rekabetçi PvP oyuncularından gerçek ve filtresiz deneyimler.",
    "pricingTag": "Şeffaf Lisanslama",
    "pricingTitle": "Bir plan seçin.",
    "pricingDesc": "Ödemeden hemen sonra anında otomatik teslimat."
  },
  "pl": {
    "navOverview": "Przegląd",
    "navShowcase": "Prezentacja",
    "navReviews": "Opinie",
    "navClients": "Klienty",
    "navPricing": "Cennik",
    "navFaq": "FAQ",
    "navDownload": "Pobierz",
    "navLogin": "Zaloguj",
    "navGetAccess": "Kup dostęp",
    "heroBadge": "Najlepsze Oprogramowanie Makr",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Najlepsze Niewykrywalne Makro",
    "heroTitleSub": "Najlepsze Niewykrywalne Makro do Minecraft",
    "heroSubtitle": "Własne profile, błyskawiczny czas reakcji i ultralekka wydajność w jednym pakiecie premium.",
    "heroCtaPrimary": "Kup Splash — $5.99 / mies.",
    "heroCtaWatch": "Zobacz w Akcji",
    "heroMetric1": "Pacing klatek sprzętowych",
    "heroMetric2": "Opóźnienie wejścia < 1ms",
    "heroMetric3": "Pełna zgodność z launcherami",
    "heroMetric4": "Wstrzyknięcia do pamięci 0",
    "supportedClientsLabel": "OBSŁUGIWANE KLIENTY:",
    "featTag": "Wyższość Architektoniczna",
    "featTitle": "Zbudowany dla totalnej dominacji w walce.",
    "featDesc": "Splash zapewnia chirurgiczną automatyzację wejścia bez modyfikowania pamięci gry.",
    "feat1Title": "Całkowicie Niewykrywalny",
    "feat1Desc": "Zewnętrzne wykonywanie Ring-3. Zero wstrzykiwania DLL i zero sygnatur hooków.",
    "feat2Title": "Utrzymuje Maksymalne FPS",
    "feat2Desc": "Superlekki proces powiązany z precyzyjnymi timerami multimedialnymi Windows.",
    "feat3Title": "Skonfiguruj Wszystko",
    "feat3Desc": "4 kanały sekwencji z 8 osobnymi krokami każdy. Precyzja do mikrosekundy.",
    "feat4Title": "Automatyczne Wykrywanie Klientów",
    "feat4Desc": "Błyskawiczne wykrywanie Lunar, Badlion, Feather, LabyMod i innych.",
    "feat5Title": "Proceduralne Motywy GPU",
    "feat5Desc": "Dynamiczne animacje tła w elektryzującym błękicie renderowane przez GPU.",
    "feat6Title": "Ciche Regularne Aktualizacje",
    "feat6Desc": "Kryptograficzna weryfikacja SHA-256 i RSA-4096. Minimalizacja do zasobnika systemowego (~20MB).",
    "reviewsTag": "Zweryfikowane Opinie",
    "reviewsTitle": "Co mówią gracze.",
    "reviewsDesc": "Bezpośrednie doświadczenia od czołowych graczy rankingowych PvP.",
    "pricingTag": "Przejrzyste Licencje",
    "pricingTitle": "Wybierz plan.",
    "pricingDesc": "Natychmiastowa automatyczna dostawa licencji od razu po zakupie."
  },
  "ar": {
    "navOverview": "نظرة عامة",
    "navShowcase": "استعراض",
    "navReviews": "آراء اللاعبين",
    "navClients": "المشغلات",
    "navPricing": "الأسعار",
    "navFaq": "الأسئلة الشائعة",
    "navDownload": "تحميل",
    "navLogin": "تسجيل الدخول",
    "navGetAccess": "احصل على الوصول",
    "heroBadge": "أفضل برنامج ماكرو",
    "heroTitleLead": "ماين كرافت",
    "heroTitleAccent": "أفضل ماكرو غير قابل للاكتشاف",
    "heroTitleSub": "أفضل ماكرو غير قابل للاكتشاف لماين كرافت",
    "heroSubtitle": "ملفات تعريف مخصصة، استجابة فائقة السرعة، وأداء فائق الخفة في تجربة استثنائية واحدة.",
    "heroCtaPrimary": "احصل على Splash — $5.99 / شهرياً",
    "heroCtaWatch": "شاهد البرنامج أثناء العمل",
    "heroMetric1": "تزامن إطارات عتادي",
    "heroMetric2": "زمن استجابة الإدخال < 1ms",
    "heroMetric3": "توافق تام مع المشغلات",
    "heroMetric4": "حقن في الذاكرة 0",
    "supportedClientsLabel": "المشغلات المدعومة:",
    "featTag": "تفوق تقني فائق",
    "featTitle": "صُمم للسيطرة الكاملة في معارك PvP.",
    "featDesc": "يقدم Splash أتمتة دقيقة للمدخلات دون لمس ذاكرة اللعبة على الإطلاق وبسرعة العتاد الأصلية.",
    "feat1Title": "غير قابل للاكتشاف تماماً",
    "feat1Desc": "تشغيل خارجي في طبقة Ring-3 بدون أي حقن لملفات DLL وبحصانة تامة ضد برامج مكافحة الغش.",
    "feat2Title": "يحافظ على أعلى معدل إطارات FPS",
    "feat2Desc": "استجابة فائقة السرعة عبر مؤقتات Windows الدقيقة بدون أي هبوط في الإطارات.",
    "feat3Title": "تحكم كامل في كل شيء",
    "feat3Desc": "4 قنوات تسلسل مع 8 خطوات مستقلة لكل منها للتحكم في مفاتيح الاختصار والتأخير بدقة متناهية.",
    "feat4Title": "التعرف التلقائي على المشغلات",
    "feat4Desc": "اكتشاف فوري لمشغلات Lunar و Badlion و Feather و LabyMod والمشغل الرسمي بمجرد فتحها.",
    "feat5Title": "خلفيات ورسوم GPU متحركة",
    "feat5Desc": "أنماط رسومية ديناميكية مبهرة باللون الأزرق الكهربائي تعمل بواسطة كرت الشاشة.",
    "feat6Title": "تحديثات صامتة منتظمة",
    "feat6Desc": "تحقق أمني بتشفير RSA-4096 ويعمل بخفة في شريط المهام مع استهلاك ذاكرة لا يتجاوز 20 ميجابايت.",
    "reviewsTag": "تقييمات موثقة",
    "reviewsTitle": "ماذا يقول المحترفون.",
    "reviewsDesc": "تجارب حقيقية من نخبة متصدري قوائم معارك PvP.",
    "pricingTag": "اشتراكات شفافة",
    "pricingTitle": "اختر خطتك.",
    "pricingDesc": "تسليم فوري وتلقائي للرخصة بمجرد إتمام الدفع بدون أي رسوم خفية."
  },
  "nl": {
    "navOverview": "Overzicht",
    "navShowcase": "Showcase",
    "navReviews": "Beoordelingen",
    "navClients": "Clients",
    "navPricing": "Tarieven",
    "navFaq": "FAQ",
    "navDownload": "Downloaden",
    "navLogin": "Inloggen",
    "navGetAccess": "Krijg Toegang",
    "heroBadge": "Beste Macro Software",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Beste Niet-Detecteerbare Macro",
    "heroTitleSub": "Minecraft Beste Niet-Detecteerbare Macro",
    "heroSubtitle": "Aangepaste profielen, responsieve timing en vederlichte prestaties in één premium ervaring.",
    "heroCtaPrimary": "Koop Splash — $5.99 / mnd",
    "heroCtaWatch": "Bekijk in Actie",
    "heroMetric1": "Hardware Frame Pacing",
    "heroMetric2": "Invoervertraging < 1ms",
    "heroMetric3": "100% Client Compatibiliteit",
    "heroMetric4": "Geheugen Injecties 0",
    "supportedClientsLabel": "ONDERSTEUNDE CLIENTS:",
    "featTag": "Architectonische Superioriteit",
    "featTitle": "Gebouwd voor totale overmacht in gevechten.",
    "featDesc": "Splash levert chirurgische invoerautomatisering zonder het spelgeheugen aan te raken.",
    "feat1Title": "Volledig Niet-Detecteerbaar",
    "feat1Desc": "Ring-3 externe uitvoering. Geen geheugeninjectie en geen anticheat risico.",
    "feat2Title": "Behoudt Maximale FPS",
    "feat2Desc": "Sub-milliseconde uitvoering met Windows hoge-precisie multimediatimers.",
    "feat3Title": "Configureer Alles",
    "feat3Desc": "4 sequentiekanalen met elk 8 discrete uitgangen. Tot op de microseconde nauwkeurig.",
    "feat4Title": "Autonome Client Detectie",
    "feat4Desc": "Realtime procesmonitor die Lunar, Badlion, Feather en Vanilla automatisch herkent.",
    "feat5Title": "Procedurele GPU Achtergronden",
    "feat5Desc": "Dynamische GPU-patronen in stijlvol elektrisch blauw.",
    "feat6Title": "Regelmatige Stille Updates",
    "feat6Desc": "Cryptografisch geverifieerd via RSA-4096. Minimaliseert naar systeemvak (~20MB RAM).",
    "reviewsTag": "Geverifieerde Ervaringen",
    "reviewsTitle": "Wat spelers zeggen.",
    "reviewsDesc": "Ongefilterde verhalen van topcompetitieve PvP-spelers.",
    "pricingTag": "Transparante Prijzen",
    "pricingTitle": "Kies een pakket.",
    "pricingDesc": "Directe automatische levering onmiddellijk na het afrekenen."
  },
  "id": {
    "navOverview": "Ringkasan",
    "navShowcase": "Showcase",
    "navReviews": "Ulasan",
    "navClients": "Klien",
    "navPricing": "Harga",
    "navFaq": "FAQ",
    "navDownload": "Unduh",
    "navLogin": "Masuk",
    "navGetAccess": "Beli Akses",
    "heroBadge": "Software Makro Terbaik",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Makro Terbaik Tak Terdeteksi",
    "heroTitleSub": "Makro Minecraft Terbaik yang Tak Terdeteksi",
    "heroSubtitle": "Profil kustom, respon secepat kilat, dan performa super ringan dalam satu software premium.",
    "heroCtaPrimary": "Beli Splash — $5.99 / bln",
    "heroCtaWatch": "Lihat Demo Langsung",
    "heroMetric1": "Frame Pacing Hardware",
    "heroMetric2": "Latensi Input < 1ms",
    "heroMetric3": "Kompatibel Semua Klien",
    "heroMetric4": "Injeksi Memori 0",
    "supportedClientsLabel": "KLIEN DIDUKUNG:",
    "featTag": "Keunggulan Arsitektur",
    "featTitle": "Diciptakan untuk dominasi penuh dalam pertempuran.",
    "featDesc": "Splash menghadirkan otomasi input yang sangat presisi tanpa menyentuh memori game sedikit pun.",
    "feat1Title": "Sama Sekali Tak Terdeteksi",
    "feat1Desc": "Eksekusi eksternal Ring-3. Tanpa injeksi DLL dan kebal terhadap anticheat server.",
    "feat2Title": "Menjaga FPS Tetap Maksimal",
    "feat2Desc": "Eksekusi sub-milidetik dengan Windows multimedia timer tanpa penurunan FPS.",
    "feat3Title": "Kustomisasi Segalanya",
    "feat3Desc": "4 saluran urutan dengan masing-masing 8 output untuk mengatur hotkey dan jeda.",
    "feat4Title": "Deteksi Otomatis Klien",
    "feat4Desc": "Mendeteksi secara otomatis Lunar, Badlion, Feather, LabyMod, dan Vanilla saat dimulai.",
    "feat5Title": "Tema & Visual GPU Dinamis",
    "feat5Desc": "Pola latar belakang prosedural GPU berestetika biru elektrik yang elegan.",
    "feat6Title": "Pembaruan Senyap Otomatis",
    "feat6Desc": "Diverifikasi dengan SHA-256 & RSA-4096. Berjalan ringan di system tray (~20MB RAM).",
    "reviewsTag": "Ulasan Terverifikasi",
    "reviewsTitle": "Kata para pemain.",
    "reviewsDesc": "Pengalaman nyata dari para pemain kompetitif papan atas turnamen PvP.",
    "pricingTag": "Lisensi Transparan",
    "pricingTitle": "Pilih paket.",
    "pricingDesc": "Lisensi langsung dikirim otomatis seketika setelah pembayaran berhasil."
  },
  "vi": {
    "navOverview": "Tổng quan",
    "navShowcase": "Trình diễn",
    "navReviews": "Đánh giá",
    "navClients": "Client",
    "navPricing": "Bảng giá",
    "navFaq": "Hỏi đáp",
    "navDownload": "Tải về",
    "navLogin": "Đăng nhập",
    "navGetAccess": "Mua quyền truy cập",
    "heroBadge": "Phần Mềm Macro Đỉnh Cao",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Macro Bất Khả Xâm Phạm",
    "heroTitleSub": "Macro Minecraft Đỉnh Cao Không Thể Bị Phát Hiện",
    "heroSubtitle": "Cấu hình tùy biến linh hoạt, phản hồi tức thì và hiệu năng siêu nhẹ trong một trải nghiệm cao cấp.",
    "heroCtaPrimary": "Mua Splash — $5.99 / tháng",
    "heroCtaWatch": "Xem Video Thực Tế",
    "heroMetric1": "Đồng bộ khung hình phần cứng",
    "heroMetric2": "Độ trễ đầu vào < 1ms",
    "heroMetric3": "Tương thích 100% Client",
    "heroMetric4": "Can thiệp bộ nhớ 0",
    "supportedClientsLabel": "CLIENT ĐƯỢC HỖ TRỢ:",
    "featTag": "Kiến Trúc Đẳng Cấp",
    "featTitle": "Được tạo ra để thống trị mọi trận chiến PvP.",
    "featDesc": "Splash mang lại sự tự động hóa phím bấm cực kỳ chuẩn xác mà không đụng chạm vào bộ nhớ game.",
    "feat1Title": "Hoàn Toàn Không Thể Phát Hiện",
    "feat1Desc": "Chạy ngoài hệ thống Ring-3. Không tiêm DLL và hoàn toàn an toàn trước mọi hệ thống anticheat.",
    "feat2Title": "Giữ FPS Cực Đại",
    "feat2Desc": "Xử lý dưới một mili-giây bằng bộ hẹn giờ cao cấp của Windows mà không tụt FPS.",
    "feat3Title": "Tùy Biến Toàn Bộ",
    "feat3Desc": "4 kênh chuỗi lệnh với 8 bước độc lập cho mỗi kênh. Căn chỉnh từng micro-giây.",
    "feat4Title": "Tự Động Nhận Diện Client",
    "feat4Desc": "Tự nhận dạng ngay lập tức Lunar, Badlion, Feather, LabyMod và Vanilla khi khởi động.",
    "feat5Title": "Giao Diện Động GPU",
    "feat5Desc": "Hiệu ứng nền thời gian thực màu xanh điện tử sắc nét do GPU xử lý mượt mà.",
    "feat6Title": "Cập Nhật Ngầm Định Kỳ",
    "feat6Desc": "Xác thực mã hóa SHA-256 và RSA-4096. Thu nhỏ xuống khay hệ thống chỉ tốn ~20MB RAM.",
    "reviewsTag": "Đánh Giá Thực Tế",
    "reviewsTitle": "Cộng đồng nhận xét.",
    "reviewsDesc": "Cảm nhận chân thực từ những người chơi PvP cạnh tranh hàng đầu bảng xếp hạng.",
    "pricingTag": "Bản Quyền Rõ Ràng",
    "pricingTitle": "Chọn gói phù hợp.",
    "pricingDesc": "Cấp quyền tự động ngay lập tức sau khi thanh toán thành công."
  },
  "uk": {
    "navOverview": "Огляд",
    "navShowcase": "Демонстрація",
    "navReviews": "Відгуки",
    "navClients": "Клієнти",
    "navPricing": "Тарифи",
    "navFaq": "ЧаПи",
    "navDownload": "Завантажити",
    "navLogin": "Увійти",
    "navGetAccess": "Отримати доступ",
    "heroBadge": "Найкраще Програмне Забезпечення Макросів",
    "heroTitleLead": "Minecraft",
    "heroTitleAccent": "Найкращий Непомітний Макрос",
    "heroTitleSub": "Найкращий непомітний макрос для Minecraft",
    "heroSubtitle": "Спеціальні профілі, блискавична реакція та ультралегка робота в єдиному преміальному продукті.",
    "heroCtaPrimary": "Отримати Splash — $5.99 / міс",
    "heroCtaWatch": "Дивитися в Дії",
    "heroMetric1": "Синхронізація кадрів",
    "heroMetric2": "Затримка введення < 1мс",
    "heroMetric3": "Повна сумісність з клієнтами",
    "heroMetric4": "Ін'єкцій у пам'ять 0",
    "supportedClientsLabel": "ПІДТРИМУВАНІ КЛІЄНТИ:",
    "featTag": "Архітектурна Перевага",
    "featTitle": "Створений для абсолютного домінування в бою.",
    "featDesc": "Splash забезпечує хірургічну точність натискань без жодного втручання в пам'ять гри.",
    "feat1Title": "Повністю Непомітний",
    "feat1Desc": "Зовнішнє виконання Ring-3. Жодних ін'єкцій DLL та нуль ризиків блокування античитами.",
    "feat2Title": "Зберігає Максимальний FPS",
    "feat2Desc": "Субмілісекундне виконання завдяки високоточним таймерам Windows без осідань FPS.",
    "feat3Title": "Повне Налаштування",
    "feat3Desc": "4 канали послідовностей з 8 кроками кожен. Точність до мікросекунд.",
    "feat4Title": "Автоматичне Виявлення Клієнтів",
    "feat4Desc": "Миттєве розпізнавання Lunar, Badlion, Feather, LabyMod і Vanilla під час запуску.",
    "feat5Title": "Процедурні GPU Теми",
    "feat5Desc": "Динамічні анімовані фони в неоново-блакитних відтінках, що рендеряться відеокартою.",
    "feat6Title": "Тихі Регулярні Оновлення",
    "feat6Desc": "Криптографічний захист SHA-256 та RSA-4096. Згортається в трей Windows (~20MB RAM).",
    "reviewsTag": "Перевірені Відгуки",
    "reviewsTitle": "Що кажуть гравці.",
    "reviewsDesc": "Справжній досвід топових гравців з лідерських позицій серверного PvP.",
    "pricingTag": "Прозора Оплата",
    "pricingTitle": "Оберіть свій план.",
    "pricingDesc": "Миттєва автоматична доставка ліцензії відразу після підтвердження."
  }
};

translations.in = translations.hi;
translations.us = translations.en;
translations.br = translations.pt;
translations.cn = translations.zh;
translations.jp = translations.ja;
translations.kr = translations.ko;
translations.sa = translations.ar;
translations.vn = translations.vi;
translations.ua = translations.uk;

// Language Switcher Logic
function initLanguageSwitcher() {
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');
  const currentFlag = document.getElementById('lang-current-flag');
  const currentLabel = document.getElementById('lang-current-label');
  const options = document.querySelectorAll('.lang-option');
  const mobileBtns = document.querySelectorAll('.mobile-lang-btn');

  const flagMap = {
    en: { flag: 'assets/flags/us.svg', label: 'US', code: 'EN' },
    us: { flag: 'assets/flags/us.svg', label: 'US', code: 'EN' },
    es: { flag: 'assets/flags/es.svg', label: 'ES', code: 'ES' },
    fr: { flag: 'assets/flags/fr.svg', label: 'FR', code: 'FR' },
    de: { flag: 'assets/flags/de.svg', label: 'DE', code: 'DE' },
    ru: { flag: 'assets/flags/ru.svg', label: 'RU', code: 'RU' },
    pt: { flag: 'assets/flags/br.svg', label: 'BR', code: 'PT' },
    br: { flag: 'assets/flags/br.svg', label: 'BR', code: 'PT' },
    it: { flag: 'assets/flags/it.svg', label: 'IT', code: 'IT' },
    ja: { flag: 'assets/flags/jp.svg', label: 'JP', code: 'JA' },
    jp: { flag: 'assets/flags/jp.svg', label: 'JP', code: 'JA' },
    ko: { flag: 'assets/flags/kr.svg', label: 'KR', code: 'KO' },
    kr: { flag: 'assets/flags/kr.svg', label: 'KR', code: 'KO' },
    zh: { flag: 'assets/flags/cn.svg', label: 'CN', code: 'ZH' },
    cn: { flag: 'assets/flags/cn.svg', label: 'CN', code: 'ZH' },
    hi: { flag: 'assets/flags/in.svg', label: 'IN', code: 'HI' },
    in: { flag: 'assets/flags/in.svg', label: 'IN', code: 'HI' },
    tr: { flag: 'assets/flags/tr.svg', label: 'TR', code: 'TR' },
    pl: { flag: 'assets/flags/pl.svg', label: 'PL', code: 'PL' },
    ar: { flag: 'assets/flags/sa.svg', label: 'SA', code: 'AR' },
    sa: { flag: 'assets/flags/sa.svg', label: 'SA', code: 'AR' },
    nl: { flag: 'assets/flags/nl.svg', label: 'NL', code: 'NL' },
    id: { flag: 'assets/flags/id.svg', label: 'ID', code: 'ID' },
    vi: { flag: 'assets/flags/vn.svg', label: 'VN', code: 'VI' },
    vn: { flag: 'assets/flags/vn.svg', label: 'VN', code: 'VI' },
    uk: { flag: 'assets/flags/ua.svg', label: 'UA', code: 'UK' },
    ua: { flag: 'assets/flags/ua.svg', label: 'UA', code: 'UK' }
  };

  const langAliases = {
    in: 'hi',
    br: 'pt',
    us: 'en',
    cn: 'zh',
    jp: 'ja',
    kr: 'ko',
    sa: 'ar',
    vn: 'vi',
    ua: 'uk'
  };

  function normalizeLang(l) {
    return langAliases[l] || l;
  }

  function setLanguage(lang) {
    const canonical = normalizeLang(lang);
    if (!translations[canonical]) lang = 'en';
    else lang = canonical;

    localStorage.setItem('splash_lang', lang);

    const info = flagMap[lang] || flagMap.en;
    if (currentLabel) currentLabel.textContent = info.label;
    if (currentFlag) {
      if (currentFlag.tagName.toLowerCase() === 'img') {
        currentFlag.src = info.flag;
        currentFlag.alt = info.label;
      } else {
        currentFlag.innerHTML = `<img src="${info.flag}" alt="${info.label}" class="lang-flag-img" width="18" height="12">`;
      }
    }

    options.forEach(opt => {
      const optLang = opt.dataset.lang;
      const isMatch = normalizeLang(optLang) === lang;
      opt.classList.toggle('active', isMatch);
    });

    mobileBtns.forEach(btn => {
      const btnLang = btn.dataset.lang;
      const isActive = normalizeLang(btnLang) === lang;
      btn.classList.toggle('active', isActive);
      if (isActive) {
        btn.style.background = 'rgba(0,136,255,0.2)';
        btn.style.borderColor = 'rgba(0,136,255,0.4)';
        btn.style.color = '#38BDF8';
        btn.style.fontWeight = '700';
      } else {
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.style.color = '#94A3B8';
        btn.style.fontWeight = '600';
      }
    });

    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.documentElement.lang = lang;
  }

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = langMenu.style.display !== 'none';
      langMenu.style.display = isVisible ? 'none' : 'flex';
      langBtn.setAttribute('aria-expanded', !isVisible);
    });

    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = 'none';
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langMenu.style.display !== 'none') {
        langMenu.style.display = 'none';
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.dataset.lang;
      setLanguage(lang);
      if (langMenu) langMenu.style.display = 'none';
    });
  });

  mobileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('splash_lang') || 'en';
  setLanguage(savedLang);
}


// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  const safeInit = (fn, name) => {
    try { fn(); } catch (err) { console.warn(`[Splash] ${name} init:`, err); }
  };

  safeInit(initTypewriter, 'Typewriter');
  safeInit(initLanguageSwitcher, 'LanguageSwitcher');
  safeInit(initAuthNavbar, 'AuthNavbar');
  safeInit(initNavbar, 'Navbar');
  safeInit(initPricing, 'Pricing');
  safeInit(initVideoShowcase, 'VideoShowcase');
  safeInit(initVideoModal, 'VideoModal');
  safeInit(initFaq, 'Faq');
  safeInit(initBackgroundCanvas, 'BackgroundCanvas');
  safeInit(initIsoBeaconCanvas, 'IsoBeaconCanvas');
  safeInit(init3DMouseInteractions, '3DMouseInteractions');
  safeInit(initHeroMockupTilt, 'HeroMockupTilt');
  safeInit(initInteractiveDesktopGUI, 'InteractiveDesktopGUI');
  safeInit(init3DScrollParallax, '3DScrollParallax');
  safeInit(initScrollAnimations, 'ScrollAnimations');
});

// Hero Title Smooth Typewriter Loop (Every 5 seconds: deletes letter-by-letter, then types back)
function initTypewriter() {
  const elem = document.getElementById('heroSplashText');
  if (!elem) return;
  const fullText = "Splash";
  elem.textContent = '';

  const textSpan = document.createElement('span');
  const caret = document.createElement('span');
  caret.className = 'typewriter-caret';
  caret.textContent = '|';
  elem.appendChild(textSpan);
  elem.appendChild(caret);

  let isDeleting = false;
  let currentLength = 0;

  function step() {
    if (!isDeleting) {
      // Typing phase
      if (currentLength < fullText.length) {
        currentLength++;
        textSpan.textContent = fullText.slice(0, currentLength);
        setTimeout(step, 120);
      } else {
        // Fully typed: wait exactly 5000ms (5 seconds) before deleting back
        setTimeout(() => {
          isDeleting = true;
          step();
        }, 5000);
      }
    } else {
      // Deleting phase
      if (currentLength > 0) {
        currentLength--;
        textSpan.textContent = fullText.slice(0, currentLength);
        setTimeout(step, 65);
      } else {
        // Fully cleared: pause briefly then re-type
        isDeleting = false;
        setTimeout(step, 350);
      }
    }
  }

  // Start initial typewriter after a light frame delay
  setTimeout(step, 200);
}

// Real-time Authentication & In-Page Download Section Sync
let authPollTimer = null;
let liveCountdownTimer = null;

async function initAuthNavbar() {
  let token = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token');
  const guestGroup = document.getElementById('nav-guest-actions');
  const userGroup = document.getElementById('nav-user-actions');
  const usernameEl = document.getElementById('nav-username');
  const dotEl = document.getElementById('nav-user-dot');
  const logoutBtn = document.getElementById('nav-btn-logout');
  const navPillDownload = document.getElementById('nav-pill-download');

  const mobileGuest = document.getElementById('mobile-guest-actions');
  const mobileUser = document.getElementById('mobile-user-actions');
  const mobileUsernameEl = document.getElementById('mobile-nav-username');
  const mobileLogout = document.getElementById('mobile-nav-logout');
  const mobileNavDownload = document.getElementById('mobile-nav-download');

  // Download section state containers
  const stateGuest = document.getElementById('section-state-guest');
  const statePending = document.getElementById('section-state-pending');
  const stateApproved = document.getElementById('section-state-approved');
  const pendingUsernameEl = document.getElementById('section-pending-username');

  // Approved card fields
  const heroDuration = document.getElementById('site-hero-duration');
  const heroSub = document.getElementById('site-hero-sub');
  const metricStatus = document.getElementById('site-metric-status');
  const metricModules = document.getElementById('site-metric-modules');
  const metricExpires = document.getElementById('site-metric-expires');
  const metricUsername = document.getElementById('site-metric-username');
  const downloadTitle = document.getElementById('site-download-title');
  const downloadSub = document.getElementById('site-download-sub');
  const btnTopDownload = document.getElementById('section-btn-top-download');
  const btnMainDownload = document.getElementById('site-btn-main-download');
  const btnCopyLauncher = document.getElementById('section-btn-copy-launcher');
  const copyLauncherText = document.getElementById('section-copy-launcher-text');

  let remainingSeconds = 0;
  let isPermanent = false;
  let hasActiveAccess = false;

  // Universal Bulletproof Clipboard Copy Helper
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {}
    }
    // Reliable Fallback for all environments
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    } catch {
      textArea.remove();
      return false;
    }
  }

  // Setup Guide Popup Modal Controller
  const setupModal = document.getElementById('setup-guide-modal');
  const btnSetupGuide = document.getElementById('btn-setup-guide');
  const closeSetupModal = document.getElementById('setup-modal-close');

  if (btnSetupGuide && !btnSetupGuide.dataset.bound) {
    btnSetupGuide.dataset.bound = "true";
    btnSetupGuide.addEventListener('click', (e) => {
      e.preventDefault();
      if (setupModal) {
        setupModal.classList.add('open');
        setupModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function hideSetupModal() {
    if (setupModal) {
      setupModal.classList.remove('open');
      setupModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (closeSetupModal && !closeSetupModal.dataset.bound) {
    closeSetupModal.dataset.bound = "true";
    closeSetupModal.addEventListener('click', hideSetupModal);
  }

  if (setupModal && !setupModal.dataset.bound) {
    setupModal.dataset.bound = "true";
    setupModal.addEventListener('click', (e) => {
      if (e.target === setupModal) {
        hideSetupModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && setupModal && setupModal.classList.contains('open')) {
      hideSetupModal();
    }
  });

  // Modal tab switching
  document.querySelectorAll('.setup-tab-btn').forEach(tabBtn => {
    if (!tabBtn.dataset.bound) {
      tabBtn.dataset.bound = "true";
      tabBtn.addEventListener('click', () => {
        const targetTab = tabBtn.dataset.tab;
        document.querySelectorAll('.setup-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.setup-tab-content').forEach(c => c.classList.remove('active'));
        tabBtn.classList.add('active');
        const content = document.getElementById(targetTab);
        if (content) content.classList.add('active');
      });
    }
  });

  let cachedRandomizedDownloadUrl = null;
  let cachedTicketExpiresAt = 0;

  async function getOrFetchRandomizedDownloadUrl() {
    const now = Date.now();
    if (cachedRandomizedDownloadUrl && now < cachedTicketExpiresAt) {
      return cachedRandomizedDownloadUrl;
    }
    const activeTok = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token') || '';
    if (!activeTok) return null;

    try {
      const res = await fetch('/api/client/download-ticket', {
        headers: { 'Authorization': `Bearer ${activeTok}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.Success && data.DownloadUrl) {
          cachedRandomizedDownloadUrl = data.DownloadUrl;
          cachedTicketExpiresAt = now + (25 * 60 * 1000);
          return cachedRandomizedDownloadUrl;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch randomized download ticket', e);
    }
    return `/api/client/download-latest?token=${encodeURIComponent(activeTok)}`;
  }

  async function getDownloadCommands() {
    const activeTok = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token') || '';
    const origin = window.location.origin || 'https://splash-panel.onrender.com';
    let targetPath = `/api/client/download-latest?token=${encodeURIComponent(activeTok)}`;
    try {
      const ticketUrl = await getOrFetchRandomizedDownloadUrl();
      if (ticketUrl) {
        targetPath = ticketUrl;
      }
    } catch (_) {}
    const fullUrl = targetPath.startsWith('http') ? targetPath : `${origin}${targetPath}`;
    return {
      ps: `curl.exe -L "${fullUrl}" -o "$HOME\\Desktop\\SplashSetup.exe"; Start-Process "$HOME\\Desktop\\SplashSetup.exe"`,
      cmd: `curl.exe -L "${fullUrl}" -o "%USERPROFILE%\\Desktop\\SplashSetup.exe" && start "" "%USERPROFILE%\\Desktop\\SplashSetup.exe"`
    };
  }

  // Modal Copy PowerShell
  const modalCopyPsBtn = document.getElementById('modal-copy-ps-btn');
  if (modalCopyPsBtn && !modalCopyPsBtn.dataset.bound) {
    modalCopyPsBtn.dataset.bound = "true";
    modalCopyPsBtn.addEventListener('click', async () => {
      const { ps } = await getDownloadCommands();
      const copied = await copyTextToClipboard(ps);
      modalCopyPsBtn.textContent = copied ? "✓ Copied!" : "Press Ctrl+C";
      modalCopyPsBtn.style.background = "#0088FF";
      setTimeout(() => {
        modalCopyPsBtn.textContent = "Copy";
        modalCopyPsBtn.style.background = "";
      }, 2200);
    });
  }

  // Modal Copy CMD
  const modalCopyCmdBtn = document.getElementById('modal-copy-cmd-btn');
  if (modalCopyCmdBtn && !modalCopyCmdBtn.dataset.bound) {
    modalCopyCmdBtn.dataset.bound = "true";
    modalCopyCmdBtn.addEventListener('click', async () => {
      const { cmd } = await getDownloadCommands();
      const copied = await copyTextToClipboard(cmd);
      modalCopyCmdBtn.textContent = copied ? "✓ Copied!" : "Press Ctrl+C";
      modalCopyCmdBtn.style.background = "#10B981";
      setTimeout(() => {
        modalCopyCmdBtn.textContent = "Copy";
        modalCopyCmdBtn.style.background = "";
      }, 2200);
    });
  }

  // Copy PowerShell Download & Launch Command
  const btnCopyPs = document.getElementById('btn-copy-ps');
  const btnCopyPsText = document.getElementById('btn-copy-ps-text');
  if (btnCopyPs && !btnCopyPs.dataset.bound) {
    btnCopyPs.dataset.bound = "true";
    btnCopyPs.addEventListener('click', async () => {
      const { ps } = await getDownloadCommands();
      const copied = await copyTextToClipboard(ps);
      if (btnCopyPsText) {
        btnCopyPsText.textContent = copied ? "✓ Copied PowerShell!" : "Press Ctrl+C to copy";
        btnCopyPs.style.borderColor = "#38BDF8";
        btnCopyPs.style.color = "#38BDF8";
        setTimeout(() => {
          btnCopyPsText.textContent = "Copy PowerShell";
          btnCopyPs.style.borderColor = "";
          btnCopyPs.style.color = "";
        }, 2400);
      }
    });
  }

  // Copy CMD Download & Launch Command
  const btnCopyCmd = document.getElementById('btn-copy-cmd');
  const btnCopyCmdText = document.getElementById('btn-copy-cmd-text');
  if (btnCopyCmd && !btnCopyCmd.dataset.bound) {
    btnCopyCmd.dataset.bound = "true";
    btnCopyCmd.addEventListener('click', async () => {
      const { cmd } = await getDownloadCommands();
      const copied = await copyTextToClipboard(cmd);
      if (btnCopyCmdText) {
        btnCopyCmdText.textContent = copied ? "✓ Copied CMD!" : "Press Ctrl+C to copy";
        btnCopyCmd.style.borderColor = "#34D399";
        btnCopyCmd.style.color = "#34D399";
        setTimeout(() => {
          btnCopyCmdText.textContent = "Copy CMD";
          btnCopyCmd.style.borderColor = "";
          btnCopyCmd.style.color = "";
        }, 2400);
      }
    });
  }

  // Smooth scroll helper for #download links
  document.querySelectorAll('a[href="#download"]').forEach(link => {
    if (!link.dataset.smoothBound) {
      link.dataset.smoothBound = "true";
      link.addEventListener('click', (e) => {
        const target = document.getElementById('download');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  function clearAuth() {
    localStorage.removeItem('splash_token');
    localStorage.removeItem('splash_user');
    document.cookie = "splash_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "splash_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (guestGroup) guestGroup.style.display = 'flex';
    if (userGroup) userGroup.style.display = 'none';
    if (mobileGuest) mobileGuest.style.display = 'block';
    if (mobileUser) mobileUser.style.display = 'none';
    if (navPillDownload) navPillDownload.style.display = 'none';
    if (mobileNavDownload) mobileNavDownload.style.display = 'none';

    if (stateGuest) stateGuest.style.display = 'block';
    if (statePending) statePending.style.display = 'none';
    if (stateApproved) stateApproved.style.display = 'none';

    if (authPollTimer) { clearInterval(authPollTimer); authPollTimer = null; }
    if (liveCountdownTimer) { clearInterval(liveCountdownTimer); liveCountdownTimer = null; }
  }

  async function performLogout(e) {
    if (e) e.preventDefault();
    const currentToken = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token');
    try {
      if (currentToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + currentToken }
        });
      }
    } catch {}
    localStorage.removeItem('splash_token');
    localStorage.removeItem('splash_admin_token');
    clearAuth();
    window.location.reload();
  }

  if (logoutBtn && !logoutBtn.dataset.bound) {
    logoutBtn.dataset.bound = "true";
    logoutBtn.addEventListener('click', performLogout);
  }
  if (mobileLogout && !mobileLogout.dataset.bound) {
    mobileLogout.dataset.bound = "true";
    mobileLogout.addEventListener('click', performLogout);
  }

  if (!token) {
    clearAuth();
    return;
  }

  // Optimistic render from cache
  try {
    const cached = JSON.parse(localStorage.getItem('splash_user') || '{}');
    if (cached && cached.username) {
      if (usernameEl) usernameEl.textContent = cached.username;
      if (mobileUsernameEl) mobileUsernameEl.textContent = cached.username;
      if (pendingUsernameEl) pendingUsernameEl.textContent = cached.username;
      if (metricUsername) metricUsername.textContent = cached.username;
      if (guestGroup) guestGroup.style.display = 'none';
      if (userGroup) userGroup.style.display = 'flex';
      if (mobileGuest) mobileGuest.style.display = 'none';
      if (mobileUser) mobileUser.style.display = 'flex';

      if (cached.hasActiveAccess) {
        if (navPillDownload) navPillDownload.style.display = 'inline-flex';
        if (mobileNavDownload) mobileNavDownload.style.display = 'block';
        if (stateGuest) stateGuest.style.display = 'none';
        if (statePending) statePending.style.display = 'none';
        if (stateApproved) stateApproved.style.display = 'block';
      } else {
        if (navPillDownload) navPillDownload.style.display = 'none';
        if (mobileNavDownload) mobileNavDownload.style.display = 'none';
        if (stateGuest) stateGuest.style.display = 'none';
        if (statePending) statePending.style.display = 'flex';
        if (stateApproved) stateApproved.style.display = 'none';
      }
    }
  } catch {}

  function formatTimeRemaining(seconds) {
    if (seconds <= 0) return 'Expired';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  }

  function tickCountdown() {
    if (!hasActiveAccess || isPermanent) return;
    if (remainingSeconds > 0) {
      remainingSeconds--;
      if (heroDuration) heroDuration.textContent = formatTimeRemaining(remainingSeconds);
    } else {
      if (heroDuration) heroDuration.textContent = 'Expired';
      fetchUserStatus();
    }
  }

  function applyData(data) {
    if (!data || !data.user) return;
    const user = data.user;
    const update = data.latestUpdate;

    localStorage.setItem('splash_user', JSON.stringify(user));
    const name = user.username || 'Player';
    if (usernameEl) usernameEl.textContent = name;
    if (mobileUsernameEl) mobileUsernameEl.textContent = name;
    if (pendingUsernameEl) pendingUsernameEl.textContent = name;
    if (metricUsername) metricUsername.textContent = name;

    hasActiveAccess = !!(user.hasActiveAccess || user.hasAccess || user.status === 'Approved');
    isPermanent = !!(user.isPermanent || (user.status === 'Approved' && !user.accessEndUtc));
    if (user.remainingSeconds !== undefined) {
      remainingSeconds = user.remainingSeconds;
    }

    if (guestGroup) guestGroup.style.display = 'none';
    if (userGroup) userGroup.style.display = 'flex';
    if (mobileGuest) mobileGuest.style.display = 'none';
    if (mobileUser) mobileUser.style.display = 'flex';

    if (dotEl) {
      if (hasActiveAccess) {
        dotEl.style.background = '#22C55E';
        dotEl.style.boxShadow = '0 0 8px #22C55E';
      } else if (user.status === 'PendingApproval') {
        dotEl.style.background = '#F59E0B';
        dotEl.style.boxShadow = '0 0 8px #F59E0B';
      } else {
        dotEl.style.background = '#EF4444';
        dotEl.style.boxShadow = '0 0 8px #EF4444';
      }
    }

    if (hasActiveAccess) {
      // APPROVED & ACTIVE ACCESS
      if (navPillDownload) navPillDownload.style.display = 'inline-flex';
      if (mobileNavDownload) mobileNavDownload.style.display = 'block';

      if (stateGuest) stateGuest.style.display = 'none';
      if (statePending) statePending.style.display = 'none';
      if (stateApproved) stateApproved.style.display = 'block';

      if (metricStatus) {
        metricStatus.textContent = 'Active';
        metricStatus.className = 'site-metric-col-value status-text';
      }
      if (metricModules) metricModules.textContent = '43 / 43 active';

      if (isPermanent) {
        if (heroDuration) heroDuration.textContent = 'Permanent';
        if (heroSub) heroSub.textContent = 'Lifetime unrestricted license active • No renewal required';
        if (metricExpires) metricExpires.textContent = 'Permanent';
      } else {
        if (heroDuration) heroDuration.textContent = formatTimeRemaining(remainingSeconds);
        if (user.accessEndUtc) {
          const endD = new Date(user.accessEndUtc);
          if (heroSub) heroSub.textContent = `Next module expires on ${endD.toLocaleString()}`;
          if (metricExpires) metricExpires.textContent = endD.toLocaleDateString();
        }
      }

      // Protected download endpoints (Strict Dynamic Ticket Generation)
      const activeTok = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token') || '';
      if (activeTok) {
        document.cookie = `splash_token=${encodeURIComponent(activeTok)}; path=/; max-age=2592000; SameSite=Lax`;
      }

      function wireDownloadElement(el) {
        if (!el) return;
        el.removeAttribute('disabled');
        el.setAttribute('download', 'SplashSetup.exe');
        if (!el.dataset.ticketBound) {
          el.dataset.ticketBound = 'true';
          el.addEventListener('click', async (e) => {
            e.preventDefault();
            const ticketUrl = await getOrFetchRandomizedDownloadUrl();
            if (ticketUrl) {
              const a = document.createElement('a');
              a.href = ticketUrl;
              a.setAttribute('download', 'SplashSetup.exe');
              document.body.appendChild(a);
              a.click();
              setTimeout(() => { if (document.body.contains(a)) document.body.removeChild(a); }, 1000);
            }
          });
        }
      }

      wireDownloadElement(btnTopDownload);
      const btnSetupDownload = document.getElementById('site-btn-setup-download');
      wireDownloadElement(btnSetupDownload);
      wireDownloadElement(btnMainDownload);
      const siteBtnModalDownload = document.getElementById('site-btn-modal-download');
      wireDownloadElement(siteBtnModalDownload);

      // Proactively populate randomized download URL and code snippets
      getOrFetchRandomizedDownloadUrl().then(freshUrl => {
        if (freshUrl) {
          if (btnTopDownload) btnTopDownload.href = freshUrl;
          if (btnSetupDownload) btnSetupDownload.href = freshUrl;
          if (btnMainDownload) btnMainDownload.href = freshUrl;
          if (siteBtnModalDownload) siteBtnModalDownload.href = freshUrl;

          const origin = window.location.origin || 'https://splash-panel.onrender.com';
          const fullUrl = freshUrl.startsWith('http') ? freshUrl : `${origin}${freshUrl}`;
          const codePs = document.getElementById('setup-code-ps');
          if (codePs) {
            codePs.textContent = `curl.exe -L "${fullUrl}" -o "$HOME\\Desktop\\SplashSetup.exe"; Start-Process "$HOME\\Desktop\\SplashSetup.exe"`;
          }
          const codeCmd = document.getElementById('setup-code-cmd');
          if (codeCmd) {
            codeCmd.textContent = `curl.exe -L "${fullUrl}" -o "%USERPROFILE%\\Desktop\\SplashSetup.exe" && start "" "%USERPROFILE%\\Desktop\\SplashSetup.exe"`;
          }
        }
      });

      if (downloadTitle) downloadTitle.textContent = `Splash Client & Setup v2.4.0 (Windows x64)`;
      if (downloadSub) {
        downloadSub.textContent = `Automated Windows Installer (137 MB) • Includes stealth tray execution & clean uninstaller`;
      }

      // Live 1-second countdown
      if (!liveCountdownTimer) {
        liveCountdownTimer = setInterval(tickCountdown, 1000);
      }
    } else {
      // ACCESS INACTIVE, EXPIRED, OR PENDING APPROVAL (ACCOUNT REMAINS LOGGED IN)
      if (navPillDownload) navPillDownload.style.display = 'none';
      if (mobileNavDownload) mobileNavDownload.style.display = 'none';

      if (btnTopDownload) {
        btnTopDownload.removeAttribute('href');
        btnTopDownload.setAttribute('disabled', 'true');
      }
      const btnSetupDownload = document.getElementById('site-btn-setup-download');
      if (btnSetupDownload) {
        btnSetupDownload.removeAttribute('href');
        btnSetupDownload.setAttribute('disabled', 'true');
      }
      if (btnMainDownload) {
        btnMainDownload.removeAttribute('href');
        btnMainDownload.setAttribute('disabled', 'true');
      }
      const siteBtnModalDownload = document.getElementById('site-btn-modal-download');
      if (siteBtnModalDownload) {
        siteBtnModalDownload.removeAttribute('href');
        siteBtnModalDownload.setAttribute('disabled', 'true');
      }

      // Keep user logged in in the navbar
      if (guestGroup) guestGroup.style.display = 'none';
      if (userGroup) userGroup.style.display = 'flex';
      if (mobileGuest) mobileGuest.style.display = 'none';
      if (mobileUser) mobileUser.style.display = 'flex';

      // Hide guest card and emerald approved subscription card
      if (stateGuest) stateGuest.style.display = 'none';
      if (stateApproved) stateApproved.style.display = 'none';

      // Show clean pending/inactive state card
      if (statePending) {
        statePending.style.display = 'flex';
        const pendingTitle = statePending.querySelector('.waiting-title');
        const pendingBadge = statePending.querySelector('.waiting-badge');
        const pendingDesc = statePending.querySelector('.waiting-description');
        if (user.status === 'Revoked' || user.status === 'Expired' || user.status === 'Suspended') {
          if (pendingBadge) pendingBadge.textContent = 'ACCESS INACTIVE';
          if (pendingTitle) pendingTitle.textContent = 'Subscription Inactive / Expired';
          if (pendingDesc) pendingDesc.textContent = 'Your client access license is currently inactive. Contact administrator to renew or grant access.';
        } else {
          if (pendingBadge) pendingBadge.textContent = 'WAITING FOR ACCESS';
          if (pendingTitle) pendingTitle.textContent = 'Account Pending Admin Approval';
          if (pendingDesc) pendingDesc.textContent = 'Your account has been registered and is waiting for authorization from the Administrator. Once the admin grants access from the Admin Panel, your active subscription card and official Windows x64 download button will appear here automatically.';
        }
      }

      if (liveCountdownTimer) {
        clearInterval(liveCountdownTimer);
        liveCountdownTimer = null;
      }
    }
  }

  async function fetchUserStatus() {
    let activeToken = localStorage.getItem('splash_token') || localStorage.getItem('splash_admin_token');
    if (!activeToken) {
      clearAuth();
      return;
    }
    try {
      let res = await fetch(`/api/auth/me?_t=${Date.now()}`, {
        headers: {
          'Authorization': 'Bearer ' + activeToken,
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });
      if (res.status === 401) {
        const adminTok = localStorage.getItem('splash_admin_token');
        if (adminTok && adminTok !== activeToken) {
          activeToken = adminTok;
          res = await fetch(`/api/auth/me?_t=${Date.now()}`, {
            headers: {
              'Authorization': 'Bearer ' + activeToken,
              'Cache-Control': 'no-cache'
            },
            cache: 'no-store'
          });
        }
      }
      if (res.status === 401) {
        clearAuth();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.user) {
          applyData(data);
          return;
        }
      }

      // Authoritative fallback: /api/auth/status
      if (res.status === 404) {
        const fallbackRes = await fetch(`/api/auth/status?_t=${Date.now()}`, {
          headers: {
            'Authorization': 'Bearer ' + activeToken,
            'Cache-Control': 'no-cache'
          },
          cache: 'no-store'
        });
        if (fallbackRes.status === 401) {
          clearAuth();
          return;
        }
        if (fallbackRes.ok) {
          const st = await fallbackRes.json();
          if (st && st.status) {
            const cachedUser = JSON.parse(localStorage.getItem('splash_user') || '{}');
            const hasActiveAccess = !!(st.hasActiveAccess || st.hasAccess || st.status === 'Approved');
            const isPermanent = st.status === 'Approved' && !st.accessEndUtc;
            let remSecs = 0;
            if (st.accessEndUtc) {
              const endMs = new Date(st.accessEndUtc).getTime();
              const nowMs = st.serverTimeUtc ? new Date(st.serverTimeUtc).getTime() : Date.now();
              remSecs = Math.max(0, Math.floor((endMs - nowMs) / 1000));
            }
            const synthUser = {
              username: cachedUser.username || 'Player',
              status: st.status,
              hasActiveAccess: hasActiveAccess,
              isPermanent: isPermanent,
              remainingSeconds: remSecs,
              accessEndUtc: st.accessEndUtc
            };
            applyData({ success: true, user: synthUser });
          }
        }
      }
    } catch {}
  }

  // Initial fetch
  await fetchUserStatus();

  // Background polling: 2.5s continuous for instant panel grant/revoke synchronization
  if (authPollTimer) clearInterval(authPollTimer);
  authPollTimer = setInterval(fetchUserStatus, 2500);
}


// Sticky Navbar & Mobile Drawer
function initNavbar() {
  const navbar = document.querySelector('.navbar-pill, .navbar');
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', drawer.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill-link, .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// Render & Handle Configurable Pricing
function initPricing() {
  const grid = document.querySelector('.pricing-grid');
  if (!grid) return;

  const existingCards = grid.querySelectorAll('.pricing-card');
  if (existingCards.length === 3) {
    existingCards.forEach(c => c.classList.add('visible', 'in-view', 'revealed'));
    return;
  }

  grid.innerHTML = siteConfig.pricing.map(plan => `
    <div class="pricing-card ${plan.featured ? 'featured' : ''} ${plan.id === 'beta_vip' ? 'vip-plan' : ''} visible in-view revealed" data-plan="${plan.id}">
      ${plan.badge ? `<div class="pricing-badge-popular ${plan.id === 'beta_vip' ? 'badge-vip' : ''}">${plan.badge}</div>` : ''}
      <h3 class="plan-name">${plan.name}</h3>
      <div class="plan-billing-sub">${plan.billingSub}</div>
      <p class="plan-desc">${plan.desc}</p>
      
      <div class="plan-price-wrap">
        <span class="plan-currency">$</span>
        <span class="plan-amount">${plan.price}</span>
        <span class="plan-period">${plan.period}</span>
      </div>

      <ul class="plan-features">
        ${plan.features.map(f => `
          <li class="plan-feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <button class="btn ${plan.featured ? 'btn-popular' : (plan.id === 'beta_vip' ? 'btn-vip' : 'btn-secondary')} btn-lg plan-cta-btn" onclick="handlePurchase('${plan.id}')">
        ${plan.ctaText}
      </button>
    </div>
  `).join('');
}

// Interactive GUI Explorer
function initExplorer() {
  const tabs = document.querySelectorAll('.explorer-tab');
  const mediaContainer = document.querySelector('.explorer-media-frame');
  const titleElem = document.querySelector('.explorer-title');
  const descElem = document.querySelector('.explorer-description');
  const chipsElem = document.querySelector('.explorer-features-list');

  if (!tabs.length || !mediaContainer) return;

  function setView(key) {
    const data = siteConfig.explorer[key];
    if (!data) return;

    tabs.forEach(t => t.classList.toggle('active', t.dataset.key === key));

    mediaContainer.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="explorer-img-active" onerror="this.onerror=null; this.src='assets/images/gui_preview.png';">
    `;

    if (titleElem) titleElem.textContent = data.title;
    if (descElem) descElem.textContent = data.desc;
    if (chipsElem) {
      chipsElem.innerHTML = data.chips.map(c => `<span class="explorer-chip">${c}</span>`).join('');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setView(tab.dataset.key);
    });
  });

  // Default view
  setView('profiles');
}

// Video Showcase Filter Tabs
function initVideoShowcase() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const videoCards = document.querySelectorAll('.video-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      videoCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

// Video Lightbox Modal (Instant Zero-Buffer Streaming)
function initVideoModal() {
  const modal = document.querySelector('.video-modal-backdrop');
  const modalVideo = document.querySelector('#modalVideo');
  const modalTitle = document.querySelector('.modal-title');
  const closeBtn = document.querySelector('.modal-close-btn');
  const loader = document.getElementById('videoLoaderOverlay');

  if (!modal || !modalVideo) return;

  let bufferTimer = null;
  function setBuffering(isBuffering) {
    if (!loader) return;
    if (isBuffering) {
      if (!bufferTimer) {
        bufferTimer = setTimeout(() => {
          loader.classList.remove('hidden');
        }, 300);
      }
    } else {
      if (bufferTimer) {
        clearTimeout(bufferTimer);
        bufferTimer = null;
      }
      loader.classList.add('hidden');
    }
  }

  // Video playback lifecycle listeners
  modalVideo.addEventListener('loadstart', () => setBuffering(false));
  modalVideo.addEventListener('waiting', () => setBuffering(true));
  modalVideo.addEventListener('seeking', () => setBuffering(false));
  modalVideo.addEventListener('seeked', () => setBuffering(false));
  modalVideo.addEventListener('canplay', () => setBuffering(false));
  modalVideo.addEventListener('loadeddata', () => setBuffering(false));
  modalVideo.addEventListener('playing', () => setBuffering(false));
  modalVideo.addEventListener('timeupdate', () => {
    if (modalVideo.currentTime > 0.05) setBuffering(false);
  });
  modalVideo.addEventListener('error', (e) => {
    console.warn("Video stream error:", e);
    setBuffering(false);
  });

  window.openVideoModal = function(src, title) {
    if (modalTitle) modalTitle.textContent = title || "Showcase Video";
    modal.classList.add('open');
    setBuffering(false);

    // Optimized playback initialization
    modalVideo.preload = "auto";
    modalVideo.src = src;
    modalVideo.load();

    const playPromise = modalVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setBuffering(false);
      }).catch((err) => {
        setBuffering(false);
      });
    }
  };

  function closeModal() {
    modal.classList.remove('open');
    setBuffering(false);
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute('src');
    modalVideo.load(); // Cleanly aborts active network transfer!
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      if (e.code === 'Space' && e.target !== modalVideo) {
        e.preventDefault();
        if (modalVideo.paused) modalVideo.play();
        else modalVideo.pause();
      }
    }
  });
}


// FAQ Accordion
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other open FAQs
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });
}

// ==========================================================================
// CINEMATIC DEEP-DARK ATMOSPHERE & INTERACTIVE PARTICLE ENGINE
// - 3-Tier True 3D Particle Field (Deep Motes, Mid Stardust, Foreground Embers)
// - Fluid Cursor Interaction (Natural gentle repulsion with elastic return)
// - Cinematic Diagonal Light Streaks (reacts to mouse proximity)
// - Atmospheric #0088FF Cursor Spotlight (GPU-accelerated smooth lerping)
// - Hardware-accelerated 60/120 FPS performance with zero frame drop
// ==========================================================================
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isTabVisible = true;

  // Ultra-smooth mouse coordinates with weighted inertia
  const mouse = {
    targetX: -9999,
    targetY: -9999,
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    active: false,
    hoverAlpha: 0
  };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    if (!mouse.active) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.active = false;
  });

  // ==========================================================================
  // PARTICLE SYSTEM (Multi-Depth Hollow Geometry & Outline-Glow Particles)
  // ==========================================================================
  function traceStar5(ctx, outerR) {
    const innerR = outerR * 0.382;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = (i % 2 === 0) ? outerR : innerR;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const x = r * Math.cos(a);
      const y = r * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function traceEquilateralTriangle(ctx, r) {
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      const x = r * Math.cos(a);
      const y = r * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function traceHexagon(ctx, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const x = r * Math.cos(a);
      const y = r * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function traceRhombus(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.65, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(-r * 0.65, 0);
    ctx.closePath();
  }

  function traceCross(ctx, r) {
    const w = r * 0.35;
    ctx.beginPath();
    ctx.moveTo(-w, -r);
    ctx.lineTo(w, -r);
    ctx.lineTo(w, -w);
    ctx.lineTo(r, -w);
    ctx.lineTo(r, w);
    ctx.lineTo(w, w);
    ctx.lineTo(w, r);
    ctx.lineTo(-w, r);
    ctx.lineTo(-w, w);
    ctx.lineTo(-r, w);
    ctx.lineTo(-r, -w);
    ctx.lineTo(-w, -w);
    ctx.closePath();
  }

  function traceCrown(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(-r, r * 0.7);
    ctx.lineTo(r, r * 0.7);
    ctx.lineTo(r, -r * 0.5);
    ctx.lineTo(r * 0.45, 0);
    ctx.lineTo(0, -r * 0.85);
    ctx.lineTo(-r * 0.45, 0);
    ctx.lineTo(-r, -r * 0.5);
    ctx.closePath();
  }

  class CinematicParticle {
    constructor(tier) {
      this.tier = tier; // 'deep', 'mid', 'foreground'
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;

      const rnd = Math.random();
      if (this.tier === 'deep') {
        // Deep cosmic motes & dust
        this.shape = rnd > 0.2 ? 'dust' : 'star';
        this.z = 0.2 + Math.random() * 0.2;
        this.radius = this.shape === 'star' ? (3.5 + Math.random() * 2.5) : (0.6 + Math.random() * 0.8);
        this.baseSpeedY = -(0.08 + Math.random() * 0.16);
        this.baseSpeedX = (Math.random() - 0.5) * 0.15;
        this.alpha = 0.12 + Math.random() * 0.15;
        this.baseAlpha = this.alpha;
        this.twinkleSpeed = 0.01 + Math.random() * 0.015;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.008;
      } else if (this.tier === 'mid') {
        // Mid-ground stardust, hollow stars, triangles, hexagons, rhombus, cross, crown
        if (rnd < 0.35) this.shape = 'star';
        else if (rnd < 0.48) this.shape = 'rhombus';
        else if (rnd < 0.62) this.shape = 'triangle';
        else if (rnd < 0.75) this.shape = 'cross';
        else if (rnd < 0.85) this.shape = 'crown';
        else if (rnd < 0.92) this.shape = 'hexagon';
        else this.shape = 'dust';

        this.z = 0.45 + Math.random() * 0.3;
        if (this.shape === 'star') this.radius = 5.0 + Math.random() * 5.0;
        else if (this.shape === 'dust') this.radius = 1.0 + Math.random() * 1.2;
        else this.radius = 4.5 + Math.random() * 4.0;

        this.baseSpeedY = -(0.18 + Math.random() * 0.28);
        this.baseSpeedX = (Math.random() - 0.5) * 0.25;
        this.alpha = 0.22 + Math.random() * 0.28;
        this.baseAlpha = this.alpha;
        this.twinkleSpeed = 0.018 + Math.random() * 0.024;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.012;
      } else {
        // Foreground: Clean hollow 5-point stars matching reference image + Seraphix models
        if (rnd < 0.50) this.shape = 'star';
        else if (rnd < 0.65) this.shape = 'crown';
        else if (rnd < 0.78) this.shape = 'rhombus';
        else if (rnd < 0.88) this.shape = 'triangle';
        else this.shape = 'spark';

        this.z = 0.85 + Math.random() * 0.35;
        if (this.shape === 'star') this.radius = 8.0 + Math.random() * 8.0;
        else if (this.shape === 'spark') this.radius = 10.0 + Math.random() * 14.0;
        else this.radius = 7.0 + Math.random() * 5.0;

        this.baseSpeedY = -(0.28 + Math.random() * 0.42);
        this.baseSpeedX = (Math.random() - 0.5) * 0.35;
        this.alpha = 0.45 + Math.random() * 0.45;
        this.baseAlpha = this.alpha;
        this.twinkleSpeed = 0.022 + Math.random() * 0.032;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.016;
      }

      this.pushX = 0;
      this.pushY = 0;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.008 + Math.random() * 0.015;
    }

    update() {
      this.swayAngle += this.swaySpeed;
      this.twinklePhase += this.twinkleSpeed;
      this.rotation += this.rotationSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * (this.baseAlpha * 0.35);

      // Smooth mouse interaction (natural fluid repulsion with damping)
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180 * this.z;

        if (dist < maxDist && dist > 1) {
          const force = (maxDist - dist) / maxDist;
          const pushAmount = force * force * 1.4 * this.z;
          this.pushX += (dx / dist) * pushAmount;
          this.pushY += (dy / dist) * pushAmount;

          if (mouse.speed > 2) {
            this.pushX += mouse.vx * 0.035 * this.z;
            this.pushY += mouse.vy * 0.035 * this.z;
          }
        }
      }

      // Elastic return damping
      this.pushX *= 0.92;
      this.pushY *= 0.92;

      this.x += this.baseSpeedX + Math.sin(this.swayAngle) * 0.35 + this.pushX;
      this.y += this.baseSpeedY + this.pushY;

      // Wrap around bounds
      if (this.y < -30 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }

    draw() {
      const a = Math.max(0.04, Math.min(1.0, this.alpha));

      if (this.shape === 'star') {
        // 5-Pointed Star: 100% Hollow, Clean White Outline + Bright White Edge Glow (Strictly Outline-Following, No Circular Halo)
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        traceStar5(ctx, this.radius);

        // 1. Soft Outer Edge Glow (traces the 5-point star contour)
        ctx.lineWidth = this.radius > 8 ? 4.6 : 3.0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.20})`;
        ctx.stroke();

        // 2. Bright Mid Edge Glow (hugging the star stroke)
        ctx.lineWidth = this.radius > 8 ? 2.5 : 1.8;
        ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.52})`;
        ctx.stroke();

        // 3. Crisp Brilliant White Core Outline (No fill! Completely hollow center!)
        ctx.lineWidth = 1.15;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1.0, a * 1.1)})`;
        ctx.stroke();

        ctx.restore();
      } else if (this.shape === 'triangle') {
        // Hollow Equilateral Triangle with Outline Glow
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineJoin = 'round';

        traceEquilateralTriangle(ctx, this.radius);

        ctx.lineWidth = 3.0;
        ctx.strokeStyle = `rgba(0, 136, 255, ${a * 0.32})`;
        ctx.stroke();

        ctx.lineWidth = 1.15;
        ctx.strokeStyle = `rgba(210, 235, 255, ${Math.min(1.0, a * 0.95)})`;
        ctx.stroke();

        ctx.restore();
      } else if (this.shape === 'hexagon') {
        // Hollow Regular Hexagon with Outline Glow
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineJoin = 'round';

        traceHexagon(ctx, this.radius);

        ctx.lineWidth = 3.0;
        ctx.strokeStyle = `rgba(0, 136, 255, ${a * 0.32})`;
        ctx.stroke();

        ctx.lineWidth = 1.15;
        ctx.strokeStyle = `rgba(210, 235, 255, ${Math.min(1.0, a * 0.95)})`;
        ctx.stroke();

        ctx.restore();
      } else if (this.shape === 'rhombus') {
        // Seraphix Hollow Rhombus / Diamond
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineJoin = 'round';

        traceRhombus(ctx, this.radius);

        ctx.lineWidth = 3.0;
        ctx.strokeStyle = `rgba(0, 136, 255, ${a * 0.32})`;
        ctx.stroke();

        ctx.lineWidth = 1.15;
        ctx.strokeStyle = `rgba(210, 235, 255, ${Math.min(1.0, a * 0.95)})`;
        ctx.stroke();

        ctx.restore();
      } else if (this.shape === 'cross') {
        // Seraphix Hollow Cross
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.lineJoin = 'miter';

        traceCross(ctx, this.radius);

        ctx.lineWidth = 2.8;
        ctx.strokeStyle = `rgba(0, 136, 255, ${a * 0.32})`;
        ctx.stroke();

        ctx.lineWidth = 1.15;
        ctx.strokeStyle = `rgba(210, 235, 255, ${Math.min(1.0, a * 0.95)})`;
        ctx.stroke();

        ctx.restore();
      } else if (this.shape === 'crown') {
        // Seraphix Hollow Crown
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * 0.4);
        ctx.lineJoin = 'round';

        traceCrown(ctx, this.radius);

        ctx.lineWidth = 3.2;
        ctx.strokeStyle = `rgba(255, 200, 50, ${a * 0.35})`;
        ctx.stroke();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(255, 245, 200, ${Math.min(1.0, a * 0.95)})`;
        ctx.stroke();

        ctx.restore();
      } else if (this.shape === 'spark') {
        // Directional Spark Streak
        ctx.save();
        ctx.translate(this.x, this.y);
        const sparkAngle = Math.atan2(this.baseSpeedY + this.pushY, this.baseSpeedX + this.pushX);
        ctx.rotate(sparkAngle);

        ctx.beginPath();
        ctx.moveTo(-this.radius * 0.5, 0);
        ctx.lineTo(this.radius * 0.5, 0);

        ctx.lineWidth = 2.8;
        ctx.strokeStyle = `rgba(0, 136, 255, ${a * 0.35})`;
        ctx.stroke();

        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1.0, a * 0.95)})`;
        ctx.stroke();

        ctx.restore();
      } else {
        // Dust / Cosmic Mote
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${a})`;
        ctx.fill();
      }
    }
  }

  // ==========================================================================
  // CINEMATIC LIGHT STREAKS (Reactive Anamorphic Light Rays)
  // ==========================================================================
  class CinematicLightStreak {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height * 0.75;
      this.length = 220 + Math.random() * 260;
      this.speed = 0.5 + Math.random() * 0.8;
      this.alpha = 0.03 + Math.random() * 0.055;
      this.baseAlpha = this.alpha;
      this.angle = (26 * Math.PI) / 180; // ~26 degree cinematic angle
      this.width = 1.0 + Math.random() * 0.6;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // React to mouse proximity: subtle brightening
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          this.alpha = this.baseAlpha * 1.8;
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }
      }

      if (this.x > width + this.length || this.y > height + this.length) {
        this.x = Math.random() * width - 200;
        this.y = -80;
        this.reset();
      }
    }

    draw() {
      const endX = this.x + Math.cos(this.angle) * this.length;
      const endY = this.y + Math.sin(this.angle) * this.length;

      const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
      grad.addColorStop(0, 'rgba(0, 136, 255, 0)');
      grad.addColorStop(0.3, `rgba(0, 136, 255, ${this.alpha * 0.5})`);
      grad.addColorStop(0.5, `rgba(210, 235, 255, ${this.alpha})`);
      grad.addColorStop(0.7, `rgba(0, 136, 255, ${this.alpha * 0.5})`);
      grad.addColorStop(1, 'rgba(0, 136, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.width;
      ctx.stroke();
    }
  }

  // ==========================================================================
  // AESTHETIC SHOOTING STARS (2-3 Elegant Falling Meteors with Glowing Tails)
  // ==========================================================================
  class ShootingStar {
    constructor(initialDelay = 0) {
      this.waitTimer = initialDelay;
      this.active = false;
      this.reset();
    }

    reset() {
      // Spawn along top and top-left border
      if (Math.random() > 0.4) {
        this.x = Math.random() * (width * 0.85);
        this.y = -20 - Math.random() * 80;
      } else {
        this.x = -20 - Math.random() * 100;
        this.y = Math.random() * (height * 0.45);
      }

      // Natural cinematic falling trajectory (~32 to 42 degrees downward slant)
      const angleDeg = 32 + Math.random() * 10;
      this.angle = (angleDeg * Math.PI) / 180;
      this.cos = Math.cos(this.angle);
      this.sin = Math.sin(this.angle);

      // Speed & Length (crisp, elegant, swift motion)
      this.speed = 9 + Math.random() * 5; // 9-14 px per frame
      this.length = 120 + Math.random() * 100; // 120-220px tail
      this.thickness = 2.2 + Math.random() * 1.0; // 2.2-3.2px tail thickness
      this.headRadius = 2.4 + Math.random() * 0.8; // 2.4-3.2px head radius

      // Trajectory distance & progress
      this.distance = 0;
      this.maxDistance = Math.min(width, height) * (0.55 + Math.random() * 0.45);

      // Lifecycle opacity
      this.opacity = 0;
      this.maxOpacity = 0.75 + Math.random() * 0.25; // 0.75 - 1.0
      this.active = false;

      // Color variation: Ice blue to electric cyan with brilliant white head
      this.hue = Math.random() > 0.4 ? '56, 189, 248' : '0, 136, 255';
    }

    trigger() {
      this.reset();
      this.active = true;
    }

    update() {
      if (!this.active) {
        this.waitTimer--;
        if (this.waitTimer <= 0) {
          this.trigger();
        }
        return;
      }

      this.distance += this.speed;
      this.x += this.cos * this.speed;
      this.y += this.sin * this.speed;

      // Progress ratio (0 -> 1)
      const progress = this.distance / this.maxDistance;

      // Smooth parabolic fade: quick fade-in, long sustained glow, graceful fade-out
      if (progress < 0.15) {
        this.opacity = (progress / 0.15) * this.maxOpacity;
      } else if (progress > 0.68) {
        this.opacity = Math.max(0, (1 - (progress - 0.68) / 0.32) * this.maxOpacity);
      } else {
        this.opacity = this.maxOpacity;
      }

      // Check boundary or trajectory end
      if (progress >= 1 || this.x > width + 100 || this.y > height + 100 || this.opacity <= 0) {
        this.active = false;
        // Staggered wait: 1.5s to 4.5s (90 to 270 frames at 60fps) before streaking again
        this.waitTimer = Math.floor(90 + Math.random() * 180);
      }
    }

    draw() {
      if (!this.active || this.opacity <= 0.01) return;

      // Tail start (behind the head)
      const tailX = this.x - this.cos * this.length;
      const tailY = this.y - this.sin * this.length;

      // 1. Glowing Tapered Comet Tail
      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, `rgba(${this.hue}, 0)`);
      grad.addColorStop(0.6, `rgba(${this.hue}, ${this.opacity * 0.4})`);
      grad.addColorStop(0.88, `rgba(186, 230, 253, ${this.opacity * 0.85})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.thickness;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 2. Brilliant Glowing Star Head
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.headRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.shadowColor = `rgba(56, 189, 248, ${this.opacity})`;
      ctx.shadowBlur = 14;
      ctx.fill();

      // 3. Subtle Diamond Cross Flare on Star Head
      const flareLen = this.headRadius * 2.8;
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(this.x - flareLen, this.y);
      ctx.lineTo(this.x + flareLen, this.y);
      ctx.moveTo(this.x, this.y - flareLen);
      ctx.lineTo(this.x, this.y + flareLen);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Collections
  let particles = [];
  let lightStreaks = [];
  let shootingStars = [];

  function initParticles() {
    particles = [];
    lightStreaks = [];
    shootingStars = [];

    const isMobile = width < 768;
    const deepCount = isMobile ? 22 : 45;
    const midCount = isMobile ? 16 : 30;
    const foreCount = isMobile ? 8 : 15;

    for (let i = 0; i < deepCount; i++) particles.push(new CinematicParticle('deep'));
    for (let i = 0; i < midCount; i++) particles.push(new CinematicParticle('mid'));
    for (let i = 0; i < foreCount; i++) particles.push(new CinematicParticle('foreground'));

    const streakCount = isMobile ? 2 : 4;
    for (let i = 0; i < streakCount; i++) lightStreaks.push(new CinematicLightStreak());

    // Exactly 2-3 organic, staggered shooting stars falling across the background
    shootingStars = [
      new ShootingStar(30),   // ~0.5s after load
      new ShootingStar(140),  // ~2.3s after load
      new ShootingStar(260)   // ~4.3s after load
    ];
  }

  initParticles();

  // ==========================================================================
  // RENDER LOOP (Butter-smooth 60/120 FPS, GPU-accelerated)
  // ==========================================================================
  let lastTime = performance.now();

  function render(time) {
    if (!isTabVisible) return;

    const elapsed = time - lastTime;
    if (elapsed < 14) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }
    lastTime = time;

    // Smooth cursor interpolation (0.09 lerp for weighted liquid feel)
    if (mouse.active) {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.09;
      mouse.y += (mouse.targetY - mouse.y) * 0.09;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      mouse.hoverAlpha += (1 - mouse.hoverAlpha) * 0.06;
    } else {
      mouse.hoverAlpha += (0 - mouse.hoverAlpha) * 0.04;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Atmospheric #0088FF Spotlight Following Cursor Softly
    if (mouse.hoverAlpha > 0.01) {
      const spotGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 480
      );
      spotGrad.addColorStop(0, `rgba(0, 136, 255, ${0.08 * mouse.hoverAlpha})`);
      spotGrad.addColorStop(0.4, `rgba(0, 136, 255, ${0.025 * mouse.hoverAlpha})`);
      spotGrad.addColorStop(1, 'rgba(0, 136, 255, 0)');

      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Cinematic Light Streaks
    for (let i = 0; i < lightStreaks.length; i++) {
      lightStreaks[i].update();
      lightStreaks[i].draw();
    }

    // 3. Cosmic Shooting Stars (2-3 falling meteors with glowing gradient tails)
    for (let i = 0; i < shootingStars.length; i++) {
      shootingStars[i].update();
      shootingStars[i].draw();
    }

    // 4. Multi-Depth Floating Particles (Deep -> Mid -> Foreground)
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);

  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (isTabVisible && !animationFrameId) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    } else if (!isTabVisible && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  });
}

// Tasteful 3D Card Tilt, Parallax & Magnetic Button Engine
function init3DMouseInteractions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 1. Global Viewport Parallax Coordinates for Background & Floating Elements
  let rAFParallax = null;
  let mouseScreen = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    mouseScreen.x = ((e.clientX / window.innerWidth) - 0.5) * 2;
    mouseScreen.y = ((e.clientY / window.innerHeight) - 0.5) * 2;

    if (!rAFParallax) {
      rAFParallax = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-screen-x', mouseScreen.x.toFixed(3));
        document.documentElement.style.setProperty('--mouse-screen-y', mouseScreen.y.toFixed(3));
        rAFParallax = null;
      });
    }
  }, { passive: true });

  // 2. High-Performance 3D Card Tilt Engine
  const tiltableCards = document.querySelectorAll(
    '.card, .video-card, .client-card, .pricing-card, .metric-card, .why-card, .explorer-display-card'
  );

  tiltableCards.forEach(card => {
    let rect = null;
    let rAFTilt = null;

    card.addEventListener('pointerenter', () => {
      rect = card.getBoundingClientRect();
      card.style.willChange = 'transform, box-shadow';
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
    });

    card.addEventListener('pointermove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (rAFTilt) return;
      rAFTilt = requestAnimationFrame(() => {
        const normX = (x / rect.width - 0.5) * 2;
        const normY = (y / rect.height - 0.5) * 2;

        const isVip = card.classList.contains('vip-plan');
        const scaleVal = isVip ? 'scale(1.11)' : '';
        const maxTilt = card.classList.contains('client-card') ? 4 : (isVip ? 5 : 7);
        const rotX = (-normY * maxTilt).toFixed(2);
        const rotY = (normX * maxTilt).toFixed(2);
        const transY = isVip ? '-18px' : '-4px';

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px) translateY(${transY}) ${scaleVal}`;
        rAFTilt = null;
      });
    });

    card.addEventListener('pointerleave', () => {
      if (rAFTilt) cancelAnimationFrame(rAFTilt);
      rAFTilt = null;
      rect = null;
      card.style.willChange = 'auto';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      if (card.classList.contains('vip-plan')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(-14px) scale(1.09)';
      } else {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
      }
    });
  });

  // 3. Subtle Magnetic Button Reaction
  const magneticButtons = document.querySelectorAll('.btn, .nav-pill-btn, .plan-cta-btn, .nav-pill-login');
  magneticButtons.forEach(btn => {
    let rect = null;

    btn.addEventListener('pointerenter', () => {
      rect = btn.getBoundingClientRect();
      btn.style.transition = 'transform 0.15s ease-out';
    });

    btn.addEventListener('pointermove', (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.18;
      const deltaY = (e.clientY - centerY) * 0.18;

      btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
    });

    btn.addEventListener('pointerleave', () => {
      rect = null;
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// Scroll-Triggered Staggered Reveal and Depth Animations
function initScrollAnimations() {
  // Section headers must always remain 100% visible and sharp
  document.querySelectorAll('.section-header').forEach(sh => {
    sh.classList.add('in-view', 'revealed');
  });

  const elements = document.querySelectorAll(
    '.card, .step-card, .video-card, .img-reveal, .client-card, .metric-card, .why-card, .pricing-card'
  );

  // Immediately reveal elements that are already within initial viewport
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 80) {
      el.classList.add('in-view', 'revealed');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view', 'revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.02, rootMargin: '100px 0px 100px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Toast Notice Helper
function showToast(msg, type = 'info') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  
  let strokeColor = '#0088FF';
  let iconSvg = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `;

  if (type === 'success') {
    strokeColor = '#10B981';
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else if (type === 'manual' || type === 'warning') {
    strokeColor = '#F59E0B';
    iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

function handlePurchase(planId) {
  showToast('Payments are manual right now. Please contact the administrator.', 'manual');
}
window.handlePurchase = handlePurchase;

// ==========================================================================
// 3D ISOMETRIC BEACON ENGINE
// Direct recreation of Screen Recording (media_1788769334256.png)
// GPU-accelerated Canvas with 3D metallic tiles, dynamic real-time lighting,
// and smooth looping floating energy beacon orb in Splash Electric Blue.
// ==========================================================================
function initIsoBeaconCanvas() {
  const canvas = document.getElementById('isoBeaconCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rAF = null;
  let isVisible = true;

  // Grid configuration (6 rows x 6 cols)
  const rows = 6;
  const cols = 6;
  const tileW = 56;
  const tileH = 28;
  const tileThickness = 8;

  // Mouse tilt
  let mouseActive = false;
  let mouseX = 0;
  let mouseY = 0;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width || 800;
    height = rect.height || 240;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  canvas.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    targetTiltX = ((mouseX / width) - 0.5) * 14;
    targetTiltY = ((mouseY / height) - 0.5) * 14;
    mouseActive = true;
  }, { passive: true });

  canvas.addEventListener('pointerleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
    mouseActive = false;
  });

  const startTime = performance.now();

  function render(now) {
    if (!isVisible) {
      rAF = requestAnimationFrame(render);
      return;
    }

    const t = (now - startTime) * 0.0015;
    ctx.clearRect(0, 0, width, height);

    // Smooth tilt interpolation
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;

    const centerX = width / 2 + tiltX * 1.5;
    const centerY = height / 2 - 10 + tiltY * 1.5;

    // Orb path (smooth figure-8 / Lissajous trajectory across the grid)
    let orbGx = (cols - 1) / 2 + Math.sin(t * 0.85) * 1.85 + Math.cos(t * 0.42) * 0.4;
    let orbGy = (rows - 1) / 2 + Math.cos(t * 0.65) * 1.85 + Math.sin(t * 0.38) * 0.4;

    if (mouseActive) {
      // Gentle attraction towards cursor
      const normMx = (mouseX - width / 2) / (tileW * 0.5);
      const normMy = (mouseY - height / 2) / (tileH * 0.5);
      const mouseGx = (normMy + normMx) * 0.5 + (cols - 1) / 2;
      const mouseGy = (normMy - normMx) * 0.5 + (rows - 1) / 2;
      if (mouseGx >= 0 && mouseGx < cols && mouseGy >= 0 && mouseGy < rows) {
        orbGx += (mouseGx - orbGx) * 0.08;
        orbGy += (mouseGy - orbGy) * 0.08;
      }
    }

    // Orb Screen Coordinates
    const orbIsoX = centerX + (orbGx - orbGy) * (tileW * 0.5);
    const orbHover = 18 + Math.sin(t * 2.8) * 3;
    const orbIsoY = centerY + (orbGx + orbGy) * (tileH * 0.5) - orbHover;

    // 1. Draw Tiles sorted from back to front (r + c order)
    for (let sum = 0; sum < rows + cols - 1; sum++) {
      for (let r = 0; r < rows; r++) {
        const c = sum - r;
        if (c < 0 || c >= cols) continue;

        // Tile base center
        const isoX = centerX + (c - r) * (tileW * 0.5);
        const isoY = centerY + (c + r) * (tileH * 0.5);

        // Distance from tile to glowing orb
        const dist = Math.hypot(c - orbGx, r - orbGy);
        const intensity = Math.max(0, 1 - dist / 2.7);
        const glow = Math.pow(intensity, 2.2);

        // Tile elevation ripple
        const wave = Math.sin(t * 1.8 + (c + r) * 0.45) * 2;
        const elev = wave + glow * 5.5;

        const curIsoY = isoY - elev;

        // Diamond vertices
        const topY = curIsoY - tileH * 0.5;
        const rightX = isoX + tileW * 0.5;
        const rightY = curIsoY;
        const botY = curIsoY + tileH * 0.5;
        const leftX = isoX - tileW * 0.5;
        const leftY = curIsoY;

        // Left 3D Extrusion
        ctx.beginPath();
        ctx.moveTo(leftX, leftY);
        ctx.lineTo(isoX, botY);
        ctx.lineTo(isoX, botY + tileThickness);
        ctx.lineTo(leftX, leftY + tileThickness);
        ctx.closePath();
        const leftR = Math.floor(6 + glow * 10);
        const leftG = Math.floor(10 + glow * 40);
        const leftB = Math.floor(18 + glow * 80);
        ctx.fillStyle = `rgb(${leftR}, ${leftG}, ${leftB})`;
        ctx.fill();

        // Right 3D Extrusion
        ctx.beginPath();
        ctx.moveTo(isoX, botY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(rightX, rightY + tileThickness);
        ctx.lineTo(isoX, botY + tileThickness);
        ctx.closePath();
        const rightR = Math.floor(8 + glow * 15);
        const rightG = Math.floor(14 + glow * 60);
        const rightB = Math.floor(24 + glow * 110);
        ctx.fillStyle = `rgb(${rightR}, ${rightG}, ${rightB})`;
        ctx.fill();

        // Top Diamond Face
        ctx.beginPath();
        ctx.moveTo(isoX, topY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(isoX, botY);
        ctx.lineTo(leftX, leftY);
        ctx.closePath();

        // Dynamic gradient fill for top face
        const topR = Math.floor(11 + glow * 10);
        const topG = Math.floor(18 + glow * 110);
        const topB = Math.floor(30 + glow * 215);
        ctx.fillStyle = `rgb(${topR}, ${topG}, ${topB})`;
        ctx.fill();

        // Neon border with electric glow
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 + glow * 0.85})`;
        ctx.lineWidth = 1 + glow * 0.8;
        ctx.stroke();
      }
    }

    // 2. Floor Radial Reflection Glow (Under the orb)
    const floorGrad = ctx.createRadialGradient(orbIsoX, orbIsoY + 14, 0, orbIsoX, orbIsoY + 14, 95);
    floorGrad.addColorStop(0, 'rgba(0, 136, 255, 0.45)');
    floorGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.18)');
    floorGrad.addColorStop(1, 'rgba(0, 136, 255, 0)');
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY + 14, 95, 0, Math.PI * 2);
    ctx.fill();

    // 3. Floating Beacon Glowing Orb (Lens Flare & Core)
    const bloomGrad = ctx.createRadialGradient(orbIsoX, orbIsoY, 0, orbIsoX, orbIsoY, 36);
    bloomGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    bloomGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.85)');
    bloomGrad.addColorStop(0.55, 'rgba(0, 136, 255, 0.4)');
    bloomGrad.addColorStop(1, 'rgba(0, 136, 255, 0)');
    ctx.fillStyle = bloomGrad;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY, 36, 0, Math.PI * 2);
    ctx.fill();

    // Sphere Solid Core with Specular Highlight
    const coreGrad = ctx.createRadialGradient(orbIsoX - 2, orbIsoY - 2.5, 0.8, orbIsoX, orbIsoY, 8);
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.35, '#38BDF8');
    coreGrad.addColorStop(0.85, '#0088FF');
    coreGrad.addColorStop(1, '#0055AA');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Subtle outer halo ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(orbIsoX, orbIsoY, 8.5, 0, Math.PI * 2);
    ctx.stroke();

    rAF = requestAnimationFrame(render);
  }

  rAF = requestAnimationFrame(render);

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.08 });
  observer.observe(canvas);
}

// ==========================================================================
// SMOOTH 3D PARALLAX SCROLL DEPTH ENGINE
// GPU-friendly translate3d / scale / perspective across all cards & images
// Zero layout recalculations, smooth 60+ FPS on all devices
// ==========================================================================
function init3DScrollParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll(
    '.card, .video-card, .client-card, .why-card, .pricing-card, .metric-card, .hero-preview-frame'
  );

  const heroPreview = document.querySelector('.hero-preview-frame');
  const bgMesh = document.querySelector('.bg-mesh');
  const bgGrid = document.querySelector('.bg-grid');

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // Multi-layer background depth
    if (bgMesh) {
      bgMesh.style.transform = `translate3d(calc(var(--mouse-screen-x, 0) * 16px), calc(${scrollY * 0.08}px + var(--mouse-screen-y, 0) * 16px), 0)`;
    }
    if (bgGrid) {
      bgGrid.style.transform = `translate3d(calc(var(--mouse-screen-x, 0) * -10px), calc(${scrollY * 0.04}px + var(--mouse-screen-y, 0) * -10px), 0)`;
    }

    // Card subtle 3D parallax
    cards.forEach(card => {
      if (card.classList.contains('hero-preview-frame')) return; // Handled by 3D tilt
      const rect = card.getBoundingClientRect();
      if (rect.bottom >= -60 && rect.top <= windowH + 60) {
        const center = (rect.top + rect.height * 0.5) - windowH * 0.5;
        const progress = center / windowH; // -0.5 to 0.5
        const py = (-progress * 12).toFixed(1);
        const rx = (progress * 2.2).toFixed(2);
        const scale = (1 - Math.abs(progress) * 0.012).toFixed(3);

        card.style.setProperty('--parallax-y', py);
        card.style.setProperty('--parallax-rx', rx);
        card.style.setProperty('--parallax-scale', scale);
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

// ==========================================================================
// 3D PERSPECTIVE MOUSE TILT & LIGHTING FOR HERO MOCKUP
// Smooth interactive cursor tilt + idle breathing + dynamic lighting
// ==========================================================================
function initHeroMockupTilt() {
  const frame = document.querySelector('.hero-preview-frame');
  if (!frame) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (prefersReducedMotion || isTouch) return;

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let isHovered = false;
  let idlePhase = 0;

  window.addEventListener('pointermove', (e) => {
    const rect = frame.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    targetX = Math.max(-1, Math.min(1, normX));
    targetY = Math.max(-1, Math.min(1, normY));
    isHovered = true;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    isHovered = false;
  });

  function animate() {
    idlePhase += 0.018;

    if (!isHovered) {
      targetX = Math.sin(idlePhase) * 0.1;
      targetY = Math.cos(idlePhase * 0.75) * 0.06;
    }

    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;

    const rotX = -mouseY * 8; // Pitch tilt
    const rotY = mouseX * 10; // Yaw tilt
    const shadowX = -mouseX * 24;
    const shadowY = Math.abs(mouseY) * 18 + 24;

    frame.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    frame.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 65px -10px rgba(0, 0, 0, 0.85), 0 0 45px rgba(0, 136, 255, 0.2)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// ==========================================================================
// FULLY FUNCTIONAL INTERACTIVE SPLASH DESKTOP GUI ENGINE
// Direct reactive state management, hardware pacing emulation, key capture,
// multi-page navigation, tactile audio feedback, and local persistence.
// ==========================================================================
function initInteractiveDesktopGUI() {
  const guiRoot = document.getElementById('splash-desktop-gui');
  if (!guiRoot) return;

  // --- Audio Synthesizer (Zero external dependencies) ---
  let soundEnabled = true;
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playClickSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {}
  }

  function playSaveChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime + idx * 0.06;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.14, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch (e) {}
  }

  // --- Default Profiles State ---
  const initialProfiles = [
    {
      id: "cpvp",
      name: "Cpvp",
      hotkey: "None",
      active: true,
      slots: [
        {
          id: "slot1",
          name: "Slot 1",
          trigger: "4",
          enabled: true,
          actions: [
            { id: 1, name: "Action 1", type: "Key Press", key: "3", delay: 0 },
            { id: 2, name: "Action 2", type: "Right Click", key: "Right Click", delay: 25 },
            { id: 3, name: "Action 3", type: "Key Press", key: "1", delay: 30 },
            { id: 4, name: "Action 4", type: "None", key: "None", delay: 15 },
            { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
            { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
          ]
        },
        {
          id: "slot2",
          name: "Slot 2",
          trigger: "5",
          enabled: true,
          actions: [
            { id: 1, name: "Action 1", type: "Key Press", key: "2", delay: 0 },
            { id: 2, name: "Action 2", type: "Right Click", key: "Right Click", delay: 40 },
            { id: 3, name: "Action 3", type: "None", key: "None", delay: 0 },
            { id: 4, name: "Action 4", type: "None", key: "None", delay: 0 },
            { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
            { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
          ]
        }
      ],
      clickProfiles: [
        { id: 1, trigger: "M5", button: "Left Click", cps: 16, cycleEnabled: true, cycleCount: 10, holdMode: false, holdTarget: "Left Click", holdBehavior: "Hold while activation is pressed", holdDuration: 100 },
        { id: 2, trigger: "None", button: "Right Click", cps: 20, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Right Click", holdBehavior: "Hold while activation is pressed", holdDuration: 50 },
        { id: 3, trigger: "None", button: "Left Click", cps: 14, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Left Click", holdBehavior: "Toggle on / off", holdDuration: 80 },
        { id: 4, trigger: "None", button: "Left Click", cps: 12, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Left Click", holdBehavior: "Hold while activation is pressed", holdDuration: 100 },
        { id: 5, trigger: "None", button: "Right Click", cps: 18, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Right Click", holdBehavior: "Hold while activation is pressed", holdDuration: 100 },
        { id: 6, trigger: "None", button: "Left Click", cps: 15, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Left Click", holdBehavior: "Hold while activation is pressed", holdDuration: 100 },
        { id: 7, trigger: "None", button: "Left Click", cps: 16, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Left Click", holdBehavior: "Hold while activation is pressed", holdDuration: 100 },
        { id: 8, trigger: "None", button: "Left Click", cps: 16, cycleEnabled: false, cycleCount: 0, holdMode: false, holdTarget: "Left Click", holdBehavior: "Hold while activation is pressed", holdDuration: 100 }
      ],
      slotSwitch: {
        activeSequence: 1,
        sequences: [
          {
            id: 1,
            trigger: "R",
            initialWait: 0,
            outputs: [
              { id: 1, key: "1", delay: 45, hold: false, holdDuration: 120, mode: "Press" },
              { id: 2, key: "2", delay: 40, hold: false, holdDuration: 120, mode: "Press" },
              { id: 3, key: "3", delay: 50, hold: false, holdDuration: 120, mode: "Press" },
              { id: 4, key: "4", delay: 35, hold: false, holdDuration: 120, mode: "Press" },
              { id: 5, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" },
              { id: 6, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" },
              { id: 7, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" },
              { id: 8, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" }
            ]
          },
          { id: 2, trigger: "None", initialWait: 0, outputs: [] },
          { id: 3, trigger: "None", initialWait: 0, outputs: [] },
          { id: 4, trigger: "None", initialWait: 0, outputs: [] }
        ]
      }
    },
    {
      id: "bedwars",
      name: "Bedwars",
      hotkey: "F6",
      active: false,
      slots: [
        {
          id: "slot1",
          name: "Slot 1",
          trigger: "E",
          enabled: true,
          actions: [
            { id: 1, name: "Action 1", type: "Key Press", key: "2", delay: 0 },
            { id: 2, name: "Action 2", type: "Right Click", key: "Right Click", delay: 15 },
            { id: 3, name: "Action 3", type: "Key Press", key: "1", delay: 20 },
            { id: 4, name: "Action 4", type: "None", key: "None", delay: 0 },
            { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
            { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
          ]
        }
      ],
      clickProfiles: [],
      slotSwitch: { activeSequence: 1, sequences: [] }
    },
    {
      id: "crystal",
      name: "Crystal",
      hotkey: "F7",
      active: false,
      slots: [
        {
          id: "slot1",
          name: "Slot 1",
          trigger: "C",
          enabled: true,
          actions: [
            { id: 1, name: "Action 1", type: "Key Press", key: "5", delay: 0 },
            { id: 2, name: "Action 2", type: "Right Click", key: "Right Click", delay: 10 },
            { id: 3, name: "Action 3", type: "Key Press", key: "1", delay: 12 },
            { id: 4, name: "Action 4", type: "Left Click", key: "Left Click", delay: 15 },
            { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
            { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
          ]
        }
      ],
      clickProfiles: [],
      slotSwitch: { activeSequence: 1, sequences: [] }
    },
    {
      id: "vanilla",
      name: "Vanilla",
      hotkey: "None",
      active: false,
      slots: [
        {
          id: "slot1",
          name: "Slot 1",
          trigger: "None",
          enabled: true,
          actions: [
            { id: 1, name: "Action 1", type: "None", key: "None", delay: 0 },
            { id: 2, name: "Action 2", type: "None", key: "None", delay: 0 },
            { id: 3, name: "Action 3", type: "None", key: "None", delay: 0 },
            { id: 4, name: "Action 4", type: "None", key: "None", delay: 0 },
            { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
            { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
          ]
        }
      ],
      clickProfiles: [],
      slotSwitch: { activeSequence: 1, sequences: [] }
    }
  ];

  // Load from localStorage or use defaults
  let profiles = initialProfiles;
  try {
    const saved = localStorage.getItem('splash_gui_profiles');
    if (saved) profiles = JSON.parse(saved);
  } catch (e) {}

  let selectedProfileIdx = 0;
  let selectedSlotIdx = 0;
  let activeTab = 'profiles';
  let activeSeq = 1;

  // Supported Minecraft Clients list
  const clientHooks = [
    { name: "LabyMod 4", isRunning: true, badge: "RUNNING", logo: "assets/clients/labymod.png", status: "Client Hooked • 120 FPS", hint: "Sub-ms hotbar switching enabled." },
    { name: "Minecraft Not Running", isRunning: false, badge: "OFFLINE", logo: "assets/clients/minecraft.png", status: "Offline • Waiting for Game", hint: "Launch any Minecraft client or launcher to link profile." },
    { name: "Lunar Client", isRunning: true, badge: "RUNNING", logo: "assets/clients/lunar.png", status: "Client Hooked • 240 FPS", hint: "High-DPI raw input synchronized." },
    { name: "Badlion Client", isRunning: true, badge: "RUNNING", logo: "assets/clients/badlion.png", status: "BAC Hooked • 144 FPS", hint: "BAC bypass & ring-3 pacing active." },
    { name: "Feather Client", isRunning: true, badge: "RUNNING", logo: "assets/clients/feather.png", status: "Client Hooked • 165 FPS", hint: "Forge/Fabric pacing thread active." },
    { name: "Vanilla Client", isRunning: true, badge: "RUNNING", logo: "assets/clients/minecraft.png", status: "Client Hooked • 60 FPS", hint: "Standard Java window hook active." }
  ];
  let clientIndex = 0;

  // Key Capture State
  let capturingTarget = null;

  // Helper: Get Current Profile and Slot
  function getCurrentProfile() {
    return profiles[selectedProfileIdx] || profiles[0];
  }

  function getActiveProfile() {
    return profiles.find(p => p.active) || profiles[0];
  }

  function getCurrentSlot() {
    const p = getCurrentProfile();
    if (!p.slots || p.slots.length === 0) {
      p.slots = [{
        id: "slot1",
        name: "Slot 1",
        trigger: "None",
        enabled: true,
        actions: [
          { id: 1, name: "Action 1", type: "None", key: "None", delay: 0 },
          { id: 2, name: "Action 2", type: "None", key: "None", delay: 0 },
          { id: 3, name: "Action 3", type: "None", key: "None", delay: 0 },
          { id: 4, name: "Action 4", type: "None", key: "None", delay: 0 },
          { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
          { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
        ]
      }];
    }
    return p.slots[selectedSlotIdx] || p.slots[0];
  }

  function saveState(notifyMessage) {
    try {
      localStorage.setItem('splash_gui_profiles', JSON.stringify(profiles));
    } catch (e) {}

    if (notifyMessage) {
      updateStatus(notifyMessage);
      showToast("Settings Synchronized", notifyMessage);
      playSaveChime();
    }
  }

  function updateStatus(msg) {
    const elSide = document.getElementById('gui-sidebar-status');
    const elFoot = document.getElementById('gui-footer-status');
    if (elSide) elSide.textContent = msg;
    if (elFoot) elFoot.textContent = msg;
  }

  function showToast(title, message) {
    const toast = document.getElementById('guiSaveToast');
    const msgEl = document.getElementById('guiToastMsg');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Render Functions ---

  function updateHeaderAndFooterPills() {
    const act = getActiveProfile();
    const cur = getCurrentProfile();

    const headPillText = document.getElementById('gui-header-profile-text');
    const footPillText = document.getElementById('gui-footer-profile-text');

    if (headPillText) headPillText.textContent = `ACTIVE: ${act.name}`;
    if (footPillText) footPillText.textContent = `Profile: ${cur.name}`;
  }

  function renderProfilesPage() {
    const p = getCurrentProfile();
    const slot = getCurrentSlot();

    // Profile Name Input
    const nameInput = document.getElementById('gui-profile-name-input');
    if (nameInput && nameInput.value !== p.name) nameInput.value = p.name;

    // Profile Hotkey Button
    const hotkeyBtn = document.getElementById('gui-profile-hotkey-btn');
    if (hotkeyBtn) {
      hotkeyBtn.textContent = p.hotkey === 'None' ? 'Set hotkey' : `Hotkey: ${p.hotkey}`;
      hotkeyBtn.dataset.key = p.hotkey;
    }

    // Profile Dropdown
    const profSelect = document.getElementById('gui-profile-select');
    if (profSelect) {
      profSelect.innerHTML = '';
      profiles.forEach((item, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = item.name + (item.active ? ' (Active)' : '');
        if (idx === selectedProfileIdx) opt.selected = true;
        profSelect.appendChild(opt);
      });
    }

    // Slot Dropdown
    const slotSelect = document.getElementById('gui-slot-select');
    if (slotSelect) {
      slotSelect.innerHTML = '';
      p.slots.forEach((s, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `${s.name} (Trigger: ${s.trigger})`;
        if (idx === selectedSlotIdx) opt.selected = true;
        slotSelect.appendChild(opt);
      });
    }

    // Slot Info Badge & Toggle
    const slotInfo = document.getElementById('gui-slot-info-text');
    const slotToggle = document.getElementById('gui-slot-enabled-toggle');
    const cardSlotToggle = document.getElementById('gui-card-slot-enabled');

    if (slotInfo) {
      slotInfo.textContent = `${slot.name} | Trigger: ${slot.trigger} | ${slot.enabled ? 'Enabled' : 'Disabled'}`;
    }
    if (slotToggle) slotToggle.checked = slot.enabled;
    if (cardSlotToggle) cardSlotToggle.checked = slot.enabled;

    // Trigger Key Button
    const triggerBtn = document.getElementById('gui-slot-trigger-btn');
    if (triggerBtn) {
      triggerBtn.textContent = `Trigger: ${slot.trigger}`;
      triggerBtn.dataset.key = slot.trigger;
    }

    // Render Actions 1 through 6
    for (let i = 1; i <= 6; i++) {
      const act = slot.actions.find(a => a.id === i) || { id: i, name: `Action ${i}`, type: 'None', key: 'None', delay: 0 };
      
      const keyBtn = document.getElementById(`gui-action-key-${i}`);
      if (keyBtn) {
        keyBtn.textContent = `Key: ${act.key}`;
        keyBtn.dataset.key = act.key;
      }

      const typeSelect = document.querySelector(`.gui-action-type-select[data-action="${i}"]`);
      if (typeSelect && typeSelect.value !== act.type) {
        typeSelect.value = act.type;
      }

      const delayInput = document.querySelector(`.gui-delay-input[data-action="${i}"]`);
      if (delayInput && Number(delayInput.value) !== act.delay) {
        delayInput.value = act.delay;
      }
    }

    updateHeaderAndFooterPills();
  }

  function renderClickPage() {
    const p = getCurrentProfile();
    const grid = document.getElementById('guiClickGrid');
    if (!grid) return;

    if (!p.clickProfiles || p.clickProfiles.length === 0) {
      p.clickProfiles = [];
      for (let i = 1; i <= 8; i++) {
        p.clickProfiles.push({
          id: i,
          trigger: i === 1 ? "M5" : "None",
          button: i % 2 === 1 ? "Left Click" : "Right Click",
          cps: 16,
          cycleEnabled: false,
          cycleCount: 0,
          holdMode: false,
          holdTarget: i % 2 === 1 ? "Left Click" : "Right Click",
          holdBehavior: "Hold while activation is pressed",
          holdDuration: 100
        });
      }
    }

    grid.innerHTML = '';
    p.clickProfiles.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gui-click-card';
      card.innerHTML = `
        <div class="gui-action-card-head">
          <span class="gui-action-card-title">CLICK PROFILE ${item.id}</span>
          <button type="button" class="gui-card-menu-btn" data-target="click-${item.id}">•••</button>
        </div>
        <div class="gui-field-group">
          <label class="gui-field-label">Trigger key</label>
          <button type="button" class="gui-key-btn gui-click-trigger-btn" data-click-idx="${index}" data-key="${item.trigger}">Trigger: ${item.trigger}</button>
        </div>
        <div class="gui-field-group">
          <label class="gui-field-label">Click button</label>
          <select class="gui-select gui-click-button-select" data-click-idx="${index}">
            <option value="Left Click" ${item.button === 'Left Click' ? 'selected' : ''}>Left Click</option>
            <option value="Right Click" ${item.button === 'Right Click' ? 'selected' : ''}>Right Click</option>
          </select>
        </div>
        <div class="gui-field-group">
          <label class="gui-field-label">Speed: ${item.cps} CPS</label>
          <div class="gui-slider-val-row">
            <input type="range" class="gui-slider gui-cps-slider" min="1" max="500" value="${item.cps}" data-click-idx="${index}">
            <span class="gui-slider-badge">${item.cps} CPS</span>
          </div>
        </div>
        <div class="gui-field-group">
          <label class="gui-card-checkbox">
            <input type="checkbox" class="gui-cycle-check" data-click-idx="${index}" ${item.cycleEnabled ? 'checked' : ''}>
            <span>Stop after set count</span>
          </label>
        </div>
        <div class="gui-field-group">
          <label class="gui-card-checkbox">
            <input type="checkbox" class="gui-hold-check" data-click-idx="${index}" ${item.holdMode ? 'checked' : ''}>
            <span>Enable Hold Mode</span>
          </label>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
          <button type="button" class="gui-btn gui-btn-secondary gui-btn-reset-hold" data-click-idx="${index}" style="height: 24px; padding: 0 8px; font-size: 0.68rem;">Reset Hold</button>
          <span class="gui-status-idle">● Ready</span>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach click events
    grid.querySelectorAll('.gui-click-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        startCapture({
          type: 'click_trigger',
          index: Number(btn.dataset.clickIdx),
          element: btn
        });
      });
    });

    grid.querySelectorAll('.gui-click-button-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const idx = Number(sel.dataset.clickIdx);
        p.clickProfiles[idx].button = sel.value;
        playClickSound();
        saveState(`Click profile ${idx + 1} button updated to ${sel.value}`);
      });
    });

    grid.querySelectorAll('.gui-cps-slider').forEach(sli => {
      sli.addEventListener('input', () => {
        const idx = Number(sli.dataset.clickIdx);
        p.clickProfiles[idx].cps = Number(sli.value);
        const badge = sli.parentElement.querySelector('.gui-slider-badge');
        if (badge) badge.textContent = `${sli.value} CPS`;
        const lbl = sli.closest('.gui-field-group').querySelector('.gui-field-label');
        if (lbl) lbl.textContent = `Speed: ${sli.value} CPS`;
      });
      sli.addEventListener('change', () => {
        playClickSound();
        saveState(`Click profile ${Number(sli.dataset.clickIdx) + 1} CPS set to ${sli.value}`);
      });
    });

    grid.querySelectorAll('.gui-cycle-check').forEach(chk => {
      chk.addEventListener('change', () => {
        const idx = Number(chk.dataset.clickIdx);
        p.clickProfiles[idx].cycleEnabled = chk.checked;
        playClickSound();
        saveState(`Cycle limit ${chk.checked ? 'enabled' : 'disabled'}`);
      });
    });

    grid.querySelectorAll('.gui-hold-check').forEach(chk => {
      chk.addEventListener('change', () => {
        const idx = Number(chk.dataset.clickIdx);
        p.clickProfiles[idx].holdMode = chk.checked;
        playClickSound();
        saveState(`Hold mode ${chk.checked ? 'enabled' : 'disabled'}`);
      });
    });

    grid.querySelectorAll('.gui-btn-reset-hold').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.clickIdx);
        p.clickProfiles[idx].holdDuration = 100;
        playClickSound();
        showToast("Hold Reset", `Click profile ${idx + 1} hold state reset to default.`);
      });
    });
  }

  function renderSwitchPage() {
    const p = getCurrentProfile();
    const grid = document.getElementById('guiSwitchGrid');
    if (!grid) return;

    if (!p.slotSwitch || !p.slotSwitch.sequences) {
      p.slotSwitch = {
        activeSequence: 1,
        sequences: [
          {
            id: 1,
            trigger: "R",
            initialWait: 0,
            outputs: [
              { id: 1, key: "1", delay: 45, hold: false, holdDuration: 120, mode: "Press" },
              { id: 2, key: "2", delay: 40, hold: false, holdDuration: 120, mode: "Press" },
              { id: 3, key: "3", delay: 50, hold: false, holdDuration: 120, mode: "Press" },
              { id: 4, key: "4", delay: 35, hold: false, holdDuration: 120, mode: "Press" },
              { id: 5, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" },
              { id: 6, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" },
              { id: 7, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" },
              { id: 8, key: "None", delay: 0, hold: false, holdDuration: 100, mode: "Press" }
            ]
          }
        ]
      };
    }

    const seq = p.slotSwitch.sequences.find(s => s.id === activeSeq) || p.slotSwitch.sequences[0];

    // Trigger & Delay
    const trigBtn = document.getElementById('gui-switch-trigger-btn');
    if (trigBtn) {
      trigBtn.textContent = `Trigger: ${seq.trigger}`;
      trigBtn.dataset.key = seq.trigger;
    }
    const delayInput = document.getElementById('gui-switch-delay-input');
    if (delayInput) delayInput.value = seq.initialWait;

    // Tabs
    document.querySelectorAll('.gui-seq-tab').forEach(tab => {
      const tabSeq = Number(tab.dataset.seq);
      tab.classList.toggle('active', tabSeq === activeSeq);
    });

    grid.innerHTML = '';
    for (let i = 1; i <= 8; i++) {
      const out = seq.outputs.find(o => o.id === i) || { id: i, key: 'None', delay: 0, hold: false, holdDuration: 100, mode: 'Press' };
      const card = document.createElement('div');
      card.className = 'gui-switch-card';
      card.innerHTML = `
        <div class="gui-action-card-head">
          <span class="gui-action-card-title">Output ${i}</span>
          <button type="button" class="gui-card-menu-btn" data-target="output-${i}">•••</button>
        </div>
        <div class="gui-field-group">
          <label class="gui-field-label">Output key</label>
          <button type="button" class="gui-key-btn gui-output-key-btn" data-output-idx="${i}" data-key="${out.key}">Key: ${out.key}</button>
        </div>
        <div class="gui-field-group">
          <label class="gui-field-label">Delay (ms)</label>
          <input type="number" class="gui-input gui-output-delay-input" data-output-idx="${i}" value="${out.delay}" min="0" max="5000">
        </div>
        <div class="gui-field-group">
          <label class="gui-card-checkbox">
            <input type="checkbox" class="gui-output-hold-check" data-output-idx="${i}" ${out.hold ? 'checked' : ''}>
            <span>Hold output</span>
          </label>
        </div>
      `;
      grid.appendChild(card);
    }

    // Attach output events
    grid.querySelectorAll('.gui-output-key-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        startCapture({
          type: 'output_key',
          index: Number(btn.dataset.outputIdx),
          element: btn
        });
      });
    });

    grid.querySelectorAll('.gui-output-delay-input').forEach(inp => {
      inp.addEventListener('change', () => {
        const outIdx = Number(inp.dataset.outputIdx);
        let out = seq.outputs.find(o => o.id === outIdx);
        if (!out) {
          out = { id: outIdx, key: 'None', delay: 0, hold: false, holdDuration: 100, mode: 'Press' };
          seq.outputs.push(out);
        }
        out.delay = Number(inp.value) || 0;
        playClickSound();
        saveState(`Output ${outIdx} delay set to ${out.delay} ms`);
      });
    });

    grid.querySelectorAll('.gui-output-hold-check').forEach(chk => {
      chk.addEventListener('change', () => {
        const outIdx = Number(chk.dataset.outputIdx);
        let out = seq.outputs.find(o => o.id === outIdx);
        if (!out) {
          out = { id: outIdx, key: 'None', delay: 0, hold: false, holdDuration: 100, mode: 'Press' };
          seq.outputs.push(out);
        }
        out.hold = chk.checked;
        playClickSound();
        saveState(`Output ${outIdx} hold ${chk.checked ? 'enabled' : 'disabled'}`);
      });
    });
  }

  // --- Key Capture System ---
  function startCapture(target) {
    if (capturingTarget && capturingTarget.element) {
      capturingTarget.element.classList.remove('capturing');
    }

    capturingTarget = target;
    target.element.classList.add('capturing');
    target.element.textContent = 'Press Key (Esc to clear)...';

    const banner = document.getElementById('guiCaptureBanner');
    if (banner) banner.classList.add('active');

    playClickSound();
  }

  function finishCapture(capturedKey) {
    if (!capturingTarget) return;

    const banner = document.getElementById('guiCaptureBanner');
    if (banner) banner.classList.remove('active');

    capturingTarget.element.classList.remove('capturing');
    const key = capturedKey === 'Escape' ? 'None' : capturedKey;

    const p = getCurrentProfile();
    const slot = getCurrentSlot();

    if (capturingTarget.type === 'profile_hotkey') {
      p.hotkey = key;
      capturingTarget.element.textContent = key === 'None' ? 'Set hotkey' : `Hotkey: ${key}`;
      saveState(`Profile hotkey set to ${key}`);
    } else if (capturingTarget.type === 'trigger') {
      slot.trigger = key;
      capturingTarget.element.textContent = `Trigger: ${key}`;
      const slotInfo = document.getElementById('gui-slot-info-text');
      if (slotInfo) slotInfo.textContent = `${slot.name} | Trigger: ${slot.trigger} | ${slot.enabled ? 'Enabled' : 'Disabled'}`;
      saveState(`Macro slot trigger set to ${key}`);
    } else if (capturingTarget.type === 'action') {
      const actId = capturingTarget.index;
      let act = slot.actions.find(a => a.id === actId);
      if (act) act.key = key;
      capturingTarget.element.textContent = `Key: ${key}`;
      saveState(`Action ${actId} key bound to ${key}`);
    } else if (capturingTarget.type === 'click_trigger') {
      const idx = capturingTarget.index;
      if (p.clickProfiles[idx]) p.clickProfiles[idx].trigger = key;
      capturingTarget.element.textContent = `Trigger: ${key}`;
      saveState(`Click profile ${idx + 1} trigger set to ${key}`);
    } else if (capturingTarget.type === 'switch_trigger') {
      const seq = p.slotSwitch.sequences.find(s => s.id === activeSeq) || p.slotSwitch.sequences[0];
      if (seq) seq.trigger = key;
      capturingTarget.element.textContent = `Trigger: ${key}`;
      saveState(`Slot Switch sequence ${activeSeq} trigger set to ${key}`);
    } else if (capturingTarget.type === 'output_key') {
      const seq = p.slotSwitch.sequences.find(s => s.id === activeSeq) || p.slotSwitch.sequences[0];
      let out = seq.outputs.find(o => o.id === capturingTarget.index);
      if (!out) {
        out = { id: capturingTarget.index, key: key, delay: 0, hold: false, holdDuration: 100, mode: 'Press' };
        seq.outputs.push(out);
      } else {
        out.key = key;
      }
      capturingTarget.element.textContent = `Key: ${key}`;
      saveState(`Output ${capturingTarget.index} key set to ${key}`);
    }

    capturingTarget = null;
    playClickSound();
  }

  // Window-level key/mouse listeners for capture
  window.addEventListener('keydown', (e) => {
    if (!capturingTarget) return;
    e.preventDefault();
    e.stopPropagation();

    let keyName = e.key;
    if (e.code === 'Space') keyName = 'Space';
    else if (e.code.startsWith('Key')) keyName = e.code.replace('Key', '');
    else if (e.code.startsWith('Digit')) keyName = e.code.replace('Digit', '');
    else if (e.code.startsWith('Numpad')) keyName = e.code;
    else if (e.key === 'Control') keyName = 'Ctrl';

    finishCapture(keyName);
  }, true);

  window.addEventListener('mousedown', (e) => {
    if (!capturingTarget) return;
    // Don't capture if clicking directly on the capturing button itself immediately
    if (capturingTarget.element && capturingTarget.element.contains(e.target)) return;

    e.preventDefault();
    e.stopPropagation();

    let btnName = 'Left Click';
    if (e.button === 1) btnName = 'Middle Click';
    else if (e.button === 2) btnName = 'Right Click';
    else if (e.button === 3) btnName = 'Mouse 4';
    else if (e.button === 4) btnName = 'Mouse 5';

    finishCapture(btnName);
  }, true);

  // --- Wire UI Interaction Handlers ---

  // 1. Navigation Tab Buttons
  const navItems = guiRoot.querySelectorAll('.gui-nav-item');
  const navHighlight = document.getElementById('guiNavHighlight');

  function switchTab(tabName) {
    activeTab = tabName;
    navItems.forEach((btn, idx) => {
      const isMatch = btn.dataset.tab === tabName;
      btn.classList.toggle('active', isMatch);
      if (isMatch && navHighlight) {
        navHighlight.style.transform = `translateY(${idx * 42}px)`;
      }
    });

    document.querySelectorAll('.gui-page').forEach(page => {
      page.classList.toggle('active', page.id === `gui-page-${tabName}`);
    });

    if (tabName === 'profiles') renderProfilesPage();
    else if (tabName === 'click') renderClickPage();
    else if (tabName === 'switch') renderSwitchPage();

    playClickSound();
    updateStatus(`Navigated to ${tabName.toUpperCase()} module.`);
  }

  navItems.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 2. Action Steps Sub-Nav on Profiles Page
  guiRoot.querySelectorAll('.gui-subnav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      guiRoot.querySelectorAll('.gui-subnav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = btn.dataset.actionIndex;
      const targetCard = document.getElementById(`guiActionCard-${idx}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        targetCard.style.boxShadow = '0 0 20px var(--gui-accent)';
        setTimeout(() => {
          targetCard.style.boxShadow = '';
        }, 800);
      }
      playClickSound();
    });
  });

  // 3. Profile Form Controls
  const profileNameInput = document.getElementById('gui-profile-name-input');
  if (profileNameInput) {
    profileNameInput.addEventListener('input', () => {
      const p = getCurrentProfile();
      p.name = profileNameInput.value.trim() || 'Custom';
      updateHeaderAndFooterPills();
      const profSelect = document.getElementById('gui-profile-select');
      if (profSelect && profSelect.options[selectedProfileIdx]) {
        profSelect.options[selectedProfileIdx].textContent = p.name + (p.active ? ' (Active)' : '');
      }
    });
    profileNameInput.addEventListener('change', () => {
      saveState(`Profile renamed to ${getCurrentProfile().name}`);
    });
  }

  const profileHotkeyBtn = document.getElementById('gui-profile-hotkey-btn');
  if (profileHotkeyBtn) {
    profileHotkeyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startCapture({ type: 'profile_hotkey', element: profileHotkeyBtn });
    });
  }

  const makeActiveBtn = document.getElementById('gui-btn-make-active');
  if (makeActiveBtn) {
    makeActiveBtn.addEventListener('click', () => {
      profiles.forEach((p, idx) => p.active = (idx === selectedProfileIdx));
      renderProfilesPage();
      saveState(`Active profile switched to ${getCurrentProfile().name}`);
    });
  }

  const headerActivePill = document.getElementById('gui-header-active-pill');
  if (headerActivePill) {
    headerActivePill.addEventListener('click', () => {
      selectedProfileIdx = (selectedProfileIdx + 1) % profiles.length;
      profiles.forEach((p, idx) => p.active = (idx === selectedProfileIdx));
      renderProfilesPage();
      saveState(`Switched active profile to ${getCurrentProfile().name}`);
    });
  }

  const footerProfilePill = document.getElementById('gui-footer-profile-pill');
  if (footerProfilePill) {
    footerProfilePill.addEventListener('click', () => {
      selectedProfileIdx = (selectedProfileIdx + 1) % profiles.length;
      renderProfilesPage();
      playClickSound();
    });
  }

  // Profile Selector & Nav
  const profSelect = document.getElementById('gui-profile-select');
  if (profSelect) {
    profSelect.addEventListener('change', () => {
      selectedProfileIdx = Number(profSelect.value);
      selectedSlotIdx = 0;
      renderProfilesPage();
      playClickSound();
    });
  }

  const prevProfBtn = document.getElementById('gui-btn-prev-profile');
  if (prevProfBtn) {
    prevProfBtn.addEventListener('click', () => {
      selectedProfileIdx = (selectedProfileIdx - 1 + profiles.length) % profiles.length;
      selectedSlotIdx = 0;
      renderProfilesPage();
      playClickSound();
    });
  }

  const nextProfBtn = document.getElementById('gui-btn-next-profile');
  if (nextProfBtn) {
    nextProfBtn.addEventListener('click', () => {
      selectedProfileIdx = (selectedProfileIdx + 1) % profiles.length;
      selectedSlotIdx = 0;
      renderProfilesPage();
      playClickSound();
    });
  }

  // Profile Add / Duplicate / Remove
  const addProfBtn = document.getElementById('gui-btn-add-profile');
  if (addProfBtn) {
    addProfBtn.addEventListener('click', () => {
      const newName = `Profile ${profiles.length + 1}`;
      const newProf = JSON.parse(JSON.stringify(initialProfiles[0]));
      newProf.id = `prof_${Date.now()}`;
      newProf.name = newName;
      newProf.active = false;
      profiles.push(newProf);
      selectedProfileIdx = profiles.length - 1;
      selectedSlotIdx = 0;
      renderProfilesPage();
      saveState(`Created new profile: ${newName}`);
    });
  }

  const dupProfBtn = document.getElementById('gui-btn-dup-profile');
  if (dupProfBtn) {
    dupProfBtn.addEventListener('click', () => {
      const cur = getCurrentProfile();
      const clone = JSON.parse(JSON.stringify(cur));
      clone.id = `prof_${Date.now()}`;
      clone.name = `${cur.name} (Copy)`;
      clone.active = false;
      profiles.push(clone);
      selectedProfileIdx = profiles.length - 1;
      selectedSlotIdx = 0;
      renderProfilesPage();
      saveState(`Duplicated profile as ${clone.name}`);
    });
  }

  const delProfBtn = document.getElementById('gui-btn-del-profile');
  if (delProfBtn) {
    delProfBtn.addEventListener('click', () => {
      if (profiles.length <= 1) {
        showToast("Cannot Remove", "At least one profile must remain.");
        return;
      }
      const removedName = getCurrentProfile().name;
      profiles.splice(selectedProfileIdx, 1);
      selectedProfileIdx = Math.max(0, selectedProfileIdx - 1);
      if (!profiles.some(p => p.active)) profiles[0].active = true;
      selectedSlotIdx = 0;
      renderProfilesPage();
      saveState(`Removed profile ${removedName}`);
    });
  }

  // 4. Slot Controls
  const slotSelect = document.getElementById('gui-slot-select');
  if (slotSelect) {
    slotSelect.addEventListener('change', () => {
      selectedSlotIdx = Number(slotSelect.value);
      renderProfilesPage();
      playClickSound();
    });
  }

  const prevSlotBtn = document.getElementById('gui-btn-prev-slot');
  if (prevSlotBtn) {
    prevSlotBtn.addEventListener('click', () => {
      const p = getCurrentProfile();
      selectedSlotIdx = (selectedSlotIdx - 1 + p.slots.length) % p.slots.length;
      renderProfilesPage();
      playClickSound();
    });
  }

  const nextSlotBtn = document.getElementById('gui-btn-next-slot');
  if (nextSlotBtn) {
    nextSlotBtn.addEventListener('click', () => {
      const p = getCurrentProfile();
      selectedSlotIdx = (selectedSlotIdx + 1) % p.slots.length;
      renderProfilesPage();
      playClickSound();
    });
  }

  const addSlotBtn = document.getElementById('gui-btn-add-slot');
  if (addSlotBtn) {
    addSlotBtn.addEventListener('click', () => {
      const p = getCurrentProfile();
      const newSlotNum = p.slots.length + 1;
      p.slots.push({
        id: `slot${newSlotNum}`,
        name: `Slot ${newSlotNum}`,
        trigger: "None",
        enabled: true,
        actions: [
          { id: 1, name: "Action 1", type: "Key Press", key: "1", delay: 0 },
          { id: 2, name: "Action 2", type: "Right Click", key: "Right Click", delay: 30 },
          { id: 3, name: "Action 3", type: "None", key: "None", delay: 0 },
          { id: 4, name: "Action 4", type: "None", key: "None", delay: 0 },
          { id: 5, name: "Action 5", type: "None", key: "None", delay: 0 },
          { id: 6, name: "Action 6", type: "None", key: "None", delay: 0 }
        ]
      });
      selectedSlotIdx = p.slots.length - 1;
      renderProfilesPage();
      saveState(`Added Slot ${newSlotNum} to ${p.name}`);
    });
  }

  const delSlotBtn = document.getElementById('gui-btn-del-slot');
  if (delSlotBtn) {
    delSlotBtn.addEventListener('click', () => {
      const p = getCurrentProfile();
      if (p.slots.length <= 1) {
        showToast("Cannot Remove Slot", "Each profile must have at least one slot.");
        return;
      }
      p.slots.splice(selectedSlotIdx, 1);
      selectedSlotIdx = Math.max(0, selectedSlotIdx - 1);
      renderProfilesPage();
      saveState(`Removed selected slot from ${p.name}`);
    });
  }

  const slotToggle = document.getElementById('gui-slot-enabled-toggle');
  if (slotToggle) {
    slotToggle.addEventListener('change', () => {
      const slot = getCurrentSlot();
      slot.enabled = slotToggle.checked;
      renderProfilesPage();
      saveState(`${slot.name} ${slot.enabled ? 'enabled' : 'disabled'}`);
    });
  }

  const cardSlotToggle = document.getElementById('gui-card-slot-enabled');
  if (cardSlotToggle) {
    cardSlotToggle.addEventListener('change', () => {
      const slot = getCurrentSlot();
      slot.enabled = cardSlotToggle.checked;
      renderProfilesPage();
      saveState(`${slot.name} ${slot.enabled ? 'enabled' : 'disabled'}`);
    });
  }

  // Slot Trigger Capture Button
  const slotTriggerBtn = document.getElementById('gui-slot-trigger-btn');
  if (slotTriggerBtn) {
    slotTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startCapture({ type: 'trigger', element: slotTriggerBtn });
    });
  }

  // Action Buttons 1-6
  for (let i = 1; i <= 6; i++) {
    const keyBtn = document.getElementById(`gui-action-key-${i}`);
    if (keyBtn) {
      keyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startCapture({ type: 'action', index: i, element: keyBtn });
      });
    }

    const typeSel = document.querySelector(`.gui-action-type-select[data-action="${i}"]`);
    if (typeSel) {
      typeSel.addEventListener('change', () => {
        const slot = getCurrentSlot();
        let act = slot.actions.find(a => a.id === i);
        if (!act) {
          act = { id: i, name: `Action ${i}`, type: typeSel.value, key: 'None', delay: 0 };
          slot.actions.push(act);
        } else {
          act.type = typeSel.value;
        }
        playClickSound();
        saveState(`Action ${i} type set to ${typeSel.value}`);
      });
    }

    const delayInp = document.querySelector(`.gui-delay-input[data-action="${i}"]`);
    if (delayInp) {
      delayInp.addEventListener('change', () => {
        const slot = getCurrentSlot();
        let act = slot.actions.find(a => a.id === i);
        if (!act) {
          act = { id: i, name: `Action ${i}`, type: 'None', key: 'None', delay: Number(delayInp.value) || 0 };
          slot.actions.push(act);
        } else {
          act.delay = Number(delayInp.value) || 0;
        }
        playClickSound();
        saveState(`Wait before Action ${i} set to ${act.delay} ms`);
      });
    }
  }

  // 5. Slot Switch Sequence Tabs
  document.querySelectorAll('.gui-seq-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeSeq = Number(tab.dataset.seq);
      renderSwitchPage();
      playClickSound();
      updateStatus(`Switched to Sequence ${activeSeq}`);
    });
  });

  const switchTrigBtn = document.getElementById('gui-switch-trigger-btn');
  if (switchTrigBtn) {
    switchTrigBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startCapture({ type: 'switch_trigger', element: switchTrigBtn });
    });
  }

  const switchDelayInput = document.getElementById('gui-switch-delay-input');
  if (switchDelayInput) {
    switchDelayInput.addEventListener('change', () => {
      const p = getCurrentProfile();
      const seq = p.slotSwitch.sequences.find(s => s.id === activeSeq) || p.slotSwitch.sequences[0];
      seq.initialWait = Number(switchDelayInput.value) || 0;
      playClickSound();
      saveState(`Sequence ${activeSeq} initial wait set to ${seq.initialWait} ms`);
    });
  }

  // 6. Client Hook Cycler Card
  const clientCard = document.getElementById('gui-client-card');
  if (clientCard) {
    clientCard.addEventListener('click', () => {
      clientIndex = (clientIndex + 1) % clientHooks.length;
      const c = clientHooks[clientIndex];

      const img = document.getElementById('gui-client-icon');
      const title = document.getElementById('gui-client-title');
      const status = document.getElementById('gui-client-status');
      const badge = document.getElementById('gui-client-badge');

      if (img) img.src = c.logo;
      if (title) title.textContent = c.isRunning ? `${c.name} Detected` : c.name;
      if (status) {
        status.textContent = c.status;
        status.style.color = c.isRunning ? '#10B981' : '#7E9AB8';
      }
      if (badge) {
        badge.textContent = c.badge;
        badge.className = c.isRunning ? 'gui-client-badge running' : 'gui-client-badge offline';
      }

      playClickSound();
      if (c.isRunning) {
        updateStatus(`Hooked into ${c.name} (Process: ${Math.floor(Math.random() * 8000 + 10000)})`);
        showToast("Client Synchronized", `Linked hardware pacing to ${c.name}`);
      } else {
        updateStatus("Minecraft process offline. Waiting for game launch.");
        showToast("Client Disconnected", "Waiting for Minecraft launch...");
      }
    });
  }

  // 7. User & License Card (100% Matching Desktop Software & Screenshot)
  const userCard = document.getElementById('guiUserCard');
  const accountUsernameEl = document.getElementById('guiAccountUsername');
  const accountExpiryEl = document.getElementById('guiAccountExpiry');

  const storedUser = localStorage.getItem('splash_admin_username') || localStorage.getItem('splash_user_name') || 'AzPlayzZ';
  if (accountUsernameEl) accountUsernameEl.textContent = storedUser;

  if (userCard) {
    userCard.addEventListener('click', () => {
      playClickSound();
      showToast("License Authenticated", `Permanent lifetime access verified for ${accountUsernameEl ? accountUsernameEl.textContent : 'AzPlayzZ'}.`);
      updateStatus("Client license verified • Active Ring-3 Pacing");
    });
  }

  // 8. Settings Modal & Header Theme Switcher
  const settingsModal = document.getElementById('guiSettingsModal');
  const openSettingsBtn1 = document.getElementById('gui-header-settings-btn');
  const openSettingsBtn2 = document.getElementById('gui-btn-footer-settings');
  const openThemeBtn = document.getElementById('gui-header-theme-btn');
  const closeSettingsBtn = document.getElementById('guiSettingsClose');
  const doneSettingsBtn = document.getElementById('guiSettingsDone');
  const resetSettingsBtn = document.getElementById('guiSettingsReset');

  const themeColors = [
    { name: "Electric Blue", color: "#0088FF" },
    { name: "Cyan Glow", color: "#00E5FF" },
    { name: "Neon Purple", color: "#8B5CF6" },
    { name: "Emerald Green", color: "#10B981" },
    { name: "Cyber Gold", color: "#F59E0B" }
  ];
  let themeIndex = 0;

  if (openThemeBtn) {
    openThemeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeIndex = (themeIndex + 1) % themeColors.length;
      const t = themeColors[themeIndex];
      applyTheme(t.color);
      playClickSound();
      updateStatus(`Switched UI accent to ${t.name}.`);
      showToast("Theme Updated", `Applied ${t.name} accent glow.`);
    });
  }

  function openSettings() {
    if (settingsModal) settingsModal.classList.add('open');
    playClickSound();
  }

  function closeSettings() {
    if (settingsModal) settingsModal.classList.remove('open');
    playClickSound();
  }

  if (openSettingsBtn1) openSettingsBtn1.addEventListener('click', openSettings);
  if (openSettingsBtn2) openSettingsBtn2.addEventListener('click', openSettings);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
  if (doneSettingsBtn) doneSettingsBtn.addEventListener('click', () => {
    closeSettings();
    saveState("Application settings applied.");
  });

  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener('click', () => {
      applyTheme('#0088FF');
      const soundChk = document.getElementById('guiSoundToggle');
      if (soundChk) soundChk.checked = true;
      soundEnabled = true;
      showToast("Defaults Restored", "Reset to original factory theme and glow.");
    });
  }

  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettings();
    });
  }

  // Theme Palette Swatches
  function applyTheme(colorHex) {
    guiRoot.style.setProperty('--gui-accent', colorHex);
    guiRoot.style.setProperty('--gui-accent-glow', `${colorHex}66`);
    document.querySelectorAll('.gui-palette-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === colorHex);
    });
  }

  document.querySelectorAll('.gui-palette-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.color);
      playClickSound();
      updateStatus(`Applied ${btn.dataset.name} UI accent.`);
    });
  });

  // Sound Toggle
  const soundToggle = document.getElementById('guiSoundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('change', () => {
      soundEnabled = soundToggle.checked;
      if (soundEnabled) playClickSound();
    });
  }

  // Glow Slider
  const glowSlider = document.getElementById('guiGlowSlider');
  if (glowSlider) {
    glowSlider.addEventListener('input', () => {
      const alpha = (Number(glowSlider.value) / 100 * 0.7).toFixed(2);
      guiRoot.style.setProperty('--gui-accent-glow', `rgba(0, 136, 255, ${alpha})`);
    });
  }

  // 9. 3-Dot Context Menu
  const ctxMenu = document.getElementById('guiContextMenu');
  let currentMenuTarget = null;

  guiRoot.addEventListener('click', (e) => {
    const menuBtn = e.target.closest('.gui-card-menu-btn');
    if (menuBtn) {
      e.stopPropagation();
      currentMenuTarget = menuBtn.dataset.target;
      const rect = menuBtn.getBoundingClientRect();
      const rootRect = guiRoot.getBoundingClientRect();

      ctxMenu.style.top = `${rect.bottom - rootRect.top + 4}px`;
      ctxMenu.style.left = `${Math.min(rect.left - rootRect.left, rootRect.width - 160)}px`;
      ctxMenu.classList.add('open');
      playClickSound();
    } else {
      if (ctxMenu) ctxMenu.classList.remove('open');
    }
  });

  document.querySelectorAll('.gui-context-item').forEach(item => {
    item.addEventListener('click', () => {
      const act = item.dataset.action;
      if (ctxMenu) ctxMenu.classList.remove('open');
      playClickSound();

      if (act === 'rename') {
        const titleEl = document.getElementById(`gui-act-title-${currentMenuTarget}`);
        const currentTitle = titleEl ? titleEl.textContent : "Action";
        const newTitle = prompt("Rename Action:", currentTitle);
        if (newTitle && titleEl) {
          titleEl.textContent = newTitle;
          saveState(`Renamed action to ${newTitle}`);
        }
      } else if (act === 'duplicate') {
        showToast("Duplicated", `Action ${currentMenuTarget} cloned to next slot.`);
      } else if (act === 'reset') {
        const keyBtn = document.getElementById(`gui-action-key-${currentMenuTarget}`);
        if (keyBtn) {
          keyBtn.textContent = 'Key: None';
          keyBtn.dataset.key = 'None';
        }
        saveState(`Reset action ${currentMenuTarget} to defaults.`);
      } else if (act === 'delete') {
        showToast("Deleted", `Removed configuration for action ${currentMenuTarget}.`);
      }
    });
  });

  // 10. Done / Save Button
  const saveBtn = document.getElementById('gui-btn-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveState(`Configuration active in-game! Synced ${profiles.length} profiles.`);
    });
  }

  // 11. Minimize to Tray Button
  const minTrayBtn = document.getElementById('gui-btn-minimize-tray');
  if (minTrayBtn) {
    minTrayBtn.addEventListener('click', () => {
      playClickSound();
      showToast("Minimized to Tray", "Splash PRO active in background with 120 FPS hardware pacing.");
    });
  }

  // 12. Window Control Buttons
  const winMin = document.getElementById('gui-btn-win-min');
  const winMax = document.getElementById('gui-btn-win-max');
  const winClose = document.getElementById('gui-btn-win-close');

  if (winMin) winMin.addEventListener('click', () => {
    playClickSound();
    showToast("Minimized", "Window minimized to taskbar.");
  });
  if (winMax) winMax.addEventListener('click', () => {
    playClickSound();
    showToast("Window Resized", "Toggled maximized display mode.");
  });
  if (winClose) winClose.addEventListener('click', () => {
    playClickSound();
    showToast("Background Mode", "Splash PRO running in Windows notification area.");
  });

  // 13. Copy Config Path
  const copyLocBtn = document.querySelector('.gui-btn-copy-loc');
  const configLocBox = document.getElementById('guiConfigLocBox');
  const copyAction = () => {
    try {
      navigator.clipboard.writeText('%APPDATA%\\Splash\\config.json');
      showToast("Copied to Clipboard", "Configuration path copied to Windows clipboard.");
    } catch (e) {
      showToast("Path", "%APPDATA%\\Splash\\config.json");
    }
    playClickSound();
  };
  if (copyLocBtn) copyLocBtn.addEventListener('click', (e) => { e.stopPropagation(); copyAction(); });
  if (configLocBox) configLocBox.addEventListener('click', copyAction);

  // Initial Boot Render
  renderProfilesPage();
  renderClickPage();
  renderSwitchPage();

  const initialSide = `Active profile switched to ${getActiveProfile().name}.`;
  const elSide = document.getElementById('gui-sidebar-status');
  const elFoot = document.getElementById('gui-footer-status');
  if (elSide) elSide.textContent = initialSide;
  if (elFoot) elFoot.textContent = "Saved safely. Reopening settings will reload them.";
}


