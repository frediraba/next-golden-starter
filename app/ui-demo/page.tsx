// Lihtne demo, et näha shadcn/ui komponente töös.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UIDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>shadcn/ui demo</CardTitle>
        </CardHeader>
        <CardContent className="space-x-2">
          {/* Selgitus: Button on shadcn/ui komponent – saab variatsioone läbi propside */}
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
        </CardContent>
      </Card>
    </div>
  );
}
