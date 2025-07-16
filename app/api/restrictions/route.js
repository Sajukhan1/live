<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Video Restriction Manager</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 2rem;
      background: #f7f7f7;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .video-card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
    }
    .restricted {
      font-size: 0.9rem;
      color: #555;
    }
  </style>
</head>
<body>
  <h1>🎬 Video Restriction Manager</h1>
  <div id="video-list">Loading videos...</div>

  <script>
    async function loadVideos() {
      const container = document.getElementById('video-list');
      try {
        const res = await fetch('/api/restrictions');
        if (!res.ok) throw new Error('Failed to load');
        const videos = await res.json();

        if (!videos.length) {
          container.innerHTML = 'No videos found.';
          return;
        }

        container.innerHTML = '';
        videos.forEach(video => {
          const div = document.createElement('div');
          div.className = 'video-card';
          div.innerHTML = `
            <h3>${video.title}</h3>
            <p><strong>URL:</strong> <a href="${video.url}" target="_blank">${video.url}</a></p>
            <p class="restricted"><strong>Restricted Countries:</strong> ${video.restrictedCountries.join(', ') || 'None'}</p>
          `;
          container.appendChild(div);
        });
      } catch (err) {
        container.innerHTML = '❌ Failed to load videos.';
        console.error(err);
      }
    }

    loadVideos();
  </script>
</body>
</html>
