#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // Prompt user for credit card number
    long number = get_long("Number: ");

    // Count the number of digits
    long temp = number;
    int digits = 0;
    while (temp > 0)
    {
        temp /= 10;
        digits++;
    }

    // Validate number of digits
    if (digits != 13 && digits != 15 && digits != 16)
    {
        printf("INVALID\n");
        return 0;
    }

    // Calculate checksum
    int sum = 0;
    temp = number;

    // Process digits from right to left
    for (int i = 0; i < digits; i++)
    {
        int digit = temp % 10;
        temp /= 10;

        if (i  % 2 == 1) // Every other digit
        {
            digit *= 2;
            sum += (digit % 10) + (digit / 10);
        }
        else // Other digits
        {
            sum += digit;
        }
    }

    // Check if checksum is valid
    if (sum % 10 != 0)
    {
        printf("INVALID\n");
        return 0;
    }

    // Determine card type based on starting digits
    long first_two = number;
    while (first_two >= 100)
    {
        first_two /= 10;
    }

    long first_one = first_two / 10;

    // Check American Express (15 digits, starts with 34 or 37)
    if (digits == 15 && (first_two == 34 || first_two == 37))
    {
        printf("AMEX\n");
    }
    // Check MasterCard (16 digits, starts with 51, 52, 53, 54, or 55)
    else if (digits == 16 && first_two >= 51 && first_two <= 55)
    {
        printf("MASTERCARD\n");
    }
    // Check Visa (13 or 16 digits, starts with 4)
    else if ((digits == 13 || digits == 16) && first_one == 4)
    {
        printf("VISA\n");
    }
    else
    {
        printf("INVALID\n");
    }
}
