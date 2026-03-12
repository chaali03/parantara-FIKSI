import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Bagaimana cara mendaftarkan masjid di DanaMasjid?",
    answer:
      "Sangat mudah! Buat akun, klik 'Daftarkan Masjid', tambahkan foto dan deskripsi masjid Anda, buat program donasi. Masjid Anda akan aktif dalam beberapa menit setelah verifikasi.",
  },
  {
    question: "Berapa biaya untuk pengurus masjid?",
    answer:
      "DanaMasjid mengenakan komisi 2.5% hanya ketika donasi diterima. Tanpa biaya pendaftaran, tanpa langganan wajib. Semua transparan dan amanah.",
  },
  {
    question: "Bagaimana masjid diverifikasi?",
    answer:
      "Setiap masjid harus menyediakan dokumen legalitas dan identitas pengurus. Kami memverifikasi dokumen ini dan memberikan badge terverifikasi. Donatur dapat melihat profil lengkap sebelum berdonasi.",
  },
  {
    question: "Apakah pembayaran aman?",
    answer:
      "Ya, semua pembayaran melalui platform kami yang aman. Dana ditahan hingga konfirmasi dari pengurus masjid, kemudian disalurkan. Jika ada sengketa, tim HidupTebe akan membantu menyelesaikan.",
  },
  {
    question: "Apa yang dilindungi oleh sistem transparansi?",
    answer:
      "Sistem kami mencatat setiap transaksi secara detail dan real-time. Pengurus masjid wajib melaporkan penggunaan dana dengan bukti foto dan keterangan. Semua dapat dilihat oleh donatur.",
  },
  {
    question: "Bisakah saya membatalkan donasi?",
    answer:
      "Donasi yang sudah dikonfirmasi tidak dapat dibatalkan. Namun jika ada masalah atau kecurangan yang terbukti, kami akan membantu proses pengembalian dana sesuai kebijakan yang berlaku.",
  },
]

export function FAQSection() {
  return (
    <AnimatedSection animation="fadeIn" className="py-32 px-6 pb-80 overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, rotateY: -45, scale: 0.8 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -50, skewY: -10 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Semua yang perlu Anda ketahui tentang DanaMasjid. Punya pertanyaan lain? Hubungi tim dukungan kami.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3 py-0 my-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-foreground/30"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
