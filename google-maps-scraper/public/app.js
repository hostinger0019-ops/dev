/* ================================================================
   Google Maps Scraper — Frontend Logic (New Places API)
   ================================================================ */

// ─── State ──────────────────────────────────────────────────────────
let allResults = [];         // all fetched results with full details
let filteredResults = [];    // results after applying active filter
let collection = [];         // accumulated results from multiple searches
let nextPageToken = null;
let activeFilter = 'all';

// ─── DOM Elements ───────────────────────────────────────────────────
const searchInput     = document.getElementById('searchQuery');
const btnSearch       = document.getElementById('btnSearch');
const btnLoadMore     = document.getElementById('btnLoadMore');
const btnFetchDetails = document.getElementById('btnFetchDetails');
const btnExportCSV    = document.getElementById('btnExportCSV');
const tableBody       = document.getElementById('tableBody');
const resultCount     = document.getElementById('resultCount');
const statFound       = document.getElementById('statFound');
const statDetailed    = document.getElementById('statDetailed');
const statusMessage   = document.getElementById('statusMessage');
const progressContainer = document.getElementById('progressContainer');
const progressFill    = document.getElementById('progressFill');
const progressText    = document.getElementById('progressText');

// ─── Filter Elements ────────────────────────────────────────────────
const filterChips = document.querySelectorAll('.filter-chip');
const countAll       = document.getElementById('countAll');
const countNoWebsite = document.getElementById('countNoWebsite');
const countNoPhone   = document.getElementById('countNoPhone');
const countHasWebsite= document.getElementById('countHasWebsite');
const countHasPhone  = document.getElementById('countHasPhone');
const countLowRating = document.getElementById('countLowRating');

// ─── Collection Elements ────────────────────────────────────────────
const btnAddToCollection  = document.getElementById('btnAddToCollection');
const btnExportCollection = document.getElementById('btnExportCollection');
const btnClearCollection  = document.getElementById('btnClearCollection');
const collectionCountEl   = document.getElementById('collectionCount');

// ─── Event Listeners ────────────────────────────────────────────────
btnSearch.addEventListener('click', handleSearch);
btnLoadMore.addEventListener('click', handleLoadMore);
btnFetchDetails.addEventListener('click', handleFetchAllDetails);
btnExportCSV.addEventListener('click', handleExportCSV);
btnAddToCollection.addEventListener('click', handleAddToCollection);
btnExportCollection.addEventListener('click', handleExportCollection);
btnClearCollection.addEventListener('click', handleClearCollection);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

// Filter chip click handlers
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    activeFilter = filter;

    // Update active state on chips
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    // Apply filter and re-render
    applyFilter();
  });
});

// ─── Search ─────────────────────────────────────────────────────────
async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    showStatus('Please enter a search query', 'error');
    return;
  }

  // Reset state
  allResults = [];
  nextPageToken = null;
  btnLoadMore.disabled = true;
  btnFetchDetails.disabled = true;
  btnExportCSV.disabled = true;
  hideProgress();

  setLoading(btnSearch, true);

  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Search failed');
    }

    if (!data.results || data.results.length === 0) {
      showStatus('No results found. Try a different search query.', 'info');
      clearTable();
      return;
    }

    allResults = data.results;
    nextPageToken = data.nextPageToken;

    applyFilter();
    updateStats();
    updateFilterCounts();

    btnLoadMore.disabled = !nextPageToken;
    btnExportCSV.disabled = false;
    btnAddToCollection.disabled = false;

    // The new API returns phone & website directly — no need for separate details call
    const withPhone = allResults.filter(r => r.phone).length;
    const noWebsite = allResults.filter(r => !r.website).length;
    showStatus(`Found ${allResults.length} businesses (${withPhone} with phone, ${noWebsite} without website). Ready to export!`, 'success');
  } catch (err) {
    showStatus(err.message, 'error');
  } finally {
    setLoading(btnSearch, false);
  }
}

// ─── Load More ──────────────────────────────────────────────────────
async function handleLoadMore() {
  if (!nextPageToken) return;

  setLoading(btnLoadMore, true);

  try {
    const query = searchInput.value.trim();
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, pageToken: nextPageToken })
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to load more results');
    }

    allResults = [...allResults, ...(data.results || [])];
    nextPageToken = data.nextPageToken;

    applyFilter();
    updateStats();
    updateFilterCounts();

    btnLoadMore.disabled = !nextPageToken;
    btnExportCSV.disabled = false;
    showStatus(`Loaded ${allResults.length} businesses total.`, 'success');
  } catch (err) {
    showStatus(err.message, 'error');
  } finally {
    setLoading(btnLoadMore, false);
  }
}

// ─── Fetch All Details (for businesses missing phone/website) ───────
async function handleFetchAllDetails() {
  const missing = allResults.filter(r => !r.phone && !r.website);
  if (missing.length === 0) {
    showStatus('All businesses already have detailed info!', 'info');
    return;
  }

  setLoading(btnFetchDetails, true);
  showProgress();

  const total = missing.length;

  for (let i = 0; i < total; i++) {
    const item = missing[i];
    try {
      const res = await fetch(`/api/details/${item.id}`);
      const detail = await res.json();

      if (res.ok) {
        // Update the item in allResults
        const idx = allResults.findIndex(r => r.id === item.id);
        if (idx !== -1) {
          allResults[idx] = { ...allResults[idx], ...detail };
        }
      }
    } catch (err) {
      // Keep existing data on error
    }

    const progress = ((i + 1) / total) * 100;
    updateProgress(progress, `Fetching details... ${i + 1} / ${total}`);
    statDetailed.textContent = i + 1;

    applyFilter();
    updateFilterCounts();

    if (i < total - 1) await delay(200);
  }

  hideProgress();
  setLoading(btnFetchDetails, false);
  btnExportCSV.disabled = false;

  showStatus(`Details updated for ${total} businesses. Ready to export!`, 'success');
}

// ─── Export CSV ─────────────────────────────────────────────────────
async function handleExportCSV() {
  if (allResults.length === 0) {
    showStatus('No data to export. Search first.', 'error');
    return;
  }

  setLoading(btnExportCSV, true);

  try {
    // Export only the currently filtered results
    const dataToExport = filteredResults.length > 0 ? filteredResults : allResults;
    const res = await fetch('/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: dataToExport })
    });

    if (!res.ok) {
      throw new Error('Failed to generate CSV');
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google_maps_data_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showStatus('CSV downloaded successfully!', 'success');
  } catch (err) {
    showStatus(err.message, 'error');
  } finally {
    setLoading(btnExportCSV, false);
  }
}

// ─── Collection Handlers ────────────────────────────────────────────
function handleAddToCollection() {
  const dataToAdd = filteredResults.length > 0 ? filteredResults : allResults;
  if (dataToAdd.length === 0) {
    showStatus('No results to add. Search first.', 'error');
    return;
  }

  // Deduplicate by name + address
  let added = 0;
  dataToAdd.forEach(item => {
    const key = (item.name + '|' + item.address).toLowerCase();
    const exists = collection.some(c => (c.name + '|' + c.address).toLowerCase() === key);
    if (!exists) {
      collection.push({ ...item });
      added++;
    }
  });

  updateCollectionCount();
  btnExportCollection.disabled = collection.length === 0;
  btnClearCollection.disabled = collection.length === 0;

  if (added > 0) {
    showStatus(`Added ${added} businesses to collection (${collection.length} total). ${added < dataToAdd.length ? `${dataToAdd.length - added} duplicates skipped.` : ''}`, 'success');
  } else {
    showStatus('All businesses already in collection (duplicates skipped).', 'info');
  }
}

async function handleExportCollection() {
  if (collection.length === 0) {
    showStatus('Collection is empty. Add results first.', 'error');
    return;
  }

  setLoading(btnExportCollection, true);

  try {
    const res = await fetch('/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: collection })
    });

    if (!res.ok) {
      throw new Error('Failed to generate CSV');
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collection_${collection.length}_businesses_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showStatus(`Collection exported! ${collection.length} businesses saved to CSV.`, 'success');
  } catch (err) {
    showStatus(err.message, 'error');
  } finally {
    setLoading(btnExportCollection, false);
  }
}

function handleClearCollection() {
  if (collection.length === 0) return;

  if (confirm(`Clear all ${collection.length} businesses from your collection?`)) {
    collection = [];
    updateCollectionCount();
    btnExportCollection.disabled = true;
    btnClearCollection.disabled = true;
    showStatus('Collection cleared.', 'info');
  }
}

function updateCollectionCount() {
  collectionCountEl.textContent = `${collection.length} business${collection.length !== 1 ? 'es' : ''}`;
}

// ─── Filter Logic ───────────────────────────────────────────────────
function applyFilter() {
  switch (activeFilter) {
    case 'no-website':
      filteredResults = allResults.filter(r => !r.website);
      break;
    case 'no-phone':
      filteredResults = allResults.filter(r => !r.phone);
      break;
    case 'has-website':
      filteredResults = allResults.filter(r => r.website);
      break;
    case 'has-phone':
      filteredResults = allResults.filter(r => r.phone);
      break;
    case 'low-rating':
      filteredResults = allResults.filter(r => r.rating && r.rating < 4);
      break;
    default:
      filteredResults = [...allResults];
  }
  renderTable(filteredResults);
}

function updateFilterCounts() {
  countAll.textContent       = allResults.length;
  countNoWebsite.textContent = allResults.filter(r => !r.website).length;
  countNoPhone.textContent   = allResults.filter(r => !r.phone).length;
  countHasWebsite.textContent= allResults.filter(r => r.website).length;
  countHasPhone.textContent  = allResults.filter(r => r.phone).length;
  countLowRating.textContent = allResults.filter(r => r.rating && r.rating < 4).length;
}

// ─── Render Table ───────────────────────────────────────────────────
function renderTable(results) {
  tableBody.innerHTML = '';
  if (results.length === 0) {
    tableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="8">
          <div class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            <p>No businesses match this filter</p>
          </div>
        </td>
      </tr>
    `;
    resultCount.textContent = '0 businesses';
    return;
  }
  results.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.classList.add('row-enter');
    tr.style.animationDelay = `${Math.min(i * 0.02, 0.5)}s`;
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHTML(item.name)}</td>
      <td>${escapeHTML(item.address)}</td>
      <td>${item.phone ? escapeHTML(item.phone) : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td>${item.website ? `<a href="${escapeHTML(item.website)}" target="_blank" rel="noopener">${truncateURL(item.website)}</a>` : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td>${renderRating(item.rating)}</td>
      <td>${item.totalReviews || '—'}</td>
      <td>${renderStatusBadge(formatStatus(item.businessStatus))}</td>
    `;
    tableBody.appendChild(tr);
  });
  resultCount.textContent = `${results.length} businesses`;
}

// ─── Helpers ────────────────────────────────────────────────────────
function renderRating(rating) {
  if (!rating) return '<span style="color:var(--text-muted)">—</span>';
  return `<span class="rating-badge">
    <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    ${rating}
  </span>`;
}

function renderStatusBadge(status) {
  if (!status) return '<span style="color:var(--text-muted)">—</span>';
  const isOpen = status.toLowerCase().includes('operational') || status.toLowerCase().includes('open');
  return `<span class="status-badge ${isOpen ? 'status-badge--open' : 'status-badge--closed'}">${status}</span>`;
}

function formatStatus(status) {
  if (!status) return '';
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function truncateURL(url) {
  try {
    const u = new URL(url);
    let host = u.hostname.replace(/^www\./, '');
    return host.length > 30 ? host.substring(0, 30) + '...' : host;
  } catch {
    return url.length > 30 ? url.substring(0, 30) + '...' : url;
  }
}

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function clearTable() {
  tableBody.innerHTML = `
    <tr class="empty-row">
      <td colspan="8">
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <p>No results found</p>
        </div>
      </td>
    </tr>
  `;
  resultCount.textContent = '0 businesses';
}

function updateStats() {
  statFound.textContent = allResults.length;
  const withDetails = allResults.filter(r => r.phone || r.website).length;
  statDetailed.textContent = withDetails;
}

function setLoading(btn, loading) {
  if (loading) {
    btn.classList.add('btn--loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('btn--loading');
    btn.disabled = false;
  }
}

function showStatus(msg, type = 'info') {
  statusMessage.textContent = msg;
  statusMessage.className = `status-message active ${type}`;
  clearTimeout(statusMessage._timeout);
  statusMessage._timeout = setTimeout(() => {
    statusMessage.classList.remove('active');
  }, 8000);
}

function showProgress() {
  progressContainer.classList.add('active');
  progressFill.style.width = '0%';
}

function updateProgress(percent, text) {
  progressFill.style.width = `${percent}%`;
  progressText.textContent = text;
}

function hideProgress() {
  progressContainer.classList.remove('active');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
