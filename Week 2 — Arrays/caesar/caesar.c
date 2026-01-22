#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function prototypes
bool only_digits(string s);
char rotate(char c, int n);

int main(int argc, string argv[])
{
    // Check if exactly one command-line argument is provided
    if (argc != 2)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // Check if the key contains only digits
    if (!only_digits(argv[1]))
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // Convert the key to an integer
    int key = atoi(argv[1]);

    // Prompt user for plaintext
    string plaintext = get_string("plaintext:  ");

    // Print ciphertext header
    printf("ciphertext: ");

    // Encrypt and print each character
    for (int i = 0, len = strlen(plaintext); i < len; i++)
    {
        printf("%c", rotate(plaintext[i], key));
    }

    // Print newline and exit
    printf("\n");
    return 0;
}

// Check if string contains only digits
bool only_digits(string s)
{
    for (int i = 0, len = strlen(s); i < len; i++)
    {
        if (!isdigit(s[i]))
        {
            return false;
        }
    }
    return true;
}

// Rotate a character by n positions
char rotate(char c, int n)
{
    // If character is not a letter, return it unchanged
    if (!isalpha(c))
    {
        return c;
    }

    // Determine the base (A for uppercase, a for lowercase)
    char base = isupper(c) ? 'A' : 'a';

    // Convert to 0-25 range, rotate, wrap around, convert back
    int position = c - base;
    int rotated = (position + n) % 26;
    return base + rotated;
}

