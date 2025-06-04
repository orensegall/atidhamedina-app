# atidhamedina-app

A small command line tool that offers supportive messages and a short goal-planning exercise. It aims to help users reflect on feelings and outline simple steps toward a personal objective.

## Features
- **Support mode**: respond to how you feel with encouraging suggestions based on basic psychology research.
- **Plan mode**: prompts you about a future goal, steps you might take, potential obstacles, and a first small action.

## Disclaimer
This project does not provide professional mental health care or career counseling. If you need professional help, please consult a qualified practitioner.

## Requirements
- Python 3.8+ (no extra packages needed)

## Running the app
Clone the repository, switch into its directory, then run:

```bash
python3 app.py --mode support  # start supportive chat (default)
python3 app.py --mode plan     # start the future planning exercise
```

### Support mode
Type a sentence about how you feel and the program will reply with a supportive suggestion. Enter `quit` or `exit` to stop.

### Plan mode
Answer a short series of prompts:
1. Your goal
2. Steps toward that goal
3. Possible obstacles
4. One small action you can take today

The program summarizes your responses so you can reference them later.

## Example
```bash
$ python3 app.py --mode support
Welcome to the Social Support Bot.

This tool provides general supportive suggestions based on research. It is not a substitute for professional mental health care.
You: I feel lonely
Bot: Connecting with others is important. Try reaching out to a friend or loved one and share how you're feeling.
You: quit
Take care! Remember to reach out to loved ones if you need support.
```

## Repository contents
- `app.py` – the main command line application
- `support_data.json` – keyword-based supportive messages
- `README.md` – project documentation
