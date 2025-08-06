import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Users, AlertTriangle, Gavel } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image 
              src="/logo-doa-ibu.png" 
              alt="Doa Ibu Logo" 
              width={120} 
              height={40}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link href="/">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold px-6 py-3 rounded-full">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
          </Link>
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
              Syarat & Ketentuan
            </h1>
            <p className="text-xl text-pink-100">
              Terakhir diperbarui: 6 Agustus 2025
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-pink-400" />
                  Penerimaan Syarat
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Dengan mengunduh, menginstal, atau menggunakan aplikasi Doa Ibu, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan aplikasi.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Penggunaan Aplikasi
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Aplikasi Doa Ibu disediakan untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mendengarkan doa dan pesan spiritual</li>
                    <li>Merekam dan menyimpan pesan audio pribadi</li>
                    <li>Menerima pengingat harian untuk aktivitas spiritual</li>
                    <li>Mengelola profil dan preferensi pribadi</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Akun Pengguna
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Untuk menggunakan fitur tertentu, Anda perlu membuat akun. Anda bertanggung jawab untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menjaga kerahasiaan informasi akun Anda</li>
                    <li>Memberikan informasi yang akurat dan terkini</li>
                    <li>Segera melaporkan penggunaan akun yang tidak sah</li>
                    <li>Bertanggung jawab atas semua aktivitas dalam akun Anda</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Konten dan Rekaman Audio
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Mengenai konten yang Anda buat atau unggah:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Anda mempertahankan kepemilikan atas rekaman audio pribadi</li>
                    <li>Anda memberikan izin kepada kami untuk menyimpan dan memproses konten</li>
                    <li>Konten tidak boleh melanggar hukum atau hak orang lain</li>
                    <li>Kami berhak menghapus konten yang melanggar ketentuan</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Layanan Premium
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Untuk layanan premium:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Pembayaran dilakukan melalui platform yang tersedia</li>
                    <li>Langganan akan diperpanjang otomatis kecuali dibatalkan</li>
                    <li>Pembatalan dapat dilakukan kapan saja melalui pengaturan akun</li>
                    <li>Tidak ada pengembalian dana untuk periode yang sudah digunakan</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-pink-400" />
                  Larangan Penggunaan
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Anda dilarang untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menggunakan aplikasi untuk tujuan ilegal</li>
                    <li>Mengganggu atau merusak sistem aplikasi</li>
                    <li>Menyalin, memodifikasi, atau mendistribusikan aplikasi</li>
                    <li>Menggunakan aplikasi untuk menyebarkan konten berbahaya</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Gavel className="w-6 h-6 mr-3 text-pink-400" />
                  Penafian dan Batasan Tanggung Jawab
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Aplikasi disediakan "sebagaimana adanya" tanpa jaminan apapun. Kami tidak bertanggung jawab atas:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kehilangan data atau kerusakan perangkat</li>
                    <li>Gangguan layanan atau downtime</li>
                    <li>Kerugian finansial atau non-finansial</li>
                    <li>Penggunaan aplikasi oleh pihak ketiga</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Perubahan Syarat
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diberitahukan melalui aplikasi atau email. Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan terhadap syarat baru.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Kontak
                </h2>
                <div className="text-pink-100">
                  <p>
                    Untuk pertanyaan tentang syarat dan ketentuan ini, hubungi:
                  </p>
                  <p className="mt-2 font-semibold">
                    Email: legal@doaibu.app
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
