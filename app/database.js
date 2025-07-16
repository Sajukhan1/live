function saveRestriction(videoId) {
  const allowedInput = document.getElementById(`input-allowed-${videoId}`).value;
  const blockedInput = document.getElementById(`input-blocked-${videoId}`).value;

  const allowedCountries = allowedInput
    ? allowedInput.split(",").map(s => s.trim().toUpperCase())
    : [];

  const blockedCountries = blockedInput
    ? blockedInput.split(",").map(s => s.trim().toUpperCase())
    : [];

  fetch(`/api/restrictions/${videoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // ✅ This is required
    },
    body: JSON.stringify({ allowedCountries, blockedCountries })
  })
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(data => {
      alert("Restrictions saved!");
      document.getElementById(`allowed-${videoId}`).innerHTML =
        `Allowed: ${data.allowedCountries.length ? data.allowedCountries.join(", ") : "None"}`;
      document.getElementById(`blocked-${videoId}`).innerHTML =
        `Blocked: ${data.blockedCountries.length ? data.blockedCountries.join(", ") : "None"}`;
    })
    .catch(err => {
      console.error(err);
      alert("Error saving restrictions.");
    });
}
