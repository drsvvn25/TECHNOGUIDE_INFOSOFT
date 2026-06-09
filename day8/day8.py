# =========================================
# Day 8 - ChatGPT API Integration Project
# AI Chatbot using OpenAI API
# =========================================

import os
from openai import OpenAI

# =========================================
# Demo Responses
# =========================================

DEMO_RESPONSES = {
    "hi": "Hello! I am your AI chatbot assistant.",
    "hello": "Hi there! How can I help you today?",
    "how are you": "I am working perfectly in demo mode.",
    "what is python": "Python is a programming language used in AI, web development, and data science.",
    "what is ai": "AI stands for Artificial Intelligence.",
    "tree": "A tree is a data structure made of nodes, where each node may have children."
}

# =========================================
# Get API Key
# =========================================

def get_api_key():
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        return api_key

    print("OPENAI_API_KEY not found in environment.")
    print("If you want, type 'demo' to run without OpenAI.")
    api_key = input("Enter OpenAI API key or demo: ").strip()

    if api_key.lower() == "demo":
        return None

    if not api_key:
        print("No key entered. Running in demo mode.")
        return None

    return api_key

# =========================================
# Demo Response Function
# =========================================

def get_demo_response(user_input):
    normalized = user_input.strip().lower()
    for key, reply in DEMO_RESPONSES.items():
        if key in normalized:
            return reply
    return "This is a demo response. Your app is working, but OpenAI is not available."

# =========================================
# Chatbot Header
# =========================================

def print_header():
    print("===================================")
    print(" AI Chatbot using ChatGPT API ")
    print("===================================")
    print("Type 'exit' to stop chatbot.\n")

# =========================================
# Main Program
# =========================================

def main():
    api_key = get_api_key()
    use_demo = api_key is None

    if use_demo:
        print("\nDemo mode enabled.")
    else:
        try:
            client = OpenAI(api_key=api_key)
        except Exception as e:
            print("\nFailed to create OpenAI client:", e)
            print("Demo mode enabled.")
            use_demo = True

    print_header()

    while True:
        user_input = input("You: ")
        if user_input.strip().lower() == "exit":
            print("\nChatbot Closed Successfully.")
            break
        if not user_input.strip():
            continue

        if use_demo:
            response = get_demo_response(user_input)
            print("\nAI:", response)
            print()
            continue

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful AI assistant."},
                    {"role": "user", "content": user_input},
                ],
                temperature=0.7,
                max_tokens=200,
            )
            ai_response = response.choices[0].message.content
            print("\nAI:", ai_response)
            print()

        except Exception as e:
            error_text = str(e)
            print("\nError:", error_text)
            if "insufficient_quota" in error_text.lower() or "quota" in error_text.lower():
                print("Quota issue detected. Switching to demo mode.\n")
            elif "invalid_api_key" in error_text.lower() or "api key" in error_text.lower():
                print("Invalid API key detected. Switching to demo mode.\n")
            else:
                print("OpenAI request failed. Switching to demo mode.\n")
            use_demo = True
            response = get_demo_response(user_input)
            print("AI:", response)
            print()

# =========================================
# Run Program
# =========================================

if __name__ == "__main__":
    main()