#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  // Check command-line arguments
  if (argc != 2) {
    printf("Usage: ./recover IMAGE\n");
    return 1;
  }

  // Open memory card
  FILE *file = fopen(argv[1], "r");
  if (file == NULL) {
    printf("Could not open file.\n");
    return 1;
  }

  // Set block size
  int BLOCK_SIZE = 512;

  // Buffer for a block of data
  uint8_t buffer[BLOCK_SIZE];

  // Track number of images found
  int count = 0;

  // File pointer for output file
  FILE *output = NULL;

  // Filename buffer (###.jpg + null terminator = 8 chars)
  char filename[8];

  // Read through memory card until end of file
  while (fread(buffer, 1, BLOCK_SIZE, file) == BLOCK_SIZE) {
    // Check for start of new JPEG
    if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff &&
        (buffer[3] & 0xf0) == 0xe0) {
      // Close previous file if open
      if (output != NULL) {
        fclose(output);
      }

      // Create new filename
      sprintf(filename, "%03i.jpg", count);

      // Open new file for writing
      output = fopen(filename, "w");
      if (output == NULL) {
        printf("Could not create output file.\n");
        return 1;
      }

      // Increment image count
      count++;
    }

    // If output file is open, write to it
    if (output != NULL) {
      fwrite(buffer, 1, BLOCK_SIZE, output);
    }
  }

  // Close remaining files
  if (output != NULL) {
    fclose(output);
  }
  fclose(file);

  return 0;
}