from django.core.mail import EmailMessage

# a utility class to send email using django
class Util:

    # static method so that don't have to create object to call it
    @staticmethod
    def send_email(data):
        email = EmailMessage(subject=data['email_subject'], body=data["email_body"], to=[data["to_email"]])
        email.send()
