from django.core.mail import EmailMessage

import threading

## Send email in a separate thread to make it faster
class EmailThread(threading.Thread):

    def __init__(self,email):
        self.email = email
        threading.Thread.__init__(self)
    
    def run(self):
        self.email.send()
        
# a utility class to send email using django
class Util:

    # static method so that don't have to create object to call it
    @staticmethod
    def send_email(data):
        email = EmailMessage(subject=data['email_subject'], body=data["email_body"], to=[data["to_email"]])
        
        ## start the thread
        EmailThread(email).start()
