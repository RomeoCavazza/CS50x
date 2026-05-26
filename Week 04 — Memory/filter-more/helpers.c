#include <math.h>

#include "helpers.h"

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width]) {
  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      int avg = round(
          (image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) /
          3.0);
      image[i][j].rgbtRed = avg;
      image[i][j].rgbtGreen = avg;
      image[i][j].rgbtBlue = avg;
    }
  }
  return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width]) {
  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width / 2; j++) {
      RGBTRIPLE temp = image[i][j];
      image[i][j] = image[i][width - 1 - j];
      image[i][width - 1 - j] = temp;
    }
  }
  return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width]) {
  RGBTRIPLE copy[height][width];
  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      copy[i][j] = image[i][j];
    }
  }

  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      int totalRed = 0, totalGreen = 0, totalBlue = 0;
      int count = 0;

      for (int di = -1; di <= 1; di++) {
        for (int dj = -1; dj <= 1; dj++) {
          int ni = i + di;
          int nj = j + dj;

          if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
            totalRed += copy[ni][nj].rgbtRed;
            totalGreen += copy[ni][nj].rgbtGreen;
            totalBlue += copy[ni][nj].rgbtBlue;
            count++;
          }
        }
      }

      image[i][j].rgbtRed = round((float)totalRed / count);
      image[i][j].rgbtGreen = round((float)totalGreen / count);
      image[i][j].rgbtBlue = round((float)totalBlue / count);
    }
  }
  return;
}

// Cap value at 255
int cap(int value) { return value > 255 ? 255 : value; }

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width]) {
  RGBTRIPLE copy[height][width];
  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      copy[i][j] = image[i][j];
    }
  }

  // Sobel kernels
  int Gx_kernel[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
  int Gy_kernel[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};

  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      int GxRed = 0, GxGreen = 0, GxBlue = 0;
      int GyRed = 0, GyGreen = 0, GyBlue = 0;

      // Apply 3x3 kernel
      for (int di = -1; di <= 1; di++) {
        for (int dj = -1; dj <= 1; dj++) {
          int ni = i + di;
          int nj = j + dj;

          // Treat pixels beyond edge as black (0, 0, 0)
          if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
            int ki = di + 1;
            int kj = dj + 1;

            GxRed += copy[ni][nj].rgbtRed * Gx_kernel[ki][kj];
            GxGreen += copy[ni][nj].rgbtGreen * Gx_kernel[ki][kj];
            GxBlue += copy[ni][nj].rgbtBlue * Gx_kernel[ki][kj];

            GyRed += copy[ni][nj].rgbtRed * Gy_kernel[ki][kj];
            GyGreen += copy[ni][nj].rgbtGreen * Gy_kernel[ki][kj];
            GyBlue += copy[ni][nj].rgbtBlue * Gy_kernel[ki][kj];
          }
        }
      }

      // Combine Gx and Gy: sqrt(Gx^2 + Gy^2), capped at 255
      image[i][j].rgbtRed = cap(round(sqrt(GxRed * GxRed + GyRed * GyRed)));
      image[i][j].rgbtGreen =
          cap(round(sqrt(GxGreen * GxGreen + GyGreen * GyGreen)));
      image[i][j].rgbtBlue =
          cap(round(sqrt(GxBlue * GxBlue + GyBlue * GyBlue)));
    }
  }
  return;
}
