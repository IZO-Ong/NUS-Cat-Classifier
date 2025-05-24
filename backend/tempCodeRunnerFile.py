from db.mongo import cats_collection
from models.cat import create_cat_document

cats_collection.delete_many({})

raw_cats = [
    {
        "name": "Ashy",
        "location": "UTown Fine Food / Tembusu Walkway",
        "likes": ["Butt Scratches", "Climbing Trees"],
        "sex": "Male",
        "graduated": True
    },
    {
        "name": "Plum",
        "location": "UTown Loading Bay",
        "likes": ["Chilling near food", "Warm sunspots"],
        "sex": "Female",
        "graduated": True
    },
    {
        "name": "Putu",
        "location": "UTown",
        "likes": ["Eating", "Being on the ground", "Meowing"],
        "sex": "Male"
    },
    {
        "name": "Toothless",
        "location": "Engineering",
        "likes": ["Neck scratches", "Bird watching"],
        "sex": "Male"
    },
    {
        "name": "Fred",
        "location": "Engineering",
        "likes": ["Meowing loudly", "Grass running"],
        "sex": "Male",
        "graduated": True
    },
    {
        "name": "Kit",
        "location": "Engineering",
        "likes": ["Polite food begging", "Quiet hideouts"],
        "sex": "Female"
    },
    {
        "name": "Lily",
        "location": "Raffles Hall",
        "likes": ["Hiding", "Food trust tests"],
        "sex": "Female"
    },
    {
        "name": "Pip",
        "location": "COM/BIZ",
        "likes": ["Being shy"],
        "sex": "Male"
    },
    {
        "name": "M33y Thai",
        "location": "AS4, FASS",
        "likes": ["Lurking", "Watching from plants"],
        "sex": "Male"
    },
    {
        "name": "Belle",
        "location": "Science Foyer / MD9",
        "likes": ["Roof naps", "Rat hunting"],
        "sex": "Female",
        "graduated": True
    },
    {
        "name": "Coco",
        "location": "Science",
        "likes": ["Freedom", "Trash digging"],
        "sex": "Male"
    },
    {
        "name": "Buddy",
        "location": "COM/BIZ",
        "likes": ["Hanging out with Flower"],
        "sex": "Male"
    },
    {
        "name": "Flower",
        "location": "COM/BIZ",
        "likes": ["Hanging out with Buddy"],
        "sex": "Female"
    },
    {
        "name": "Oreo",
        "location": "Temasek Hall",
        "likes": ["Beds", "Being dominant", "Breaking rules"],
        "sex": "Male"
    }
]

for data in raw_cats:
    cat_doc = create_cat_document(data)
    cats_collection.insert_one(cat_doc)

print(f"✅ Inserted {len(raw_cats)} cats into MongoDB.")
