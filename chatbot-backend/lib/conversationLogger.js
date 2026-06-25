/**
 * Conversation Logger — Saves every conversation to disk as JSON files
 *
 * Each session gets its own file in the /conversations directory.
 * Files are named: {timestamp}_{sessionId}.json
 *
 * Each file contains:
 *   - sessionId
 *   - startedAt / updatedAt timestamps
 *   - messages[] (full conversation history)
 *   - metadata (visitor info if captured)
 */

const fs = require('fs');
const path = require('path');

const CONVERSATIONS_DIR = path.join(__dirname, '..', 'conversations');

// Ensure conversations directory exists
if (!fs.existsSync(CONVERSATIONS_DIR)) {
  fs.mkdirSync(CONVERSATIONS_DIR, { recursive: true });
  console.log('📁 Created conversations directory');
}

/**
 * Save a conversation to disk.
 * Creates or updates the JSON file for this session.
 *
 * @param {string} sessionId
 * @param {Array<{ role: string, content: string }>} messages
 * @param {object} metadata - Optional metadata (name, phone, etc.)
 */
function saveConversation(sessionId, messages, metadata = {}) {
  try {
    const filePath = getFilePath(sessionId);
    let data;

    // If file already exists, update it
    if (fs.existsSync(filePath)) {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      data = {
        ...existing,
        messages,
        metadata: { ...existing.metadata, ...metadata },
        updatedAt: new Date().toISOString(),
        messageCount: messages.length,
      };
    } else {
      // New conversation file
      data = {
        sessionId,
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages,
        metadata,
        messageCount: messages.length,
      };
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('❌ Failed to save conversation:', err.message);
  }
}

/**
 * Get the file path for a session.
 * Uses a consistent naming so the same session always writes to the same file.
 *
 * @param {string} sessionId
 * @returns {string}
 */
function getFilePath(sessionId) {
  // Check if a file already exists for this session
  const files = fs.readdirSync(CONVERSATIONS_DIR);
  const existing = files.find(f => f.includes(sessionId.substring(0, 8)));

  if (existing) {
    return path.join(CONVERSATIONS_DIR, existing);
  }

  // Create new filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  return path.join(CONVERSATIONS_DIR, `${timestamp}_${sessionId.substring(0, 8)}.json`);
}

/**
 * Get all saved conversations (for admin/review purposes).
 *
 * @returns {Array<object>}
 */
function getAllConversations() {
  try {
    const files = fs.readdirSync(CONVERSATIONS_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse(); // Newest first

    return files.map(file => {
      const data = JSON.parse(fs.readFileSync(path.join(CONVERSATIONS_DIR, file), 'utf-8'));
      return {
        file,
        sessionId: data.sessionId,
        startedAt: data.startedAt,
        updatedAt: data.updatedAt,
        messageCount: data.messageCount,
        metadata: data.metadata,
      };
    });
  } catch (err) {
    console.error('❌ Failed to read conversations:', err.message);
    return [];
  }
}

/**
 * Get a single conversation by session ID.
 *
 * @param {string} sessionId
 * @returns {object|null}
 */
function getConversation(sessionId) {
  try {
    const filePath = getFilePath(sessionId);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return null;
  } catch (err) {
    console.error('❌ Failed to read conversation:', err.message);
    return null;
  }
}

module.exports = { saveConversation, getAllConversations, getConversation };
