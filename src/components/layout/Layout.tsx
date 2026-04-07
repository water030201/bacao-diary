import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "../ui/CustomCursor";
import CommandPalette from "../ui/CommandPalette";
import ScrollProgress from "../ui/ScrollProgress";
import GrassBurstLayer from "../ui/GrassBurstLayer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <GrassBurstLayer />
      <CustomCursor />
      <CommandPalette />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
