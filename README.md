# WhyDRS Database Front-End Revamp

![WhyDRS Logo](assets/images/WhyDRS_Logo_transparent_background.png)

## 📋 Project Overview

This branch contains a complete redesign and modernization of the front-end interface for the WhyDRS Database website. The WhyDRS Database is a comprehensive, open-source, nonprofit resource that provides information about Direct Registration Systems (DRS) for publicly traded companies.

### Current Status

This is a work in progress that significantly improves the user interface and experience of the original WhyDRS Database site. The revamp focuses on enhancing search capabilities, visual design, mobile responsiveness, and accessibility while maintaining the core database functionality.

### What is DRS?

Direct Registration puts stocks in **YOUR** name instead of your broker's — giving you true ownership of your investments. The WhyDRS Database helps investors find information about DRS for thousands of publicly traded companies.

## ✨ Front-End Improvements

- **Modern UI/UX**: Complete redesign with a clean, professional aesthetic
- **Mobile-First Responsive Design**: Optimized for all screen sizes and devices
- **Improved Search Experience**: Enhanced search functionality with better results display
- **Step-by-Step DRS Process Flow**: Clear visualization of how DRS works
- **Smooth Scrolling Navigation**: Improved internal page navigation
- **Performance Optimized**: Fast loading times and optimized assets
- **Accessibility Improvements**: Better semantic HTML and ARIA attributes

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (Vanilla)
- Responsive Design (Mobile-first approach)
- Vercel (Development deployment platform)

## 🔍 Project Structure

- `/assets` - Images and other static assets
- `/css` - Styling files
- `/js` - JavaScript functionality
- `/data` - Database files (JSON)

## 🖥️ Local Development

To run this project locally:

1. Clone the repository
   ```
   git clone https://github.com/NYTEMODEONLY/whydrs-db.git
   ```

2. Checkout the landing page revamp branch
   ```
   git checkout landing-page-revamp
   ```

3. Open the `index.html` file in your browser or use a local server

## 🔮 Future Plans

- Integration with the main WhyDRS Database website
- Enhanced data visualization components
- Additional broker guides
- Expanded search filters and sorting options

## 🤝 Contributing

Contributions to improve the WhyDRS front-end are welcome! Please feel free to submit a pull request or open an issue.

## 📄 License

This project is licensed under the Affero General Public License (AGPL) and the database is licensed under the Open Database License (ODbL).

## 📞 Contact

For questions, suggestions, or support, please contact us at hi@whydrs.org.

---

*Not your name, not your shares!*

# WhyDRS Landing Page

This is the landing page for the WhyDRS Database project.

## GitHub and Vercel Synchronization

This project is set up to maintain synchronization between GitHub and Vercel deployments.

### Automatic Deployments

When you push changes to the `landing-page-revamp` branch on GitHub, a GitHub Action will automatically deploy those changes to Vercel.

### Manual Deployment

You can use the included deployment script to push changes to both GitHub and Vercel in one command:

```bash
# Navigate to the project directory
cd landing-page/fresh-deploy

# Run the deployment script with a commit message
./deploy.sh "Your commit message here"
```

This script:
1. Commits your changes to git
2. Pushes the changes to GitHub
3. Deploys to Vercel production

### Requirements

- Git installed and configured
- Vercel CLI installed (`npm i -g vercel`)
- Proper GitHub and Vercel authentication

### Setting up GitHub Actions

To enable the GitHub-to-Vercel automatic deployments, you need to add the following secrets to your GitHub repository:

1. `VERCEL_TOKEN` - Your Vercel personal access token
2. `VERCEL_ORG_ID` - Your Vercel organization ID
3. `VERCEL_PROJECT_ID` - The Vercel project ID for this deployment

#### How to get these values:

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and follow the prompts
3. In the project directory, run `vercel link` to link to an existing project
4. Run `vercel env pull .env.local` to create a local env file with the required IDs
5. The values in this file can be used to set up your GitHub secrets

## Development

For local development, simply make changes to the HTML, CSS, and JavaScript files as needed. The site is a static site with no build process required.

## Deployment History

You can view the deployment history and status on the Vercel dashboard for this project.
