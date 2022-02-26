from django.contrib.sitemaps import Sitemap
from main.models import *
from django.contrib.sites.models import Site

class Site:
    domain = 'localhost:8000/'


# event sitemap
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

# campaigns sitemap
class CampaignSiteMap(Sitemap):
    changefreq = "daily"
    priority = 0.5
 
    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(CampaignSiteMap, self).get_urls(site=site, **kwargs)
 
    def items(self):
        return Campaign.objects.all()
    
    def location(self, obj):
        return obj.pk
 
#  categoryofteam sitemap
class CategoryOfTeamSiteMap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(CategoryOfTeamSiteMap, self).get_urls(site=site, **kwargs)

    def items(self):
        return CategoryOfTeam.objects.all()

    def location(self, obj):
        return obj.pk

#  gallery sitemap
class GallerySiteMap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(GallerySiteMap, self).get_urls(site=site, **kwargs)

    def items(self):
        return Gallery.objects.all()

    def location(self, obj):
        return obj.pk


#  team sitemap
class TeamSiteMap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(TeamSiteMap, self).get_urls(site=site, **kwargs)

    def items(self):
        return Team.objects.all()

    def location(self, obj):
        return obj.pk

#  scholarship sitemap
class ScholarshipSiteMap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(ScholarshipSiteMap, self).get_urls(site=site, **kwargs)

    def items(self):
        return Scholarship.objects.all()

    def location(self, obj):
        return obj.pk
