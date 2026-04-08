from django.db import models

from django.db import models

class Content(models.Model):
    # Choices for Type and Category
    TYPE_CHOICES = [('movie', 'Movie'), ('tv_show', 'TV Show')]
    
    title = models.CharField(max_length=255)
    # Poster Image
    image = models.ImageField(upload_to='posters/', blank=True, null=True) 
    content_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    category = models.CharField(max_length=100) # React dropdown se aayega
    trailer_url = models.URLField(max_length=500, blank=True, null=True)
    
    # --- NAYE VIDEO FIELDS ---
    # 1. Direct Video File Upload (Admin apne PC se movie select karega)
    video_file = models.FileField(upload_to='movies/', blank=True, null=True)
    
    # 2. External Video Link (Agar video kahin aur host hai)
    video_url = models.URLField(max_length=1000, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.content_type})"

class Plan(models.Model):
    name = models.CharField(max_length=100) # e.g., Mobile, Basic, Premium
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quality = models.CharField(max_length=50) # e.g., 480p, 1080p, 4K+HDR
    screens = models.IntegerField() # Kitne devices pe chalega
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

 
class Product(models.Model):
    amount = models.CharField(max_length=100 , blank=True)
    order_id = models.CharField(max_length=1000 )
    razorpay_payment_id = models.CharField(max_length=1000 ,blank=True)
    paid = models.BooleanField(default=False)
    # def __str__(self):
    #     return self.name
