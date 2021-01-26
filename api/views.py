from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework import status

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
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)