# Mobile (React Native + Expo)

Bu klasor, Pet Care Assistant mobil uygulamasinin React Native (Expo) baslangic surumudur.

## Kurulum

1. `cd mobile`
2. `npm install`
3. `.env.example` dosyasini `.env` olarak kopyala
4. Gerekirse `EXPO_PUBLIC_API_URL` degerini backend adresine gore guncelle
5. `npm run start`

## Notlar

- Backend varsayilan port: `5000`
- Android emulator'de backend icin `http://10.0.2.2:5000` kullanilir.
- Fiziksel cihazda, bilgisayarin LAN IP adresi kullanilmalidir.

## Mevcut Ekran

- Ana ekranda backend baglanti testi bulunur.
- `Backend Baglantisini Test Et` butonu backend `/` endpoint'ine istek atar.
