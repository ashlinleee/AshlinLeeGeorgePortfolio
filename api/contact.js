export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required.",
      });
    }

    const response = await fetch(
      "https://formsubmit.co/ajax/ashlinleegeorge@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Portfolio Message from ${name}`,
          _replyto: email,
          _template: "table",
        }),
      },
    );

    const data = await response.json();

    if (!response.ok || data.success === false) {
      return res.status(500).json({
        success: false,
        error: data.message || "FormSubmit failed.",
      });
    }

    return res.status(200).json({
      success: true,
      transmissionId: `TRX-${Date.now()}`,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to send message.",
    });
  }
}