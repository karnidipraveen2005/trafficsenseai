import secrets
from datetime import datetime

from bson import ObjectId
from rest_framework.response import Response

from core.mongo import auth_tokens_collection, users_collection


def _serialize_user(user_doc):
    return {
        'id': str(user_doc['_id']),
        'name': user_doc.get('name', ''),
        'email': user_doc.get('email', ''),
        'phone': user_doc.get('phone', ''),
    }


def generate_auth_token(user_id):
    token = secrets.token_urlsafe(32)
    auth_tokens_collection().insert_one(
        {
            'token': token,
            'user_id': str(user_id),
            'created_at': datetime.utcnow(),
        }
    )
    return token


def authenticate_request(request):
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None, Response({'detail': 'Missing Bearer token.'}, status=401)

    token = auth_header.split(' ', 1)[1].strip()
    token_doc = auth_tokens_collection().find_one({'token': token})
    if not token_doc:
        return None, Response({'detail': 'Invalid token.'}, status=401)

    user_id = token_doc.get('user_id')
    if not user_id:
        return None, Response({'detail': 'Invalid token payload.'}, status=401)

    user = users_collection().find_one({'_id': ObjectId(user_id)})
    if not user:
        return None, Response({'detail': 'User not found.'}, status=404)

    return user, None


def user_response(user_doc):
    return _serialize_user(user_doc)
