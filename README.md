# 🌸 ManoMitra - Your AI Mental Wellness Companion

> *"Your Safe Space for Mental Wellness"*

AI-powered emotional support chatbot built for **HackNova 2025**

---

## 📖 About

**ManoMitra** is an empathetic AI chatbot that provides 24/7 mental wellness support. Built with Google's Gemini AI, it offers a safe, judgment-free space for emotional conversations.

**Problem Statement**: Healthcare  
**Goal**: Make mental health support accessible to everyone through AI-powered conversations.

---

## 🎯 HackNova 2025

- **Event**: HackNova 2025 (Online Hackathon)
- **Dates**: October 10-12, 2025
- **Organized By**: Buddha Institute of Technology, Gorakhpur
- **Theme**: Healthcare

---

## 👥 Team Visioneers

We are **Team Visioneers** - a passionate group of Data Science students from Buddha Institute of Technology, driven by the vision to make mental wellness accessible to everyone.

| Name | Role | Year | Roll Number |
|------|------|------|-------------|
| **Priyanshu Vishwakarma** | Team Leader | Final Year (Data Science) | 2205251540038 |
| **Ankita Kumari Singh** | Team Member | 3rd Year (Data Science) | 2305251540016 |
| **Anjali Yadav** | Team Member | 3rd Year (Data Science) | 2305251540015 |
| **Shambhavi Shukla** | Team Member | 3rd Year (Data Science) | 2305251540016 |

### 🎓 Institution
**Buddha Institute of Technology**  
CL-1, Sector 7, GIDA, Gorakhpur, Uttar Pradesh 273209

---

## ✨ Features

### Current Implementation
- ✅ **AI-Powered Chat Interface** - Conversational AI using Google Gemini 2.0 Flash
- ✅ **Real-time Responses** - Instant, empathetic replies
- ✅ **Markdown Support** - Rich text formatting for better readability
- ✅ **Persistent Chat History** - Conversations saved locally (browser storage)
- ✅ **Typing Indicators** - Visual feedback during AI response generation
- ✅ **Error Handling** - Graceful error messages and retry mechanisms
- ✅ **Responsive Design** - Works seamlessly across devices
- ✅ **Clean UI/UX** - Minimalist, calming interface design

### Upcoming Features (Landing Page Integration)
- 🔄 **Beautiful Landing Page** - Emotional, gradient-rich design
- 🔄 **Smooth Page Transitions** - React Router integration
- 🔄 **Welcome Screen** - Interactive greeting with prompt chips
- 🔄 **Crisis Detection** - Safety banner for high-risk keywords
- 🔄 **Mood Tracking** - Visual mood detection and tracking
- 🔄 **Breathing Exercises** - Integrated wellness timer
- 🔄 **Resource Center** - Mental health helplines and resources
- 🔄 **Accessibility Features** - High contrast mode, font size adjustment

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.5** - Type-safe JavaScript
- **Vite 5.4** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** *(planned)* - Animation library

### AI & Backend
- **Google Generative AI (Gemini 2.0 Flash)** - AI model for conversations
- **@google/generative-ai** - Official Google AI SDK

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
manomitra/
├── .bolt/
│   ├── config.json
│   └── prompt
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx          # Main chatbot container
│   │   ├── ChatBox.tsx           # Message display component
│   │   ├── ChatHeader.tsx        # Header component
│   │   └── InputArea.tsx         # Input field & controls
│   ├── services/
│   │   └── ai.ts                 # Google AI integration
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx                   # Main app component
│   ├── index.css                 # Global styles
│   ├── main.tsx                  # App entry point
│   └── vite-env.d.ts             # Vite type definitions
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Planned Structure (Post-Landing Page Integration)
```
src/
├── pages/
│   ├── LandingPage.tsx          # Landing page
│   └── ChatPage.tsx              # Chat interface page
├── components/
│   ├── Navbar.tsx                # Navigation bar
│   ├── Hero.tsx                  # Hero section
│   ├── Features.tsx              # Features showcase
│   ├── Testimonials.tsx          # User testimonials
│   ├── FAQ.tsx                   # Frequently Asked Questions
│   └── Footer.tsx                # Footer component
├── router/
│   └── AppRouter.tsx             # React Router setup
└── ...
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google AI API Key** (Gemini)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/manomitra.git
cd manomitra
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory:

```env
VITE_GOOGLE_AI_API_KEY=your_gemini_api_key_here
```

> **⚠️ Security Note**: Never commit your API key to version control. The `.env` file should be listed in `.gitignore`.

### Step 4: Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Step 5: Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_AI_API_KEY` | Google Gemini AI API key | Yes |

### How to Get Google AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

---

## 💻 Usage

### Starting a Conversation
1. Open the application in your browser
2. Type your message in the input field
3. Press **Enter** or click **Send**
4. ManoMitra (Mithra) will respond with empathy and support

### Clearing Chat History
- Click the **Clear All** button to delete all messages
- **Note**: This action cannot be undone

### Keyboard Shortcuts
- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Tab` - Navigate between input and buttons

---

## 🗺️ Roadmap

### Phase 1: Core Chat Functionality ✅
- [x] AI-powered chatbot integration
- [x] Message history persistence
- [x] Responsive UI design
- [x] Error handling

### Phase 2: Landing Page Integration 🔄
- [ ] Design and implement landing page
- [ ] Add React Router for navigation
- [ ] Create smooth page transitions
- [ ] Add welcome screen with prompt chips

### Phase 3: Enhanced Features 📅
- [ ] Mood detection and tracking
- [ ] Crisis keyword detection and resource banner
- [ ] Breathing exercise timer
- [ ] Multilingual support (Hindi + English)

### Phase 4: Advanced Features 🔮
- [ ] User authentication (optional)
- [ ] Journaling feature
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

### Phase 5: Deployment 🚀
- [ ] Deploy to Vercel/Netlify
- [ ] Set up CI/CD pipeline
- [ ] Performance optimization
- [ ] SEO optimization

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code of Conduct
Please be respectful and considerate in all interactions. This project aims to support mental wellness, and we expect contributors to uphold those values.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Event & Support
- **HackNova 2025** - For providing this incredible platform
- **Buddha Institute of Technology** - Our alma mater and host institution
- **IEEE Student Branch, BIT** - Technical guidance and support
- **AKTU** - Academic support and recognition

### Technology Partners
- **Google** - For the Gemini AI API
- **React Team** - For the amazing framework
- **Tailwind Labs** - For Tailwind CSS
- **Vite Team** - For the blazing-fast build tool

### Inspiration
- All individuals struggling with mental health challenges
- Mental health professionals working tirelessly worldwide
- Open-source community for tools and inspiration

---

## 📞 Contact & Support

### Team Contact
- **Team Leader**: Priyanshu Vishwakarma
- **Email**: priyanshu.vishwakarma@example.com *(update with actual email)*

### Institution Contact
- **Buddha Institute of Technology**
- **Email**: ic@bit.ac.in
- **Phone**: +91 8874072272
- **Address**: CL-1, Sector 7, GIDA, Gorakhpur, UP 273209

### Project Links
- **GitHub Repository**: [github.com/yourusername/manomitra](https://github.com/yourusername/manomitra)
- **Live Demo**: *Coming Soon*
- **HackNova 2025**: [hacknova.bit.ac.in](https://hacknova.bit.ac.in)

---

## ⚠️ Disclaimer

**ManoMitra provides emotional support and companionship but is not a substitute for professional mental health care.**

If you or someone you know is in crisis, please contact:

### Emergency Helplines (India)
- **National Suicide Prevention Helpline**: 1-800-273-8255
- **Vandrevala Foundation**: 1860-2662-345 / 1800-2333-330
- **iCall (TISS)**: 022-25521111 / 9152987821
- **NIMHANS**: 080-46110007

### International
- **International Association for Suicide Prevention**: [iasp.info](https://www.iasp.info/resources/Crisis_Centres/)

---

## 🌟 Star Us!

If you find ManoMitra helpful, please consider giving us a ⭐ on GitHub. It helps others discover the project and motivates us to keep improving!

---

<div align="center">

**Made with ❤️ by Team Visioneers**

*Buddha Institute of Technology, Gorakhpur*

**HackNova 2025**

</div>