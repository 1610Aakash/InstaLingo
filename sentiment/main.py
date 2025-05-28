

from textblob import TextBlob

def analyze_sentiment(text):
    if text.strip():
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity
        if sentiment > 0:
            print(f"Positive Sentiment: {sentiment}")
        elif sentiment < 0:
            print(f"Negative Sentiment: {sentiment}")
        else:
            print("Neutral Sentiment")

if __name__ == "__main__":
    text = input("Enter text to analyze sentiment: ")
    analyze_sentiment(text)



