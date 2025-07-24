<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/2">
          <h1 class="text-5xl font-extrabold text-primary mb-4">
            INFORMASI<br />
            PENDAFTARAN<br />
            PESERTA DIDIK<br />
            BARU
          </h1>

          <a
            href="/files/brosur.pdf"
            download
            class="inline-block mt-6 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-12 rounded-lg text-xl transition-colors"
          >
            BROSUR
          </a>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <img
            src="/images/informasi-icon.png"
            alt="Informasi Pendaftaran"
            class="max-w-full h-auto max-h-96 object-contain"
          />
        </div>
      </div>
    </section>

    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
      <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <h2 class="text-4xl font-bold text-primary mb-8">SYARAT PENDAFTARAN</h2>

        <ol class="list-decimal pl-6 space-y-4 text-lg">
          <li>Mengisi Formulir Pendaftaran</li>
          <li>Biaya Pendaftaran Rp. 150.000,-</li>
          <li>Fotokopi Kartu Keluarga - 2 Lembar</li>
          <li>Fotokopi Akta Kelahiran - 2 Lembar</li>
          <li>Fotokopi Ijazah - 2 Lembar</li>
          <li>Fotokopi SKHU - 2 Lembar</li>
          <li>Fotokopi NISN - 2 Lembar</li>
        </ol>
      </div>
    </section>

    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <router-link
            to="/daftar"
            class="block w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white text-center font-bold py-8 px-4 rounded-2xl text-2xl shadow-lg transition-colors"
          >
            DAFTAR KHUSUS<br />ANAK YATIM
          </router-link>
        </div>
        <div>
          <router-link
            to="/daftar"
            class="block w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-center font-bold py-8 px-4 rounded-2xl text-2xl shadow-lg transition-colors"
          >
            DAFTAR<br />REGULER
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>
