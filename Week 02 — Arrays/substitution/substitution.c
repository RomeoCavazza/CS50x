#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Function prototypes
bool is_valid_key(string key);
char substitute(char c, string key);

int main(int argc, string argv[])
{
    // Check if exactly one command-line argument is provided
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    // Validate the key
    if (!is_valid_key(argv[1]))
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }

    // Prompt user for plaintext
    string plaintext = get_string("plaintext: ");

    // Print ciphertext header
    printf("ciphertext: ");

    // Encrypt and print each character
    for (int i = 0, len = strlen(plaintext); i < len; i++)
    {
        printf("%c", substitute(plaintext[i], argv[1]));
    }

    // Print newline and exit
    printf("\n");
    return 0;
}

// Validate the substitution key
bool is_valid_key(string key)
{
    int len = strlen(key);

    // Check if key has exactly 26 characters
    if (len != 26)
    {
        return false;
    }

    // Array to track which letters have been seen
    bool seen[26] = {false};

    // Check each character in the key
    for (int i = 0; i < len; i++)
    {
        // Check if character is alphabetic
        if (!isalpha(key[i]))
        {
            return false;
        }

        // Convert to uppercase for indexing (case-insensitive)
        int index = toupper(key[i]) - 'A';

        // Check if this letter has already been seen
        if (seen[index])
        {
            return false; // Duplicate letter found
        }

        // Mark this letter as seen
        seen[index] = true;
    }

    return true;
}

// Substitute a character according to the key
char substitute(char c, string key)
{
    // If character is not a letter, return it unchanged
    if (!isalpha(c))
    {
        return c;
    }

    // Determine if the character is uppercase
    bool is_upper = isupper(c);

    // Convert to uppercase for indexing
    int index = toupper(c) - 'A';

    // Get the substitution character from the key
    char substitution = key[index];

    // Preserve case
    if (is_upper)
    {
        return toupper(substitution);
    }
    else
    {
        return tolower(substitution);
    }
}

