require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const db = require("./firebase");

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

app.post("/test-add", async (req, res) => {
  try {
    const docRef = await db.collection("test").add({
      message: "Firebase bağlantısı başarılı",
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      id: docRef.id,
      message: "Data Firestore'a eklendi",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/pets", async (req, res) => {
  try {
    const { userId, name, type, age, breed } = req.body;

    if (!userId || !name || !type) {
      return res.status(400).json({
        success: false,
        message: "userId, name ve type zorunludur",
      });
    }

    const petData = {
      userId,
      name,
      type,
      age: age || "",
      breed: breed || "",
      createdAt: new Date(),
    };

    const docRef = await db.collection("pets").add(petData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      data: petData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/pets", async (req, res) => {
  try {
    const snapshot = await db.collection("pets").get();

    const pets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/reminders", async (req, res) => {
  try {
    const { userId, petId, title, date, time, status } = req.body;

    if (!userId || !petId || !title || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "userId, petId, title, date ve time zorunludur",
      });
    }

    const reminderData = {
      userId,
      petId,
      title,
      date,
      time,
      status: status || "pending",
      createdAt: new Date(),
    };

    const docRef = await db.collection("reminders").add(reminderData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      data: reminderData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/reminders", async (req, res) => {
  try {
    const snapshot = await db.collection("reminders").get();

    const reminders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const SOURCE_MAP = {
  "American Kennel Club": "https://www.akc.org",
  PetMD: "https://www.petmd.com",
  ASPCA: "https://www.aspca.org",
  "VCA Animal Hospitals": "https://www.vcahospitals.com",
};

function injectLinks(answer) {
  const lines = answer.split("\n");

  return lines
    .map((line) => {
      for (const [name, url] of Object.entries(SOURCE_MAP)) {
        if (line.toLowerCase().includes(name.toLowerCase())) {
          return `- ${name}: ${url}`;
        }
      }
      return line;
    })
    .join("\n");
}

app.post("/ai-chat", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({
        success: false,
        message: "userId ve message zorunludur",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.3,
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `
You are a friendly pet consultant.
Reply in the same language as the user.

Rules:
- Keep answers concise.
- Use bullet points if helpful.
- Do not diagnose diseases.
- For serious symptoms, recommend consulting a veterinarian.
- Only mention sources if necessary.

Allowed sources:
- American Kennel Club
- PetMD
- ASPCA
- VCA Animal Hospitals
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const rawAnswer = completion?.choices?.[0]?.message?.content;
    let answer = (
      rawAnswer || "I could not generate a response right now."
    ).trim();
    answer = injectLinks(answer);

    const chatData = {
      userId,
      message,
      response: answer,
      createdAt: new Date(),
    };

    const docRef = await db.collection("ai_chats").add(chatData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      data: chatData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/ai-chats", async (req, res) => {
  try {
    const snapshot = await db.collection("ai_chats").get();

    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.post("/subscriptions", async (req, res) => {
  try {
    const { userId, planType, isActive } = req.body;

    if (!userId || !planType) {
      return res.status(400).json({
        success: false,
        message: "userId ve planType zorunludur",
      });
    }

    const subscriptionData = {
      userId,
      planType,
      isActive: isActive ?? true,
      startedAt: new Date(),
    };

    const docRef = await db.collection("subscriptions").add(subscriptionData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      data: subscriptionData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/subscriptions", async (req, res) => {
  try {
    const snapshot = await db.collection("subscriptions").get();

    const subscriptions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
