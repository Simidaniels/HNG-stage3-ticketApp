# HNG stage 2 Task

# Building Ticket App with React

Ticket Management Web Application (React.js)

This version of the Ticket Management Web Application was developed using React.js.
It provides a complete frontend experience — from user authentication to ticket creation, viewing, editing, and deletion — with a consistent and responsive interface.

The project begins with a welcoming landing page, leading users to either login or get started. The landing screen is designed with a wavy SVG background, soft shadows, and decorative circles to create a professional yet friendly visual identity. The entire layout is centered with a maximum width of 1440px, ensuring readability and visual balance on larger displays.

Once users sign up or log in, they are directed to the Dashboard, which displays summary statistics — such as the total number of tickets, open tickets, and resolved tickets. From the dashboard, users can navigate to the Ticket Management section, where all CRUD operations are implemented.

The React app simulates authentication using localStorage, storing a key named ticketapp_session. Access to the Dashboard and Ticket Management pages is restricted; if no valid session exists, the user is redirected back to the Login screen.

Forms in this app are powered by React Hook Form and Yup for validation. Inline error messages and toast notifications provide instant feedback, helping users correct errors without confusion. Notifications and alerts are handled by React Toastify, ensuring consistency across pages.
