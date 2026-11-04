# Firebase to PostgreSQL Data Export Folder

Place your exported JSON files from Firebase Firestore here:

1. `submissions.json` (Array of Firestore submissions documents)
2. `stories.json` (Array of Firestore success_stories documents)
3. `admins.json` (Optional: Array of admin credentials)

### To dry-run (preview without modifying PostgreSQL):
```bash
npm run migrate:firebase:dry
```

### To execute the live import into PostgreSQL:
```bash
npm run migrate:firebase
```

### Format Examples

#### submissions.json
```json
[
  {
    "id": "firestore-doc-id-1",
    "name": "Student Name",
    "email": "student@example.com",
    "phone": "+92 300 1234567",
    "city": "Lahore",
    "service": "University Admissions",
    "message": "Interested in German universities",
    "status": "NEW",
    "notes": "Followed up on WhatsApp",
    "createdAt": "2026-05-19T14:30:00.000Z"
  }
]
```

#### stories.json
```json
[
  {
    "id": "story-1",
    "name": "Hamza Tariq",
    "maskedName": "H*** T***",
    "city": "Lahore",
    "stream": "MSc Computer Science",
    "review": "Uni Help helped me secure admission and visa.",
    "rating": 5,
    "clientPic": "",
    "visaStamp": "",
    "stampId": "STAMP-1024",
    "visaGrantDate": "March 2026"
  }
]
```
