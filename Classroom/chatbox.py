import openai

openai.api_key = "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"

def chat_with_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )
        return response.choices[0].message.content.strip()
    except openai.error.RateLimitError as e:
        return f"Error: Rate Limit Exceeded. Please check your API usage and wait for the rate limit to reset."

if __name__ == "__main__":
    print("You are a helpful assistant.")
    
    while True:
        user_input = input("You: ")

        if user_input.lower() in ["quit", "exit", "bye"]:
            break

        response = chat_with_gpt(user_input)
        print("Chatbot: ", response)