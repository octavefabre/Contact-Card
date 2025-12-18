Contact CRM

Contact CRM is a single-page web application built with Angular that allows users to create, manage, and organize contact profiles.
Each contact can be assigned to a custom label, marked as favorite, and easily searched through a dynamic search bar with suggestions.

The application is fully developed in TypeScript, follows a clean component/service architecture, and uses localStorage for data persistence.
It is Dockerized and served in production using Nginx, making it easy to deploy and run anywhere.

Features
	•	Create, edit, delete contacts
	•	Assign contacts to custom labels
	•	Favorites management
	•	Real-time search with suggestions
	•	Responsive UI
	•	Docker-ready production build

Tech Stack
	•	Angular
	•	TypeScript
	•	Docker & Nginx
	•	LocalStorage

Run with Docker

docker build -t contact-crm .
docker run -p 8080:80 contact-crm

Then open: http://localhost:8081