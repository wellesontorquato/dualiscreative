import { RouteReveal } from "@/components/animations/RouteReveal";

export default function LocaleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteReveal>
      {children}
    </RouteReveal>
  );
}
