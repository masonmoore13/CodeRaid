from django.contrib.sitemaps import Sitemap
from main.models import *
from django.contrib.sites.models import Site

class Site:
    domain = 'localhost:8000/'

class EventSiteMap(Sitemap):
    changefreq = "daily"
    priority = 0.5
 
    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(EventSiteMap, self).get_urls(site=site, **kwargs)
 
    def items(self):
        return Event.objects.all()
    
    def location(self, obj):
        return obj.pk
 
