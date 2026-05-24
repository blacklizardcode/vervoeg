# Vervoeg - French Verb Conjugation Trainer

A web-based interactive tool for practicing French verb conjugations. Select your desired verbs and tenses, then test your knowledge with an interactive trainer that provides immediate feedback.

## Features

- **Interactive Selector**: Choose which tenses and verbs to practice
  - 6 major French tenses (present, imparfait, futur simple, passé composé, conditionnel présent, subjonctif présent)
  - Filter by regular or irregular verbs
  
- **Real-time Trainer**: Practice conjugations with immediate validation
  - Shows the verb and tense being tested
  - Displays the subject pronoun (je, tu, il/elle, etc.)
  - Provides helpful hints and feedback messages
  
- **Comprehensive Verb Database**: Includes major regular and irregular French verbs with full conjugations across multiple tenses

## Project Structure

```
├── index.html          # Verb and tense selector interface
├── trainer.html        # Main trainer/quiz interface
├── selector.js         # Logic for populating the selector
├── trainer.js          # Logic for the training mode and validation
├── verbs.json          # French verb database with conjugations
├── styles.css          # Styling for both interfaces
├── license.md          # Project license
└── readme.md           # This file
```

## Getting Started

### Quick Start

Open `index.html` directly in your browser to start using the trainer immediately.

### Local Development Server

If you need to serve the files over HTTP (for some browser features), you can use any local web server. For example:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

Then open `http://localhost:8000` (or the port shown) in your browser.

## How to Use

1. **Select Your Verbs and Tenses**
   - Check the tenses you want to practice
   - Choose which verbs to include (regular, irregular, or both)
   - Click "Done" to start the trainer

2. **Practice Conjugations**
   - The trainer will display a verb and tense
   - Type the correct conjugation for the given subject pronoun
   - Click "Controleer" (Dutch for "check") to verify your answer
   - Use "Help" for hints if needed

## Verb Database

The `verbs.json` file contains:
- **Metadata**: Language, description, and available tenses
- **Verbs**: A collection of French verbs with:
  - Infinitive form
  - English translation
  - Verb group (regular/irregular)
  - Full conjugations for each tense and subject pronoun

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Go (simple HTTP file server)
- **Data Format**: JSON

## Browser Compatibility

Works on all modern browsers that support:
- ES6+ JavaScript (async/await)
- CSS Grid and Flexbox
- Fetch API

## Development

### Adding New Verbs

Edit `verbs.json` to add new verbs with their conjugations. Follow the existing format:

```json
{
  "infinitive": "verb-name",
  "english": "English translation",
  "group": "regular|irregular",
  "conjugations": {
    "tense-name": {
      "subject-pronoun": "conjugated-form",
      ...
    }
  }
}
```

### Styling

Customize the appearance by editing `styles.css`. Key classes:
- `.message`, `.messageRed`, `.messageYellow`, `.messageGreen` - Feedback messages
- `.button` - Button styling
- `.textinput` - Input field styling
- `.chip` - Verb/tense display styling

## License

See [license.md](license.md) for licensing information.
