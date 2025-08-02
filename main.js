document.addEventListener("corbado:login", async (event) => {
  const token = event.detail.sessionToken;
  console.log("🔑 Session Token:", token);

  // Replace this with your deployed backend URL (on Render)
  const backendUrl = "https://your-backend-service.onrender.com/verify";

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (result.valid) {
      alert(`✅ Welcome, ${result.email}`);
    } else {
      alert("❌ Invalid session token.");
    }
  } catch (error) {
    console.error("🚨 Backend error:", error);
    alert("⚠️ Could not connect to backend.");
  }
});
