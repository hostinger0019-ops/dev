/**
 * Conversation Store
 * 
 * In-memory conversation history manager.
 * Stores chat history per phone number for multi-turn AI conversations.
 * 
 * Features:
 * - Keeps last N messages per user (context window management)
 * - Auto-expires inactive conversations after a timeout
 * - Thread-safe for single-process Node.js
 */

const MAX_MESSAGES = 20;            // Max messages to keep per conversation (user + assistant)
const EXPIRY_MS = 60 * 60 * 1000;  // 1 hour of inactivity → clear conversation

class ConversationStore {
  constructor() {
    /** @type {Map<string, { messages: Array<{role: string, content: string}>, lastActivity: number }>} */
    this.conversations = new Map();

    // Cleanup expired conversations every 10 minutes
    this._cleanupInterval = setInterval(() => this._cleanup(), 10 * 60 * 1000);
  }

  /**
   * Get the conversation history for a phone number.
   * Returns an empty array if no history exists.
   * @param {string} phoneNumber 
   * @returns {Array<{role: string, content: string}>}
   */
  getHistory(phoneNumber) {
    const entry = this.conversations.get(phoneNumber);
    if (!entry) return [];
    
    // Update last activity timestamp
    entry.lastActivity = Date.now();
    return [...entry.messages];
  }

  /**
   * Add a message to the conversation history.
   * Automatically trims to MAX_MESSAGES.
   * @param {string} phoneNumber 
   * @param {'user' | 'assistant'} role 
   * @param {string} content 
   */
  addMessage(phoneNumber, role, content) {
    let entry = this.conversations.get(phoneNumber);

    if (!entry) {
      entry = { messages: [], lastActivity: Date.now() };
      this.conversations.set(phoneNumber, entry);
    }

    entry.messages.push({ role, content });
    entry.lastActivity = Date.now();

    // Trim to keep only the last MAX_MESSAGES
    if (entry.messages.length > MAX_MESSAGES) {
      entry.messages = entry.messages.slice(-MAX_MESSAGES);
    }
  }

  /**
   * Clear conversation history for a specific phone number.
   * @param {string} phoneNumber 
   */
  clearHistory(phoneNumber) {
    this.conversations.delete(phoneNumber);
  }

  /**
   * Get the number of active conversations.
   * @returns {number}
   */
  get activeCount() {
    return this.conversations.size;
  }

  /**
   * Remove expired conversations (inactive for EXPIRY_MS).
   * @private
   */
  _cleanup() {
    const now = Date.now();
    let cleaned = 0;

    for (const [phone, entry] of this.conversations) {
      if (now - entry.lastActivity > EXPIRY_MS) {
        this.conversations.delete(phone);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired conversation(s). Active: ${this.conversations.size}`);
    }
  }

  /**
   * Graceful shutdown — clear the cleanup interval.
   */
  destroy() {
    if (this._cleanupInterval) {
      clearInterval(this._cleanupInterval);
    }
  }
}

// Export a singleton instance
module.exports = new ConversationStore();
