# SvelteKit E-book Landing Page Setup and Run Guide
This document details the essential steps to set up and run the "E-book Landing Page" application. Developed with SvelteKit, it integrates Stripe for payments and Nodemailer (with Ethereal Email for testing) for email sending. This guide provides a comprehensive overview for any developer to quickly get the project operational.

## 1. Project Overview
The "E-book Landing Page" is a single-page web application designed for promoting and selling a digital e-book. Its core functionalities streamline the user journey from discovery to purchase confirmation.

**Key features include:**

**Marketing Sections:** Engage customers, showcasing e-book benefits, author credentials, and compelling content (headlines, imagery). Goal: inform and encourage purchase.

**A Frequently Asked Questions (FAQ) Section:** Addresses common buyer queries about content, purchase, or support. Provides clarity with expandable items, smoothing conversion.

**Purchase Functionality Integrated with Stripe Checkout:** Uses Stripe for secure transactions, redirecting users to a Stripe-hosted checkout page. Simplifies payment, handling sensitive data. Stripe webhooks notify the app upon successful payment for post-purchase actions.

**Automatic Sending of a Digital E-book (PDF) to the Customer via Email:** Critical post-purchase feature. After Stripe webhook confirmation, the app retrieves and emails the e-book as an attachment for immediate delivery. Ethereal Email simulates sends for development/testing.

## 2. Prerequisites
To ensure a smooth setup and execution, install the following software in your development environment:

**Node.js:** Version 18 or higher is crucial. It powers SvelteKit's server-side operations with modern JavaScript features and performance improvements.
`Check with: node -v`

**npm (Node Package Manager) or Yarn / pnpm:** Used to install and manage project dependencies. npm comes with Node.js; Yarn and pnpm are alternatives for faster/more efficient installations.
`Check with: npm -v (or yarn -v, pnpm -v)`

**Stripe CLI:** Essential for local webhook testing. It forwards real-time webhook events from Stripe to your local server.
`Install: https://stripe.com/docs/stripe-cli#install\`

**Git:** A version control system, indispensable for cloning the repository and managing updates.
`Check with: git --version`

## 3. Project Configuration
Follow these steps to configure your local development environment:

### 3.1. Clone the Repository
Navigate to your desired directory in the terminal and execute:

```bash
git clone <YOUR_REPOSITORY_URL>
cd ebook-landing
```

### 3.2. Install Dependencies
Inside the `ebook-landing/` directory, install all Node.js dependencies:

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

### 3.3. Configure Environment Variables
Create a `.env` file in the project root to store Stripe API keys and other sensitive variables. Crucially, add this file to your `.gitignore` to prevent accidental commits of sensitive keys.

**.env (in the project root)**

```env
STRIPE_API_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
PRICE_ID=price_YOUR_STRIPE_PRICE_ID
PUBLIC_STRIPE_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY
PUBLIC_FRONTEND_URL=http://localhost:5173
STRIPE_WEBHOOK_SECRET=whsec_YOUR_STRIPE_WEBHOOK_SECRET
```

**How to get the values:**

STRIPE_API_KEY and PUBLIC_STRIPE_KEY: Obtain from your Stripe Dashboard (Developers > API keys). Use test mode keys.

PRICE_ID: Create a product and price in your Stripe Dashboard (Products > Prices). Copy the unique price ID (e.g., `price_...`).

PUBLIC_FRONTEND_URL: Set to `http://localhost:5173\` for local development (SvelteKit's default port).

STRIPE_WEBHOOK_SECRET: Used for webhook authenticity. Get it from `stripe listen` output (next section) or manually from your Stripe Dashboard, copying the `whsec_` secret.

## 4. Running the Development Server and Stripe CLI
To test payment and email delivery, run two concurrent processes, simulating production interaction with Stripe. You will need two terminals.

### Terminal 1: Start the SvelteKit Development Server
In your first terminal, in the project root, run:

```bash
npm run dev
```

This command starts the SvelteKit development server (typically `http://localhost:5173\`), providing HMR. Console logs from SvelteKit components and server-side endpoints will appear here.

### Terminal 2: Start the Stripe CLI for Webhooks
In your second terminal, in the project root, start the Stripe CLI to forward webhook events:

```bash
stripe listen --forward-to localhost:5173/api/purchase-confirmation --events checkout.session.completed
```

**Command breakdown:**

`stripe listen` starts a listener.

`--forward-to <URL>` forwards events to your local endpoint, ensuring `checkout.session.completed` events from Stripe are processed.

`--events checkout.session.completed` filters for this specific event, keeping output focused.

**Important Considerations:**

Webhook Signing Secret: When `stripe listen` runs first, it displays:

Ready! Your webhook signing secret is 'whsec_xxxxxxxxxxxxxxxxxxxxxxxx'.

Copy this `whsec_` value into your `.env` for `STRIPE_WEBHOOK_SECRET`. This secret verifies webhook authenticity. Restart your SvelteKit server (`npm run dev`) after updating `.env`.

Testing Webhooks: With `stripe listen` active, test purchases via Stripe Checkout (using test cards) trigger `checkout.session.completed` events. These are forwarded to your SvelteKit `purchase-confirmation` endpoint. Real-time feedback appears in both terminals, showing webhook reception/forwarding and your app's `console.log`.

## 5. Testing Email Sending with Ethereal Email
This project uses Ethereal Email for testing. It's a free, temporary SMTP service that simulates email sending without actual delivery, providing a secure way to inspect email content for development.

Upon successful Stripe Checkout and webhook processing (`routes/api/purchase-confirmation/+server.js`), your SvelteKit app sends an e-book email attachment to the Ethereal Email service.

For each email successfully "sent" to Ethereal Email:

In Terminal 1 (SvelteKit server), you'll see a
`Email Preview URL: https://ethereal.email/message/xxxxx\`
This URL, automatically generated by Nodemailer, allows previewing the email.

Copy the Email Preview URL to your browser. This opens the exact email generated by your application, allowing you to inspect the subject, addresses, content (HTML/plain text), and the attached PDF file for verification.

This Ethereal Email setup provides a complete feedback loop for your email sending logic without requiring any real email credentials, domain verification, or credit card information, making it ideal for robust local development and testing.