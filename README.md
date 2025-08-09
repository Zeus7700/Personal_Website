# Zach Rempell - Personal Website

A modern, minimalist personal website built with Next.js, featuring a clean design with dark/light theme support.

## 🌟 Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Theme** - Automatic theme switching with smooth transitions
- **Modern Typography** - Clean, readable fonts with careful spacing
- **Blog Support** - Markdown-based blog posts with RSS feed
- **Fast Performance** - Built with Next.js App Router for optimal loading
- **SEO Optimized** - Proper meta tags and structured data
- **Accessible** - WCAG compliant with semantic HTML

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with CSS Variables
- **Content:** Markdown with custom processing
- **Deployment:** [Vercel](https://vercel.com/)
- **Typography:** Satoshi Variable font family

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/            # Main site pages
│   │   ├── blog/          # Blog pages and posts
│   │   ├── contact/       # Contact page
│   │   └── currently/     # Currently page
│   ├── api/               # API routes (RSS feed)
│   └── globals.css        # Global styles and CSS variables
├── components/            # Reusable React components
│   ├── container.tsx      # Layout container
│   ├── external-link.tsx  # External link component
│   ├── footer.tsx         # Site footer
│   ├── header.tsx         # Site header
│   ├── page-nav.tsx       # Navigation component
│   ├── prose.tsx          # Markdown content wrapper
│   └── theme-toggle.tsx   # Dark/light theme switcher
├── lib/                   # Utility functions
│   ├── content.ts         # Markdown processing
│   ├── posts.ts           # Blog post utilities
│   └── theme-context.tsx  # Theme context provider
└── content/               # Markdown content files
    ├── about.md           # About page content
    ├── contact.md         # Contact page content
    └── currently.md       # Currently page content
```

## 🎨 Design System

The site uses a carefully crafted design system with:

- **CSS Variables** for consistent theming across light/dark modes
- **Accent Colors** that adapt to the current theme
- **Consistent Hover States** using `--accent-hover` variable
- **Smooth Transitions** for theme changes and interactions
- **Semantic Color Naming** for maintainable styling

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zeus7700/Personal_Website.git
   cd Personal_Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/posts/`
2. Add frontmatter with title, date, and description
3. The post will automatically appear in the blog section

### Updating Pages

- Edit markdown files in the `content/` directory
- Changes are automatically reflected on the site

## 🚀 Deployment

This site is deployed on Vercel with automatic deployments from the main branch.

### Deploy Your Own

1. Fork this repository
2. Connect your fork to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Zeus7700/Personal_Website)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal website, suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

---

Built with ❤️ by [Zach Rempell](https://github.com/Zeus7700)
