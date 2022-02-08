from rest_framework import serializers
from .models import User
import sys
from django.core import exceptions
import django.contrib.auth.password_validation as validators


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
                errors['password'] = list(e.messages)

            if errors:
                raise serializers.ValidationError(errors)

            return super(UserSerializer, self).validate(data)
