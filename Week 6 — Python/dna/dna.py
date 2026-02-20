import csv
import sys


def main():

    # Check for command-line usage
    if len(sys.argv) != 3:
        print("Usage: python dna.py data.csv sequence.txt")
        sys.exit(1)

    # Read database file into a list of dictionaries
    database = []
    with open(sys.argv[1]) as f:
        reader = csv.DictReader(f)
        for row in reader:
            database.append(row)

    # Read DNA sequence file into a string
    with open(sys.argv[2]) as f:
        dna_sequence = f.read()

    # Find longest match of each STR in DNA sequence
    # Get STRs from the header of the CSV (all columns except 'name')
    strs = list(database[0].keys())[1:]
    
    results = {}
    for s in strs:
        results[s] = longest_match(dna_sequence, s)

    # Check database for matching profiles
    for person in database:
        match = True
        for s in strs:
            # Note: CSV values are strings, results are integers
            if int(person[s]) != results[s]:
                match = False
                break
        
        if match:
            print(person["name"])
            return

    print("No match")


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move to next potential match in sequence
        # Continue moving forward and checking for successive matches until no match is found
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1
            
            # If there is no match in the substring
            else:
                break
        
        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    return longest_run


if __name__ == "__main__":
    main()
