import re

def is_valid_email(email: str) -> bool:
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w{2,4}$'
    return re.match(pattern, email) is not None

def is_strong_password(password: str) -> bool:
    return (
        len(password) >= 6 and
        any(char.isdigit() for char in password) and
        any(char.isalpha() for char in password)
    )

