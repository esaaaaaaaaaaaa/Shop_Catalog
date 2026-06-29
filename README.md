# Shop Catalog

## Deskripsi Aplikasi

Shop Catalog adalah aplikasi mobile berbasis React Native (Expo) yang menampilkan daftar produk dari REST API. Aplikasi ini memungkinkan pengguna melihat daftar produk, mencari produk berdasarkan nama, serta melihat detail produk secara sederhana.

## API yang Digunakan

API: Fake Store API

Endpoint:

* `https://fakestoreapi.com/products`

Metode:

* `GET`

Data yang diambil:

* Nama produk
* Harga
* Gambar produk
* Deskripsi
* Kategori
* Rating

## Fitur

### Level 1

* ✅ Mengambil data dari REST API menggunakan Fetch API
* ✅ Menampilkan daftar produk menggunakan FlatList
* ✅ Loading indicator saat proses pengambilan data
* ✅ Error handling ketika koneksi gagal
* ✅ Menampilkan data produk dari API

### Level 2 (Dipilih)

* ✅ Search produk berdasarkan nama
* ✅ Halaman Detail Produk

## Screenshot

### 1. Loading Screen

> <img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/205860ba-a868-43a9-ba74-3716c15e9d33" />


### 2. Success

> <img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/60235796-02e5-44f8-af00-c19c26f64607" />


### 3. Error

> <img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/a9ae4509-307f-4e95-ab00-f35e8dd4c21f" />


## Cara Menjalankan

1. Clone repository

```bash
git clone https://github.com/esaaaaaaaaaaaa/Shop_Catalog.git
```

2. Masuk ke folder project

```bash
cd Shop_Catalog
```

3. Install dependency

```bash
npm install
```

4. Jalankan aplikasi

```bash
npx expo start
```

5. Scan QR Code menggunakan aplikasi Expo Go pada perangkat Android atau iOS.

## Tech Stack

* React Native
* Expo
* JavaScript (ES6)
* Fetch API
* React Navigation
* FlatList

## Expo Snack
https://snack.expo.dev/@esaagapesby/shop_catalog
