# recipes-manager-web-admin  
An Angular web admin interface for managing recipes, users, and logs with authentication and role-based access.

## Table of Contents  
- [Features](#features)  
- [Stack](#stack)  
- [Installation](#installation)  
  - [Prerequisites](#prerequisites)  
  - [Setup Instructions](#setup-instructions)  
- [Configuration](#configuration)  

## Features  
- User authentication with email or phone and password  
- Role-based access control for admin users  
- User management, including viewing and editing user details and roles  
- Viewing paginated application logs  
- Viewing paginated OpenAI logs with filtering by user ID  
- Responsive UI with header, footer, and navigation  
- JWT token management with HTTP interceptor for API requests  
- Built with Angular CLI and Bootstrap integration  

## Stack  
- TypeScript  
- Angular 16  
- RxJS  
- Bootstrap 5 with Bootstrap Icons  
- jQuery and Popper.js (for Bootstrap’s JS components)  
- @auth0/angular-jwt for JWT handling  
- HTTP Client for GraphQL and REST API integration  

## Installation  

### Prerequisites  
- Node.js (v18.x recommended) and npm  
- Angular CLI (v16)  

### Setup Instructions  
```bash
git clone https://github.com/Shchoholiev/recipes-manager-web-admin.git
cd recipes-manager-web-admin/recipes-manager-web-admin

# Install Angular CLI globally if not installed
npm install -g @angular/cli@16

# Install project dependencies
npm install

# Run development server
ng serve
```
Then navigate to [http://localhost:4200](http://localhost:4200) in your browser.

## Configuration  
The app uses environment files to set API URLs:

- `src/environments/environment.ts` - for development  
- `src/environments/environment.production.ts` - for production  

Example snippet from `environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://sh-recipes-manager-api-dev.azurewebsites.net'
};
```

Update `apiUrl` to point to your backend API endpoint.  

**Authentication:**  
Stores JWT tokens (`accessToken` and `refreshToken`) in localStorage after login. The JWT interceptor adds the token to API requests' Authorization header.  

**Azure Deployment:**  
A GitHub Actions workflow is configured to build and deploy to an Azure Web App named `sh-recipes-manager-admin` on pushes to the `master` branch.  

**Routing:**  
- `/login` - Login screen  
- `/main` - Admin main dashboard (protected)  
- `/logs` - Application logs (protected)  
- `/open-ai-logs` - OpenAI logs with user filtering (protected)  
- `/users` - Paginated users list (protected)  
- `/edit-user/:id` - User edit form (protected)  

**Note:**  
Use `ng build --configuration production` for production builds. The build output is in `dist/recipes-manager-web-admin/`.  
