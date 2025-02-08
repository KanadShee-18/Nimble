# Nimble - AI-Powered Application Builder 🚀

![Nimble Banner](Images/nimble_main.png)

## 🌟 Introduction

**Nimble** is an AI-powered application builder that allows users to generate a **live preview of applications** by providing a simple prompt. It combines the power of **Next.js, NextAuth, Convex, and AI** to deliver seamless real-time collaboration and code generation.

Nimble is designed for developers, designers, and anyone looking to quickly prototype and share applications without setting up a full development environment.

---

## ✨ Features

### 1️⃣ AI-Powered App Generation

- Users can enter a simple prompt describing their application.
- Nimble generates a **live preview** instantly.
- The AI understands context and iterates on user input.

### 2️⃣ Real-Time Collaboration

- Work on the same project with multiple users.
- **Convex** enables live updates without refresh.
- Chat with **AI assistance** while building.

### 3️⃣ Code Preview & Export

- View the full **generated code** in an editor.
- Export and download code to **CodeSandbox**.
- Modify and extend the application as needed.

### 4️⃣ Seamless Authentication

- **NextAuth v5** enables secure login with:
  - Google
  - GitHub
  - Credentials (Email & Password)
- Users stay logged in across sessions.

### 5️⃣ Token-Based System for Purchases

- Users buy **tokens via PayPal** to generate or export advanced applications.
- Transparent pricing and easy transactions.

### 6️⃣ "One Deploy" Link Sharing

- Users can share a **deployable link** showcasing their app.
- No need to manually host; Nimble handles it.

### 7️⃣ Interactive Guidelines & Documentation

- A well-structured **Guidelines Page** explains how Nimble generates code.
- Step-by-step walkthroughs for new users.

---

## 🛠️ Tech Stack

Nimble is built using modern web technologies for **speed, scalability, and reliability**:

| Technology          | Purpose                                |
| ------------------- | -------------------------------------- |
| **Next.js**         | Frontend & Server-side rendering       |
| **Convex**          | Real-time backend and state management |
| **NextAuth v5**     | Authentication                         |
| **AI Model**        | Code generation and chat assistant     |
| **Tailwind CSS**    | UI styling and responsiveness          |
| **CodeSandbox API** | Code export & preview                  |
| **PayPal API**      | Token-based payment system             |

---

## 📸 Screenshots

- **Landing Page**
  ![Landing Page](Images/nimble_main.png)

- **Workspace**
  ![Workspace Page](Images/workspace-preview.png)

- **AI Chat & Code Preview**
  ![AI Chat](Images/code-with-chat.png)

- **Live Preview**
  ![Live Preview](Images/live-preview.png)

- **Pricing Page**
  ![Pricing](Images/pricing.png)

---

## 🚀 Getting Started

Follow these steps to set up Nimble on your local machine.

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/KanadShee-18/Nimble.git
cd nimble
```

### 2️⃣ Install Dependencies

```sh
yarn install  # or npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file and add:

```sh
CONVEX_DEPLOYMENT=your-convex-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
NEXT_PUBLIC_PAYPAL_CLIENT_SECRET=your-paypal-client-secret
```

and also Create a **'.env'** file and add:

```sh
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase

AUTH_SECRET=s3cr3t_k3y_f0r_auth

GOOGLE_CLIENT_ID=1234567890-abcde.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwx

GITHUB_CLIENT_ID=Iv1.abcdefghijklm
GITHUB_CLIENT_SECRET=abcdef1234567890abcdef1234567890abcdef12

NEXT_PUBLIC_BASE_URL=http://localhost:3000

MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-email-password
```

### 4️⃣ Run the Development Server

```sh
yarn dev  # or npm run dev
```

and also in another terminal run,

```sh
npx convex dev
```

- The app will be live at `http://localhost:3000`

---

## 🎯 How It Works

1. **Sign In** - Log in using Google, GitHub, or email.
2. **Enter a Prompt** - Describe the application you want to generate.
3. **Live Preview** - See the app being built in real time.
4. **Modify & Refine** - Chat with AI to tweak your app.
5. **Export or Deploy** - Download the code or share the `One Deploy` link with anyone to see the live preview.

---

## 💳 Pricing & Token System

- Free users can generate a limited number of applications.
- Free users will be provided tokens similar as base plans when they sign up for first time.
- Then they can purchase tokens via **paypal**.
- There are 4 plans by which users can buy tokens.
- Paid users purchase **tokens via PayPal** to unlock:
  - Advanced AI-powered features.
  - Unlimited code exports.
  - Priority support.

| Plan      | Tokens    | Price  |
| --------- | --------- | ------ |
| Base      | 50,000    | $4.99  |
| Starter   | 120,000   | $9.99  |
| Pro       | 2,500,000 | $19.99 |
| Unlimited | Unlimited | $49.99 |

---

## 🔒 Security & Data Privacy

- **OAuth Authentication** ensures secure logins.
- **Encrypted Tokens** for purchases & transactions.
- **No Data Storage** – Nimble does not store generated code.

---

## 📜 Roadmap

🚀 Planned Features:

- **Custom UI Components**
- **Team Workspaces**
- **AI-generated UI previews**
- **Mobile App Version**

---

## 🛠️ Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make changes and commit.
4. Open a Pull Request.

---

## 📞 Support

For help or feedback, reach out via:

- **Email**: codewizardkanad@gmail.com

---

⭐ **If you like Nimble, consider starring the repo!** ⭐
