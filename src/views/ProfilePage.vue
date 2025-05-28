<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
      <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
          <h1 class="text-5xl font-extrabold text-primary mb-2">PROFIL</h1>
          <h2 class="text-3xl font-extrabold text-primary mb-8">
            YAYASAN PENDIDIKAN<br />MUTTAQIN AL - FARABI
          </h2>

          <p class="text-gray-700 mb-4 text-justify">
            Yayasan Pendidikan Muttaqin Al-Farabi Didirikan Pada 16 Februari 2012 Dengan Visi Besar
            Untuk Mencetak Generasi Yang Unggul Dalam Ilmu Dan Berakhlak Mulia. Berpijak Dari Tekad
            Kuat Untuk Memberikan Pendidikan Yang Berbasis Nilai-Nilai Islam Dan Ilmu Pengetahuan
            Modern, Al Farabi Tumbuh Menjadi Lembaga Pendidikan Yang Terus Berkembang Dalam Lebih
            Dari Satu Dekade Perjalanannya. Al Farabi Telah Menjadi Rumah Bagi Ribuan Siswa Yang
            Siap Bersaing Di Dunia Akademis Maupun Non-Akademis, Dengan Semangat "Pemuda Budi
            Pekerti, Berbuah Prestasi." Sekolah Ini Tidak Hanya Fokus Pada Kecerdasan Intelektual,
            Tetapi Juga Membangun Karakter, Moral, Dan Jiwa Kepemimpinan Siswa-Siswanya.
          </p>
        </div>
        <div class="md:w-1/2 flex items-center justify-center">
          <img
            src="/images/gedung-sekolah.png"
            alt="Gedung Sekolah Al-Farabi"
            class="max-h-128 object-contain"
          />
        </div>
      </div>
    </section>

    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
      <div
        class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl shadow-lg p-8 md:p-12 text-white flex flex-col md:flex-row gap-8"
      >
        <div class="md:w-3/5">
          <h2 class="text-5xl font-extrabold mb-8">VISI, MISI, DAN TUJUAN</h2>

          <div class="mb-8">
            <h3 class="text-3xl font-bold mb-2">Visi:</h3>
            <p class="mb-4 text-justify">
              Mewujudkan Generasi Unggul Yang Shalih/Shalihah, Berakhlak Mulia, Dan Siap Menghadapi
              Tantangan Masa Depan.
            </p>
          </div>

          <div class="mb-8">
            <h3 class="text-3xl font-bold mb-2">Misi:</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <Icon
                  icon="material-symbols:check"
                  class="text-green-400 mr-2"
                  width="28"
                  height="28"
                />
                <span class="text-justify"
                  >Menyelenggarakan Pendidikan Berkualitas Berbasis IPTEK Dan Nilai-Nilai
                  Islam</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  icon="material-symbols:check"
                  class="text-green-400 mr-2"
                  width="28"
                  height="28"
                />
                <span class="text-justify"
                  >Membentuk Karakter Peserta Didik Yang Beriman, Bertakwa, Dan Cinta Tanah
                  Air</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  icon="material-symbols:check"
                  class="text-green-400 mr-2"
                  width="28"
                  height="28"
                />
                <span class="text-justify"
                  >Menyiapkan Generasi Yang Memiliki Kompetensi Global, Kreatif, Inovatif, Dan
                  Berwawasan Global</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  icon="material-symbols:check"
                  class="text-green-400 mr-2"
                  width="28"
                  height="28"
                />
                <span class="text-justify"
                  >Membangun Lingkungan Belajar Yang Kondusif, Nyaman, Dan Mendukung Perkembangan
                  Karakter Siswa</span
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-3xl font-bold mb-2">Tujuan:</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <Icon icon="raphael:arrowright2" class="mr-2" width="28" height="28" />
                <span class="text-justify"
                  >Menghasilkan Generasi Muslim Yang Cerdas, Berintegritas, Dan Memiliki Budi
                  Pekerti Luhur</span
                >
              </li>
              <li class="flex items-start">
                <Icon icon="raphael:arrowright2" class="mr-2" width="28" height="28" />
                <span class="text-justify"
                  >Menanamkan Nilai-Nilai Jujur, Disiplin, Tanggung Jawab, Dan Amanah Dalam Setiap
                  Aspek Kehidupannya</span
                >
              </li>
              <li class="flex items-start">
                <Icon icon="raphael:arrowright2" class="mr-2" width="28" height="28" />
                <span class="text-justify"
                  >Membantu Peserta Didik Untuk Menemukan Dan Mengembangkan Potensi Terbaik
                  Mereka</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="md:w-2/5 flex items-center justify-center">
          <img
            src="/images/visi-misi.png"
            alt="Visi Misi Al-Farabi"
            class="max-h-128 object-contain"
          />
        </div>
      </div>
    </section>

    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
      <div
        class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8"
      >
        <div class="md:w-3/5">
          <h2 class="text-5xl font-extrabold mb-6 text-white">
            KURIKULUM DAN<br />PROGRAM UNGGULAN
          </h2>

          <p class="text-white mb-6 text-justify">
            Al-Farabi Menerapkan Kurikulum Yang Mengintegrasikan Ilmu Akademik Dan Nilai-Nilai
            Keislaman, Sehingga Menghasilkan Lulusan Yang Tidak Hanya Cerdas Secara Intelektual,
            Tetapi Juga Bermoral Dan Berakhlak Baik.
          </p>

          <p class="font-medium text-white mb-4">Beberapa Program Unggulan Kami Antara Lain:</p>

          <ul class="space-y-2 text-white">
            <li class="flex items-start">
              <Icon icon="material-symbols:check" class="mr-2" width="28" height="28" />
              <span class="text-justify"
                >Tahfidz Qur'an - Program Penghafalan Al-Qur'an Bagi Semua Jenjang Pendidikan</span
              >
            </li>
            <li class="flex items-start">
              <Icon icon="material-symbols:check" class="mr-2" width="28" height="28" />
              <span>Kelas Berbasis IT - Pemanfaatan Teknologi Dalam Proses Pembelajaran</span>
            </li>
            <li class="flex items-start">
              <Icon icon="material-symbols:check" class="mr-2" width="28" height="28" />
              <span class="text-justify"
                >Ekstrakurikuler Beragam - Mulai Dari Olahraga, Seni, Pramuka, Hingga Sains</span
              >
            </li>
            <li class="flex items-start">
              <Icon icon="material-symbols:check" class="mr-2" width="28" height="28" />
              <span class="text-justify"
                >Pengembangan Karier & Kewirausahaan - Membekali Siswa SMK Dengan Keterampilan Siap
                Kerja</span
              >
            </li>
            <li class="flex items-start">
              <Icon icon="material-symbols:check" class="mr-2" width="28" height="28" />
              <span class="text-justify"
                >Pendidikan Karakter & Leadership - Membangun Jiwa Kepemimpinan Dan Empati
                Sosial</span
              >
            </li>
          </ul>

          <p class="text-white mt-6 text-justify">
            Kami Percaya Bahwa Pendidikan Terbaik Adalah Pendidikan Yang Membantu Siswa Menemukan
            Jati Diri, Mengembangkan Potensi, Dan Siap Menghadapi Dunia Nyata Dengan Bekal Ilmu,
            Iman, Dan Akhlak.
          </p>
        </div>
        <div class="md:w-2/5 flex items-center justify-center">
          <img
            src="/images/kurikulum.png"
            alt="Kurikulum Al-Farabi"
            class="max-h-128 object-contain"
          />
        </div>
      </div>
    </section>
  </div>
</template>
