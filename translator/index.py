from googletrans import Translator, LANGUAGES

def main():
    print("=== Language Translator by InstaLingo ===\n")

    # Display supported languages
    print("Supported Languages:")
    for lang_code, lang_name in LANGUAGES.items():
        print(f"{lang_code}: {lang_name}")
    
    # Get user input
    text = input("\nEnter the text to translate:\n").strip()
    if not text:
        print("No text entered. Exiting.")
        return

    dest = input("\nEnter the destination language code (e.g., 'fr' for French, 'es' for Spanish): ").strip().lower()
    if dest not in LANGUAGES:
        print("Invalid language code. Please try again.")
        return

    # Perform translation
    translator = Translator()
    try:
        translated = translator.translate(text=text, dest=dest)
        print("\n=== Translated Text ===")
        print(translated.text)
    except Exception as e:
        print(f"\nAn error occurred during translation: {e}")

if __name__ == "__main__":
    main()




