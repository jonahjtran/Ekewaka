# Ekewaka - AI-Powered Financial Planning Assistant

Ekewaka is an intelligent financial planning web application that helps users achieve their financial goals through personalized analysis and recommendations. The application combines the power of AI with financial data visualization to provide actionable insights and guidance.

## Features

- **AI-Powered Financial Analysis**: Utilizes Google's Gemini AI to provide personalized financial advice and recommendations
- **Interactive Goal Setting**: Users can input their financial goals in natural language
- **Transaction Analysis**: Analyzes spending patterns across different merchants and categories
- **Visual Data Representation**: Displays spending breakdowns through interactive pie charts and graphs
- **Real-time Chat Interface**: Engage in natural conversations about your financial goals and receive instant feedback
- **Responsive Design**: Fully responsive web interface that works across all devices

## Prerequisites

This program utilizes the following technologies:

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Google Gemini API key
- A Capital One Nessie API key (for transaction data)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_NESSIE_API_KEY=your_nessie_api_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ekewaka.git
cd ekewaka
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
ekewaka/
├── src/
│   ├── components/
│   │   ├── LandingPage.js       # Initial goal setting page
│   │   ├── ChatAnalysisPage.js  # Main chat interface with graphs
│   │   ├── context/
│   │   │   └── context.jsx      # AI context provider
│   │   └── GraphsJS.js          # Graph visualization logic
│   ├── config/
│   │   └── gemini.js            # Gemini AI configuration
│   └── App.js                   # Main application component
├── public/
└── package.json
```

## Key Features Explained

### 1. Landing Page
- Users input their financial goals in natural language
- "How it Works" modal explains the process
- Collects initial financial data for analysis

### 2. Chat Analysis Page
- Interactive chat interface with AI assistant
- Real-time financial advice and recommendations
- Visual representation of spending patterns
- Dynamic pie charts showing budget allocation

### 3. AI Integration
- Powered by Google's Gemini AI model
- Contextual understanding of financial goals
- Natural language processing for user inputs
- Personalized financial recommendations

## Technologies Used

- React.js
- Google Generative AI (Gemini)
- Capital One Nessie API
- Recharts (for data visualization)
- CSS3 for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Generative AI team for the Gemini API
- Capital One for the Nessie API
- The React.js community for excellent tools and libraries

## Support

For support, please open an issue in the GitHub repository or contact the development team.
