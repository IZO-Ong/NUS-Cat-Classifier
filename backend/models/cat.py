def create_cat_document(data):
    name = data['name'].strip()
    slug = name.lower().replace(' ', '')

    return {
        "name": name,
        "slug": slug,
        "location": data['location'],
        "likes": data['likes'],
        "sex": data['sex'],
        "predictionCount": 0,
        "comments": [],
        "graduated": data.get('graduated', False),
        "image": f"/static/cats/{slug}.png"
    }
