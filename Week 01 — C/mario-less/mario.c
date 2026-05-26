#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // Prompt user for height and validate input
    int n;
    do
    {
        n = get_int("Height: ");
    }
    while (n < 1);

    // Print a right-aligned pyramid
    for (int i = 0; i < n; i++)
    {
        // Print spaces before the hashes
        for (int j = 0; j < n - i - 1; j++)
        {
            printf(" ");
        }
        // Print hashes for the current row
        for (int j = 0; j <= i; j++)
        {
            printf("#");
        }
        // Move to next line
        printf("\n");
    }
}
