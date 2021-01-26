from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.room_view),
    path('create-room/', views.create_room),
]