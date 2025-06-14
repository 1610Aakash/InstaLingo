
import random
import json
import pickle
import numpy as np
import nltk
import os

from nltk.stem import WordNetLemmatizer
from keras.models import load_model  # type: ignore

lemmatizer = WordNetLemmatizer()

intents_path = os.path.join(os.path.dirname(__file__), 'intents.json')
with open(intents_path, 'r') as file:
    intents = json.load(file)

words = pickle.load(open(os.path.join(os.path.dirname(__file__), '..', 'chatbot', 'words.pkl'), 'rb'))
classes = pickle.load(open(os.path.join(os.path.dirname(__file__), '..', 'chatbot', 'classes.pkl'), 'rb'))
model = load_model(os.path.join(os.path.dirname(__file__), '..', 'chatbot', 'chatbot_model.h5'))

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence.lower())
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.6
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents_json):
    if not intents_list:
        return "I'm sorry, I didn't understand that."
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

def get_chatbot_response(message: str) -> str:
    intents_list = predict_class(message)
    return get_response(intents_list, intents)

# Only runs if you directly run this file (not when importing from FastAPI)
if __name__ == "__main__":
    print("GO! Bot is running!")
    while True:
        message = input("You: ")
        res = get_chatbot_response(message)
        print("Bot:", res)

