class RateLimiter {
    constructor(rate, interval) {
        this.rate = rate || 1; // Rate limit (tokens per interval)
        this.interval = interval || 1000; // Time interval (ms)
        this.tokenCount = this.rate; // Track available tokens
        this.refillIntervalId = undefined; // Store the refill interval id
        this.refillTokens();
    }

    refillTokens() {
        // Refill tokens every interval (set a new interval to refill tokens)
        this.refillIntervalId = setInterval(() => {
            this.tokenCount = this.rate; // Reset token count to rate
        }, this.interval);
    }

    allow() {
        if (this.tokenCount > 0) {
            // If there are available tokens, allow the request and decrement token count
            this.tokenCount--;
            return true;
        }
        return false; // Deny request if no tokens are available
    }

    stop() {
        // Clear the interval if needed
        if (this.refillIntervalId) {
            clearInterval(this.refillIntervalId);
        }
    }
}

module.exports = RateLimiter;