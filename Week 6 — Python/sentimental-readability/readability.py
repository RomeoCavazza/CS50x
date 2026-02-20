from cs50 import get_string

def main():
    # Prompt user for text
    text = get_string("Text: ")

    # Count letters, words, and sentences
    letters = count_letters(text)
    words = count_words(text)
    sentences = count_sentences(text)

    # Calculate L and S (per 100 words)
    L = (letters / words) * 100
    S = (sentences / words) * 100

    # Calculate Coleman-Liau index
    index = 0.0588 * L - 0.296 * S - 15.8

    # Round and print grade level
    grade = round(index)

    if grade >= 16:
        print("Grade 16+")
    elif grade < 1:
        print("Before Grade 1")
    else:
        print(f"Grade {grade}")


def count_letters(text):
    """Counts the number of letters in text."""
    count = 0
    for char in text:
        if char.isalpha():
            count += 1
    return count


def count_words(text):
    """Counts the number of words in text."""
    # split() handles multiple spaces and leading/trailing whitespace
    words = text.split()
    return len(words)


def count_sentences(text):
    """Counts the number of sentences in text."""
    count = 0
    for char in text:
        if char in (".", "!", "?"):
            count += 1
    return count


if __name__ == "__main__":
    main()
