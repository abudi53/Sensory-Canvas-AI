# AI Modern Art Generator - Fullstack Web Application

[[Project Demo]](https://sensory-canvas-ai.vercel.app/)

## ✨ Project Overview

**AI Modern Art Generator** is a full-stack web application that leverages the power of Artificial Intelligence to create unique and modern art pieces based on user-provided text prompts. Simply enter a prompt, and the application will generate both a visually striking image and a complementary soundscape, offering a multi-sensory artistic experience.

This project is built to showcase full-stack development skills using Next.js for the frontend and Django for the backend, demonstrating proficiency in:

- **Frontend Development:** Building a responsive and user-friendly interface with Next.js and React.
- **Backend Development:** Creating a robust REST API with Django and Django REST Framework to handle requests and manage AI model interactions.
- **AI Integration:** Integrating with external AI models for image and sound generation.
- **Asynchronous Task Handling:** Managing potentially long-running AI tasks efficiently using Celery and Redis (or similar).
- **API Communication:** Seamless communication between the frontend and backend using REST APIs.
- **Deployment:** Deploying a full-stack application to cloud platforms.

## 🚀 Key Features

- **Prompt-Based Art Generation:** Users can input any text prompt to inspire the AI art generation process.
- **Dual Output: Image and Sound:** For each prompt, the application generates both a unique image and a corresponding sound, creating a richer artistic experience.
- **Modern and Intuitive User Interface:** Clean and responsive frontend built with Next.js for a smooth user experience.
- **Scalable Backend with Django:** Robust and well-structured backend API built with Django to handle requests and AI model interactions.
- **Asynchronous Processing:** Utilizes Celery for background task processing, ensuring the application remains responsive even during AI generation.
- **User History/Gallery:** Users can view a history of their generated art pieces.
- **Responsive Design:** Application is accessible and functional across different devices (desktops, tablets, and mobile).

## 🛠️ Technologies Used

**Frontend:**

- **Next.js:** React framework for building performant and modern web applications.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS, shadcn:** For styling the application.
- **React Context:** For managing application state.
- **Axios:** For making API requests to the backend.
  **Backend:**

- **Django:** High-level Python web framework for building robust APIs.
- **Django REST Framework (DRF):** Powerful toolkit for building RESTful APIs with Django.
- **Python:** Programming language for the backend.
- **Celery:** Asynchronous task queue for handling background jobs (AI model processing).
- **Redis:** Message broker for Celery.
- **PostgreSQL:** For storing data (prompts, generated art, user data ).
- **Hugging Face Inference API:** For generating images from text prompts.
- **AI Sound Generation Model/API - in search of a free api model.:** For generating sounds from text prompts. \*
