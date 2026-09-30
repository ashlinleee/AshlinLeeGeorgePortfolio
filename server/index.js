import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  console.log("Received contact form:", req.body);

  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: "All fields are required.",
      });
    }

    console.log("Sending to FormSubmit...");

    const formSubmitResponse = await fetch(
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

    console.log(
      "FormSubmit status:",
      formSubmitResponse.status,
      formSubmitResponse.statusText,
    );

    const responseText = await formSubmitResponse.text();

    console.log("FormSubmit response:", responseText);

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return res.status(500).json({
        success: false,
        error: `FormSubmit returned an invalid response: ${responseText}`,
      });
    }

    if (!formSubmitResponse.ok || data.success === false) {
      return res.status(500).json({
        success: false,
        error:
          data.message ||
          data.error ||
          "FormSubmit rejected the submission.",
      });
    }

    return res.status(200).json({
      success: true,
      transmissionId: `TRX-${Date.now()}`,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to send message.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
});