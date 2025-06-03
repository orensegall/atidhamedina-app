import json
import random
import argparse

class SocialSupportBot:
    def __init__(self, data_file: str):
        with open(data_file, "r", encoding="utf-8") as f:
            self.data = json.load(f)

    def get_response(self, text: str) -> str:
        text_lower = text.lower()
        for keyword, messages in self.data.get("keywords", {}).items():
            if keyword in text_lower:
                return random.choice(messages)
        return random.choice(self.data.get("default", []))

def run_support() -> None:
    """Run the social support chat loop."""
    bot = SocialSupportBot("support_data.json")
    print("Welcome to the Social Support Bot.\n")
    print(
        "This tool provides general supportive suggestions based on research.\n"
        + "It is not a substitute for professional mental health care.\n"
    )

    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print()  # new line on Ctrl-D or Ctrl-C
            break
        if user_input.lower() in {"quit", "exit"}:
            break
        if user_input:
            response = bot.get_response(user_input)
            print("Bot:", response)
    print("Take care! Remember to reach out to loved ones if you need support.")


def run_planner() -> None:
    """Run a simple interactive future planning session."""
    print("Welcome to the Future Planning Tool.\n")
    print(
        "This exercise can help you clarify goals and actions.\n"
        "It is not a substitute for professional career or life planning advice.\n"
    )

    goal = input("What is a future goal you would like to achieve? ").strip()
    steps = input("Name a few steps that would move you toward this goal: ").strip()
    obstacles = input("What obstacles might you face along the way? ").strip()
    first_step = input("What's one small action you can take today? ").strip()

    print("\nHere is a summary of what you shared:\n")
    print("Goal:", goal if goal else "(none)")
    print("Steps:", steps if steps else "(none)")
    print("Obstacles:", obstacles if obstacles else "(none)")
    print("First small step:", first_step if first_step else "(none)")
    print("\nConsider saving these notes and revisiting them as you make progress.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Provide social support or guidance for future planning"
    )
    parser.add_argument(
        "--mode",
        choices=["support", "plan"],
        default="support",
        help="Choose 'support' for supportive chat or 'plan' for future planning",
    )
    args = parser.parse_args()

    if args.mode == "plan":
        run_planner()
    else:
        run_support()

if __name__ == "__main__":
    main()

