# 🐑 kessab-pro Mobile App

kessab-pro is a React Native app designed to help farmers and buyers efficiently manage livestock transactions. This app enables farmers to list their animals, track sales, and provide buyers with quick access to animal details using QR codes.



## 📱 Features
- **Farmer Interface**:
  - Add, update, and manage animals.
  - Track sales and payment statuses.
  - View and generate QR codes for each animal.

- **Buyer Interface**:
  - Scan QR codes to view animal details.
  - Place orders and receive transaction documents.

- **Offline Mode**:
  - Manage data offline and sync when reconnected.

---

## 🛠 Tech Stack
- **Frontend**: React Native (Expo)
- **Backend**: Spring Boot
- **Database**: MySQL
- **Styling**: Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or later)
- **Expo CLI**
- **Git**


### Installation

1. Clone the repository:
   ```
    git clone https://github.com/zouhairfgra/kessab-pro.git
   cd kessab-pro
   ```

2. Set up each folder:

   #### Mobile App (React Native with Expo):
   - Navigate to the `mobile` folder:
     ```
        cd mobile
     ```
   - Install dependencies:
     ```
        npm install
     ```
   - Start the development server:
     ```
        npm start
     ```
   - Scan the QR code using the **Expo Go** app on your device.

   #### Frontend Web (React with Vite):
   - Navigate to the `client` folder:
     ```
        cd ../client
     ```
   - Install dependencies:
     ```
        npm install
     ```
   - Start the development server:
     ```
        npm run dev
     ```

   #### Backend (Spring Boot):
   - Navigate to the `backend` folder:
     ```
        cd ../backend
     ```
   - Run the Spring Boot application:
     ```
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
├── client/           # React web app 
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
- **Email**: your-email@example.com
- **GitHub**: [yourusername](https://github.com/yourusername)

---

### 📦 Dependencies
- **Expo CLI**: Development environment for React Native.
- **React Navigation**: Navigation between screens.
- **AsyncStorage**: Offline storage for data.
- **Expo Camera**: QR code scanning.
