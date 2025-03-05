const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.AIAPI,
});

router.post("/sendmessage", async function (req, res) {
  try {
    const { message, eventDetails } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const enhancedPrompt = `
Based on the following event details and user instructions, generate three different promotional materials:

EVENT DETAILS:
${
  eventDetails
    ? JSON.stringify(eventDetails, null, 2)
    : "No specific event details provided"
}

USER INSTRUCTIONS:
${message}

Please provide three separate outputs in this specific structure:
1. EMAIL: A full professional email invitation (300-500 words)
2. SMS: A brief text message invitation (max 160 characters)
3. FLYER_DESCRIPTION: A text description of what a promotional flyer should include (bullet points of key visual elements and text)

Format your response exactly as:
---EMAIL_START---
[Email content here]
---EMAIL_END---

---SMS_START---
[SMS content here]
---SMS_END---

---FLYER_DESCRIPTION_START---
[Flyer description here]
---FLYER_DESCRIPTION_END---
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: enhancedPrompt }],
    });
    const imagegen = await openai.images.generate({
      model: "dall-e-3",
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });

    const response = completion.choices[0].message.content;

    // Parse the response to extract each content type
    const emailMatch = response.match(
      /---EMAIL_START---([\s\S]*?)---EMAIL_END---/
    );
    const smsMatch = response.match(/---SMS_START---([\s\S]*?)---SMS_END---/);
    const flyerMatch = response.match(
      /---FLYER_DESCRIPTION_START---([\s\S]*?)---FLYER_DESCRIPTION_END---/
    );

    const emailContent = emailMatch ? emailMatch[1].trim() : "";
    const smsContent = smsMatch ? smsMatch[1].trim() : "";
    const flyerDescription = imagegen.data[0].url;

    // Generate placeholder image URL for flyer
    // In a real application, you would integrate with an image generation API like DALL-E
    // This is a placeholder that your frontend will recognize:
    const flyerImageUrl = "/api/placeholder/400/500";

    return res.json({
      email: emailContent,
      sms: smsContent,
      flyer: flyerDescription,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
