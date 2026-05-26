// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node {
  char word[LENGTH + 1];
  struct node *next;
} node;

// Choose number of buckets in hash table
const unsigned int N = 100000;

// Hash table
node *table[N];

// Dictionary word count
unsigned int word_count = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word) {
  // Hash the word to find the bucket
  unsigned int hash_index = hash(word);

  // Traverse the linked list
  for (node *cursor = table[hash_index]; cursor != NULL;
       cursor = cursor->next) {
    // Case-insensitive comparison
    if (strcasecmp(word, cursor->word) == 0) {
      return true;
    }
  }

  return false;
}

// Hashes word to a number
// Uses djb2 hash function (case-insensitive for check compatibility)
unsigned int hash(const char *word) {
  unsigned long hash = 5381;
  int c;

  while ((c = *word++)) {
    // Convert to lowercase to ensure case-insensitivity
    hash = ((hash << 5) + hash) + tolower(c); /* hash * 33 + c */
  }

  return hash % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary) {
  // Open dictionary file
  FILE *file = fopen(dictionary, "r");
  if (file == NULL) {
    return false;
  }

  // Buffer for reading words
  char buffer[LENGTH + 1];

  // Read strings from file one at a time
  while (fscanf(file, "%s", buffer) != EOF) {
    // Allocate memory for new node
    node *n = malloc(sizeof(node));
    if (n == NULL) {
      fclose(file);
      return false;
    }

    // Copy word into node
    strcpy(n->word, buffer);

    // Hash word to obtain hash value
    unsigned int hash_index = hash(buffer);

    // Insert node into hash table at that location (prepend)
    n->next = table[hash_index];
    table[hash_index] = n;

    // Increment word count
    word_count++;
  }

  // Close dictionary file
  fclose(file);

  return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void) { return word_count; }

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void) {
  // Iterate over all buckets
  for (int i = 0; i < N; i++) {
    // Traverse linked list and free nodes
    node *cursor = table[i];
    while (cursor != NULL) {
      node *temp = cursor;
      cursor = cursor->next;
      free(temp);
    }
  }

  return true;
}
