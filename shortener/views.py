from django.http import HttpRequest, JsonResponse, Http404, HttpResponseBadRequest, HttpResponseRedirect
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.utils.crypto import get_random_string
import json

from .models import ShortUri

def create(request: HttpRequest):
    if request.method != 'POST':
        return Http404()

    # Get the destination uri
    request_body = json.loads(request.body)
    dest_uri = request_body.get('dest_uri', None)

    if not dest_uri:
        return HttpResponseBadRequest("dest_uri is required")

    # Validate the uri
    val = URLValidator()

    try:
        val(dest_uri)
    except ValidationError as e:
        return HttpResponseBadRequest(f"Invalid URI: {dest_uri}")

    # Generate a random code
    code = get_random_string(length=5)

    while ShortUri.objects.filter(code=code).exists():
        code = get_random_string(length=5)

    # Save the short uri
    shorturi = ShortUri(dest_uri=dest_uri, code=code)
    shorturi.save()

    return JsonResponse({
        "short_uri": request.build_absolute_uri('/') + code,
        "dest_uri": dest_uri,
        }, status=201)

def redirect(request: HttpRequest, code):
    if request.method != 'GET':
        return Http404()

    shorturi = ShortUri.objects.filter(code=code).first()

    if shorturi is None:
        return Http404()

    return HttpResponseRedirect(shorturi.dest_uri)
