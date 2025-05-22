from telethon.sync import TelegramClient
from telethon.tl.types import MessageMediaPhoto
import os
from dotenv import load_dotenv

load_dotenv()

# Telegram API credentials
api_id = int(os.getenv('API_ID'))
api_hash = os.getenv('API_HASH')
group_username = 'nuscatcafe'

# Target download folder
download_dir = os.path.join(os.getcwd(), 'Images')
os.makedirs(download_dir, exist_ok=True)

with TelegramClient('anon', api_id, api_hash) as client:
    for message in client.iter_messages(group_username):
        if message.media and isinstance(message.media, MessageMediaPhoto):
            file_path = client.download_media(message.media, file=download_dir)
            print(f"Downloaded: {file_path}")

