import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Si mund te paraqes nje ankese?",
    a: "Pasi te regjistroheni dhe te hyni ne llogarine tuaj, klikoni butonin 'Paraqit Ankese', zgjidhni kategorine, vendosni adresen dhe pershkruani problemin ne detaje.",
  },
  {
    q: "Sa kohe duhet per te marre pergjigje?",
    a: "Zakonisht brenda 24-48 oreve do te merrni nje perditesim per statusin e ankeses suaj. Rastet me urgjente trajtohen me prioritet.",
  },
  {
    q: "A mund te ndjek statusin e ankeses sime?",
    a: "Po, pasi te hyni ne llogarine tuaj, do te shikoni te gjitha ankesat tuaja me statusin aktual: Ne Pritje, Ne Shqyrtim, Zgjidhur ose Refuzuar.",
  },
  {
    q: "Cilat kategori ankesash mbeshteten?",
    a: "Platforma mbulon: Urbanistike, Mjedisi, Arsimi, Infrastrukture, Shendetesi, Siguria Publike, dhe kategori te tjera te pergjithshme.",
  },
  {
    q: "A eshte falas perdorimi i platformes?",
    a: "Po, platforma eshte plotesisht falas per te gjithe qytetaret. Misioni yne eshte te mundesojme komunikim me te mire ndermjet qytetareve dhe institucioneve.",
  },
]

export function FaqSection() {
  return (
    <section id="pyetje" className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            Pyetje te Shpeshta
          </h2>
          <p className="mt-3 text-muted-foreground">
            Gjithcka qe duhet te dini per platformen Ankesa.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
