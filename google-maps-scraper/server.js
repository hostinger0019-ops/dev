require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Text Search (New Places API) ───────────────────────────────────
app.post('/api/search', async (req, res) => {
  try {
    const { query, pageToken } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const fieldMask = [
      'places.id',
      'places.displayName',
      'places.formattedAddress',
      'places.nationalPhoneNumber',
      'places.internationalPhoneNumber',
      'places.websiteUri',
      'places.rating',
      'places.userRatingCount',
      'places.businessStatus',
      'places.googleMapsUri',
      'places.types',
      'nextPageToken'
    ].join(',');

    const body = { textQuery: query };
    if (pageToken) {
      body.pageToken = pageToken;
    }

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': fieldMask
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.error) {
      console.error('API Error:', data.error);
      return res.status(400).json({ error: data.error.message || 'API error' });
    }

    // Transform to a clean format for the frontend
    const results = (data.places || []).map(place => ({
      id: place.id || '',
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      phone: place.nationalPhoneNumber || place.internationalPhoneNumber || '',
      website: place.websiteUri || '',
      rating: place.rating || null,
      totalReviews: place.userRatingCount || null,
      businessStatus: place.businessStatus || '',
      mapsLink: place.googleMapsUri || '',
      types: place.types || []
    }));

    res.json({
      results,
      nextPageToken: data.nextPageToken || null
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

// ─── Place Details (New Places API) ─────────────────────────────────
app.get('/api/details/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const fieldMask = [
      'displayName',
      'formattedAddress',
      'nationalPhoneNumber',
      'internationalPhoneNumber',
      'websiteUri',
      'rating',
      'userRatingCount',
      'businessStatus',
      'googleMapsUri',
      'regularOpeningHours'
    ].join(',');

    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': fieldMask
      }
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message || 'API error' });
    }

    res.json({
      name: data.displayName?.text || '',
      address: data.formattedAddress || '',
      phone: data.nationalPhoneNumber || data.internationalPhoneNumber || '',
      website: data.websiteUri || '',
      rating: data.rating || null,
      totalReviews: data.userRatingCount || null,
      businessStatus: data.businessStatus || '',
      mapsLink: data.googleMapsUri || ''
    });
  } catch (err) {
    console.error('Details error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── CSV Export ─────────────────────────────────────────────────────
app.post('/api/export-csv', (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !data.length) {
      return res.status(400).json({ error: 'No data to export' });
    }

    const headers = ['Business Name', 'Address', 'Phone Number', 'Website', 'Rating', 'Total Reviews', 'Business Status'];
    const csvRows = [headers.join(',')];

    data.forEach(item => {
      const row = [
        escapeCSV(item.name || ''),
        escapeCSV(item.address || ''),
        escapeCSV(item.phone || ''),
        escapeCSV(item.website || ''),
        item.rating || '',
        item.totalReviews || '',
        escapeCSV(item.businessStatus || '')
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=google_maps_data.csv');
    res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function escapeCSV(str) {
  if (typeof str !== 'string') return str;
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// ─── Serve frontend ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Google Maps Scraper running at http://localhost:${PORT}\n`);
});
