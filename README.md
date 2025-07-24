# Laldli Palace Guest House Website

A modern, responsive website for Laldli Palace Guest House featuring a beautiful photo gallery with upload functionality, room booking information, and contact forms.

## Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Photo Gallery**: Interactive gallery with modal view and navigation
- **Photo Upload**: Drag-and-drop photo upload functionality for guests
- **Room Information**: Detailed room descriptions with pricing
- **Contact Forms**: Integrated contact and booking inquiry forms
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Performance Optimized**: Fast loading with image optimization

## Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Custom properties, Flexbox, Grid, and animations
- **JavaScript**: Vanilla ES6+ for interactive functionality
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Playfair Display and Inter typography

## Project Structure

```
ladlipalce/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css            # Main stylesheet
│   └── gallery.css         # Gallery-specific styles
├── scripts/
│   ├── main.js             # Main JavaScript functionality
│   └── gallery.js          # Gallery and upload functionality
├── images/
│   └── gallery/            # Gallery images directory
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Setup and Installation

1. **Clone or download** the project files
2. **Open** the project folder in VS Code
3. **Install Live Server extension** (recommended for development)
4. **Set up email functionality** (see Email Setup section below)
5. **Right-click** on `index.html` and select "Open with Live Server"

## Email Setup for Contact Form

The contact form is configured to use Formspree for email delivery. To receive emails:

### **Step 1: Create Formspree Account**
1. Go to [formspree.io](https://formspree.io)
2. Sign up with your email: `ladlipalace.barsana@gmail.com`
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)

### **Step 2: Update Form Action**
1. Open `index.html`
2. Find the contact form (around line 350)
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID
4. Example: `action="https://formspree.io/f/xyzabc123"`

### **Step 3: Test the Form**
1. Submit a test message through your website
2. Check your Gmail inbox for the email
3. Verify emails are being received properly

### Alternative Email Solutions:
- **Netlify Forms**: If hosting on Netlify (free tier available)
- **EmailJS**: Client-side email service
- **Custom Backend**: PHP, Node.js, or Python backend

### Alternative Setup Methods

#### Using Python (if installed):
```bash
cd ladlipalce
python -m http.server 8000
```
Then open http://localhost:8000

#### Using Node.js (if installed):
```bash
cd ladlipalce
npx http-server -p 8000
```
Then open http://localhost:8000

## Features Overview

### 🏰 Guest House Information
- Hero section with compelling visuals
- About section with heritage information
- Room details with pricing and amenities
- Service and amenity listings

### 📸 Photo Gallery
- Responsive grid layout
- Modal view with keyboard navigation
- Drag-and-drop photo upload
- Image compression and validation
- User-uploaded photos integration

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly navigation
- Optimized images for all screen sizes

### 📝 Contact & Booking
- Contact information display
- Inquiry form with validation
- Booking button integration
- Social media links

## Customization

### Colors
The website uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #8B4513;    /* Brown */
    --secondary-color: #DAA520;  /* Gold */
    --accent-color: #CD853F;     /* Sandy Brown */
    --text-dark: #2C2C2C;        /* Dark Gray */
    --text-light: #666666;       /* Light Gray */
}
```

### Images
Replace placeholder images in the `images/` directory:
- `hero-bg.jpg` - Hero section background
- `palace-exterior.jpg` - About section image
- `deluxe-room.jpg` - Deluxe room image
- `suite-room.jpg` - Suite room image
- `family-room.jpg` - Family room image
- Add gallery images to `images/gallery/`

### Content
Update the following in `index.html`:
- Guest house name and description
- Room details and pricing
- Contact information
- Social media links
- Address and location details

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Image Optimization**: Automatic compression for uploads
- **Lazy Loading**: Images load as needed
- **CSS Optimization**: Efficient selectors and minimal reflow
- **JavaScript Optimization**: Event delegation and debouncing
- **Progressive Enhancement**: Works without JavaScript

## Development

### Adding New Sections
1. Add HTML structure to `index.html`
2. Style with CSS in `styles/main.css`
3. Add JavaScript functionality in `scripts/main.js`

### Modifying Gallery
- Gallery styles: `styles/gallery.css`
- Gallery functionality: `scripts/gallery.js`
- Add images to `images/gallery/` directory

### Customizing Forms
- Form validation is handled in `scripts/main.js`
- Styles can be modified in `styles/main.css`
- Backend integration requires server-side development

## Deployment

This is a static website that can be deployed to:
- **GitHub Pages**: Push to GitHub and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **Traditional Web Hosting**: Upload files via FTP

### Quick Deploy to GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to repository Settings > Pages
4. Select source branch and save

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact:
- Email: ladlipalace.barsana@gmail.com
- Phone: +91 88518 69322

---

**Note**: This website includes placeholder images and sample content. Replace with actual guest house information and high-quality images before deployment.
