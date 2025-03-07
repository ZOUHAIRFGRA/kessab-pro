# 🐑 KessabPro Mobile App

KessabPro is a React Native app designed to help farmers efficiently manage livestock transactions. This app enables farmers to list their animals, track sales, and monitor transactions with a user-friendly interface.

**Note:** This is the first stable version of the app, released as a beta with core features implemented.

## 📱 Features

- **Farmer Interface**:
  - **Manage Animals**:
    - Full CRUD operations (Create, Read, Update, Delete) for animals.
    - Edit animal details, including image uploads.
  - **Activity & Medical Logs**:
    - Add and manage activity logs and medical logs for each animal to track health and events.
  - **Category Management**:
    - Create custom categories by selecting icons from the database with CRUD operations.
    - Default "Livestock" category provided on first login (read-only, cannot be edited or deleted) to kickstart the farmer’s journey.
  - **Sales Management**:
    - Create a sale by selecting an existing buyer or adding a new one, choosing pre-existing animals or adding new ones.
    - Sale summary includes agreed amount and paid amount, followed by transaction creation.
  - **Transactions**:
    - View transaction history for a specific sale or buyer.
    - Add transactions tied to a specific sale or evenly split across all sales for a buyer if no sale is specified.
    - Export sales as PDFs with a summary and QR codes for buyers, animals, and sales (scannable to redirect to corresponding screens).
  - **Dashboard**:
    - Displays farmer stats (e.g., total animals, sales, transactions) for quick insights.
  - **Profile**:
    - Manage farmer profile details.

## 🛠 Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Spring Boot with JPA
- **Database**: MySQL
- **Styling**: Dripsy
- **PDF Generation**: TBD (e.g., backend-generated or `react-native-pdf-lib`)
- **QR Code Generation**: TBD (e.g., `react-native-qrcode-svg`)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **Expo CLI**
- **Git**
- **Java (17+)**
- **Maven**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zouhairfgra/kessab-pro.git
   cd kessab-pro
   ```

2. Set up each folder:

   #### Mobile App (React Native with Expo):
   - Navigate to the `mobile` folder:
     ```bash
     cd mobile
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```
   - Scan the QR code using the **Expo Go** app on your device.

   #### Frontend Web (React with Vite):
   - Navigate to the `web` folder:
     ```bash
     cd ../web
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

   #### Backend (Spring Boot):
   - Navigate to the `backend` folder:
     ```bash
     cd ../backend
     ```
   - Run the Spring Boot application:
     ```bash
     ./mvnw spring-boot:run
     ```

### Notes

- Ensure you have **Node.js**, **npm**, **Expo CLI**, **Java (17+)**, and **Maven** installed on your machine.
- Update environment variables for the backend and frontend as needed (e.g., API endpoints, QR code redirect URLs).

## 📚 Project Structure

```plaintext
kessab-pro/
├── mobile/           # React Native (Expo) app
├── backend/          # Spring Boot backend
├── web/              # React web app 
└── README.md         # Project overview
```

## 🌟 Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

For questions or collaboration:
- **Email**: 
    - zouhairfgra@gmail.com
    - lahbouch.dev@gmail.com
- **GitHub**: 
    - [zouhairfgra](https://github.com/zouhairfgra)
    - [lahbouch](https://github.com/lahbouch)

## 🌐 Landing Page

In addition to the mobile app, we have created a landing page in the `web` folder that showcases the features of KessabPro and provides potential users with information about the app. This landing page serves as a promotional tool to encourage farmers to download and use the app.

## 📦 Dependencies

- **Expo CLI**: Development environment for React Native.
- **React Navigation**: Navigation between screens.
- **Expo Camera**: QR code scanning.
- **QR Code Libraries**: For generating QR codes (e.g., `react-native-qrcode-svg`).
- **PDF Libraries**: For exporting sales as PDFs (e.g., backend-generated or `react-native-pdf-lib`).
