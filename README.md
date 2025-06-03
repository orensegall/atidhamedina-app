# atidhamedina-app

This repository contains a small command line application that offers supportive
messages and a basic future planning exercise. The goal is to help users
reflect on their feelings and consider steps toward personal goals.

## Disclaimer
The application is not a substitute for professional mental health advice. If you are experiencing severe emotional distress, please consult a qualified professional.

## Usage
Run the app with Python 3. Choose a mode using the optional `--mode` flag:

```bash
python3 app.py --mode support  # for supportive chat (default)
python3 app.py --mode plan     # for the future planning exercise
```

In support mode, type how you are feeling to receive a supportive suggestion.
Type `quit` to exit.

In plan mode, the program will prompt you with questions about your future goal
and summarize your responses.
