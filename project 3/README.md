# SIMOPAGNO Coaching App

Un'app nativa per iOS e Android per il coaching SIMOPAGNO, costruita con Expo e React Native.

## 🚀 Funzionalità

- **Onboarding completo**: Selezione ruolo, registrazione email, nome e password
- **Design professionale**: UI moderna con tema scuro e accenti rossi
- **Navigazione fluida**: Tab navigation con animazioni smooth
- **Form validation**: Validazione input con feedback immediato
- **Ready for stores**: Configurata per Play Store e App Store

## 📱 Tecnologie utilizzate

- **Expo 53** - Framework di sviluppo React Native
- **Expo Router** - Navigazione basata su file system
- **React Native** - Framework mobile cross-platform
- **TypeScript** - Type safety e migliore developer experience
- **Lucide React Native** - Icone moderne e consistenti
- **Expo Linear Gradient** - Gradienti per design accattivante

## 🛠 Setup per lo sviluppo

### Prerequisiti
- Node.js 18+ 
- Expo CLI (`npm install -g @expo/cli`)
- Per iOS: Xcode e iOS Simulator
- Per Android: Android Studio e Android Emulator

### Installazione
\`\`\`bash
# Clona il repository
git clone <repository-url>
cd simopagno-coaching-app

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
\`\`\`

### Testing su dispositivi
\`\`\`bash
# iOS
npx expo run:ios

# Android  
npx expo run:android

# Web
npx expo start --web
\`\`\`

## 📦 Build per produzione

### Build locale
\`\`\`bash
# Build per iOS
eas build --platform ios --local

# Build per Android
eas build --platform android --local
\`\`\`

### Preparazione per gli store

#### iOS App Store
1. Configura il bundle identifier in \`app.json\`
2. Aggiungi le icone necessarie in \`assets/images/\`
3. Crea un build di produzione con EAS Build
4. Carica su App Store Connect

#### Google Play Store
1. Configura il package name in \`app.json\`
2. Genera un keystore per il signing
3. Crea un AAB (Android App Bundle)
4. Carica su Google Play Console

## 🎨 Design System

### Colori
- **Primary**: #FF4444 (Rosso SIMOPAGNO)
- **Background**: #000000 - #1a1a1a (Gradiente scuro)
- **Text**: #FFFFFF (Bianco)
- **Secondary**: #666666 (Grigio)
- **Input Background**: rgba(52, 73, 94, 0.8)

### Typography
- **Titoli**: 28px, bold
- **Body**: 16px, regular
- **Buttons**: 18px, semibold

## 📁 Struttura del progetto

\`\`\`
app/
├── (tabs)/          # Tab navigation
│   ├── _layout.tsx  # Tab layout configuration
│   ├── index.tsx    # Home screen (onboarding)
│   └── profile.tsx  # Profile screen
├── _layout.tsx      # Root layout
└── +not-found.tsx   # 404 screen

components/
├── Button.tsx       # Componente button riutilizzabile
├── Input.tsx        # Componente input riutilizzabile
└── LoadingSpinner.tsx # Loading indicator

assets/
└── images/          # Icone e immagini dell'app
\`\`\`

## 🔧 Configurazione

### Capacitor (per build nativi)
Il progetto include la configurazione Capacitor per generare app native:

\`\`\`bash
# Aggiungi le piattaforme
npx cap add ios
npx cap add android

# Sincronizza il codice
npx cap sync

# Apri in IDE nativo
npx cap open ios
npx cap open android
\`\`\`

## 📋 Funzionalità implementate

✅ **Schermata selezione ruolo**
- Pulsante Cliente
- Pulsante Admin Login

✅ **Form registrazione**
- Input email con validazione
- Input nome completo
- Input password con toggle visibilità
- Navigazione step-by-step

✅ **Navigazione**
- Tab navigation (Home/Profilo)
- Stack navigation per onboarding
- Pulsante "Indietro" con logica corretta

✅ **UI/UX**
- Design responsive
- Animazioni fluide
- Safe area handling
- Dark theme consistent

## 🚀 Prossimi step per il deploy

1. **Configura EAS Build** per build automatici
2. **Aggiungi icone personalizzate** per iOS e Android
3. **Setup environment variables** per diverse configurazioni
4. **Implementa analytics** per tracking utenti
5. **Aggiungi crash reporting** per monitoraggio errori
6. **Setup CI/CD** per deploy automatici

## 📞 Supporto

Per supporto tecnico o domande sull'app, contatta il team di sviluppo.

---

**Versione**: 1.0.0  
**Ultima modifica**: Dicembre 2024