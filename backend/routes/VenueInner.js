import express from "express";
const router = express.Router();

// Mock data
let venues = [
  {
    _id: "1",
    title: "The Grand Palace",
    image: "https://via.placeholder.com/400x250",
    rating: 4.5,
    review: 112,
    location: "123 Main St, Delhi",
    type: "Hotel",
    vegprice: 450,
    nonvegprice: 850,
    capacity: 300,
    room: 20,
    more: 5
  },
  {
    _id: "2",
    title: "Royal Banquet Hall",
    image: "https://via.placeholder.com/400x250",
    rating: 4.2,
    review: 86,
    location: "Bandra West, Mumbai",
    type: "Banquet",
    vegprice: 400,
    nonvegprice: 700,
    capacity: 250,
    room: 15,
    more: 3
  },
  {
    _id: "3",
    title: "Sunshine Lawn",
    image: "https://via.placeholder.com/400x250",
    rating: 4.8,
    review: 140,
    location: "Salt Lake, Kolkata",
    type: "Lawn",
    vegprice: 500,
    nonvegprice: 950,
    capacity: 500,
    room: 10,
    more: 7
  }
];

// Mock shortlists and enquiries
let shortlists = [];
let enquiries = [];

// GET all venues
router.get("/", (req, res) => res.json(venues));

// GET single venue
router.get("/:id", (req, res) => {
  const venue = venues.find(v => v._id === req.params.id);
  if (!venue) return res.status(404).json({ message: "Venue not found" });
  res.json(venue);
});

// POST shortlist (toggle)
router.post("/:id/shortlist", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const index = shortlists.findIndex(s => s.venueId === req.params.id && s.userId === userId);
  if (index !== -1) {
    shortlists.splice(index, 1);
    return res.json({ message: "Removed from shortlist" });
  }

  shortlists.push({ venueId: req.params.id, userId });
  res.json({ message: "Added to shortlist" });
});

// POST enquiry
router.post("/enquiries", (req, res) => {
  const { venueId, venueName, fullName, phone, phoneCode, email, eventDate, rooms, guests } = req.body;
  if (!venueId || !fullName || !phone || !email || !guests) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  enquiries.push({ venueId, venueName, fullName, phone, phoneCode, email, eventDate, rooms, guests });
  res.status(201).json({ message: "Enquiry submitted successfully" });
});

export default router;
