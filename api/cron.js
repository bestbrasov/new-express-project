export default function handler(req, res) {
    // Call the function to log the time
    logCurrentTime();
    
    // Respond to the HTTP request
    res.status(200).end('Cron job ran at ' + new Date().toISOString());
  }
  
  // Function to log the current time to the console
  function logCurrentTime() {
    const now = new Date();
    console.log(`Cron job executed at: ${now.toISOString()}`);
  }
  