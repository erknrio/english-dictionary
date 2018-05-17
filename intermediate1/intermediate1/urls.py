from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework import routers
# Custom
from commons.views import DashboardView
from dictionary.views import WordViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register(r'word', WordViewSet)
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('admin/', admin.site.urls),
    path('dictionary/', include('dictionary.urls'), name='dictionary'),
    path('login/', auth_views.LoginView.as_view(redirect_authenticated_user=True), name='login'),
    path('logout/', auth_views.logout, name='logout'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # Podemos podificar api/v1 por el texto que queramos
    path('api/v1/', include(router.urls), name='api'),
]