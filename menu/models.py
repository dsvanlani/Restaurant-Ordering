from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'{ self.name }s'

class Item(models.Model):
    name = models.CharField(max_length=64)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return f'{self.name} - {self.price}'

class Extra(models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f'{self.name} - {self.price}'

class Order(models.Model):
    customer_Name = models.CharField(max_length=64)
    customer_Email = models.EmailField()
    timestamp = models.DateTimeField(auto_now_add=True)
    order_complete = models.BooleanField(default=False)
    total = models.DecimalField(max_digits=7, decimal_places=2)
    tax = models.DecimalField(max_digits=6, decimal_places=2)
    confirmation_code = models.CharField(max_length=16, null=True)

    def __str__(self):
        return f'Order by {self.customer_Name} on {self.timestamp}'

class Item_Instance(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    special_request = models.TextField()

    def __str__(self):
        return f'{ self.item } + { self.special_request }'

class Extra_Instance(models.Model):
    extra = models.ForeignKey(Extra, on_delete=models.CASCADE)
    item_instance = models.ForeignKey(Item_Instance, on_delete=models.CASCADE)
