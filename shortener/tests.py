from django.test import TestCase, Client
import re
import json

from .models import ShortUri

class ShortUriTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_create_short_uri(self):
        expected_dest_uri = 'https://www.example.com'
        response = self.client.post('/create', json.dumps({'dest_uri': expected_dest_uri}), content_type='application/json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response['Content-Type'], 'application/json')

        response_body = response.json()

        self.assertTrue(re.match(r'http://testserver/[a-zA-Z0-9]{5}', response_body.get('short_uri')))
        self.assertEqual(response_body.get('dest_uri'), expected_dest_uri)

        code = response_body.get('short_uri').split('/')[-1]
        self.assertTrue(ShortUri.objects.filter(code=code, dest_uri=expected_dest_uri).exists())

    def test_create_short_uri_invalid_uri(self):
        response = self.client.post('/create', json.dumps({'dest_uri': 'invalid_uri'}), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content.decode(), 'Invalid URI: invalid_uri')

    def test_create_short_uri_no_dest_uri(self):
        response = self.client.post('/create', json.dumps({}), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.content.decode(), 'dest_uri is required')

    def test_redirect_short_uri(self):
        shorturi = ShortUri.objects.create(dest_uri='https://www.example.com', code='abcde')
        response = self.client.get(f'/{shorturi.code}')

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response['Location'], shorturi.dest_uri)

    def test_redirect_short_uri_not_found(self):
        response = self.client.get('/abcde')

        self.assertEqual(response.status_code, 404)
