import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Si mund të paraqes një ankesë?",
    a: "Pasi të regjistroheni dhe të hyni në llogarinë tuaj, klikoni butonin 'Paraqit Ankesë', zgjidhni kategorinë, vendosni adresën dhe përshkruani problemin në detaje.",
  },
  {
    q: "Sa kohë duhet për të marrë përgjigje?",
    a: "Zakonisht brenda 24-48 orëve do të merrni një përditësim për statusin e ankesës suaj. Rastet më urgjente trajtohen me prioritet.",
  },
  {
    q: "A mund të ndjek statusin e ankesës sime?",
    a: "Po, pasi të hyni në llogarinë tuaj, do të shikoni të gjitha ankesat tuaja me statusin aktual: Në Pritje, Në Shqyrtim, Zgjidhur ose Refuzuar.",
  },
  {
    q: "Cilat kategori ankesash mbështeten?",
    a: "Platforma mbulon: Urbanistikë, Mjedisi, Arsimi, Infrastrukturë, Shëndetësi, Siguria Publike, dhe kategori të tjera të përgjithshme.",
  },
  {
    q: "A është falas përdorimi i platformës?",
    a: "Po, platforma është plotësisht falas për të gjithë qytetarët. Misioni ynë është të mundësojmë komunikim më të mirë ndërmjet qytetarëve dhe institucioneve.",
  },
]

export function FaqSection() {
  return (
    <section id="pyetje" className="bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          PYETJE TË SHPESHTA
        </h2>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-blue-100"
            >
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}