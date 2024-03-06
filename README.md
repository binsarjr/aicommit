# aicommit

Generate AI-powered Git commit messages with Gemini.

Inspired by: https://github.com/Lapeyus/aicommit

## What it does

`aicommit` helps you create informative and clear commit messages by utilizing the power of AI. It analyzes your code changes and suggests a concise and descriptive message based on its findings.

## Requirements

- Bun (lightweight JavaScript runtime): https://bun.sh/
- Git (version control system)
- Gemini API Key (for accessing AI capabilities)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/binsarjr/aicommit ~/.aicommit
```

2. Obtain your Gemini API Key:

- Visit https://aistudio.google.com/app/apikey.
- Navigate to the "API Keys" section and create a new key.

## Usage

1. Set up a global Git alias (recommended):

```bash
git config --global alias.ai '!git commit -am "$(bun ~/.aicommit/index.ts --apikey <YOUR_API_KEY>)"'
```

Replace `<YOUR_API_KEY>` with your actual Gemini API key. Now, you can simply run `git ai` to commit your changes with an AI-generated message.

2. Set up a local Git alias (optional):

```bash
git config alias.ai '!git commit -am "$(bun ~/.aicommit/index.ts --apikey <YOUR_API_KEY>)"'
```

This alias will only work in the current repository.

### Additional options:

- `--language`: Specify the language of your code (default: en)
- `--diff-per-file`: Show diff for each file before committing (default: false)
- `--emoji`: Add an emoji to the commit message (default: false)

## Example usage

```bash
git add .
git ai # Generates and commits message
```

This will automatically stage your changes, utilize aicommit to generate a message based on your code and commit with that message.

> Note: Remember to replace `<YOUR_API_KEY>` with your actual API key in both alias configurations.

## How it works

We run `git diff` to grab all your latest code changes, send them to Google Gemini, and then return the AI-generated commit message.

## License

MIT
