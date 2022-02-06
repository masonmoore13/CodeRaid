from rest_framework import serializers
from main.models import * 

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'first_name', 'middle_name', 'last_name', 'password', 
        'username', 'email', 'class_of', 'phone_no', 'have_paid_dues',
        'current_work', 'has_contributions',  'achievements',
        'address_line_1', 'city', 'state') 