const express = require('express');
const upload = require('../middleware/uploadMiddleware');  // Import upload middleware
const { Band, AudioTrack, BandPhoto } = require('../database'); // Import models

const router = express.Router();
/**
 * 🟢 Create a New Band
 * Allows adding band details like title, description, and links.
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, spotifyLink, appleMusicLink, websiteLink, instagramLink,videoLink, email, phone } = req.body;

    // Ensure title is provided
    if (!title) return res.status(400).json({ error: 'Band title is required' });

    const newBand = await Band.create({
      title,
      description,
      spotifyLink,
      appleMusicLink,
      websiteLink,
      instagramLink,
      videoLink,
      email,
      phone
    });

    res.status(201).json({ message: 'Band created successfully', band: newBand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 Upload Band Landing Image (Profile Picture)
 */
router.post('/:bandId/upload-image', upload.single('landingImage'), async (req, res) => {
  try {
    const { bandId } = req.params;
    const band = await Band.findByPk(bandId);

    if (!band) return res.status(404).json({ error: 'Band not found' });

    band.landingImage = req.file.path;
    await band.save();

    res.json({ message: 'Landing image uploaded successfully', band });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 Upload MP3 Track & Assign to a Band
 */
router.post('/:bandId/upload-track', upload.single('audioFile'), async (req, res) => {
  try {
    const { bandId } = req.params;
    const { title } = req.body;

    if (!title) return res.status(400).json({ error: 'Track title is required' });

    const band = await Band.findByPk(bandId);
    if (!band) return res.status(404).json({ error: 'Band not found' });

    const newTrack = await AudioTrack.create({
      title,
      filePath: req.file.path,
      bandId
    });

    res.json({ message: 'Track uploaded successfully', track: newTrack });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 Upload Band Photos & Assign to a Band
 */
router.post('/:bandId/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    const { bandId } = req.params;
    const { title } = req.body;

    if (!title) return res.status(400).json({ error: 'Photo title is required' });

    const band = await Band.findByPk(bandId);
    if (!band) return res.status(404).json({ error: 'Band not found' });

    const newPhoto = await BandPhoto.create({
      title,
      filePath: req.file.path,
      bandId
    });

    res.json({ message: 'Band photo uploaded successfully', photo: newPhoto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 Get All Bands
 * Fetches all bands with their details.
 */
router.get('/', async (req, res) => {
  try {
    const bands = await Band.findAll();
    res.json(bands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 Get a Specific Band with Tracks & Photos
 */
router.get('/:bandId', async (req, res) => {
  try {
    const { bandId } = req.params;

    const band = await Band.findByPk(bandId, {
      include: [AudioTrack, BandPhoto] // Fetch associated tracks & photos
    });

    if (!band) return res.status(404).json({ error: 'Band not found' });

    res.json(band);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
