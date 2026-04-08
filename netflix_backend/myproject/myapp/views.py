from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Content
from .serializers import ContentSerializer
from .models import Plan
from .serializers import PlanSerializer

class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all().order_by('-created_at') # Naya content upar dikhega
    serializer_class = ContentSerializer

 
class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product, Plan  # Models import karo
import json
import razorpay

# Apni asli Keys yahan daalo
client = razorpay.Client(auth=("rzp_test_pr99iascS1WRtU", "UTDIzPGwICnAssu3Q3lk7zUi"))

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            plan_id = data.get('plan_id')

            # 1. Plan model se sahi price fetch karo
            plan = Plan.objects.get(id=plan_id)
            
            # Razorpay paise mein amount leta hai (e.g. 500 INR = 50000 Paise)
            amount = int(plan.price * 100) 

            # 2. Razorpay Order Create karo
            data_order = {
                "amount": amount,
                "currency": "INR",
                "payment_capture": "1" # Auto capture payment
            }
            razorpay_order = client.order.create(data=data_order)

            # 3. Product Model mein record save karo (Content mein nahi!)
            Product.objects.create(
                amount=plan.price, # Original price store karo
                order_id=razorpay_order['id']
            )

            # 4. React ko order detail bhej do
            return JsonResponse(razorpay_order)
            
        except Plan.DoesNotExist:
            return JsonResponse({"error": "Plan nahi mila!"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def verify_payment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            # Razorpay ko verify karne ke liye ye 3 cheezein chahiye
            params_dict = {
                'razorpay_order_id': data['razorpay_order_id'],
                'razorpay_payment_id': data['razorpay_payment_id'],
                'razorpay_signature': data['razorpay_signature']
            }

            # 1. Signature Verify karo
            client.utility.verify_payment_signature(params_dict)
            
            # 2. Agar verification pass ho gayi, toh DB update karo
            product = Product.objects.get(order_id=data['razorpay_order_id'])
            product.razorpay_payment_id = data['razorpay_payment_id']
            product.paid = True
            product.save()
            
            return JsonResponse({"status": "success", "message": "Payment Verified!"})
            
        except Exception as e:
            # Agar signature galat hai ya koi aur error
            return JsonResponse({"status": "failed", "error": "Signature Verification Failed"}, status=400)
 