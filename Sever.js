const express = require("express");

const app = express();
app.use(express.json());

let latestSignal = null;

app.get("/", (req, res) => {
  res.send("MT5 Bridge is running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online"
  });
});

app.post("/webhook", (req, res) => {
  latestSignal = {
    ...req.body,
    receivedAt: new Date().toISOString()
  };

  console.log("Signal received:", latestSignal);

  res.json({
    success: true,
    message: "Signal received"
  });
});

app.get("/signal", (req, res) => {
  res.json(latestSignal || {
    message: "No signal received yet"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MT5 Bridge running on port ${PORT}`);
});
