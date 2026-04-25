const translations = {
  en: {
    // ── Shared / Layout ────────────────────────────
    "nav.features": "Features",
    "nav.library": "Disease Library",
    "nav.diagnose": "AI Diagnosis",
    "nav.home": "Home",
    "brand.name": "Crop",
    "brand.sense": "Sense",

    // ── Sidebar ────────────────────────────────────
    "sidebar.overview": "Overview",
    "sidebar.diagnose": "AI Diagnosis",
    "sidebar.history": "My Diagnoses",
    "sidebar.crops": "My Crops",
    "sidebar.alerts": "Alerts",
    "sidebar.new": "New",
    "sidebar.lib": "Disease Library",
    "sidebar.saved": "Saved Diseases",
    "sidebar.blog": "Blog & Alerts",
    "sidebar.profile": "My Profile",
    "sidebar.settings": "Settings",
    "sidebar.feedback": "Send feedback",
    "sidebar.signout": "Sign out",
    "sidebar.main": "Main",
    "sidebar.resources": "Resources",
    "sidebar.account": "Account",

    // ── Dashboard Overview ──────────────────────────
    "dash.title": "Good morning, Ramesh 👋",
    "dash.weather": "28°C · Indore",
    "dash.diagnose": "Diagnose crop",
    "dash.diagnose.sub": "Upload a photo",
    "dash.library": "Disease library",
    "dash.library.sub": "500+ diseases",
    "dash.viewalerts": "View alerts",
    "dash.viewalerts.sub": "3 in your area",
    "dash.readblog": "Read blog",
    "dash.readblog.sub": "Latest articles",
    "stat.diag": "Total diagnoses",
    "stat.diag.sub": "+4 this week",
    "stat.crops": "Active crops",
    "stat.crops.sub": "Wheat season peak",
    "stat.alerts": "Active alerts",
    "stat.alerts.sub": "+1 since yesterday",
    "stat.saved": "Diseases saved",
    "stat.saved.sub": "+2 this month",

    // ── Overview Cards ──────────────────────────────
    "card.diagactivity": "Diagnosis activity",
    "card.recentdiag": "Recent diagnoses",
    "card.viewall": "View all",
    "card.activealerts": "Active alerts",
    "card.allalerts": "All alerts",
    "card.recentactivity": "Recent activity",
    "card.fieldmap": "Field map",
    "card.mycrops.title": "My Crops",

    // ── AI Diagnosis Page ───────────────────────────
    "ai.title": "AI Crop Diagnosis",
    "ai.desc": "Upload a photo — Claude AI will identify the disease, severity, and recommend treatment.",
    "ai.photo": "Photograph your crop",
    "ai.photo.sub": "Take a clear, close-up photo of the affected leaf, stem, or fruit. Drag & drop or click to upload.",
    "ai.upload": "Upload photo",
    "ai.sample": "Or try a sample crop",
    "ai.wheat": "🌾 Wheat",
    "ai.tomato": "🍅 Tomato",
    "ai.rice": "🌿 Rice",
    "ai.chat.title": "Ask CropSense AI",
    "ai.chat.badge": "Multi-turn chat",

    // ── History Page ────────────────────────────────
    "hist.title": "Diagnosis History",
    "hist.desc": "All 24 diagnoses from your account",
    "hist.filter.all": "All crops",
    "hist.filter.wheat": "Wheat",
    "hist.filter.tomato": "Tomato",
    "hist.filter.rice": "Rice",

    // ── My Crops Page ───────────────────────────────
    "mycrops.title": "My Crops",
    "mycrops.add": "Add crop",
    "mycrops.diagnose.btn": "Diagnose",
    "mycrops.notes.btn": "Notes",
    "mycrops.health": "Health score",
    "mycrops.stage": "Growth stage",
    "mycrops.planted": "Planted",

    // ── Alerts Page ─────────────────────────────────
    "alerts.title": "Disease Alerts",
    "alerts.desc": "AI-generated alerts for your region — Indore, Madhya Pradesh",

    // ── Saved Diseases Page ─────────────────────────
    "saved.title": "Saved Diseases",
    "saved.desc": "Your personal disease reference library",
    "browse.library": "Browse library",

    // ── Profile Page ────────────────────────────────
    "prof.info": "Personal information",
    "prof.stats": "Your stats",
    "prof.sec": "Security",
    "prof.fullname": "Full name",
    "prof.email": "Email",
    "prof.mobile": "Mobile",
    "prof.state": "State",
    "prof.farmsize": "Farm size",
    "prof.save": "Save changes",
    "prof.chpw": "Change password",
    "prof.2fa": "Enable 2-factor auth",
    "prof.diag.count": "Diagnoses",
    "prof.saved.count": "Saved diseases",
    "prof.crops.count": "Active crops",
    "prof.community": "Community answers",

    // ── Settings Page ───────────────────────────────
    "settings.title": "Settings",
    "settings.notif": "Notifications",
    "settings.pref": "Preferences",
    "settings.location": "Location & crops",
    "settings.danger": "Danger zone",
    "settings.radius": "Alert radius",
    "settings.crops.label": "Monitored crops",
    "settings.del.hist": "Delete all diagnosis history",
    "settings.del.hist.sub": "This will permanently remove all 24 diagnoses. Cannot be undone.",
    "settings.del.hist.btn": "Delete history",
    "settings.del.acct": "Delete my account",
    "settings.del.acct.sub": "Permanently removes your account and all data.",
    "settings.del.acct.btn": "Request deletion",

    // ── Language Toggle ─────────────────────────────
    "lang.label": "Language",

    // ── Generic UI ──────────────────────────────────
    "view.all": "View all",
    "severity.high": "High",
    "severity.medium": "Medium",
    "severity.low": "Low",
    "severity.healthy": "Healthy",

    // ── Library Page ────────────────────────────────
    "lib.hero.tag": "Disease Library",
    "lib.hero.h1.line1": "Every crop disease.",
    "lib.hero.h1.line2": "One place.",
    "lib.hero.desc": "Browse our comprehensive database of 500+ crop diseases — complete with symptoms, treatments, prevention strategies, and AI-powered diagnosis.",
    "lib.stat.diseases": "Diseases",
    "lib.stat.crops": "Crop types",
    "lib.stat.categories": "Categories",
    "lib.stat.languages": "Languages",
    "lib.filter.crop": "Crop",
    "lib.filter.type": "Disease type",
    "lib.filter.severity": "Severity",
    "lib.filter.all": "All",
    "lib.filter.fungal": "🍄 Fungal",
    "lib.filter.bacterial": "🦠 Bacterial",
    "lib.filter.viral": "⚡ Viral",
    "lib.filter.pest": "🐛 Pest",
    "lib.filter.nutrient": "🌱 Nutrient",
    "lib.filter.sev.high": "High",
    "lib.filter.sev.medium": "Medium",
    "lib.filter.sev.low": "Low",
    "lib.search.placeholder": "Search diseases, crops…",
    "lib.showing": "Showing",
    "lib.diseases": "diseases",
    "lib.sort.az": "Sort: A–Z",
    "lib.sort.sev": "Sort: Severity",
    "lib.sort.crop": "Sort: Crop",
    "lib.topbar.count": "diseases",
    "lib.cta.title": "Can't find it?",
    "lib.cta.desc": "Use our AI to diagnose any unknown disease from a photo in 3 seconds.",
    "lib.cta.btn": "Run AI Diagnosis",
    "lib.modal.tab.overview": "Overview",
    "lib.modal.tab.treatment": "Treatment",
    "lib.modal.tab.prevention": "Prevention",
    "lib.modal.desc": "Description",
    "lib.modal.symptoms": "Symptoms",
    "lib.modal.conditions": "Favourable conditions",
    "lib.modal.chemical": "Chemical",
    "lib.modal.organic": "Organic",
    "lib.modal.steps": "Application steps",
    "lib.modal.diag.btn": "Diagnose this disease with AI",
    "lib.empty.title": "No diseases found",
    "lib.empty.desc": "Try different search terms or remove some filters.",

    // ── Auth Page ───────────────────────────────────
    "auth.tab.register": "Create account",
    "auth.tab.login": "Sign in",
    "auth.left.badge": "#1 Agri-AI Platform · India",
    "auth.left.title1": "Join",
    "auth.left.title2": "12 million",
    "auth.left.title3": "farmers already",
    "auth.left.title4": "protecting their",
    "auth.left.title5": "crops.",
    "auth.left.desc": "Free forever. AI diagnosis in 3 seconds. Trusted by smallholder farmers and commercial growers across India.",
    "auth.proof1.title": "AI diagnosis in 3 seconds",
    "auth.proof1.sub": "97% accuracy · 500+ diseases detected",
    "auth.proof2.title": "Disease outbreak alerts",
    "auth.proof2.sub": "48h advance warning for your district",
    "auth.proof3.title": "Farmer community",
    "auth.proof3.sub": "Get answers from experts in under 4 hours",
    "auth.proof4.title": "Works offline",
    "auth.proof4.sub": "No signal in the field? No problem.",
    "auth.testi.quote": "\"CropSense saved my wheat crop. I got a yellow rust alert 2 days before I could see anything. Sprayed the same day — zero yield loss.\"",
    "auth.testi.name": "Ramesh Sharma",
    "auth.testi.role": "Wheat farmer · Indore, MP",
    "auth.step1": "Account",
    "auth.step2": "Profile",
    "auth.step3": "Verify",
    "auth.step4": "Done",
    "auth.reg.section.account": "Your account",
    "auth.social.google": "Continue with Google",
    "auth.social.facebook": "Facebook",
    "auth.divider.email": "or register with email",
    "auth.divider.signin": "or sign in with email",
    "auth.label.firstname": "First name",
    "auth.label.lastname": "Last name",
    "auth.label.email": "Email address",
    "auth.label.mobile": "Mobile number",
    "auth.label.password": "Password",
    "auth.label.confirm": "Confirm password",
    "auth.label.email.login": "Email or mobile number",
    "auth.label.remember": "Keep me signed in on this device",
    "auth.btn.continue": "Continue",
    "auth.btn.verify": "Verify & create account",
    "auth.btn.signin": "Sign in",
    "auth.btn.reset": "Send reset link",
    "auth.btn.dashboard": "Go to my dashboard",
    "auth.btn.continue.verify": "Continue to verification",
    "auth.switch.signin": "Already have an account?",
    "auth.switch.register": "New to CropSense?",
    "auth.switch.signin.link": "Sign in",
    "auth.switch.register.link": "Create free account",
    "auth.forgot": "Forgot password?",
    "auth.back.signin": "Back to sign in",
    "auth.reg.farmer.label": "I am a",
    "auth.role.farmer": "Farmer",
    "auth.role.farmer.sub": "I grow crops",
    "auth.role.agronomist": "Agronomist",
    "auth.role.agronomist.sub": "I advise farmers",
    "auth.role.dealer": "Input Dealer",
    "auth.role.dealer.sub": "I sell agri inputs",
    "auth.role.researcher": "Researcher",
    "auth.role.researcher.sub": "Academic / NGO",
    "auth.label.state": "State",
    "auth.label.district": "District",
    "auth.label.village": "Village / Town (optional)",
    "auth.label.farmsize": "Farm size",
    "auth.label.crops": "Primary crops",
    "auth.label.avatar": "Profile picture (optional)",
    "auth.label.about": "About you (optional)",
    "auth.reg.section.profile": "Your farming profile",
    "auth.reg.profile.hint": "This helps us give you relevant disease alerts and recommendations for your region and crops.",
    "auth.otp.title": "Verify your number",
    "auth.otp.sent": "We sent a 6-digit code to",
    "auth.otp.resend": "Didn't receive it?",
    "auth.otp.resend.btn": "Resend in",
    "auth.otp.demo": "For this demo, use",
    "auth.otp.demo.code": "123456",
    "auth.otp.demo.suffix": "as the OTP code.",
    "auth.success.title": "Welcome to CropSense! 🌱",
    "auth.success.desc": "Your account is ready. You're now part of a community of 12 million farmers protecting their harvests with AI.",
    "auth.success.alerts": "Send me disease outbreak alerts for my district",
    "auth.success.weekly": "Weekly farming tips from CropSense agronomists",
    "auth.login.section": "Welcome back",
    "auth.reset.title": "Reset your password",
    "auth.reset.desc": "We'll send a reset link to your email",
    "auth.nav.back": "Back to site",
    "auth.nav.home": "Home",
    "auth.nav.library": "Library",

    // ── Crop Status Labels ─────────────────────────
    "crop.status.healthy": "Healthy",
    "crop.status.warning": "Warning",
    "crop.status.risk": "At Risk",
  },

  hi: {
    // ── Shared / Layout ────────────────────────────
    "nav.features": "विशेषताएं",
    "nav.library": "रोग कॉटलॉग",
    "nav.diagnose": "AI निदान",
    "nav.home": "होम",
    "brand.name": "क्रॉप",
    "brand.sense": "सेंस",

    // ── Sidebar ────────────────────────────────────
    "sidebar.overview": "डैशबोर्ड",
    "sidebar.diagnose": "AI निदान",
    "sidebar.history": "मेरा निदान इतिहास",
    "sidebar.crops": "मेरी फसलें",
    "sidebar.alerts": "चेतावनी",
    "sidebar.new": "नया",
    "sidebar.lib": "रोग पुस्तकालय",
    "sidebar.saved": "सहेजे गए रोग",
    "sidebar.blog": "लेख और ख़बरें",
    "sidebar.profile": "मेरी प्रोफ़ाइल",
    "sidebar.settings": "सेटिंग्स",
    "sidebar.feedback": "प्रतिक्रिया भेजें",
    "sidebar.signout": "लॉग आउट करें",
    "sidebar.main": "मुख्य",
    "sidebar.resources": "संसाधन",
    "sidebar.account": "अकाउंट",

    // ── Dashboard Overview ──────────────────────────
    "dash.title": "सुप्रभात, रमेश 👋",
    "dash.weather": "28°C · इंदौर",
    "dash.diagnose": "फसल का रोग पहचानें",
    "dash.diagnose.sub": "फोटो अपलोड करें",
    "dash.library": "रोग कॉटलॉग",
    "dash.library.sub": "500+ बीमारियां",
    "dash.viewalerts": "अलर्ट देखें",
    "dash.viewalerts.sub": "आपके क्षेत्र में 3",
    "dash.readblog": "लेख पढ़ें",
    "dash.readblog.sub": "ताज़ा जानकारी",
    "stat.diag": "कुल जांच",
    "stat.diag.sub": "इस हफ़्ते +4",
    "stat.crops": "सक्रिय फसलें",
    "stat.crops.sub": "गेहूं का सीज़न",
    "stat.alerts": "सक्रिय अलर्ट",
    "stat.alerts.sub": "कल से +1",
    "stat.saved": "सहेजे गए रोग",
    "stat.saved.sub": "इस महीने +2",

    // ── Overview Cards ──────────────────────────────
    "card.diagactivity": "निदान गतिविधि",
    "card.recentdiag": "हाल के निदान",
    "card.viewall": "सभी देखें",
    "card.activealerts": "सक्रिय अलर्ट",
    "card.allalerts": "सभी अलर्ट",
    "card.recentactivity": "हाल की गतिविधि",
    "card.fieldmap": "खेत का नक्शा",
    "card.mycrops.title": "मेरी फसलें",

    // ── AI Diagnosis Page ───────────────────────────
    "ai.title": "AI फसल निदान",
    "ai.desc": "एक फोटो अपलोड करें — Claude AI बीमारी, गंभीरता और उपचार के उपाय बताएगा।",
    "ai.photo": "अपनी फसल की फोटो लें",
    "ai.photo.sub": "प्रभावित पत्ती, तने या फल की साफ फोटो लें। ड्रैग-ड्रॉप या क्लिक करके अपलोड करें।",
    "ai.upload": "फोटो अपलोड करें",
    "ai.sample": "या इन फसलों का उदाहरण देखें",
    "ai.wheat": "🌾 गेहूं",
    "ai.tomato": "🍅 टमाटर",
    "ai.rice": "🌿 धान (चावल)",
    "ai.chat.title": "CropSense AI से पूछें",
    "ai.chat.badge": "बहु-चर्चा चैट",

    // ── History Page ────────────────────────────────
    "hist.title": "निदान इतिहास",
    "hist.desc": "आपके अकाउंट से किए गए 24 निदान",
    "hist.filter.all": "सभी फसलें",
    "hist.filter.wheat": "गेहूं",
    "hist.filter.tomato": "टमाटर",
    "hist.filter.rice": "धान",

    // ── My Crops Page ───────────────────────────────
    "mycrops.title": "मेरी फसलें",
    "mycrops.add": "फसल जोड़ें",
    "mycrops.diagnose.btn": "जांच करें",
    "mycrops.notes.btn": "नोट्स",
    "mycrops.health": "स्वास्थ्य स्कोर",
    "mycrops.stage": "विकास चरण",
    "mycrops.planted": "बोई गई",

    // ── Alerts Page ─────────────────────────────────
    "alerts.title": "बिमारियों के अलर्ट",
    "alerts.desc": "आपके क्षेत्र के लिए AI-जनित अलर्ट — इंदौर, मध्य प्रदेश",

    // ── Saved Diseases Page ─────────────────────────
    "saved.title": "सहेजे गए रोग",
    "saved.desc": "आपका व्यक्तिगत रोग संदर्भ पुस्तकालय",
    "browse.library": "लाइब्रेरी खोलें",

    // ── Profile Page ────────────────────────────────
    "prof.info": "व्यक्तिगत जानकारी",
    "prof.stats": "आपके आंकड़े",
    "prof.sec": "सुरक्षा",
    "prof.fullname": "पूरा नाम",
    "prof.email": "ईमेल",
    "prof.mobile": "मोबाइल",
    "prof.state": "राज्य",
    "prof.farmsize": "खेत का आकार",
    "prof.save": "बदलाव सहेजें",
    "prof.chpw": "पासवर्ड बदलें",
    "prof.2fa": "2-फ़ैक्टर प्रमाणीकरण चालू करें",
    "prof.diag.count": "निदान",
    "prof.saved.count": "सहेजे रोग",
    "prof.crops.count": "सक्रिय फसलें",
    "prof.community": "सामुदायिक उत्तर",

    // ── Settings Page ───────────────────────────────
    "settings.title": "सेटिंग्स",
    "settings.notif": "सूचनाएं",
    "settings.pref": "प्राथमिकताएं",
    "settings.location": "स्थान और फसलें",
    "settings.danger": "खतरनाक क्षेत्र",
    "settings.radius": "अलर्ट त्रिज्या",
    "settings.crops.label": "निगरानी की फसलें",
    "settings.del.hist": "सभी निदान इतिहास हटाएं",
    "settings.del.hist.sub": "इससे सभी 24 निदान स्थायी रूप से हट जाएंगे। इसे पूर्ववत नहीं किया जा सकता।",
    "settings.del.hist.btn": "इतिहास हटाएं",
    "settings.del.acct": "मेरा अकाउंट हटाएं",
    "settings.del.acct.sub": "आपका अकाउंट और सभी डेटा स्थायी रूप से हटा दिया जाएगा।",
    "settings.del.acct.btn": "हटाने का अनुरोध करें",

    // ── Language Toggle ─────────────────────────────
    "lang.label": "भाषा",

    // ── Generic UI ──────────────────────────────────
    "view.all": "सभी देखें",
    "severity.high": "उच्च",
    "severity.medium": "मध्यम",
    "severity.low": "कम",
    "severity.healthy": "स्वस्थ",

    // ── Library Page ────────────────────────────────
    "lib.hero.tag": "रोग पुस्तकालय",
    "lib.hero.h1.line1": "हर फसल की बीमारी।",
    "lib.hero.h1.line2": "एक जगह।",
    "lib.hero.desc": "500+ फसल रोगों का हमारा व्यापक डेटाबेस देखें — लक्षण, उपचार, रोकथाम की रणनीतियां और AI-संचालित निदान के साथ।",
    "lib.stat.diseases": "बीमारियां",
    "lib.stat.crops": "फसल के प्रकार",
    "lib.stat.categories": "श्रेणियां",
    "lib.stat.languages": "भाषाएं",
    "lib.filter.crop": "फसल",
    "lib.filter.type": "रोग प्रकार",
    "lib.filter.severity": "गंभीरता",
    "lib.filter.all": "सभी",
    "lib.filter.fungal": "🍄 फफूंदी",
    "lib.filter.bacterial": "🦠 जीवाणु",
    "lib.filter.viral": "⚡ वायरल",
    "lib.filter.pest": "🐛 कीट",
    "lib.filter.nutrient": "🌱 पोषक तत्व",
    "lib.filter.sev.high": "उच्च",
    "lib.filter.sev.medium": "मध्यम",
    "lib.filter.sev.low": "कम",
    "lib.search.placeholder": "बीमारियां, फसलें खोजें…",
    "lib.showing": "दिखाया जा रहा है",
    "lib.diseases": "बीमारियां",
    "lib.sort.az": "क्रमबद्ध: अ–ह",
    "lib.sort.sev": "क्रमबद्ध: गंभीरता",
    "lib.sort.crop": "क्रमबद्ध: फसल",
    "lib.topbar.count": "बीमारियां",
    "lib.cta.title": "मिल नहीं रही?",
    "lib.cta.desc": "फोटो से किसी भी अज्ञात बीमारी का 3 सेकंड में निदान करने के लिए AI का उपयोग करें।",
    "lib.cta.btn": "AI निदान चलाएं",
    "lib.modal.tab.overview": "अवलोकन",
    "lib.modal.tab.treatment": "उपचार",
    "lib.modal.tab.prevention": "रोकथाम",
    "lib.modal.desc": "विवरण",
    "lib.modal.symptoms": "लक्षण",
    "lib.modal.conditions": "अनुकूल परिस्थितियां",
    "lib.modal.chemical": "रासायनिक",
    "lib.modal.organic": "जैविक",
    "lib.modal.steps": "उपयोग के चरण",
    "lib.modal.diag.btn": "AI से इस बीमारी का निदान करें",
    "lib.empty.title": "कोई बीमारी नहीं मिली",
    "lib.empty.desc": "अलग खोज शब्द आजमाएं या कुछ फ़िल्टर हटाएं।",

    // ── Auth Page ───────────────────────────────────
    "auth.tab.register": "अकाउंट बनाएं",
    "auth.tab.login": "साइन इन करें",
    "auth.left.badge": "#1 कृषि-AI प्लेटफ़ॉर्म · भारत",
    "auth.left.title1": "शामिल हों",
    "auth.left.title2": "1.2 करोड़",
    "auth.left.title3": "किसानों के साथ जो",
    "auth.left.title4": "अपनी फसलें",
    "auth.left.title5": "बचा रहे हैं।",
    "auth.left.desc": "हमेशा के लिए मुफ़्त। 3 सेकंड में AI निदान। भारत के छोटे और बड़े दोनों किसानों पर भरोसा।",
    "auth.proof1.title": "3 सेकंड में AI निदान",
    "auth.proof1.sub": "97% सटीकता · 500+ बीमारियां पहचानी जाती हैं",
    "auth.proof2.title": "रोग प्रकोप अलर्ट",
    "auth.proof2.sub": "आपके जिले के लिए 48 घंटे पहले चेतावनी",
    "auth.proof3.title": "किसान समुदाय",
    "auth.proof3.sub": "4 घंटे से कम में विशेषज्ञों से उत्तर पाएं",
    "auth.proof4.title": "ऑफलाइन काम करता है",
    "auth.proof4.sub": "खेत में नेटवर्क नहीं? कोई बात नहीं।",
    "auth.testi.quote": "\"CropSense ने मेरी गेहूं की फसल बचाई। मुझे 2 दिन पहले ही Yellow Rust का अलर्ट मिल गया। उसी दिन दवाई डाली — शून्य नुकसान।\"",
    "auth.testi.name": "रमेश शर्मा",
    "auth.testi.role": "गेहूं किसान · इंदौर, मध्य प्रदेश",
    "auth.step1": "अकाउंट",
    "auth.step2": "प्रोफ़ाइल",
    "auth.step3": "सत्यापन",
    "auth.step4": "हो गया",
    "auth.reg.section.account": "आपका अकाउंट",
    "auth.social.google": "Google से जारी रखें",
    "auth.social.facebook": "Facebook",
    "auth.divider.email": "या ईमेल से रजिस्टर करें",
    "auth.divider.signin": "या ईमेल से साइन इन करें",
    "auth.label.firstname": "पहला नाम",
    "auth.label.lastname": "अंतिम नाम",
    "auth.label.email": "ईमेल पता",
    "auth.label.mobile": "मोबाइल नंबर",
    "auth.label.password": "पासवर्ड",
    "auth.label.confirm": "पासवर्ड की पुष्टि करें",
    "auth.label.email.login": "ईमेल या मोबाइल नंबर",
    "auth.label.remember": "इस डिवाइस पर साइन इन रखें",
    "auth.btn.continue": "जारी रखें",
    "auth.btn.verify": "सत्यापित करें और अकाउंट बनाएं",
    "auth.btn.signin": "साइन इन करें",
    "auth.btn.reset": "रीसेट लिंक भेजें",
    "auth.btn.dashboard": "मेरे डैशबोर्ड पर जाएं",
    "auth.btn.continue.verify": "सत्यापन के लिए जारी रखें",
    "auth.switch.signin": "पहले से अकाउंट है?",
    "auth.switch.register": "CropSense पर नए हैं?",
    "auth.switch.signin.link": "साइन इन करें",
    "auth.switch.register.link": "मुफ़्त अकाउंट बनाएं",
    "auth.forgot": "पासवर्ड भूल गए?",
    "auth.back.signin": "साइन इन पर वापस जाएं",
    "auth.reg.farmer.label": "मैं हूं",
    "auth.role.farmer": "किसान",
    "auth.role.farmer.sub": "मैं फसल उगाता हूं",
    "auth.role.agronomist": "कृषि विशेषज्ञ",
    "auth.role.agronomist.sub": "मैं किसानों को सलाह देता हूं",
    "auth.role.dealer": "इनपुट डीलर",
    "auth.role.dealer.sub": "मैं कृषि सामग्री बेचता हूं",
    "auth.role.researcher": "शोधकर्ता",
    "auth.role.researcher.sub": "शैक्षणिक / NGO",
    "auth.label.state": "राज्य",
    "auth.label.district": "जिला",
    "auth.label.village": "गांव / शहर (वैकल्पिक)",
    "auth.label.farmsize": "खेत का आकार",
    "auth.label.crops": "मुख्य फसलें",
    "auth.label.avatar": "प्रोफ़ाइल तस्वीर (वैकल्पिक)",
    "auth.label.about": "अपने बारे में (वैकल्पिक)",
    "auth.reg.section.profile": "आपकी खेती की प्रोफ़ाइल",
    "auth.reg.profile.hint": "इससे हम आपके क्षेत्र और फसलों के लिए प्रासंगिक रोग अलर्ट और सिफारिशें दे सकते हैं।",
    "auth.otp.title": "अपना नंबर सत्यापित करें",
    "auth.otp.sent": "हमने 6 अंकों का कोड भेजा है",
    "auth.otp.resend": "कोड नहीं मिला?",
    "auth.otp.resend.btn": "फिर भेजें",
    "auth.otp.demo": "इस डेमो के लिए,",
    "auth.otp.demo.code": "123456",
    "auth.otp.demo.suffix": "OTP कोड के रूप में उपयोग करें।",
    "auth.success.title": "CropSense में आपका स्वागत है! 🌱",
    "auth.success.desc": "आपका अकाउंट तैयार है। आप अब 1.2 करोड़ किसानों के उस समुदाय का हिस्सा हैं जो AI से अपनी फसल बचा रहे हैं।",
    "auth.success.alerts": "मेरे जिले के लिए रोग प्रकोप अलर्ट भेजें",
    "auth.success.weekly": "CropSense कृषि विशेषज्ञों से साप्ताहिक खेती सुझाव",
    "auth.login.section": "वापस स्वागत है",
    "auth.reset.title": "अपना पासवर्ड रीसेट करें",
    "auth.reset.desc": "हम आपके ईमेल पर एक रीसेट लिंक भेजेंगे",
    "auth.nav.back": "साइट पर वापस जाएं",
    "auth.nav.home": "होम",
    "auth.nav.library": "लाइब्रेरी",

    // ── Crop Status Labels ─────────────────────────
    "crop.status.healthy": "स्वस्थ",
    "crop.status.warning": "सावधानी",
    "crop.status.risk": "खतरे में",
  }
};

let i18nConfig = {
  currentLang: localStorage.getItem('cs_lang') || 'en'
};

function i18nTranslate() {
  document.documentElement.lang = i18nConfig.currentLang;

  if (i18nConfig.currentLang === 'hi') {
    document.body.classList.add('hi-lang');
  } else {
    document.body.classList.remove('hi-lang');
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    let text = translations[i18nConfig.currentLang][key];

    // Fallback to English
    if (!text && i18nConfig.currentLang === 'hi') text = translations['en'][key];

    if (text) {
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.placeholder = text;
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Handle placeholder-only elements (data-i18n-placeholder)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    let text = translations[i18nConfig.currentLang][key];
    if (!text && i18nConfig.currentLang === 'hi') text = translations['en'][key];
    if (text) el.placeholder = text;
  });

  // Custom event trigger so pages can manually re-render dynamic content
  document.dispatchEvent(new Event('languageChanged'));
}

function i18nSetLang(lang) {
  i18nConfig.currentLang = lang;
  localStorage.setItem('cs_lang', lang);
  i18nTranslate();

  // Update all EN/HI toggle buttons across pages
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
  // Legacy IDs
  const btnEn = document.getElementById('langEn');
  const btnHi = document.getElementById('langHi');
  if (btnEn && btnHi) {
    btnEn.classList.toggle('active', lang === 'en');
    btnHi.classList.toggle('active', lang === 'hi');
  }
}

// Helper: get a translated string directly (for JS usage)
function t(key) {
  return translations[i18nConfig.currentLang][key] || translations['en'][key] || key;
}

// Initial hydration on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  i18nTranslate();
  // Set active state on language buttons
  const btnEn = document.getElementById('langEn');
  const btnHi = document.getElementById('langHi');
  if (btnEn && btnHi) {
    btnEn.classList.toggle('active', i18nConfig.currentLang === 'en');
    btnHi.classList.toggle('active', i18nConfig.currentLang === 'hi');
  }
});

// Make everything global
window.i18nConfig = i18nConfig;
window.i18nSetLang = i18nSetLang;
window.i18nTranslate = i18nTranslate;
window.t = t;
