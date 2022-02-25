from attr import validate
from rest_framework import serializers
from .models import User
import sys
from django.core import exceptions
import django.contrib.auth.password_validation as validators



# register serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password"]

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')

        if not username.isalnum():
            raise serializers.ValidationError("The username should only contain alphanumeric characters.")

        return attrs




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True,}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, data):
            # here data has all the fields which have validated values
            # so we can create a User instance out of it
            user = User(**data)

            # get the password from the data
            password = data.get('password')

            errors = dict() 
            try:
                # validate the password and catch the exception
                validators.validate_password(password=password, user=User)
                
            # the exception raised here is different than serializers.ValidationError
            except exceptions.ValidationError as e:
                errors['validationErrors'] = list(e.messages)

            if errors:
                raise serializers.ValidationError(errors)

            return super(UserSerializer, self).validate(data)
