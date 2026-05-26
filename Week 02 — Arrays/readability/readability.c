#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

int count_letters(string text);
int count_words(string text);
int count_sentences(string text);

int main(void)
{
    // Prompt the user for some text
    string text = get_string("Text: ");

    // Count the number of letters, words, and sentences in the text
    int letters = count_letters(text);
    int words = count_words(text);
    int sentences = count_sentences(text);

    // Compute the Coleman-Liau index
    float L = (float) letters / words * 100;
    float S = (float) sentences / words * 100;

    // Calculate the index
    float index = 0.0588 * L - 0.296 * S - 15.8;

    // Round to nearest int
    int grade = (int) round(index);

    // Print the grade level
    if (grade >= 16)
    {
        printf("Grade 16+\n");
    }
    else if (grade < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %i\n", grade);
    }
}

int count_letters(string text)
{
    // Keep track of the letters
    int count = 0;

    // Return the number of letters in text
    for (size_t i = 0; i < strlen(text); i++)
    {
        if (isalpha(text[i]))
        {
            count++;
        }
    }
    return count;
}

int count_words(string text)
{
    // Keep track of the words
    int count = 0;
    bool in_word = false;

    // Return the number of words in text
    for (size_t i = 0; i < strlen(text); i++)
    {
        if (text[i] != ' ')
        {
            if (!in_word)
            {
                count++;
                in_word = true;
            }
        }
        else
        {
            in_word = false;
        }
    }
    return count;
}

int count_sentences(string text)
{
    // Keep track of the sentences
    int count = 0;

    // Return the number of sentences in text
    for (size_t i = 0; i < strlen(text); i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            count++;
        }
    }
    return count;
}
