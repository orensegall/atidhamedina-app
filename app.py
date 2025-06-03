import json
import random

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

def main() -> None:
    bot = SocialSupportBot("support_data.json")
    print("Welcome to the Social Support Bot.\n")
    print("This tool provides general supportive suggestions based on research.\n" +
          "It is not a substitute for professional mental health care.\n")

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

if __name__ == "__main__":
    main()
