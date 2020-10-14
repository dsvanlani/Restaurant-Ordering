import json
from datetime import datetime, timedelta
from secrets import token_urlsafe as generate_cc

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count
from django.core.mail import send_mail


from .models import *


# Create your views here.

def home(request):
    return render(request, "menu/home.html")

def menu(request):

    categories = Category.objects.all()
    items = Item.objects.all()
    context = {
        "categories": categories,
        "items": items
    }
    return render(request, "menu/menu.html", context)

def order(request):

    categories = Category.objects.all()
    items = Item.objects.all()
    context = {
        "categories": categories,
        "items": items
    }

    return render(request, "menu/order.html", context)

def cart(request):
    return render(request, "menu/cart.html")

@csrf_exempt
def place_order(request):

    try:
        data = json.loads(request.body)
        confirmation_code = generate_cc(16)
        order = Order(
            customer_Name=data.get("customer_Name", ""),
            customer_Email=data.get("customer_Email", ""),
            total=data.get("total", ""),
            tax=data.get("tax", ""),
            confirmation_code=confirmation_code
        )

        order.save()

        items_array = json.loads(json.loads(data.get("items_array"))) #Array of Items
        order_obj = Order.objects.get(confirmation_code=confirmation_code)

        for item in items_array: # make an Item Instance for each item
            item_name = item['item_name']
            special_request = item['special_request']

            item_instance = Item_Instance(
                item=Item.objects.get(name=item_name),
                order=order_obj,
                special_request=special_request
            )
            item_instance.save()

        # Determine Pickup Time
        order_count = Order.objects.filter(order_complete=False).count()
        now = datetime.now()
        delta = timedelta(minutes=(15 + order_count // 10))
        new = now + delta
        if len(str(new.minute)) < 2:
            pickup_time = str(new.hour)+":"+str(new.minute) + "0"
        else:
            pickup_time = str(new.hour)+":"+str(new.minute)

        email_body = f"""
        Thanks for ordering from La Tavola - {data.get("customer_Name","")}.
        Your order will be ready to pickup at {pickup_time}.
        ATTENTION: THIS IS A TEST EMAIL PLEASE IGNORE"""
        # TODO: send email to customer
        # sends confirmation email
        send_mail(
            'Your Order from La Tav is in the works',   # subject
            email_body,                                 # message
            'LaTavola.menu.bot@gmail.com',              # our email
            [data.get("customer_Email", "")],           # customer email
        )

        message = {
            "message": "success",  # leave this alone its required to do JS stuff
            "customer_Name": data.get("customer_Name", ""),
            "pickup_time": pickup_time
        }

        return JsonResponse(message)

    except BaseException as e:
        return JsonResponse({"error":e.__str__()})

@login_required
def manage_orders(request):

    all_orders = Order.objects.filter(order_complete=False).all()
    orders = all_orders.annotate(number_of_items=Count('item_instance'))
    item_instances = Item_Instance.objects.all()

    context = {
        "orders": orders,
        "item_instances": item_instances
    }

    return render(request, "menu/manage_orders.html", context)

@csrf_exempt
def complete_order(request):

    try:
        data = json.loads(request.body)
        order_id = int(data.get("order_id", ""))
        order_obj = Order.objects.get(id=order_id)
        order_obj.order_complete = True
        order_obj.save()

        message = {
            "message": "route_worked"
        }
        return JsonResponse(message)

    except BaseException as e:
        return JsonResponse({
            "error": e.__str__()
        })