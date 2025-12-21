Contact CRM

Contact CRM is a single-page web application built with Angular that allows users to create, manage, and organize contact profiles.

Each contact can be assigned to a custom label, marked as favorite, and easily searched through a dynamic search bar with real-time suggestions.
The application is built with a clean component / service architecture and communicates with a Node.js REST API for persistent data storage.

The project is Docker-ready and designed to be easily deployable in a production environment.

⸻

Features
	•	Create, edit, delete contacts
	•	Assign contacts to custom labels
	•	Favorites management
	•	Real-time search (contacts & labels)
	•	Filter contacts by label
	•	Responsive UI
	•	Persistent data storage (SQLite)
	•	REST API backend
	•	Docker-ready setup

⸻

Tech Stack

Frontend
	•	Angular
	•	TypeScript
	•	Reactive Forms
	•	RxJS

Backend
	•	Node.js
	•	Express
	•	SQLite (better-sqlite3)
	•	REST API

DevOps
	•	Docker
	•	Docker Compose
	•	Nginx (production-ready frontend)


start angular:
ng serve

Run with Docker

docker build -t contact-crm .
docker run -p 8080:80 contact-crm

Then open: http://localhost:8081