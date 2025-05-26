<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h1 class="text-5xl font-extrabold text-primary text-center mb-12">KONTAK</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div class="bg-blue-300 rounded-3xl shadow-lg p-8 text-white text-center">
          <div class="flex justify-center mb-6">
            <img
              src="/images/gedung-sekolah.png"
              alt="Gedung Sekolah Al-Farabi"
              class="max-h-64 object-contain"
            />
          </div>

          <h2 class="text-3xl font-bold mb-4">Sekolah Al - Farabi</h2>

          <p class="text-xl">
            Jl. Perjuangan No.177, Desa Tanjung<br />
            Selamat, Kec. Sunggal Deli Serdang,<br />
            Sumatera Utara
          </p>
        </div>

        <div class="bg-white rounded-3xl shadow-lg p-6 flex flex-col">
          <div class="border-4 border-primary rounded-2xl overflow-hidden mb-4 flex-grow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.233785168573!2d98.5832034749729!3d3.5334127964408606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312542cf733f9f%3A0x3c6143cbfe1d7f8f!2sJl.%20Perjuangan%20No.177%2C%20Tj.%20Selamat%2C%20Kec.%20Sunggal%2C%20Kabupaten%20Deli%20Serdang%2C%20Sumatera%20Utara%2020352!5e0!3m2!1sid!2sid!4v1748284484560!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div class="text-center">
            <h3 class="text-3xl font-bold text-blue-300 mb-2">Google Maps</h3>
            <div class="flex items-center justify-center">
              <img src="/images/maps.png" alt="maps icon" class="w-12 h-12 object-contain" />
              <span class="text-xl text-blue-300 font-medium">Sekolah Al Farabi</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-3xl shadow-lg p-6 flex items-center">
          <div class="p-4 rounded-xl mr-6">
            <img src="/images/email.png" alt="email icon" class="w-32 h-32 object-contain" />
          </div>

          <div>
            <h3 class="text-3xl text-blue-300 mb-2 font-extrabold">Email</h3>
            <a
              href="mailto:alfarabimuttaqin@gmail.com"
              class="font-semibold text-blue-300 text-xl hover:underline"
            >
              alfarabimuttaqin@gmail.com
            </a>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-lg p-6 flex items-center">
          <div class="mr-6">
            <img
              src="/images/admin-avatar.png"
              alt="contact sales icon"
              class="w-32 h-32 object-contain"
            />
          </div>

          <div>
            <h3 class="text-3xl font-extrabold text-blue-300 mb-2">Admin</h3>
            <p class="font-semibold text-blue-300 text-xl">0813 - 6223 - 2237</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
