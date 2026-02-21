from django.contrib.auth.hashers import check_password, make_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.mongo import auth_tokens_collection, users_collection
from .auth_utils import authenticate_request, generate_auth_token, user_response
from .serializers import LoginSerializer, ProfileUpdateSerializer, SignupSerializer


@api_view(['GET'])
def health(request):
    return Response({'status': 'ok', 'service': 'accounts_api'})


@csrf_exempt
@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    email = data['email'].strip().lower()
    if users_collection().find_one({'email': email}):
        return Response({'detail': 'Email already exists.'}, status=409)

    user_doc = {
        'name': data['name'].strip(),
        'phone': data['phone'].strip(),
        'email': email,
        'password_hash': make_password(data['password']),
    }
    result = users_collection().insert_one(user_doc)
    user_doc['_id'] = result.inserted_id

    token = generate_auth_token(result.inserted_id)
    return Response({'token': token, 'user': user_response(user_doc)}, status=201)


@csrf_exempt
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    user = users_collection().find_one({'email': data['email'].strip().lower()})
    if not user or not check_password(data['password'], user.get('password_hash', '')):
        return Response({'detail': 'Invalid credentials.'}, status=401)

    token = generate_auth_token(user['_id'])
    return Response({'token': token, 'user': user_response(user)})


@api_view(['GET', 'PUT'])
def profile(request):
    user, error = authenticate_request(request)
    if error:
        return error

    if request.method == 'GET':
        return Response({'user': user_response(user)})

    serializer = ProfileUpdateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    updates = {}

    if 'name' in serializer.validated_data:
        updates['name'] = serializer.validated_data['name'].strip()
    if 'phone' in serializer.validated_data:
        updates['phone'] = serializer.validated_data['phone'].strip()
    if 'email' in serializer.validated_data:
        updates['email'] = serializer.validated_data['email'].strip().lower()
    if 'password' in serializer.validated_data:
        updates['password_hash'] = make_password(serializer.validated_data['password'])

    if updates:
        users_collection().update_one({'_id': user['_id']}, {'$set': updates})
        user = users_collection().find_one({'_id': user['_id']})

    return Response({'user': user_response(user)})


@csrf_exempt
@api_view(['POST'])
def logout(request):
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ', 1)[1].strip()
        auth_tokens_collection().delete_one({'token': token})
    return Response({'detail': 'Logged out.'})
