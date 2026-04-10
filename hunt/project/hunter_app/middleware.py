from django.http import JsonResponse

class HashValidationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if "/api/vault/" in request.path:
            user_hash = request.headers.get('X-SECRET-HASH')
            if user_hash != "53":
                return JsonResponse({"error": "Wrong Hash"}, status=403)
        
        # YE LINE 'IF' KE BAHAR HONI CHAHIYE
        return self.get_response(request)