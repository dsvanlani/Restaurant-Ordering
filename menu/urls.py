from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('menu/', views.menu, name="menu"),
    path('order/', views.order, name="order"),
    path('order/manage_orders', views.manage_orders, name="manage_orders"),
    path('order/cart', views.cart, name="cart"),
    path('order/cart/place_order', views.place_order),
    path('order/cart/complete_order', views.complete_order),
]
