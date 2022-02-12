from django.contrib import admin
from .models import Event
from .models import Campaign
from .models import CategoryOfTeam
from .models import Team
from .models import Scholarship
from .models import Contribution
from .models import Role
from .models import Contact
from .models import MitchellEvent


admin.site.register(Event)
class EvemtModel(admin.ModelAdmin):
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

admin.site.register(MitchellEvent)
class EventModel(admin.ModelAdmin):
    list_display = ('id','mitchell_event_name')