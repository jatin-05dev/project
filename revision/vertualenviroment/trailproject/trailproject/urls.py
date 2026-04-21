print("entry point")
"""
URL configuration for trailproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
# from django.contrib import admin
from django.urls import path
from trailapp import views



urlpatterns = [
    # path('admin/', admin.site.urls),
    path('landingpage/', views.landingpage,name='landingpage'),
    path('landingpage2/', views.landingpage2,name='landingpage2'),

    path('text_response/', views.text_response,name='text_response'),
    path('html_response/', views.html_response,name='html_response'),
    path('json_response/', views.json_response,name='json_response'),
    path('csv_response/', views.csv_response,name='csv_response'),
    path('pdf_response/', views.pdf_response,name='pdf_response'),
    # path('my_render/', views.my_render,name='my_render.html'),
    # path('my_render/', views.my_render,name='my_render.html'), 
    # path('my_render/<int:x>/', views.my_render,name='my_render.html'),
    # path('my_render/<int:x>/', views.my_render,name='my_render'), 
    # path('my_render/<str:x>/', views.my_render,name='my_render.html'), 
    # path('my_render/<slug:x>/', views.my_render,name='my_render'), 
    # dynamic
    # path('my_render/<str:name>/<int:age>/<str:qualification>/', views.my_render,name='my_render'),
    # slug 
    # path('my_Json/',views.my_Json,name='my_Json'),
    # path('my_redirect/',views.my_redirect,name='my_redirect'), 
    # path('my_redirect/',views.my_redirect,name='my_redirect'), 
    # path('my_redirect1/',views.my_redirect1,name='my_redirect1'), 
    # path('my_redirect2/',views.my_redirect2,name='my_redirect2'), 

    path('my_redirect1/',views.my_redirect1,name='my_redirect1'),
    path('my_redirect2/',views.my_redirect2,name='my_redirect2'),










]
print("exit point")
