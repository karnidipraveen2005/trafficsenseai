from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        return response

    if isinstance(exc, ValueError) and 'MONGO_URI is missing' in str(exc):
        return Response(
            {
                'detail': 'MongoDB is not configured. Create backend/.env from backend/.env.example and set MONGO_URI.',
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return Response(
        {'detail': 'Server error. Check backend configuration.'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )
