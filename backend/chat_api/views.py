from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts_api.auth_utils import authenticate_request
from core.mongo import chat_messages_collection


def _simulate_response(model_id, text):
    if model_id == 'object-detection':
        return 'Analyzing image segments. 5 vehicles and 2 pedestrians detected.'
    if model_id == 'traffic-flow':
        return 'Calculating intersection throughput. Current flow rate: 45 vehicles/min.'
    if model_id == 'anomaly-alert':
        return 'Scanning feeds... No stopped vehicles or anomalies detected in Sector 4.'
    if model_id == 'image-enhancement':
        return 'Enhancing pixel density and removing grain from low-light camera feed. Process complete.'
    return 'I am processing that request. Backend is now connected and ready for model integration.'


@api_view(['GET'])
def health(request):
    return Response({'status': 'ok', 'service': 'chat_api'})


@api_view(['POST'])
def message(request):
    user, error = authenticate_request(request)
    if error:
        return error

    model_id = request.data.get('model_id', '').strip()
    user_message = request.data.get('message', '').strip()
    if not user_message:
        return Response({'detail': 'message is required.'}, status=400)

    ai_reply = _simulate_response(model_id, user_message)
    chat_messages_collection().insert_one(
        {
            'user_id': str(user['_id']),
            'model_id': model_id,
            'user_message': user_message,
            'ai_reply': ai_reply,
            'created_at': datetime.utcnow(),
        }
    )

    return Response(
        {
            'model_id': model_id,
            'user_message': user_message,
            'ai_reply': ai_reply,
        }
    )


@api_view(['GET'])
def history(request):
    user, error = authenticate_request(request)
    if error:
        return error

    model_id = request.GET.get('model_id', '').strip()
    query = {'user_id': str(user['_id'])}
    if model_id:
        query['model_id'] = model_id

    docs = list(chat_messages_collection().find(query).sort('created_at', -1).limit(50))
    items = [
        {
            'id': str(doc['_id']),
            'model_id': doc.get('model_id', ''),
            'user_message': doc.get('user_message', ''),
            'ai_reply': doc.get('ai_reply', ''),
            'created_at': doc.get('created_at').isoformat() if doc.get('created_at') else None,
        }
        for doc in docs
    ]
    return Response({'items': items})
