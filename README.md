# 🐑 KessabPro Mobile App

KessabPro is a React Native app designed to help farmers efficiently manage livestock transactions. This app enables farmers to list their animals, track sales, and provide quick access to animal details using QR codes.

**Note:** This is a beta version of the app with some features still under development.

## 📱 Features

- **Farmer Interface**:
  - Login access for farmers.
  - Add, update, and manage animals with CRUD operations (including image uploads).
  - Track sales and payment statuses, viewing the buyer and animal status.
  - Add logs for medical and activity tracking.
  - Create sales by selecting animals, choosing or adding buyers, specifying quantities, and entering amounts (supports multiple transactions).
  - View all sales and associated transactions.
  - Search for animals and sales efficiently.
  - **QR Scanner**: Scan QR codes for quick access to animal and sale details.
  - **Weather Widget**: Display current weather conditions.
  - **Marketplace Button**: A placeholder for future marketplace functionality (not yet implemented).
  - **Inventory & Food Management**: Features planned for future versions.

- **Offline Mode**:
  - Manage data offline and sync when reconnected.

---

## 🛠 Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Spring Boot with JPA
- **Database**: MySQL
- **Styling**: Dripsy

---

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

---

### Notes

- Ensure you have **Node.js**, **npm**, **Expo CLI**, **Java (17+)**, and **Maven** installed on your machine.
- Update the environment variables for the backend and frontend as needed.

## 📚 Project Structure

```plaintext
kessab-pro/
├── mobile/           # React Native (Expo) app
├── backend/          # Spring Boot backend
├── web/           # React web app 
└── README.md         # Project overview
```

---

## 🌟 Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

For questions or collaboration:
- **Email**: 
    - zouhairfgra@gmail.com
    - lahbouch.dev@gmail.com
- **GitHub**: 
    - [zouhairfgra](https://github.com/zouhairfgra)
    - [lahbouch](https://github.com/lahbouch)

---

## 🌐 Landing Page

In addition to the mobile app, we have created a landing page in the `client` folder that showcases the features of KessabPro and provides potential users with information about the app. This landing page serves as a promotional tool to encourage farmers to download and use the app.

---

### 📦 Dependencies

- **Expo CLI**: Development environment for React Native.
- **React Navigation**: Navigation between screens.
- **AsyncStorage**: Offline storage for data.
- **Expo Camera**: QR code scanning.
