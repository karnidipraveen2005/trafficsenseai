from pymongo import MongoClient
from django.conf import settings

_client = None


def get_client():
    global _client
    if _client is None:
        if not settings.MONGO_URI:
            raise ValueError('MONGO_URI is missing. Add it to backend/.env')
        _client = MongoClient(settings.MONGO_URI)
    return _client


def get_database():
    return get_client()[settings.MONGO_DB_NAME]


def users_collection():
    return get_database()['users']


def auth_tokens_collection():
    return get_database()['auth_tokens']


def chat_messages_collection():
    return get_database()['chat_messages']
