print("entry point ")
from django.shortcuts import render,redirect

# Create your views here.
print("exit point")

from django.http import HttpResponse,JsonResponse
import json
import csv
from django.urls import reverse
from urllib.parse import urlencode


def landingpage(req):
    return HttpResponse("hell")


def landingpage2(req):
    return HttpResponse("<h1>hell</h1>")
 

def text_response(request):
     return HttpResponse("This is a plain text response.",content_type="text/plain")


def html_response(request):
           html = "<h1>Welcome to My Django Site</h1><p>This is HTML content.</p>"
           return HttpResponse(html, content_type="text/html")

def json_response(request):
     data = {"name": "Neeraj", "role": "Developer"}
     json_data =json.dumps(data)
     print(json_data)
     return HttpResponse(json_data,content_type="application/json")

 
def csv_response(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="employees.csv"'
    writer = csv.writer(response)
    writer.writerow(['Name', 'Department', 'Salary'])
    writer.writerow(['Neeraj', 'IT', 50000])
    writer.writerow(['Ravi', 'HR', 40000])
    return response


def pdf_response(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'
    # Example content (real projects use ReportLab or WeasyPrint)
    response.write("This is a dummy PDF content.")
    return response 



# content-z deposition ke liye 
         
# collection ke liye      

# def my_render(req):
#     return render(req,'my_render.html')


# def my_render(request):
#     date={
#          "name":"jatin",
#          "class":"Bca"
#     }
#     return render(request,"my_render.html",date)

# def my_render(request,x):
#     date={
#          'x':x
#     }
#     return render(request,"my_render.html",date)

# def my_render(req,name,age,qualification):
#     data={
#          'n':name,
#          'a':age,
#          'q':qualification
#     }
#     return render(req,"my_render.html",data)


# def my_Json(req):
#     data={
#          'active':True,
#          'active2':False,
#          'active3':None
#     }
#     return JsonResponse(data)


# def my_Json(req):
#     data= 'python+django'
    
#     return JsonResponse(data,safe=False)
# bool and null
# dumps convert py dta into string
# def my_Json(req):
#   data= ['python+django']
#   return JsonResponse(data,safe=False)


# def my_Json(req):
#   data= 6
#   return JsonResponse(data,safe=False)



# def my_Json(req):
#   data= (5,8,3,5)
#   return JsonResponse(data,safe=False)



# ridirect

# external
# def my_redirect(req):
#      return redirect("https://www.youtube.com/")


# def my_redirect(req):
#      return redirect("landingpage")

# suggestion se change 

# def my_redirect1(req):
#      url=reverse('my_redirect2')
#      data=urlencode({'name':'neeraj','age':66})
#      return redirect (f'{url} ? {data}')

# def my_redirect2(req):
#      print("hello")
#     #  print(req.GET)

# def my_redirect1(req):
#     url=reverse('my_redirect2')
#     data=urlencode({'name':'sumit','age':19})
#     return redirect(f'{url }?{data}')

# def my_redirect2(req):
#     print("hello")
#     # print(req.GET)
#     return req.GET


# response


def my_redirect1(req):
    url = reverse('my_redirect2')
    data = urlencode({'name': 'sumit', 'age': 19})
    return redirect(f'{url}?{data}')    


def my_redirect2(req):
    print("hello")
    return JsonResponse(req.GET)    

# dyna mic url data