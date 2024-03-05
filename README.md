# aicommit

inspired from https://github.com/Lapeyus/aicommit

## Requirements

- Bun
- Git
- GEMINI API KEY

## Usage

clone this repo and run the following command

```bash
git clone https://github.com/binsarjr/aicommit ~/.aicommit
```

To use this script you need to have a gemini api key and secret. You can get it from https://aistudio.google.com/app/apikey

set github alias for global

```bash
git config --global alias.ai '!git add -A && git commit -am "$(bun ~/.aicommit/index.ts --apikey <YOUR_API_KEY>)"'
```

then you can use `git ai` to commit your changes

or set github alias for local

```bash
git config alias.ai '!git add -A && git commit -am "$(bun ~/.aicommit/index.ts --apikey <YOUR_API_KEY>)"'
```

then you can use `git ai` to commit your changes

## Arguments

- `--apikey` : Your gemini api key
- `--language` : The language of the code you want to commit (default: en)
- `--diff-per-file` : The number of diff per file (default: false)
