server {
    listen       80;
    server_name  localhost;

    root   /usr/share/nginx/html;
    index   index.html index.htm;

    location / {
        root   /usr/share/nginx/html;
        try_files $uri /index.html;
    }
}
