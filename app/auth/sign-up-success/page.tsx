import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-7 w-7 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Regjistrimi u Krye!
            </CardTitle>
            <CardDescription>
              Llogaria juaj u krijua me sukses. Tani mund te paraqisni ankesat tuaja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/protected">Vazhdo te Ankesa</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
