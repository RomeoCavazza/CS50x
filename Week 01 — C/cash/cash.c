#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // Prompt user for change owed and validate input
    int cents;
    do
    {
        cents = get_int("Change owed: ");
    }
    while (cents < 0);

    // Count coins using algorithm
    int coins = 0;

    // Count 25¢
    while (cents >= 25)
    {
        cents -= 25;
        coins++;
    }

    // Count 10¢
    while (cents >= 10)
    {
        cents -= 10;
        coins++;
    }

    // Count 5¢
    while (cents >= 5)
    {
        cents -= 5;
        coins++;
    }

    // Count 1¢
    coins += cents;

    // Print total number of coins
    printf("%i\n", coins);
}
