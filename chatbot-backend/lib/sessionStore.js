/**
 * Session Store — In-memory conversation history per visitor
 *
 * Each session stores:
 *   - messages[]     Full OpenAI message history
 *   - createdAt      When the session started
 *   - lastActiveAt   When the last message was sent
 *   - metadata       Optional visitor info (name, phone, etc.)
 *
 * Sessions are automatically cleaned up after SESSION_TTL_MS of inactivity.
 */

const SESSION_TTL = parseInt(process.env.SESSION_TTL_MS, 10) || 30 * 60 * 1000; // 30 min default
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Run cleanup every 5 min

class SessionStore {
  constructor() {
    this.sessions = new Map();

    // Periodic cleanup of stale sessions
    this._cleanupTimer = setInterval(() => this._cleanup(), CLEANUP_INTERVAL);
    // Allow Node to exit even if timer is running
    if (this._cleanupTimer.unref) this._cleanupTimer.unref();
  }

  /**
   * Get or create a session by ID.
   * @param {string} sessionId
   * @returns {{ messages: Array, createdAt: number, lastActiveAt: number, metadata: object }}
   */
  get(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        messages: [],
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
        metadata: {},
      });
    }

    const session = this.sessions.get(sessionId);
    session.lastActiveAt = Date.now();
    return session;
  }

  /**
   * Check if a session exists.
   * @param {string} sessionId
   * @returns {boolean}
   */
  has(sessionId) {
    return this.sessions.has(sessionId);
  }

  /**
   * Add a message to the session history.
   * @param {string} sessionId
   * @param {'user'|'assistant'} role
   * @param {string} content
   */
  addMessage(sessionId, role, content) {
    const session = this.get(sessionId);
    session.messages.push({ role, content });
    session.lastActiveAt = Date.now();
  }

  /**
   * Update session metadata (e.g., extracted name, phone).
   * @param {string} sessionId
   * @param {object} data
   */
  updateMetadata(sessionId, data) {
    const session = this.get(sessionId);
    Object.assign(session.metadata, data);
  }

  /**
   * Get full message history for a session.
   * @param {string} sessionId
   * @returns {Array<{ role: string, content: string }>}
   */
  getMessages(sessionId) {
    return this.get(sessionId).messages;
  }

  /**
   * Delete a session.
   * @param {string} sessionId
   */
  delete(sessionId) {
    this.sessions.delete(sessionId);
  }

  /**
   * Get count of active sessions.
   */
  get activeCount() {
    return this.sessions.size;
  }

  /**
   * Remove sessions inactive for longer than TTL.
   */
  _cleanup() {
    const now = Date.now();
    let cleaned = 0;

    for (const [id, session] of this.sessions) {
      if (now - session.lastActiveAt > SESSION_TTL) {
        this.sessions.delete(id);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} stale session(s). Active: ${this.sessions.size}`);
    }
  }

  /**
   * Stop the cleanup timer (for graceful shutdown).
   */
  destroy() {
    if (this._cleanupTimer) {
      clearInterval(this._cleanupTimer);
      this._cleanupTimer = null;
    }
  }
}

// Singleton
module.exports = new SessionStore();
