"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
 
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Views se ContentViewSet aur PlanViewSet dono import karo
from myapp.views import ContentViewSet, PlanViewSet,create_order,verify_payment

from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'content', ContentViewSet) 
router.register(r'plans', PlanViewSet) # <--- Ye line add kar di Plan ke liye

 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), # Isse /api/plans/ chalega
    path('api/create-order/', create_order, name='create-order'), # Isse /api/create-order/ chalega
    path('api/verify-payment/', verify_payment, name='verify-payment'), # Isse /api/verify-payment/ chalega
 
    
]

# Static/Media files setup (Images ke liye)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)