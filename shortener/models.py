from django.db import models

class ShortUri(models.Model):
    dest_uri = models.URLField()
    code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    expiration = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.code} -> {self.dest_uri}'
