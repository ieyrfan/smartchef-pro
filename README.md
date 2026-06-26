# SmartChef Pro 🍳

SmartChef Pro is a sophisticated, serverless cloud-native web application tailored to provide precise recipe management, live cost prediction, and dynamic nutritional breakdown for professional and home chefs alike.

## 🚀 Live Demo
- **Main Dashboard:** [http://smartchef-pro-frontend-xyz2026.s3-website-us-east-1.amazonaws.com/recipes](http://smartchef-pro-frontend-xyz2026.s3-website-us-east-1.amazonaws.com/recipes)
- **Admin Panel:** [http://smartchef-pro-frontend-xyz2026.s3-website-us-east-1.amazonaws.com/admin](http://smartchef-pro-frontend-xyz2026.s3-website-us-east-1.amazonaws.com/admin) *(Use an email containing 'admin' to sign up for admin rights)*

## 🌟 Features
- **Live Cost Predictor:** Automatically fetches real-time market prices from official APIs (`data.gov.my` PriceCatcher, CPI, FuelPrice) to predict accurate dish costs.
- **Smart Nutritional Engine:** Calculates exact Kcal, Protein, Carbs, and Fat based on precise gram measurements of ingredients.
- **Premium Tier Access:** Secure authentication system using simple JWT that walls off premium recipes for pro users.
- **Admin Approval Workflow:** Community-submitted recipes are held in a `PENDING` state until reviewed and `APPROVED` by a site administrator.
- **Lightning Fast Search:** Real-time recipe search and filtering via AWS API Gateway and DynamoDB.

## 🏗 Architecture
SmartChef Pro runs 100% serverlessly on AWS:
- **Frontend:** Next.js (App Router) statically exported and hosted on **AWS S3**.
- **Styling:** Premium UI built with **Tailwind CSS v4** featuring glassmorphism and modern aesthetics.
- **Backend APIs:** Microservices architecture using **AWS Lambda** and **API Gateway**.
- **Database:** Fully NoSQL powered by **Amazon DynamoDB** (`Users`, `Recipes`, `PriceCache`, `NutritionalInfo`).
- **Caching:** Lambda-level caching enforces API rate limits (e.g., 4 requests/min max) without throttling user experience.

## 📁 Repository Structure
- `/frontend` - Contains the Next.js React codebase and Tailwind styling.
- `/backend` - Contains all AWS Lambda function handlers (`auth.ts`, `recipesApi.ts`, `fetchAllPrices.ts`, `calculateNutrition.ts`).

## 🛠 Local Development
To run the frontend locally:
```bash
cd frontend
npm install
npm run dev
```

*Built with passion by ieyrfan.*
