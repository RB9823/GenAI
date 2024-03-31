from openai import OpenAI
from dotenv import load_dotenv
import json


load_dotenv()
client = OpenAI()

def GenAI(sentence):
    response = client.chat.completions.create(
    model = "gpt-3.5-turbo-0125",
    temperature = 0.8,
    max_tokens = 300,
    response_format={ "type": "json_object" },
    messages = [
        {"role": "user", "content": f"what is the emotion in this text ? The text is: {sentence} I want the top 3 most probable emotion with their percentages in the following format: 'emotion' - 'percentage'"},
        {"role": "assistant", "content": "json"}
        ]
    )
    return response.choices[0].message.content
