


# Code Signing php
# https://www.simplified.guide/macos/keychain-ca-code-signing-create

# httpd
# CONFIG :  /etc/apache2/httpd.conf
# LOGFILES: /var/log/apache2


# module installed by brew
# 
# launch keychain access (from Search)
# Select Leaf option
# Select Code Signing Option

# After creation,  run this script

codesign --sign "RW Okamoto" --force --keychain ~/Library/Keychains/login.keychain-db /usr/local/opt/php/lib/httpd/modules/libphp.so

# Here is the LoadModule line (RW Okamoto has to match)

# LoadModule php_module /usr/local/opt/php/lib/httpd/modules/libphp.so "RW Okamoto"





