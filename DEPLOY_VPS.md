# Deploy Ke VPS Ubuntu Dengan Nginx

Website ini adalah static site, jadi cukup di-serve dengan `nginx`.

## 1. Upload file dari lokal ke VPS

Jalankan dari terminal lokal yang memang bisa login ke VPS:

```bash
scp -r index.html style.css script.js img areksaxyz@103.197.189.114:/tmp/republic-barudak-coding
```

Jika folder tujuan belum ada, pakai:

```bash
ssh areksaxyz@103.197.189.114 "mkdir -p /tmp/republic-barudak-coding"
scp -r index.html style.css script.js img areksaxyz@103.197.189.114:/tmp/republic-barudak-coding
```

## 2. Login ke VPS

```bash
ssh areksaxyz@103.197.189.114
```

## 3. Install nginx jika belum ada

```bash
sudo apt update
sudo apt install -y nginx
```

## 4. Pindahkan file website ke web root

```bash
sudo mkdir -p /var/www/republic-barudak-coding
sudo cp -r /tmp/republic-barudak-coding/* /var/www/republic-barudak-coding/
sudo chown -R www-data:www-data /var/www/republic-barudak-coding
sudo find /var/www/republic-barudak-coding -type d -exec chmod 755 {} \;
sudo find /var/www/republic-barudak-coding -type f -exec chmod 644 {} \;
```

## 5. Pasang konfigurasi nginx

Salin file `deploy/nginx-republic-barudak-coding.conf` ke VPS, atau buat manual:

```bash
sudo nano /etc/nginx/sites-available/republic-barudak-coding
```

Lalu isi dengan konfigurasi dari file template itu.

## 6. Aktifkan site

```bash
sudo ln -sf /etc/nginx/sites-available/republic-barudak-coding /etc/nginx/sites-enabled/republic-barudak-coding
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
```

## 7. Buka firewall jika perlu

Kalau `ufw` aktif:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw reload
```

## 8. Tes akses

Buka:

```text
http://103.197.189.114
```

## Update deploy berikutnya

Kalau nanti ada perubahan file, upload ulang lalu restart nginx:

```bash
scp -r index.html style.css script.js img areksaxyz@103.197.189.114:/tmp/republic-barudak-coding
ssh areksaxyz@103.197.189.114
sudo cp -r /tmp/republic-barudak-coding/* /var/www/republic-barudak-coding/
sudo systemctl restart nginx
```

## Catatan

- `img.zip` tidak perlu di-upload, cukup folder `img/`.
- Jika nanti pakai domain, cukup ganti `server_name` di config nginx.
- Jika port 80 tidak bisa diakses dari luar, cek firewall VPS atau security group provider.
