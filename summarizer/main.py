
#abstractive text summarization (It rephrases and rewrites the content using new words and sentences.)

from transformers import pipeline

def main():
    print("=== Text Summarizer ===\n")
    
    # Get the text input from the user
    text = input("Enter the text to summarize:\n").strip()
    if not text:
        print("\nPlease enter some text to summarize.")
        return

    # Get the number of sentences from the user
    try:
        num_sentences = int(input("\nEnter the number of sentences in the summary (e.g., 3): "))
    except ValueError:
        print("Invalid number. Please enter a valid integer.")
        return

    # Load the summarization pipeline
    summarizer = pipeline("summarization")

    # Run summarization
    print("\nSummarizing...")
    summary = summarizer(
        text,
        max_length=num_sentences * 20,
        min_length=num_sentences * 10,
        do_sample=False
    )

    # Output the summary
    print("\n=== Summary ===")
    print(summary[0]['summary_text'])

if __name__ == "__main__":
    main()





#extractive text summarization ( It selects key sentences or phrases directly from the original text without changing them.)

# import tkinter as tk
# from tkinter import scrolledtext
# from heapq import nlargest
# import spacy
# from collections import Counter
# from spacy.lang.en.stop_words import STOP_WORDS
# from string import punctuation

# def summarize_text():
#     text = text_area.get("1.0", tk.END).strip()
#     num_sentences = int(num_sentences_entry.get())
    
#     if not text:
#         result_box.delete("1.0", tk.END)
#         result_box.insert(tk.END, "Please enter text to summarize.")
#         return
    
#     nlp = spacy.load('en_core_web_sm')
#     doc = nlp(text)
    
#     tokens = [token.text.lower() for token in doc if not token.is_stop and not token.is_punct and token.text != '\n']
    
#     word_freq = Counter(tokens)
#     max_freq = max(word_freq.values())
    
#     for word in word_freq.keys():
#         word_freq[word] = word_freq[word] / max_freq
    
#     sent_token = [sent.text for sent in doc.sents]
    
#     sent_score = {}
#     for sent in sent_token:
#         for word in sent.split():
#             if word.lower() in word_freq.keys():
#                 if sent not in sent_score.keys():
#                     sent_score[sent] = word_freq[word]
#                 else:
#                     sent_score[sent] += word_freq[word]
    
#     summary_sentences = nlargest(num_sentences, sent_score, key=sent_score.get)
#     summary = " ".join(summary_sentences)
    
#     result_box.delete("1.0", tk.END)
#     result_box.insert(tk.END, summary)

# # Create UI window
# root = tk.Tk()
# root.title("Text Summarizer")
# root.geometry("500x400")

# # Text input area
# text_area = scrolledtext.ScrolledText(root, width=60, height=10)
# text_area.pack(pady=10)

# # Number of sentences input
# num_sentences_label = tk.Label(root, text="Number of Sentences:")
# num_sentences_label.pack()
# num_sentences_entry = tk.Entry(root)
# num_sentences_entry.insert(0, "3")
# num_sentences_entry.pack()

# # Summarize button
# summarize_button = tk.Button(root, text="Summarize", command=summarize_text)
# summarize_button.pack(pady=10)

# # Result area
# result_box = scrolledtext.ScrolledText(root, width=60, height=5)
# result_box.pack()

# # Run the app
# root.mainloop()


