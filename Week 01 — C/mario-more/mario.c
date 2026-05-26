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

    for (int i = 0; i < n; i++)
    {
        // Left pyramid (print spaces before hashes)
        for (int j = 0; j < n - i - 1; j++)
        {
            printf(" ");
        }
        // Left pyramid (print hashes)
        for (int j = 0; j <= i; j++)
        {
            printf("#");
        }
        // Print the double-spaces
        printf("  ");
        // Right pyramid (print hashes)
        for (int j = 0; j <= i; j++)
        {
            printf("#");
        }
        // Move to next line
        printf("\n");
    }
}
