"use client";

/**
 * Format error messages for consistent logging
 * @param error The error object to format
 * @param context Additional context about where the error occurred
 * @returns Formatted error message
 */
export function formatErrorForLogging(error: unknown, context: string = ''): string {
    if (!error) return 'Unknown error';

    // Handle different error types
    if (error instanceof Error) {
        return `${context ? `[${context}] ` : ''}${error.name}: ${error.message}`;
    }

    if (typeof error === 'string') {
        return `${context ? `[${context}] ` : ''}${error}`;
    }

    try {
        return `${context ? `[${context}] ` : ''}${JSON.stringify(error)}`;
    } catch {
        return `${context ? `[${context}] ` : ''}[Unserializable error]`;
    }
}

/**
 * Handle Lens Protocol specific errors
 * @param error The error from Lens Protocol
 * @param fallbackMessage Default message if the error can't be parsed
 * @returns User-friendly error message
 */
export function handleLensError(error: unknown, fallbackMessage: string = "An error occurred with Lens Protocol"): string {
    // If it's a string, return directly
    if (typeof error === 'string') {
        return error;
    }

    // Try to extract meaningful information from the error object
    try {
        if (error instanceof Error) {
            // Common Lens error patterns
            if (error.message.includes('invalid signature')) {
                return 'The transaction signature was invalid. Please try again.';
            }

            if (error.message.includes('insufficient funds')) {
                return 'You don\'t have enough funds to complete this transaction.';
            }

            if (error.message.includes('user rejected')) {
                return 'Transaction was rejected in your wallet.';
            }

            // Return the error message directly if it exists
            return error.message || fallbackMessage;
        }

        // Handle object-type errors
        if (error && typeof error === 'object') {
            // @ts-ignore - we're being dynamic here
            if (error.reason) return error.reason;
            // @ts-ignore
            if (error.message) return error.message;
        }

        return fallbackMessage;
    } catch {
        return fallbackMessage;
    }
}

/**
 * Simplified helper to determine if an error is a user rejection
 * @param error The error to check
 * @returns True if the error was caused by user rejecting a transaction
 */
export function isUserRejection(error: unknown): boolean {
    if (!error) return false;

    const errorStr = typeof error === 'string'
        ? error
        : error instanceof Error
            ? error.message
            : JSON.stringify(error);

    return errorStr.includes('user rejected') ||
        errorStr.includes('user denied') ||
        errorStr.includes('rejected transaction');
}
