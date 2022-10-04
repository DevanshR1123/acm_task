from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from base.api.views import MyTokenObtainPairView, getNotes, getRoutes

urlpatterns = [
    path('', getRoutes, name='routes'),
    path('token/', MyTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('notes/', getNotes, name='notes')
]
