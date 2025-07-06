// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'darker':'0 2px 5px rgba(0, 0, 0, 0.5)',
        'common-shadow':'0 0px 7px rgba(0, 0, 0, 0.2)'
      },
      fontSize:{
        'h1-size':'2.2em',
        'font-weight':'600px',
      },
      colors: {
        // Brand
        brand: {
          primary: '#2563eb',   // blue-600
          secondary: '#f59e0b', // amber-500
          accent: '#10b981',
          danger:'#fc4a4a',
          'button-bg':'rgb(23 172 232)',
          'button-hover-bg':'#1689fc',  
          'primary-background':'#ffffff',
          
             // emerald-500
        },

        // Light Theme
        light: {
          background: '#f9fafb',
           // page bg
          surface: '#ffffff',     // cards, navs
          heading: '#111827',     // gray-900
          text: '#374151',        // gray-700
          subtext: '#6b7280',     // gray-500
          input: '#ffffff',
          inputText: '#111827',
          border: '#e5e7eb',
          tableHead: '#f3f4f6',   // gray-100
        },

        // Dark Theme
        dark: {
          background: '#111827',
          surface: '#1f2937',
          heading: '#f9fafb',
          text: '#d1d5db',        // gray-300
          subtext: '#9ca3af',
          input: '#1f2937',
          inputText: '#f9fafb',
          border: '#374151',
          tableHead: '#1f2937',
        },
      },
  },
},
  plugins: [],
};
