from rest_framework import permissions

class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'list':
            return True
        elif view.action == "retrieve" or view.action == "read":
            return True
        elif view.action == 'create':
            return request.user.is_authenticated and request.user.is_superuser
        elif view.action in ['update', 'partial_update', 'destroy']:
            return request.user.is_authenticated and request.user.is_superuser
        else:
            return False

                                                                                                
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated

        if view.action == 'retrieve':
            return True
        elif view.action in ['update', 'partial_update']:
            return obj == request.user or request.user.is_superuser
        elif view.action == 'destroy':
            return request.user.is_superuser
        else:
            return False