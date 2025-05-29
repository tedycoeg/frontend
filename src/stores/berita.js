import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [
      {
        id: 1,
        type: 'berita',
        title: 'Al-Farabi Gelar Pekan Literasi',
        subtitle: 'Menumbuhkan Cinta Membaca Sejak Dini',
        image: '/images/berita/berita-1.png',
        date: '16 Mei 2025',
        content: `Dalam rangka memperingati Bulan Bahasa dan meningkatkan minat baca siswa sejak dini, Sekolah Al-Farabi menyelenggarakan Pekan Literasi yang berlangsung selama lima hari, mulai dari tanggal 12 hingga 16 Mei 2025. Kegiatan ini bertujuan menumbuhkan semangat membaca di kalangan siswa sekaligus mengajak seluruh elemen sekolah—termasuk guru dan orang tua—untuk ambil bagian dalam menciptakan budaya literasi yang kuat.

Beragam kegiatan menarik diselenggarakan selama pekan tersebut, di antaranya:

1. Lomba Mendongeng untuk Siswa TK dan SD, dengan juri dari kalangan guru dan praktisi literasi.

2. Bazar Buku Murah, bekerja sama dengan penerbit lokal, yang menyediakan buku edukatif dengan harga terjangkau.

3. Sesi Membaca Bersama, yang menghadirkan momen hangat ketika siswa membaca bersama wali kelas dan orang tua di ruang baca terbuka.

4. Tukar Buku Antar Siswa, yang mendorong siswa saling berbagi koleksi bacaan favorit mereka.

5. Kepala Sekolah Al-Farabi, Ibu Lailatul Husna, menyampaikan bahwa kegiatan ini merupakan bagian dari upaya membentuk generasi pembelajar sepanjang hayat.

"Kami ingin anak-anak mengenal buku bukan sebagai kewajiban, tapi sebagai sahabat. Karena dengan membaca, mereka bisa menjelajahi dunia tanpa batas," ujarnya dalam sambutan pembukaan.

Pekan Literasi Al-Farabi menjadi bukti nyata bahwa pendekatan edukatif yang menyenangkan dapat membangun kebiasaan positif yang berdampak jangka panjang. Antusiasme siswa dan keterlibatan orang tua menunjukkan bahwa semangat membaca bisa dimulai dari rumah, dan dikuatkan di sekolah.`,
        excerpt: 'Menumbuhkan Cinta Membaca Sejak Dini'
      },
      {
        id: 2,
        type: 'berita',
        title: 'Siswa Al-Farabi Salurkan Bantuan',
        subtitle: 'Siswa Diajak Berbagi Dengan Sesama Melalui Program "Ramadhan Peduli"',
        image: '/images/berita/berita-2.png',
        date: '5 April 2025',
        content: `Program "Ramadhan Peduli" yang diselenggarakan oleh Sekolah Al-Farabi selama bulan Ramadhan tahun ini berhasil mengumpulkan bantuan berupa sembako, pakaian layak pakai, dan alat tulis yang kemudian disalurkan kepada masyarakat kurang mampu di sekitar lingkungan sekolah.

Kegiatan yang melibatkan seluruh siswa dari tingkat TK hingga SMA ini bertujuan untuk menanamkan nilai kepedulian sosial dan berbagi dengan sesama sejak dini. Para siswa tidak hanya menyumbangkan barang, tetapi juga terlibat langsung dalam proses penyaluran bantuan.

"Kami ingin anak-anak tidak hanya belajar tentang akademik, tetapi juga tentang nilai-nilai kemanusiaan dan kepedulian sosial," ujar Koordinator Program, Bapak Ahmad Fauzi.

Penyaluran bantuan dilakukan pada minggu terakhir bulan Ramadhan, dengan mengunjungi beberapa titik di sekitar sekolah yang telah dipetakan sebelumnya. Para siswa terlihat antusias dan bersemangat ketika berinteraksi langsung dengan penerima bantuan.

"Saya merasa senang bisa berbagi dengan orang lain, terutama di bulan Ramadhan ini," ungkap Zahra, salah satu siswa kelas 5 SD yang ikut dalam kegiatan tersebut.

Program "Ramadhan Peduli" ini direncanakan akan menjadi agenda rutin tahunan Sekolah Al-Farabi sebagai bagian dari pendidikan karakter dan implementasi nilai-nilai keislaman dalam kehidupan sehari-hari.`,
        excerpt: 'Siswa Diajak Berbagi Dengan Sesama Melalui Program "Ramadhan Peduli"'
      },
      {
        id: 3,
        type: 'berita',
        title: 'Seminar Parenting',
        subtitle: 'Kegiatan Ini Diikuti Lebih Dari 200 Orang Tua Siswa Dari Semua Jenjang',
        image: '/images/berita/berita-3.png',
        date: '20 Maret 2025',
        content: `Sekolah Al-Farabi sukses menyelenggarakan Seminar Parenting dengan tema "Membangun Generasi Tangguh di Era Digital" yang diikuti oleh lebih dari 200 orang tua siswa dari semua jenjang pendidikan. Seminar yang berlangsung selama sehari penuh ini menghadirkan tiga pembicara utama yang merupakan pakar di bidang psikologi anak, pendidikan, dan teknologi.

  Dr. Ratna Dewi, seorang psikolog anak terkemuka, membawakan materi tentang "Pola Asuh yang Tepat untuk Anak Generasi Alpha". Beliau menekankan pentingnya komunikasi terbuka dan pendampingan orang tua di tengah arus informasi yang sangat cepat saat ini.

  "Anak-anak saat ini tumbuh dengan akses informasi yang tidak terbatas. Tugas kita sebagai orang tua adalah memastikan mereka memiliki filter dan kemampuan berpikir kritis yang baik," ujar Dr. Ratna dalam presentasinya.

  Sementara itu, Prof. Hendra Wijaya dari Fakultas Ilmu Pendidikan Universitas Indonesia berbicara tentang "Memahami Gaya Belajar Anak dan Implikasinya dalam Pendampingan Belajar di Rumah". Beliau memberikan tips praktis bagi orang tua untuk mengenali dan mengakomodasi gaya belajar anak yang berbeda-beda.

  Pembicara ketiga, Ir. Budi Santoso, seorang pakar teknologi pendidikan, membahas tentang "Memanfaatkan Teknologi secara Positif dalam Pengasuhan Anak". Beliau memberikan panduan tentang bagaimana orang tua dapat memanfaatkan teknologi sebagai alat bantu pendidikan, sekaligus mengajarkan anak untuk menggunakan teknologi secara bijak.

  Seminar ini juga dilengkapi dengan sesi tanya jawab dan diskusi kelompok yang memungkinkan para orang tua untuk berbagi pengalaman dan mendapatkan solusi atas permasalahan yang dihadapi dalam pengasuhan anak.

  "Kami sangat senang dengan antusiasme para orang tua. Ini menunjukkan bahwa mereka sangat peduli dengan pendidikan dan perkembangan anak-anak mereka," kata Ibu Siti Aminah, Ketua Komite Sekolah Al-Farabi yang juga menjadi moderator dalam seminar tersebut.

  Berdasarkan formulir evaluasi yang dibagikan di akhir acara, lebih dari 90% peserta merasa puas dengan materi dan pelaksanaan seminar. Banyak yang mengusulkan agar kegiatan serupa diadakan secara rutin dengan topik-topik yang berbeda.

  Kepala Sekolah Al-Farabi, Ibu Lailatul Husna, menyampaikan bahwa pihak sekolah berkomitmen untuk terus mengadakan program-program yang melibatkan orang tua sebagai mitra dalam pendidikan anak.

  "Pendidikan adalah tanggung jawab bersama antara sekolah dan keluarga. Dengan adanya sinergi yang baik, kita dapat memastikan anak-anak kita tumbuh menjadi individu yang cerdas, berkarakter, dan siap menghadapi tantangan masa depan," tutupnya.`,
        excerpt: 'Kegiatan Ini Diikuti Lebih Dari 200 Orang Tua Siswa Dari Semua Jenjang'
      },
      {
        id: 4,
        type: 'prestasi',
        title: 'Olimpiade Sains Nasional 2025',
        subtitle: 'Adinda Aisyah Raih Medali Emas',
        image: '/images/prestasi/prestasi-1.png',
        date: '10 Juni 2025',
        content: `Adinda Aisyah, siswi kelas XI IPA Sekolah Al-Farabi, berhasil meraih medali emas dalam ajang Olimpiade Sains Nasional (OSN) 2025 bidang Kimia yang diselenggarakan di Jakarta pada tanggal 5-10 Juni 2025. Prestasi ini menjadikan Adinda sebagai wakil dari Provinsi Jawa Barat untuk berlaga di International Chemistry Olympiad (IChO) yang akan diselenggarakan di Singapura pada bulan Juli mendatang.

Perjalanan Adinda untuk mencapai prestasi ini tidaklah mudah. Ia harus melewati seleksi tingkat sekolah, kota, dan provinsi sebelum akhirnya lolos ke tingkat nasional. Di tingkat nasional, ia bersaing dengan 102 peserta terbaik dari seluruh Indonesia.

"Saya tidak menyangka bisa meraih medali emas. Persaingannya sangat ketat karena semua peserta sudah lolos seleksi yang panjang," ungkap Adinda saat diwawancarai setelah pengumuman pemenang.

Adinda mengaku telah mempersiapkan diri dengan sangat serius selama enam bulan terakhir. Ia mengikuti program pembinaan intensif di sekolah dan belajar mandiri di rumah. Dukungan dari orang tua, guru, dan teman-teman menjadi motivasi besar baginya.

"Adinda adalah siswa yang sangat tekun dan memiliki rasa ingin tahu yang tinggi. Ia tidak pernah puas dengan pengetahuan yang sudah dimiliki dan selalu berusaha untuk belajar lebih dalam," ujar Bapak Rudi Hartono, guru Kimia yang membimbing Adinda selama persiapan olimpiade.

Kepala Sekolah Al-Farabi, Ibu Lailatul Husna, menyampaikan rasa bangganya atas prestasi yang diraih Adinda. "Prestasi ini membuktikan bahwa siswa-siswi Al-Farabi mampu bersaing di tingkat nasional bahkan internasional. Kami akan terus mendukung pengembangan potensi akademik dan non-akademik seluruh siswa kami," katanya.

Sebagai persiapan menghadapi kompetisi internasional, Adinda akan mengikuti pelatihan intensif bersama tim nasional Indonesia selama satu bulan ke depan. "Saya akan berusaha maksimal untuk mengharumkan nama Indonesia di kancah internasional," tekad Adinda.

Prestasi yang diraih Adinda ini menambah daftar panjang pencapaian siswa-siswi Sekolah Al-Farabi dalam berbagai kompetisi akademik tingkat nasional dan internasional.`,
        excerpt: 'Adinda Aisyah Raih Medali Emas'
      },
      {
        id: 5,
        type: 'prestasi',
        title: 'Juara 1 Lomba Tahfidz',
        subtitle: 'Dengan Hafalan 10 Juz, Rafiq Berhasil Mengharumkan Nama Sekolah',
        image: '/images/prestasi/prestasi-2.png',
        date: '15 Mei 2025',
        content: `Muhammad Rafiq, siswa kelas VIII Sekolah Al-Farabi, berhasil menjuarai Lomba Tahfidz Quran tingkat provinsi yang diselenggarakan oleh Kementerian Agama pada tanggal 12-15 Mei 2025. Dengan hafalan 10 juz yang disampaikan dengan tajwid yang sempurna, Rafiq berhasil mengalahkan puluhan peserta lainnya dari berbagai sekolah di seluruh provinsi.

Lomba yang berlangsung selama empat hari ini menguji kemampuan para peserta dalam hal kelancaran hafalan, ketepatan tajwid, dan keindahan bacaan. Para juri yang terdiri dari para hafidz dan hafidzah terkemuka memberikan penilaian yang sangat ketat terhadap setiap peserta.

"Alhamdulillah, saya bersyukur atas pencapaian ini. Ini adalah hasil dari konsistensi dalam menghafal dan dukungan dari orang tua serta guru-guru saya," ungkap Rafiq dengan rendah hati setelah menerima piala juara pertama.

Rafiq mengaku telah mulai menghafal Al-Quran sejak usia 7 tahun dan secara konsisten menambah hafalannya setiap hari. Di Sekolah Al-Farabi, ia mengikuti program Tahfidz yang memang menjadi salah satu program unggulan sekolah tersebut.

Ustadz Ahmad Fauzi, pembimbing program Tahfidz di Sekolah Al-Farabi, menyampaikan bahwa Rafiq adalah sosok yang tekun dan disiplin dalam menghafal. "Rafiq selalu menyetorkan hafalannya tepat waktu dan jarang sekali melakukan kesalahan. Ia juga rajin murajaah (mengulang) hafalan yang sudah dimiliki," jelasnya.

Kepala Sekolah Al-Farabi, Ibu Lailatul Husna, menyatakan bahwa prestasi Rafiq ini menjadi bukti keberhasilan program Tahfidz yang dijalankan oleh sekolah. "Kami berharap prestasi ini dapat menginspirasi siswa-siswi lainnya untuk juga mencintai Al-Quran dan bersemangat dalam menghafalnya," ujarnya.

Sebagai juara pertama, Rafiq berhak mewakili provinsi dalam Lomba Tahfidz Quran tingkat nasional yang akan diselenggarakan di Jakarta pada bulan Agustus mendatang. Ia kini sedang mempersiapkan diri dengan menambah hafalan dan memperbaiki kualitas bacaannya.

"Saya akan terus berusaha meningkatkan hafalan dan kualitas bacaan saya. Target saya adalah bisa menjadi hafidz 30 juz sebelum lulus SMP," kata Rafiq dengan penuh semangat.

Prestasi yang diraih Rafiq ini menambah daftar panjang keberhasilan siswa-siswi Sekolah Al-Farabi dalam berbagai kompetisi keagamaan, yang membuktikan keseimbangan antara pendidikan akademik dan keagamaan di sekolah tersebut.`,
        excerpt: 'Dengan Hafalan 10 Juz, Rafiq Berhasil Mengharumkan Nama Sekolah'
      },
      {
        id: 6,
        type: 'prestasi',
        title: 'Juara 1 Turnamen Futsal',
        subtitle: 'Tim Futsal SMK Al-Farabi Raih Juara',
        image: '/images/prestasi/prestasi-3.png',
        date: '25 April 2025',
        content: `Tim futsal SMK Al-Farabi berhasil meraih juara pertama dalam Turnamen Futsal Antar SMK se-Kabupaten yang diselenggarakan pada tanggal 20-25 April 2025. Dalam pertandingan final yang berlangsung sengit, tim Al-Farabi berhasil mengalahkan tim SMK Teknologi Mandiri dengan skor 3-2.

Turnamen yang diikuti oleh 16 tim dari berbagai SMK di kabupaten ini berlangsung selama enam hari dengan sistem gugur. Tim Al-Farabi berhasil melaju ke final setelah mengalahkan tim-tim tangguh di babak sebelumnya.

Kemenangan tim Al-Farabi tidak lepas dari strategi jitu yang diterapkan oleh pelatih, Bapak Dedi Kurniawan, serta kerja sama tim yang solid di lapangan. Kapten tim, Ahmad Rizki, menyumbangkan dua gol dalam pertandingan final, sementara satu gol lainnya dicetak oleh Farhan Ramadhan.

"Kami sangat bersyukur bisa menjadi juara. Ini adalah hasil kerja keras dan latihan rutin selama berbulan-bulan," ungkap Ahmad Rizki setelah pertandingan.

Pelatih tim futsal SMK Al-Farabi, Bapak Dedi Kurniawan, mengungkapkan bahwa kunci keberhasilan tim adalah kedisiplinan dan kerja sama yang baik antar pemain. "Anak-anak ini sangat disiplin dalam latihan dan mereka bermain sebagai satu tim, bukan individu. Itulah yang membuat mereka berhasil," jelasnya.

Kepala SMK Al-Farabi, Bapak Hendra Wijaya, menyampaikan apresiasinya kepada tim futsal sekolah. "Prestasi ini membuktikan bahwa siswa-siswi Al-Farabi tidak hanya unggul dalam bidang akademik dan keagamaan, tetapi juga dalam olahraga. Kami akan terus mendukung pengembangan bakat dan minat siswa di berbagai bidang," ujarnya.

Sebagai juara, tim futsal SMK Al-Farabi berhak atas hadiah berupa piala, sertifikat, dan uang pembinaan sebesar Rp 5 juta. Mereka juga akan mewakili kabupaten dalam turnamen futsal tingkat provinsi yang akan diselenggarakan pada bulan Juli mendatang.

"Kami akan terus berlatih untuk mempersiapkan diri menghadapi turnamen tingkat provinsi. Target kami adalah bisa lolos ke tingkat nasional," kata Ahmad Rizki dengan penuh semangat.

Prestasi tim futsal ini menambah deretan pencapaian SMK Al-Farabi dalam berbagai kompetisi olahraga, yang membuktikan komitmen sekolah dalam mengembangkan potensi siswa secara menyeluruh.`,
        excerpt: 'Tim Futsal SMK Al-Farabi Raih Juara'
      },
    ],
    currentPage: 1,
    itemsPerPage: 9,
    contentType: 'berita'
  }),
  getters: {
    getItemsByPage: (state) => {
      const filteredItems = state.news.filter(item => item.type === state.contentType);
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return filteredItems.slice(start, end);
    },
    getNewsByPage: (state) => {
      const newsItems = state.news.filter(item => item.type === 'berita');
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return newsItems.slice(start, end);
    },
    getAchievementsByPage: (state) => {
      const achievementItems = state.news.filter(item => item.type === 'prestasi');
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return achievementItems.slice(start, end);
    },
    getItemById: (state) => (id) => {
      return state.news.find(item => item.id === parseInt(id));
    },
    getNewsById: (state) => (id) => {
      return state.news.find(item => item.id === parseInt(id) && item.type === 'berita');
    },
    getAchievementById: (state) => (id) => {
      return state.news.find(item => item.id === parseInt(id) && item.type === 'prestasi');
    },
    totalPages: (state) => {
      const filteredItems = state.news.filter(item => item.type === state.contentType);
      return Math.ceil(filteredItems.length / state.itemsPerPage);
    },
    totalNewsPages: (state) => {
      const newsItems = state.news.filter(item => item.type === 'berita');
      return Math.ceil(newsItems.length / state.itemsPerPage);
    },
    totalAchievementsPages: (state) => {
      const achievementItems = state.news.filter(item => item.type === 'prestasi');
      return Math.ceil(achievementItems.length / state.itemsPerPage);
    }
  },
  actions: {
    setPage(page) {
      this.currentPage = page;
    },
    setContentType(type) {
      this.contentType = type;
      this.currentPage = 1;
    }
  }
})
