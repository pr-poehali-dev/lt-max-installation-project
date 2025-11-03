import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка email с обратной связью от пользователей
    Args: event с httpMethod, body (name, email, message)
    Returns: HTTP response с результатом отправки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name: str = body_data.get('name', '')
    email: str = body_data.get('email', '')
    message: str = body_data.get('message', '')
    
    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    feedback_email = os.environ.get('FEEDBACK_EMAIL')
    
    if not all([smtp_host, smtp_user, smtp_password, feedback_email]):
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email service not configured'})
        }
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Обратная связь lt.MAX от {name}'
    msg['From'] = smtp_user
    msg['To'] = feedback_email
    
    html_content = f'''
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #8B5CF6, #0EA5E9); border-radius: 10px;">
            <h2 style="color: white; margin-bottom: 20px;">Новое сообщение обратной связи</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
                <p><strong>От:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Сообщение:</strong></p>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">{message}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p style="color: white; font-size: 12px;">© 2025 lt.MAX. Все права защищены</p>
            </div>
        </div>
    </body>
    </html>
    '''
    
    text_content = f'''
    Новое сообщение обратной связи
    
    От: {name}
    Email: {email}
    
    Сообщение:
    {message}
    
    ---
    © 2025 lt.MAX
    '''
    
    part_text = MIMEText(text_content, 'plain', 'utf-8')
    part_html = MIMEText(html_content, 'html', 'utf-8')
    
    msg.attach(part_text)
    msg.attach(part_html)
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'})
        }
