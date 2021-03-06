from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

from commons.views import DashboardView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('admin/', admin.site.urls),
    path('dictionary/', include('dictionary.urls'), name='dictionary'),
    path('login/', auth_views.LoginView.as_view(redirect_authenticated_user=True), name='login'),
    path('logout/', auth_views.logout, name='logout'),
]