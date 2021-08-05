from django.db import models

class manage(models.Model):
    user_id = models.CharField(max_length = 16, null = False)
    part = models.CharField(max_length = 16, null = False)
    level = models.IntegerField()
    create_at = models.DateTimeField()