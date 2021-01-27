from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.room_view),
    path('create-room/', views.create_room),
    path('get-room/', views.get_room),
    path('join-room', views.join_room),
    path('user-in-room', views.user_in_room),
]