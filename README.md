# My React App
 Study Planner Application. This application helps you to plan your study schedule and manage your tasks effectively. It allows you to add/edit/delete tasks, set due dates, and track your progress. 

## 🚀 Features

- React 18
- React Router v7
- LocalStorage integration
- Functional components with Hooks
- Clean folder structure
- Node 22

## 📦 Tech Stack

- React
- Vite
- JavaScript
- CSS / Tailwind

## 🛠️ Setup Instructions

### 1. Clone the repository 
git clone https://github.com/NandhakumarUdayasuryan/study-planner.git
cd study-planner

> **Note:** Clone the server repository and set it up before running the client application.
	git clone https://github.com/NandhakumarUdayasuryan/study-planner-server.git
	cd study-planner-server
	See README.md file to more instructions... then update the BaseURL url in the Constants.jsx file

### 2. Install dependencies

- Run the following command in the project directory to install all required packages:

```bash
npm install
```

- App will run at http://localhost:3000 or 5173 depending on the tool.

```bash
npm run dev
```
- folder structure

```
src/
├── assest/*.png|*.svg
├──-├ pages/
	├── Header.jsx
	├── Dashboard.jsx
	├── AddTask.jsx
	├── Setting.jsx
├── components/
	├── TaskCard.jsx
├── contexts/
	├── AlertContext.jsx
├── utils/
	├── Constants.jsx
├── App.jsx
├── App.css
├── main.jsx
├── index.js
├── index.css
index.html
public/*.fav

```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
