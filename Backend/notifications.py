import smtplib
from email.mime.text import MIMEText
from app import db, NotificationPreference, TrackedProducts 

def check_notifications():
    notification_preferences = NotificationPreference.query.all()
    
    for preference in notification_preferences:
        latest_price = TrackedProducts.query.filter_by(id=preference.product_id).first().price
        percent_drop = ((preference.original_price - latest_price) / preference.original_price) * 100
        
        if percent_drop >= 30:
            send_notification(preference.email, preference.product, latest_price, percent_drop)

def send_notification(email, product, price, percent_drop):
    smtp_server = 'smtp.example.com'
    smtp_port = 587
    smtp_username = 'your_username'
    smtp_password = 'your_password'

    subject = f'Price Drop Alert for {product.name}'
    body = f'The price for {product.name} has dropped by {percent_drop}% to {price}!'
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = 'notifications@example.com'
    msg['To'] = email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
            print(f'Notification sent to {email}')
    except Exception as e:
        print(f'Failed to send notification: {e}')
