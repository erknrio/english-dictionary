from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required

urlpatterns = [
    # Words
    path('words/',  login_required(views.WordList.as_view()), name='words_list'),
    path('words/create/', login_required(views.WordCreate.as_view()), name='words_create'),
    path('words/detail/<int:pk>', login_required(views.WordDetail.as_view()), name='words_detail'),
    path('words/delete/<int:pk>', login_required(views.WordDelete.as_view()), name='words_delete'),
    path('words/update/<int:pk>', login_required(views.WordUpdate.as_view()), name='words_update'),
]
