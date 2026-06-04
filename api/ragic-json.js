const ragicUrl = "https://ap9.ragic.com/mauricetest2023/test4/11?api&listing";

export default async function handler(req, res) {
  try {
    const response = await fetch(ragicUrl);

    if (!response.ok) {
      res.status(response.status).json({ error: `Ragic request failed: ${response.status}` });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || "Unable to load Ragic data" });
  }
}
