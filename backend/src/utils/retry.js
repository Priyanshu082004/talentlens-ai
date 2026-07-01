/**
 * Retry a promise-returning function when Gemini returns HTTP 503. 
 */

export async function retryGemini(fn, maxRetries = 2) {

  let delay = 2000;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {

    try {

      return await fn();

    }

    catch (error) {

      const status =
        error?.status ||
        error?.error?.code;

      const shouldRetry =
        status === 503 &&
        attempt < maxRetries;

      if (!shouldRetry) {

        throw error;

      }

      console.log(
        `Gemini busy (503). Retrying in ${delay / 1000}s...`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );

      delay *= 2;

    }

  }

}