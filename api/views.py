from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework import status
from django.http import JsonResponse

# Create your views here.
@api_view(['GET'])
def room_view(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_room(request):
    if request.method == 'POST':

        if not request.session.exists(request.session.session_key):
            request.session.create()

        serializer = CreateRoomSerializer(data=request.data)

        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = request.session.session_key
            queryset = Room.objects.filter(host=host)

            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_room(request):
    code = request.GET.get('code')

    if code != None:
        room = Room.objects.get(code=code)

        if room:
            data = RoomSerializer(room).data
            data['is_host'] = request.session.session_key == room.host
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid room code'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'Bad request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def join_room(request):
    if not request.session.exists(request.session.session_key):
            request.session.create()

    code = request.data.get('code')
    if code != None:
        room = Room.objects.get(code=code)

        if room:
            request.session['room_code'] = code
            return Response({'message': 'Room joined'}, status=status.HTTP_200_OK)
        return Response({"Bad request": "Invalid room code"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'Bad Request': "Invalid post data, did not find key"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_in_room(request):
    if not request.session.exists(request.session.session_key):
            request.session.create()

    data = {
        'code': request.session.get('room_code')
    }

    return JsonResponse(data, status=status.HTTP_200_OK)