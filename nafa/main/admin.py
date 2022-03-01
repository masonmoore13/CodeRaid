from django.contrib import admin
from main.models import *

admin.site.register(Gallery)
class GalleryModel(admin.ModelAdmin):
    list_display = ('id', 'image')

admin.site.register(Event)
class EventModel(admin.ModelAdmin):
    list_display = ('id', 'event_name')

admin.site.register(Campaign)
class CampaignModel(admin.ModelAdmin):
    list_display = ('id', 'campaign_name')

admin.site.register(CategoryOfTeam)
class CategoryOfTeamModel(admin.ModelAdmin):
    list_display = ('category_name')
    
admin.site.register(Team)
class TeamModel(admin.ModelAdmin):
    list_display = ('type_of_team')
    
admin.site.register(Scholarship)
class ScholarshipModel(admin.ModelAdmin):
    list_display = ('scholarship_name')
    
admin.site.register(Contribution)
class ContributionModel(admin.ModelAdmin):
    list_display = ('members', 'events', 'campgains')

admin.site.register(Role)
class RoleModel(admin.ModelAdmin):
    list_display = ('member_ID', 'role_title')

admin.site.register(Contact)
class ContactModel(admin.ModelAdmin):
    list_display = ('sender_email')